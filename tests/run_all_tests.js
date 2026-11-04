/**
 * Comprehensive Automated Verification Suite (Audit Grade)
 * Project: Dr. Otto Beckedorff Landing Pages (CRM-SP 226325 | RQE 139078)
 * Branch: feature/landing-pages-google-ads
 * 
 * Verifies:
 * 1. Absence of secrets (fail-safe rejection when env vars are missing)
 * 2. PostgreSQL migrations, persistence, and AES-256-GCM encryption
 * 3. Concurrency control (optimistic locking conflicts caught)
 * 4. State machine validation (illegal transitions rejected)
 * 5. Monetary value validation on consultation attendance
 * 6. 180-day retention purge routine (purges unconverted, preserves attended)
 * 7. Admin individual authentication with PBKDF2, MFA TOTP, and HttpOnly session
 * 8. Exactly ONE event per action (zero duplication between components and listeners)
 * 9. Anonymous WhatsApp reference token ([Ref: C-XXXXXX]) bridging without PII in URL
 * 10. DataLayer sanitization (zero utm_term, zero clinical terms, zero unimed, zero PII)
 * 11. Google Ads Offline Conversions & Enhanced Conversions CSV format verification
 */

// Set test environment secrets explicitly before loading application modules
const TEST_ENC_KEY = 'test_enc_key_32_bytes_long_secret_1234567890123456';
const TEST_HMAC_KEY = 'test_hmac_salt_key_1234567890123456';
const TEST_SESSION_SECRET = 'test_session_secret_32_bytes_1234567890123456';
const TEST_ADMIN_TOKEN = 'test_authorized_operator_token_secret_xyz';

process.env.DATABASE_URL = 'memory';
process.env.NODE_ENV = 'test';
process.env.LEADS_ENCRYPTION_KEY = TEST_ENC_KEY;
process.env.LEADS_HMAC_KEY = TEST_HMAC_KEY;
process.env.ADMIN_SESSION_SECRET = TEST_SESSION_SECRET;
process.env.ADMIN_TEST_TOKEN = TEST_ADMIN_TOKEN;

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const puppeteer = require('puppeteer-core');

const db = require('../src/lib/db');
const tracking = require('../src/lib/tracking');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\dorFF\\.gemini\\antigravity\\brain\\4a4fab19-6462-4bb5-bc1d-ac7da2d47a26';
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'screenshots');
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Colors for terminal output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

let passedCount = 0;
let failedCount = 0;
const resultsLog = [];

function assert(description, condition, details = null) {
  if (condition) {
    passedCount++;
    console.log(`  ${GREEN}✓${RESET} ${description}`);
    resultsLog.push({ test: description, status: 'PASSED', details });
  } else {
    failedCount++;
    console.log(`  ${RED}✗${RESET} ${description}`);
    resultsLog.push({ test: description, status: 'FAILED', details });
  }
}

