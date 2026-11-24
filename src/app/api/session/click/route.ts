import { NextResponse } from 'next/server';
import { createClickSession, checkRateLimit, generateRefCode } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    let body: any = {};
    try {
      const raw = await request.text();
      if (raw) {
        try {
          body = JSON.parse(raw);
        } catch {
          const params = new URLSearchParams(raw);
          body = Object.fromEntries(params.entries());
        }
      }
    } catch {}

    const clientRef = body.ref_code && typeof body.ref_code === 'string' && /^C-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(body.ref_code.trim())
      ? body.ref_code.trim().toUpperCase()
      : undefined;

    if (!checkRateLimit(ip)) {
      const fallbackRef = clientRef || generateRefCode();
      return NextResponse.json({ success: true, ref_code: fallbackRef, rate_limited: true });
    }

    const referer = request.headers.get('referer') || '';
    let parsedRefererPath = '';
    try {
      if (referer) parsedRefererPath = new URL(referer, 'https://drotto.com.br').pathname;
    } catch {}

    const landing_page = String(body.landing_page || body.page_path || parsedRefererPath || '/').slice(0, 255);
    const page_path = String(body.page_path || landing_page).slice(0, 255);
    const device_type = String(body.device_type || (isMobileUA ? 'mobile' : 'desktop')).slice(0, 32);

    const utm_source = (body.utm_source ? String(body.utm_source) : undefined)?.slice(0, 100);
    const utm_medium = (body.utm_medium ? String(body.utm_medium) : undefined)?.slice(0, 100);
    const utm_campaign = (body.utm_campaign || body.campaign ? String(body.utm_campaign || body.campaign) : undefined)?.slice(0, 100);
    const utm_content = (body.utm_content || body.group || body.adgroup ? String(body.utm_content || body.group || body.adgroup) : undefined)?.slice(0, 100);
    const utm_term = (body.utm_term || body.keyword ? String(body.utm_term || body.keyword) : undefined)?.slice(0, 100);

    const gclid = (body.gclid ? String(body.gclid) : undefined)?.slice(0, 150);
    const gbraid = (body.gbraid ? String(body.gbraid) : undefined)?.slice(0, 150);
    const wbraid = (body.wbraid ? String(body.wbraid) : undefined)?.slice(0, 150);

    const modality = (body.modality ? String(body.modality) : 'particular').slice(0, 32);
    const insurance_note = (body.insurance_name || body.insurance_note ? String(body.insurance_name || body.insurance_note) : undefined)?.slice(0, 150);
    const coverage_vera_cruz = (body.coverage_vera_cruz ? String(body.coverage_vera_cruz) : 'nao_informado').slice(0, 32);
    const is_unimed = Boolean(body.is_unimed);
    const event_name = String(body.event_name || 'click_whatsapp').slice(0, 64);

    let refCode: string;
    try {
      refCode = await createClickSession({
        ref_code: clientRef,
        page_path,
        landing_page,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        gclid,
        gbraid,
        wbraid,
        device_type,
        user_agent: userAgent.slice(0, 255),
        event_name,
        modality,
        insurance_note,
        coverage_vera_cruz,
        is_unimed
      });
    } catch (sessionErr) {
      console.warn('[Click Session Notice] Fallback ref_code generated due to DB exception:', sessionErr);
      refCode = clientRef || generateRefCode();
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


