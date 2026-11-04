import { NextResponse } from 'next/server';
import { createLead, checkRateLimit } from '@/lib/db';
import crypto from 'crypto';

// Only POST is permitted. GET is explicitly blocked to protect all patient data.
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido. O acesso a registros de triagem é restrito e autenticado.' },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  try {
    // 1. IP extraction & Rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Muitas solicitações em curto intervalo. Aguarde alguns minutos antes de tentar novamente.' },
        { status: 429 }
      );
    }

    // 2. Body parsing and schema validation
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Formato de requisição inválido.' }, { status: 400 });
    }

    const {
      name,
      phone,
      modality,
      insurance_note,
      privacy_consent,
      page_path,
      landing_page,
      ref_code,
      utm_source,
      utm_medium,
      utm_campaign,
      gclid,
      gbraid,
      wbraid
    } = body;

    // Strict validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ error: 'Por favor, informe seu nome completo (entre 2 e 100 caracteres).' }, { status: 400 });
    }

    const cleanPhoneDigits = String(phone || '').replace(/\D/g, '');
    if (cleanPhoneDigits.length < 10 || cleanPhoneDigits.length > 13) {
      return NextResponse.json({ error: 'Por favor, informe um número de telefone com DDD válido.' }, { status: 400 });
    }

    if (privacy_consent !== true) {
      return NextResponse.json(
        { error: 'É necessário concordar com a Política de Privacidade para prosseguir com a triagem.' },
        { status: 400 }
      );
    }

    // Validate modality
    const validModalities = ['amil', 'outro_convenio', 'particular'];
    const chosenModality = validModalities.includes(modality) ? modality : 'particular';

    // Unimed detection
    const noteText = String(insurance_note || '').toLowerCase();
    const isUnimed = noteText.includes('unimed');

    // Generate secure server-validated lead_id
    const serverLeadId = `LEAD_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // 3. Persist encrypted in PostgreSQL database layer
    const result = await createLead({
      lead_id: serverLeadId,
      ref_code: ref_code ? String(ref_code).trim().slice(0, 32) : undefined,
      name: name.replace(/<[^>]*>?/gm, '').trim(),
      phone: cleanPhoneDigits,
      modality: chosenModality as any,
      insurance_note: isUnimed ? 'Unimed informada' : String(insurance_note || '').replace(/<[^>]*>?/gm, '').slice(0, 150),
      is_unimed: isUnimed,
      privacy_consent: true,
      page_path: String(page_path || '/').slice(0, 200),
      landing_page: String(landing_page || '/').slice(0, 200),
      utm_source: utm_source ? String(utm_source).slice(0, 80) : undefined,
      utm_medium: utm_medium ? String(utm_medium).slice(0, 80) : undefined,
      utm_campaign: utm_campaign ? String(utm_campaign).slice(0, 80) : undefined,
      gclid: gclid ? String(gclid).slice(0, 120) : undefined,
      gbraid: gbraid ? String(gbraid).slice(0, 120) : undefined,
      wbraid: wbraid ? String(wbraid).slice(0, 120) : undefined
    });

    // 4. Return clean response with safe WhatsApp URL (NO personal or clinical data in URL)
    const refSuffix = ref_code ? ` [Ref: ${ref_code}]` : '';
    const cleanWhatsappUrl = `https://wa.me/5519999439824?text=${encodeURIComponent(
      `Olá! Vim pelo Google e gostaria de solicitar uma consulta em Campinas.${refSuffix}`
    )}`;

    return NextResponse.json({
      success: true,
      lead_id: result.lead_id,
      is_duplicate: result.isDuplicate || false,
      is_unimed: isUnimed,
      whatsapp_url: cleanWhatsappUrl
    });
  } catch (err: any) {
    console.error('[API Leads Error]', err);
    return NextResponse.json({ error: 'Não foi possível processar a solicitação no momento.' }, { status: 500 });
  }
}