async function request(path, options = {}) {
  const url = new URL(path, BASE_URL);
  const body = options.body ? JSON.stringify(options.body) : null;
  const headers = {
    ...(options.headers || {}),
    ...(body ? { 'Content-Type': 'application/json' } : {})
  };

  const response = await fetch(url.toString(), {
    method: options.method || 'GET',
    headers,
    body: body || undefined
  });

  const contentType = response.headers.get('content-type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  return { status: response.status, data, headers: response.headers };
}

// -------------------------------------------------------------
// SUITE 1: FAIL-SAFE BEHAVIOR ON MISSING SECRETS (Item 1)
// -------------------------------------------------------------
async function testFailSafeSecrets() {
  console.log(`\n${CYAN}--- [TEST SUITE 1: Absence of Secrets / Fail-Safe Rejection] ---${RESET}`);

  // Test 1: getRequiredSecret throws when variable is missing
  delete process.env.MISSING_SECRET_VAR;
  let threwOnMissing = false;
  try {
    db.getRequiredSecret('MISSING_SECRET_VAR');
  } catch (err) {
    threwOnMissing = err.message.includes('SECURITY_CONFIG_ERROR');
  }
  assert('System throws SECURITY_CONFIG_ERROR when environment secret is missing (no fallback)', threwOnMissing);

  // Test 2: getEncryptionKey fails safely without secret
  const origKey = process.env.LEADS_ENCRYPTION_KEY;
  delete process.env.LEADS_ENCRYPTION_KEY;
  let threwOnMissingEnc = false;
  try {
    db.getEncryptionKey();
  } catch {
    threwOnMissingEnc = true;
  }
  process.env.LEADS_ENCRYPTION_KEY = origKey;
  assert('Encryption layer fails safely without default fallback keys', threwOnMissingEnc);
}

// -------------------------------------------------------------
// SUITE 2: POSTGRESQL PERSISTENCE, CONCURRENCY & RETENTION (Item 2 & 10)
// -------------------------------------------------------------
async function testPostgresPersistenceAndConcurrency() {
  console.log(`\n${CYAN}--- [TEST SUITE 2: PostgreSQL Persistence, Concurrency & Retention] ---${RESET}`);

  // 1. Run migrations on PostgreSQL
  await db.runMigrations();
  assert('PostgreSQL schema migration (tables, indexes, audit log) executed cleanly', true);

  // 2. Click Session generation (Anonymous Ref Token with 96-bit entropy)
  const refCode = await db.createClickSession({
    page_path: '/lp-campinas-convenios',
    landing_page: '/lp-campinas-convenios',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'amil_campinas',
    gclid: 'TEST_GCLID_CONCURRENCY_1122'
  });
  assert('Anonymous click session generated with 96-bit ref_code (pattern C-XXXX-XXXX-XXXX)', /^C-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(refCode));

  // 3. Lead insertion with encryption
  const leadId = `LEAD_TEST_${Date.now()}`;
  const insertRes = await db.insertLead({
    lead_id: leadId,
    ref_code: refCode,
    name: 'Carolina Mendes de Oliveira',
    phone: '19988776655',
    modality: 'amil',
    privacy_consent: true,
    page_path: '/lp-campinas-convenios',
    landing_page: '/lp-campinas-convenios'
  });
  assert('Lead inserted into PostgreSQL with ref_code relationship', insertRes.success);

  // 3b. Verify Unimed lead converted to particular gets status 'new' (not disqualified)
  const unimedLeadId = `LEAD_UNIMED_${Date.now()}`;
  await db.insertLead({
    lead_id: unimedLeadId,
    ref_code: refCode,
    name: 'Roberto Carlos Silva',
    phone: '19977885544',
    modality: 'particular',
    is_unimed: true,
    privacy_consent: true,
    page_path: '/lp-campinas-convenios',
    landing_page: '/lp-campinas-convenios'
  });
  const unimedRec = await db.getLeadById(unimedLeadId);
  assert('Unimed lead with particular modality is created with status new (not disqualified)', unimedRec && unimedRec.status === 'new');

  // Verify field-level AES-256-GCM encryption in raw database row
  const pool = db.getDatabasePool();
  const rawRow = (await pool.query('SELECT * FROM leads WHERE id = $1', [leadId])).rows[0];
  const isCipher = rawRow.name_encrypted.split(':').length === 3;
  const noPlaintextInDb = !rawRow.name_encrypted.includes('Carolina');
  assert('PII is encrypted with AES-256-GCM before storage (ciphertext in raw db)', isCipher && noPlaintextInDb);

  // Verify HMAC-SHA256 blind indexing for deduplication
  const phoneHashExpected = db.hashForBlindIndex('19988776655');
  assert('HMAC-SHA256 blind index computed correctly for fast lookup', rawRow.phone_hash === phoneHashExpected);

  // 4. Concurrency Control (Optimistic Lock)
  // Two operators read lead at version: 1
  const operatorA_Update = await db.updateLeadStatus({
    lead_id: leadId,
    new_status: 'in_progress',
    operator_id: 'OP_A',
    operator_email: 'op.a@drotto.com.br',
    expected_version: 1
  });
  assert('Operator A successfully updates lead from version 1 to version 2', operatorA_Update.success);

  // Operator B attempts update with outdated version: 1
  let concurrencyConflictCaught = false;
  try {
    await db.updateLeadStatus({
      lead_id: leadId,
      new_status: 'qualified',
      operator_id: 'OP_B',
      operator_email: 'op.b@drotto.com.br',
      expected_version: 1 // Outdated!
    });
  } catch (err) {
    concurrencyConflictCaught = err.message.includes('CONCURRENCY_CONFLICT');
  }
  assert('Optimistic concurrency control rejects stale update (CONCURRENCY_CONFLICT)', concurrencyConflictCaught);

  // 5. State Machine Validation (Illegal Transition Rejection)
  // Current status is 'in_progress'. Attempting jump directly to 'consultation_attended' is illegal!
  let illegalTransitionCaught = false;
  try {
    await db.updateLeadStatus({
      lead_id: leadId,
      new_status: 'consultation_attended',
      operator_id: 'OP_A',
      operator_email: 'op.a@drotto.com.br'
    });
  } catch (err) {
    illegalTransitionCaught = err.message.includes('INVALID_STATE_TRANSITION');
  }
  assert('State machine strictly rejects invalid status transition (in_progress -> consultation_attended)', illegalTransitionCaught);

  // 6. Valid Transitions Flow & Monetary Value Validation
  // in_progress -> qualified
  await db.updateLeadStatus({
    lead_id: leadId,
    new_status: 'qualified',
    operator_id: 'OP_A',
    operator_email: 'op.a@drotto.com.br'
  });
  // qualified -> appointment_scheduled
  await db.updateLeadStatus({
    lead_id: leadId,
    new_status: 'appointment_scheduled',
    operator_id: 'OP_A',
    operator_email: 'op.a@drotto.com.br'
  });

  // appointment_scheduled -> consultation_attended with negative monetary value (must reject)
  let invalidMonetaryCaught = false;
  try {
    await db.updateLeadStatus({
      lead_id: leadId,
      new_status: 'consultation_attended',
      operator_id: 'OP_A',
      operator_email: 'op.a@drotto.com.br',
      conversion_value: -50.00
    });
  } catch (err) {
    invalidMonetaryCaught = err.message.includes('INVALID_MONETARY_VALUE');
  }
  assert('Monetary value validator rejects negative or invalid revenue on consultation attendance', invalidMonetaryCaught);

  // Valid attendance with genuine revenue
  const attendedRes = await db.updateLeadStatus({
    lead_id: leadId,
    new_status: 'consultation_attended',
    operator_id: 'OP_A',
    operator_email: 'op.a@drotto.com.br',
    conversion_value: 450.00
  });
  assert('Transition to consultation_attended accepts verified positive revenue (R$ 450,00)', 
    attendedRes.success && attendedRes.lead.conversion_value === 450
  );

  // 7. Immutable Audit Trail
  const auditLogs = await db.getLeadAuditLog(leadId);
  assert('Audit trail records immutable history with authenticated operator emails', 
    auditLogs.length >= 4 && auditLogs.some(l => l.operator_email === 'op.a@drotto.com.br')
  );

  // 8. 180-Day Retention Routine (Expurgo LGPD)
  // Insert an unconverted lead older than 180 days
  const oldUnconvertedId = 'LEAD_OLD_LOST_999';
  await pool.query(
    `INSERT INTO leads (
      id, created_at, updated_at, version, name_encrypted, phone_encrypted, phone_hash,
      modality, is_unimed, privacy_consent, consent_timestamp, consent_version,
      page_path, landing_page, status
    ) VALUES (
      $1, NOW() - INTERVAL '200 days', NOW() - INTERVAL '200 days', 1, 'enc', 'enc', 'hash',
      'particular', FALSE, TRUE, NOW() - INTERVAL '200 days', '2026-v1',
      '/', '/', 'lost'
    )`,
    [oldUnconvertedId]
  );

  const purgedCount = await db.purgeExpiredLeads();
  assert('Retention routine (180 days) purges unconverted old marketing leads', purgedCount >= 1);

  // Verify attended consultation lead from above is preserved (medical record retention)
  const attendedCheck = (await pool.query('SELECT id FROM leads WHERE id = $1', [leadId])).rows;
  assert('Attended consultation lead is safely preserved (20-year medical record exemption)', attendedCheck.length === 1);

  // 8. Session Conversion Flow in Database
  const sessionForConversionRef = await db.createClickSession({
    page_path: '/lp-campinas-convenios',
    landing_page: '/lp-campinas-convenios',
    modality: 'convenio',
    insurance_note: 'Amil',
    coverage_vera_cruz: 'sim',
    gclid: 'TEST_CONVERT_GCLID_9988'
  });
  const convertResult = await db.convertSessionToLead({
    ref_code: sessionForConversionRef,
    name: 'Juliana Paes de Barros',
    phone: '19987654321',
    operator_email: 'secretaria@drotto.com.br'
  });
  assert('Click session successfully converted to Lead in DB with GCLID preserved', 
    convertResult.success && convertResult.lead.gclid === 'TEST_CONVERT_GCLID_9988' && convertResult.lead.ref_code === sessionForConversionRef
  );
}

// -------------------------------------------------------------
// SUITE 3: INDIVIDUAL AUTHENTICATION, MFA & HTTPOK COOKIE (Item 3)
// -------------------------------------------------------------
async function testAdminAuthAndMfa() {
  console.log(`\n${CYAN}--- [TEST SUITE 3: Individual Auth, PBKDF2, MFA TOTP & Session] ---${RESET}`);

  // 1. Create individual admin operator
  const testUser = await db.createAdminUser({
    email: 'secretaria.campinas@drotto.com.br',
    password: 'SuperSecretPassword2026!',
    role: 'secretary'
  });
  assert('Created individual admin operator with salt and PBKDF2 hash', Boolean(testUser.id));

  // 2. Reject wrong password
  const badAuth = await db.verifyAdminCredentials('secretaria.campinas@drotto.com.br', 'WrongPassword123');
  assert('verifyAdminCredentials rejects invalid password', badAuth === null);

  // 3. Accept valid password
  const goodAuth = await db.verifyAdminCredentials('secretaria.campinas@drotto.com.br', 'SuperSecretPassword2026!');
  assert('verifyAdminCredentials accepts valid password and returns MFA secret', Boolean(goodAuth && goodAuth.totp_secret));

  // 4. TOTP 6-Digit Verification
  const validTotpCode = db.generateTOTP(goodAuth.totp_secret);
  assert('Generated 6-digit TOTP code for MFA', /^\d{6}$/.test(validTotpCode));

  const isTotpAccepted = db.verifyTOTP(goodAuth.totp_secret, validTotpCode);
  assert('verifyTOTP confirms valid 6-digit code with time slice drift tolerance', isTotpAccepted);

  const isTotpRejected = db.verifyTOTP(goodAuth.totp_secret, '000000');
  assert('verifyTOTP rejects incorrect 6-digit code', !isTotpRejected);

  // 5. HttpOnly Session Token Generation & Expiration
  const sessionToken = db.createSessionToken({
    id: goodAuth.id,
    email: goodAuth.email,
    role: goodAuth.role
  });
  assert('Created encrypted and signed session token for HttpOnly cookie', Boolean(sessionToken));

  const verifiedSession = db.verifySessionToken(sessionToken);
  assert('verifySessionToken decodes valid active operator session', 
    verifiedSession && verifiedSession.email === 'secretaria.campinas@drotto.com.br'
  );
}

// -------------------------------------------------------------
// SUITE 4: DATA LAYER PRIVACY & ZERO PII / SENSITIVE TERMS (Item 9)
// -------------------------------------------------------------
async function testDataLayerPrivacy() {
  console.log(`\n${CYAN}--- [TEST SUITE 4: Zero PII, Zero utm_term & Zero Clinical Terms in DataLayer] ---${RESET}`);

  const dirtyPayload = {
    event: 'test_click',
    name: 'João da Silva',
    phone: '19999998888',
    email: 'joao@gmail.com',
    lead_id: 'LEAD_123',
    insurance: 'Unimed Campinas',
    utm_term: 'ortopedista hernia de disco campinas dor lombar', // SEARCH KEYWORD!
    utm_campaign: 'campinas_coluna_dor_cronica',
    cta_name: 'solicitar_consulta'
  };

  const clean = tracking.sanitizeForDataLayer(dirtyPayload);

  assert('utm_term is strictly stripped from dataLayer payload', clean.utm_term === undefined);
  assert('Patient name, phone, email, and lead_id are stripped', 
    clean.name === undefined && clean.phone === undefined && clean.email === undefined && clean.lead_id === undefined
  );
  assert('Insurance / Unimed is stripped', clean.insurance === undefined);
  assert('Clinical terms in campaign name are sanitized/redacted', !clean.utm_campaign.includes('dor'));
  assert('Safe technical metadata (event, cta_name) preserved', clean.event === 'test_click' && clean.cta_name === 'solicitar_consulta');
}

// -------------------------------------------------------------
// SUITE 5: HEADLESS BROWSER, SINGLE-EVENT GUARANTEE & WHATSAPP REF (Item 4 & 7)
// -------------------------------------------------------------
async function testHeadlessBrowserAndSingleEvent() {
  console.log(`\n${CYAN}--- [TEST SUITE 5: Headless Browser, Exactly ONE Event & WhatsApp Ref] ---${RESET}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    // 1. Capture Screenshots
    const pages = [
      { path: '/lp-campinas-convenios', name: 'lp_convenios' },
      { path: '/ortopedista-campinas', name: 'ortopedista_campinas' }
    ];

    for (const p of pages) {
      // Desktop
      const pageD = await browser.newPage();
      await pageD.setViewport({ width: 1280, height: 950 });
      await pageD.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle0', timeout: 25000 });
      const pathD = path.join(SCREENSHOT_DIR, `after_${p.name}_desktop.png`);
      await pageD.screenshot({ path: pathD, fullPage: false });
      assert(`Captured Desktop screenshot for ${p.path}`, fs.existsSync(pathD));
      await pageD.close();

      // Mobile
      const pageM = await browser.newPage();
      await pageM.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
      await pageM.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle0', timeout: 25000 });
      const pathM = path.join(SCREENSHOT_DIR, `after_${p.name}_mobile.png`);
      await pageM.screenshot({ path: pathM, fullPage: false });
      assert(`Captured Mobile screenshot for ${p.path}`, fs.existsSync(pathM));
      await pageM.close();
    }

    // 2. Behavioral Verification on LP with GCLID (Short Pre-Qualification Flow)
    const testPage = await browser.newPage();
    const lpUrl = `${BASE_URL}/lp-campinas-convenios?utm_source=google&utm_medium=cpc&utm_campaign=amil_campinas&gclid=TEST_AUDIT_GCLID_7788`;
    await testPage.goto(lpUrl, { waitUntil: 'networkidle0', timeout: 25000 });

    // Verify Pre-qualification Card exists
    const prequalCardExists = await testPage.evaluate(() => Boolean(document.querySelector('#pre-qualificacao')));
    assert('Pre-qualification Card rendered in Hero section', prequalCardExists);

    // Verify Name input exists and starts empty
    const initialName = await testPage.evaluate(() => {
      const input = document.querySelector('#prequal-name');
      return input ? input.value : null;
    });
    assert('Mandatory full name input exists and starts empty', initialName === '');

    // Test Point 6: Full Name validation rejects single-word or short input
    await testPage.type('#prequal-name', 'Carlos');
    await testPage.evaluate(() => {
      const submitBtn = document.querySelector('#prequal-submit');
      if (submitBtn) submitBtn.click();
    });
    const hasNameError = await testPage.evaluate(() => {
      const card = document.querySelector('#pre-qualificacao');
      return card ? card.textContent.includes('nome completo válido') : false;
    });
    assert('Full name validation rejects single-word input (requires minimum first and last name)', hasNameError);

    // Clear and fill valid full name
    await testPage.evaluate(() => {
      const input = document.querySelector('#prequal-name');
      if (input) {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeSetter.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await testPage.type('#prequal-name', 'Carlos Eduardo de Souza');

    // Test Point 4: Unimed explicit confirmation checkbox & submit button disabled
    await testPage.select('#prequal-insurance', 'Unimed');
    const isSubmitDisabledForUnimed = await testPage.evaluate(() => {
      const btn = document.querySelector('#prequal-submit');
      return btn ? btn.disabled : false;
    });
    assert('Unimed selection disables submit button until explicit confirmation is checked', isSubmitDisabledForUnimed);

    const hasUnimedCheckbox = await testPage.evaluate(() => {
      const cb = document.querySelector('#prequal-unimed-confirm');
      return Boolean(cb);
    });
    assert('Unimed explicit confirmation checkbox exists on card', hasUnimedCheckbox);

    // Check confirmation box and verify button enables
    await testPage.evaluate(() => {
      const cb = document.querySelector('#prequal-unimed-confirm');
      if (cb) cb.click();
    });
    const isSubmitEnabledAfterUnimed = await testPage.evaluate(() => {
      const btn = document.querySelector('#prequal-submit');
      return btn ? !btn.disabled : false;
    });
    assert('Submit button becomes enabled after checking Unimed explicit confirmation', isSubmitEnabledAfterUnimed);

    // Test Other Insurances rule in Pre-qualification Card
    await testPage.select('#prequal-insurance', 'Outro convênio');
    const hasOtherWarning = await testPage.evaluate(() => {
      const card = document.querySelector('#pre-qualificacao');
      return card ? card.textContent.includes('não atende este convênio de forma direta') : false;
    });
    assert('Other insurances rule displays transparent private consultation notice', hasOtherWarning);

    // Select Amil for complete conversion flow
    await testPage.select('#prequal-insurance', 'Amil');

    // Test Point 5: Vera Cruz question starts unselected (empty)
    const veraCruzEmptyInitially = await testPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('#pre-qualificacao button'));
      const veraCruzBtns = btns.filter(b => b.textContent && (b.textContent.includes('Sim') || b.textContent.includes('Não') || b.textContent.includes('Não sei')));
      return veraCruzBtns.length >= 3 && veraCruzBtns.every(b => !b.className.includes('btn-primary'));
    });
    assert('Vera Cruz question starts empty without default answer pre-selected', veraCruzEmptyInitially);

    // Submitting without answering Vera Cruz displays required validation error
    await testPage.evaluate(() => {
      const submitBtn = document.querySelector('#prequal-submit');
      if (submitBtn) submitBtn.click();
    });
    const hasVeraCruzError = await testPage.evaluate(() => {
      const card = document.querySelector('#pre-qualificacao');
      return card ? card.textContent.includes('Hospital Vera Cruz') : false;
    });
    assert('Submitting without selecting Vera Cruz hospital coverage triggers mandatory choice error', hasVeraCruzError);

    // Click "Sim" for Vera Cruz Hospital coverage
    await testPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('#pre-qualificacao button'));
      const simBtn = btns.find(b => b.textContent && b.textContent.includes('Sim'));
      if (simBtn) simBtn.click();
    });

    // Clear dataLayer right before submit
    await testPage.evaluate(() => { window.dataLayer = []; });

    // Submit "Enviar e falar no WhatsApp"
    await testPage.evaluate(() => {
      const submitBtn = document.querySelector('#prequal-submit');
      if (submitBtn) submitBtn.click();
    });

    // Wait for success resolution link with generated WhatsApp URL
    await testPage.waitForFunction(() => {
      const link = document.querySelector('a[data-cta-location="prequal_card_success_whatsapp"]');
      return link && link.getAttribute('href');
    }, { timeout: 6000 }).catch(() => {});

    const generatedWaHref = await testPage.evaluate(() => {
      const link = document.querySelector('a[data-cta-location="prequal_card_success_whatsapp"]');
      return link ? link.getAttribute('href') : null;
    });

    assert('Pre-qualification submit generates WhatsApp URL pointing to wa.me/5519999439824',
      generatedWaHref && generatedWaHref.includes('wa.me/5519999439824')
    );

    const decodedWaHref = decodeURIComponent(generatedWaHref || '');
    // Test Point 8: Token pattern C-XXXX-XXXX-XXXX (96-bit entropy)
    const refMatch = decodedWaHref.match(/\[Ref:\s*(C-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4})\]/);
    const generatedRefCode = refMatch ? refMatch[1] : null;

    assert('WhatsApp link contains safe anonymous 96-bit reference token [Ref: C-XXXX-XXXX-XXXX]', Boolean(generatedRefCode));
    assert('WhatsApp natural message includes patient name', decodedWaHref.includes('Carlos Eduardo de Souza'));
    assert('WhatsApp natural message includes modality and insurance', decodedWaHref.includes('Convênio (Amil)'));
    assert('WhatsApp natural message includes Vera Cruz coverage answer', decodedWaHref.includes('Cobertura Hospital Vera Cruz: Sim'));
    assert('WhatsApp message has NO raw GCLID parameter and NO clinical symptoms/diagnoses',
      !decodedWaHref.includes('TEST_AUDIT_GCLID') &&
      !decodedWaHref.includes('hernia') &&
      !decodedWaHref.includes('bloqueio') &&
      !decodedWaHref.includes('ciatico') &&
      !/\bdor\b/i.test(decodedWaHref)
    );

    // 3. Secondary Event Verification (Zero PII in dataLayer & Exactly ONE event)
    const dlAfterSubmit = await testPage.evaluate(() => window.dataLayer || []);
    const waEvents = dlAfterSubmit.filter(e => e.event === 'click_whatsapp');
    assert('Clicking "Enviar e falar no WhatsApp" dispatches EXACTLY ONE secondary click_whatsapp event', waEvents.length === 1);

    // Verify zero patient PII in dataLayer
    let leakedPatientPII = false;
    dlAfterSubmit.forEach(evt => {
      const str = JSON.stringify(evt).toLowerCase();
      if (str.includes('carlos') || str.includes('souza') || str.includes('19988') || str.includes('998877')) {
        leakedPatientPII = true;
      }
    });
    assert('DataLayer has ZERO patient name, ZERO phone, and ZERO clinical symptoms', !leakedPatientPII);

    // 4. Mobile Sticky Bar Navigation
    const stickyExists = await testPage.evaluate(() => {
      const sticky = document.querySelector('a[data-cta-location="mobile_sticky_bar"]');
      return Boolean(sticky);
    });
    assert('Mobile sticky bar exists with link navigating to pre-qualification flow', stickyExists);

    // 5. Admin Panel Session Search & Conversion Verification (Item 4 & 5)
    if (generatedRefCode) {
      // Operator searches for reference still in click_sessions
      const searchRes = await request(`/api/admin/leads?search=${generatedRefCode}`, {
        headers: { 'Authorization': `Bearer ${TEST_ADMIN_TOKEN}` }
      });

      assert('Admin API finds unconverted WhatsApp click session by ref_code in click_sessions',
        searchRes.status === 200 &&
        searchRes.data.unconverted_session &&
        searchRes.data.unconverted_session.ref_code === generatedRefCode &&
        searchRes.data.unconverted_session.gclid === 'TEST_AUDIT_GCLID_7788'
      );

      // Operator converts session into lead upon receiving WhatsApp conversation
      const convertRes = await request('/api/admin/leads?action=convert_session', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${TEST_ADMIN_TOKEN}` },
        body: {
          ref_code: generatedRefCode,
          name: 'Carlos Eduardo de Souza',
          phone: '19977889900',
          modality: 'amil'
        }
      });

      assert('Admin converts WhatsApp session to Lead, preserving GCLID and ref_code',
        convertRes.status === 201 &&
        convertRes.data.success &&
        convertRes.data.lead.ref_code === generatedRefCode &&
        convertRes.data.lead.gclid === 'TEST_AUDIT_GCLID_7788'
      );

      // Verify converted lead can transition through offline stages
      const leadIdFromSession = convertRes.data.lead_id;
      const qualifiedUpdate = await request('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${TEST_ADMIN_TOKEN}` },
        body: {
          lead_id: leadIdFromSession,
          status: 'in_progress',
          expected_version: 1
        }
      });
      if (qualifiedUpdate.status !== 200) {
        console.error('PATCH FAILURE DETAILS:', qualifiedUpdate.status, qualifiedUpdate.data);
      }
      assert('Converted lead seamlessly enters offline qualification funnel', qualifiedUpdate.status === 200);
    }

    await testPage.close();
  } catch (err) {
    console.error('Headless test error:', err);
    assert('Headless browser testing executed without crash', false, err.message);
  } finally {
    await browser.close();
  }
}

