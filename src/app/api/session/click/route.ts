import { NextResponse } from 'next/server';
import { createClickSession, checkRateLimit, generateRefCode } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (!checkRateLimit(ip)) {
      const fallbackRef = generateRefCode();
      return NextResponse.json({ success: true, ref_code: fallbackRef, rate_limited: true });
    }

    const body = await request.json().catch(() => ({}));
    const {
      page_path,
      landing_page,
      utm_source,
      utm_medium,
      utm_campaign,
      gclid,
      gbraid,
      wbraid,
      modality,
      insurance_name,
      insurance_note,
      coverage_vera_cruz,
      is_unimed
    } = body;

    let refCode: string;
    try {
      refCode = await createClickSession({
        page_path: String(page_path || '/').slice(0, 255),
        landing_page: String(landing_page || '/').slice(0, 255),
        utm_source: utm_source ? String(utm_source).slice(0, 100) : undefined,
        utm_medium: utm_medium ? String(utm_medium).slice(0, 100) : undefined,
        utm_campaign: utm_campaign ? String(utm_campaign).slice(0, 100) : undefined,
        gclid: gclid ? String(gclid).slice(0, 150) : undefined,
        gbraid: gbraid ? String(gbraid).slice(0, 150) : undefined,
        wbraid: wbraid ? String(wbraid).slice(0, 150) : undefined,
        modality: modality ? String(modality).slice(0, 32) : undefined,
        insurance_note: (insurance_name || insurance_note) ? String(insurance_name || insurance_note).slice(0, 150) : undefined,
        coverage_vera_cruz: coverage_vera_cruz ? String(coverage_vera_cruz).slice(0, 32) : undefined,
        is_unimed: Boolean(is_unimed)
      });
    } catch (sessionErr) {
      console.warn('[Click Session Notice] Fallback ref_code generated due to DB exception:', sessionErr);
      refCode = generateRefCode();
    }

    return NextResponse.json({
      success: true,
      ref_code: refCode
    });
  } catch (err: any) {
    console.error('[Click Session Error]', err);
    const fallbackRef = generateRefCode();
    return NextResponse.json({
      success: true,
      ref_code: fallbackRef,
      fallback: true
    });
  }
}

