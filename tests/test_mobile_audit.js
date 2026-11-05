const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runMobileAudit() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pagesToAudit = [
    { name: 'LP Convênios', url: 'http://localhost:3000/lp-campinas-convenios' },
    { name: 'Ortopedista Campinas', url: 'http://localhost:3000/ortopedista-campinas' }
  ];

  const viewports = [
    { width: 375, height: 812, name: 'iPhone Standard (375x812)' },
    { width: 320, height: 568, name: 'Small Phone (320x568)' }
  ];

  let allPassed = true;

  for (const pageInfo of pagesToAudit) {
    console.log(`\n========================================`);
    console.log(`AUDIT: ${pageInfo.name} (${pageInfo.url})`);
    console.log(`========================================`);

    const page = await browser.newPage();

    // 1. Check Metadata / OpenGraph for WhatsApp Sharing
    await page.goto(pageInfo.url, { waitUntil: 'networkidle2' });
    const ogData = await page.evaluate(() => {
      const getMeta = (prop) => {
        const el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`);
        return el ? el.getAttribute('content') : null;
      };
      return {
        ogTitle: getMeta('og:title'),
        ogDesc: getMeta('og:description'),
        ogImage: getMeta('og:image'),
        robots: getMeta('robots')
      };
    });

    console.log(`\n[Metadata & WhatsApp Preview Check]`);
    const hasAbsoluteOgImage = ogData.ogImage && ogData.ogImage.startsWith('http');
    console.log(`- OG Title: "${ogData.ogTitle}" -> ${ogData.ogTitle ? 'OK' : 'MISSING'}`);
    console.log(`- OG Image (absolute URL for WhatsApp): "${ogData.ogImage}" -> ${hasAbsoluteOgImage ? 'OK' : 'FAIL'}`);
    if (!hasAbsoluteOgImage) allPassed = false;

    // 2. Check for CFM forbidden phrases
    const pageText = await page.evaluate(() => document.body.innerText.toLowerCase());
    const forbiddenPhrases = [
      'especialista em coluna',
      'elimina a dor',
      'cura definitiva',
      'precisão cirúrgica',
      'avaliação verificada no google',
      'resultado garantido',
      '100% de eficácia'
    ];

    console.log(`\n[CFM & Google Ads Compliance Check]`);
    for (const phrase of forbiddenPhrases) {
      const found = pageText.includes(phrase);
      console.log(`- Term "${phrase}": ${found ? 'FOUND (VIOLATION)' : 'NOT FOUND (SAFE)'}`);
      if (found) allPassed = false;
    }

    // 3. Test on each mobile viewport for horizontal overflow, quiz position and touch targets
    for (const vp of viewports) {
      console.log(`\n[Viewport Test: ${vp.name}]`);
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: true, hasTouch: true });
      await page.reload({ waitUntil: 'networkidle2' });

      const metrics = await page.evaluate((vpWidth, vpHeight) => {
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        const hasHorizontalOverflow = scrollWidth > innerWidth;

        // Check if Quiz is visible in first screen
        const quizCard = document.getElementById('pre-qualificacao');
        const quizRect = quizCard ? quizCard.getBoundingClientRect() : null;
        const quizInFirstFold = quizRect ? (quizRect.top < vpHeight && quizRect.top >= 0) : false;

        // Check header logo escape link
        const header = document.querySelector('header');
        const headerHomeLinks = header ? header.querySelectorAll('a[href="/"]') : [];

        // Check touch target heights of interactive buttons in quiz
        const buttons = Array.from(document.querySelectorAll('#pre-qualificacao button'));
        const touchTargets = buttons.map(b => {
          const r = b.getBoundingClientRect();
          return {
            text: b.innerText.trim().replace(/\n/g, ' '),
            width: r.width,
            height: r.height,
            isTouchFriendly: r.height >= 40 // comfortably above 40px, target 44px
          };
        });

        return {
          scrollWidth,
          innerWidth,
          hasHorizontalOverflow,
          quizInFirstFold,
          quizTop: quizRect ? quizRect.top : null,
          quizHeight: quizRect ? quizRect.height : null,
          hasHeaderEscapeLink: headerHomeLinks.length > 0,
          touchTargets
        };
      }, vp.width, vp.height);

      console.log(`- ScrollWidth: ${metrics.scrollWidth}px vs InnerWidth: ${metrics.innerWidth}px`);
      console.log(`- Horizontal Overflow: ${metrics.hasHorizontalOverflow ? 'FAIL (overflows)' : 'PASS (0 overflow)'}`);
      if (metrics.hasHorizontalOverflow) allPassed = false;

      console.log(`- Quiz in First Fold: ${metrics.quizInFirstFold ? 'PASS' : 'FAIL'} (top: ${metrics.quizTop}px)`);
      if (!metrics.quizInFirstFold) allPassed = false;

      console.log(`- Header Escape Link (leads away from LP): ${metrics.hasHeaderEscapeLink ? 'FAIL (found link to /)' : 'PASS (no escape link)'}`);
      if (metrics.hasHeaderEscapeLink) allPassed = false;

      console.log(`- Touch Targets inside Quiz:`);
      metrics.touchTargets.forEach(t => {
        console.log(`  • "${t.text.substring(0, 30)}": ${Math.round(t.width)}x${Math.round(t.height)}px -> ${t.isTouchFriendly ? 'OK' : 'LOW'}`);
      });
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`MOBILE AUDIT RESULT: ${allPassed ? 'ALL AUDIT ITEMS PASSED' : 'SOME ITEMS FAILED'}`);
  console.log(`========================================\n`);

  process.exit(allPassed ? 0 : 1);
}

runMobileAudit().catch(err => {
  console.error('Fatal error during mobile audit:', err);
  process.exit(1);
});