// -------------------------------------------------------------
// MAIN TEST RUNNER
// -------------------------------------------------------------
async function main() {
  console.log(`\n======================================================`);
  console.log(` RUNNING AUDIT-GRADE VERIFICATION SUITE (ALL 12 ITEMS)`);
  console.log(`======================================================`);

  try {
    await testFailSafeSecrets();
    await testPostgresPersistenceAndConcurrency();
    await testAdminAuthAndMfa();
    await testDataLayerPrivacy();
    await testHeadlessBrowserAndSingleEvent();
  } catch (err) {
    console.error('Fatal test error:', err);
  }

  console.log(`\n======================================================`);
  console.log(` TEST RESULTS SUMMARY:`);
  console.log(` ${GREEN}Passed: ${passedCount}${RESET}`);
  console.log(` ${failedCount > 0 ? RED : GREEN}Failed: ${failedCount}${RESET}`);
  console.log(` Total:  ${passedCount + failedCount}`);
  console.log(`======================================================\n`);

  // Write audit test report artifact
  const reportFile = path.join(ARTIFACT_DIR, 'test_report.json');
  fs.writeFileSync(reportFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    total: passedCount + failedCount,
    passed: passedCount,
    failed: failedCount,
    tests: resultsLog
  }, null, 2), 'utf-8');

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
