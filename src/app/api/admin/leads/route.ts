import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { 
  getAllLeadsDecrypted, 
  updateLeadStatus, 
  deleteLead, 
  purgeExpiredLeads,
  createEncryptedBackup,
  verifySessionToken,
  sanitizeCsvField,
  LeadStatus,
  LeadDecryptedRecord
} from '@/lib/db';

function authenticateAdminRequest(request: Request): { uid: string; email: string; role: string } | null {
  // 1. Check HttpOnly admin_session cookie
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  if (match) {
    const session = verifySessionToken(match[1]);
    if (session) return session;
  }

  // 2. Check Authorization Bearer (for authorized system/test token)
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const session = verifySessionToken(token);
    if (session) return session;

    // Direct automated test verification using test secret if set
    const testSecret = process.env.ADMIN_TEST_TOKEN;
    if (testSecret && token === testSecret) {
      return { uid: 'TEST_ADMIN', email: 'test.admin@drotto.com.br', role: 'admin' };
    }
  }

  return null;
}

/**
 * Format ISO UTC timestamp to Google Ads Offline Conversion format:
 * "yyyy-MM-dd HH:mm:ss+00:00"
 */
function formatGoogleAdsTime(isoString: string | undefined): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  
  const yyyy = date.getUTCFullYear();
  const MM = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const HH = String(date.getUTCHours()).padStart(2, '0');
  const mm = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}+00:00`;
}

/**
 * SHA-256 hash for Enhanced Conversions for Leads
 */
function hashForEnhancedConversions(val: string | undefined): string {
  if (!val) return '';
  const normalized = val.trim().toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

function hashPhoneE164(phoneDigits: string | undefined): string {
  if (!phoneDigits) return '';
  const digits = phoneDigits.replace(/\D/g, '');
  if (digits.length < 10) return '';
  const e164 = digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
  return crypto.createHash('sha256').update(e164).digest('hex');
}

export async function GET(request: Request) {
  const operator = authenticateAdminRequest(request);
  if (!operator) {
    return NextResponse.json({ error: 'Acesso não autorizado. Sessão administrativa inválida ou expirada.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const action = searchParams.get('action');

    // Action: Encrypted Backup Export
    if (action === 'backup') {
      const backupEncrypted = await createEncryptedBackup();
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        backup_payload: backupEncrypted
      });
    }

    const leads = await getAllLeadsDecrypted();

    // 1. Google Ads Standard Offline Conversions CSV
    if (format === 'google_ads_csv') {
      let csv = 'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n';
      
      leads.forEach((l) => {
        if (!l.gclid) return;

        // qualify_lead (Value empty)
        if (l.qualified_at) {
          const time = formatGoogleAdsTime(l.qualified_at);
          csv += `${sanitizeCsvField(l.gclid)},qualify_lead,${time},,BRL\n`;
        }

        // appointment_scheduled (Value empty)
        if (l.scheduled_at) {
          const time = formatGoogleAdsTime(l.scheduled_at);
          csv += `${sanitizeCsvField(l.gclid)},appointment_scheduled,${time},,BRL\n`;
        }

        // consultation_attended (Verified revenue logged upon attendance)
        if (l.attended_at) {
          const time = formatGoogleAdsTime(l.attended_at);
          const val = l.conversion_value !== undefined && l.conversion_value !== null ? Number(l.conversion_value).toFixed(2) : '';
          csv += `${sanitizeCsvField(l.gclid)},consultation_attended,${time},${val},BRL\n`;
        }
      });

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="google_ads_offline_conversions.csv"',
          'Cache-Control': 'no-store, max-age=0'
        }
      });
    }

    // 2. Google Ads Data Manager / Enhanced Conversions for Leads CSV
    if (format === 'enhanced_conversions_csv') {
      let csv = 'Google Click ID,GBRAID,WBRAID,Hashed Email,Hashed Phone,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n';

      leads.forEach((l) => {
        const hashedPhone = hashPhoneE164(l.phone);

        // qualify_lead
        if (l.qualified_at) {
          const time = formatGoogleAdsTime(l.qualified_at);
          csv += `${sanitizeCsvField(l.gclid)},${sanitizeCsvField(l.gbraid)},${sanitizeCsvField(l.wbraid)},,${hashedPhone},qualify_lead,${time},,BRL\n`;
        }

        // appointment_scheduled
        if (l.scheduled_at) {
          const time = formatGoogleAdsTime(l.scheduled_at);
          csv += `${sanitizeCsvField(l.gclid)},${sanitizeCsvField(l.gbraid)},${sanitizeCsvField(l.wbraid)},,${hashedPhone},appointment_scheduled,${time},,BRL\n`;
        }

        // consultation_attended
        if (l.attended_at) {
          const time = formatGoogleAdsTime(l.attended_at);
          const val = l.conversion_value !== undefined && l.conversion_value !== null ? Number(l.conversion_value).toFixed(2) : '';
          csv += `${sanitizeCsvField(l.gclid)},${sanitizeCsvField(l.gbraid)},${sanitizeCsvField(l.wbraid)},,${hashedPhone},consultation_attended,${time},${val},BRL\n`;
        }
      });

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="google_ads_enhanced_conversions.csv"',
          'Cache-Control': 'no-store, max-age=0'
        }
      });
    }

    return NextResponse.json({
      total: leads.length,
      operator: { email: operator.email, role: operator.role },
      leads
    });
  } catch (err: any) {
    console.error('[Admin Leads GET Error]', err);
    return NextResponse.json({ error: 'Erro ao consultar leads.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const operator = authenticateAdminRequest(request);
  if (!operator) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // 180-Day Retention Purge Routine
    if (action === 'purge_retention') {
      const purgedCount = await purgeExpiredLeads();
      return NextResponse.json({
        success: true,
        purged_count: purgedCount,
        message: `Rotina de expurgo concluída: ${purgedCount} registros não convertidos expirados foram removidos.`
      });
    }

    return NextResponse.json({ error: 'Ação não reconhecida.' }, { status: 400 });
  } catch (err: any) {
    console.error('[Admin Leads POST Error]', err);
    return NextResponse.json({ error: 'Erro ao executar ação administrativa.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const operator = authenticateAdminRequest(request);
  if (!operator) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Corpo da requisição inválido.' }, { status: 400 });
    }

    const { lead_id, status, reason, conversion_value, expected_version } = body;

    if (!lead_id || !status) {
      return NextResponse.json({ error: 'lead_id e status são obrigatórios.' }, { status: 400 });
    }

    const result = await updateLeadStatus({
      lead_id,
      new_status: status as LeadStatus,
      operator_id: operator.uid,
      operator_email: operator.email,
      reason,
      conversion_value: conversion_value !== undefined ? Number(conversion_value) : undefined,
      expected_version: expected_version !== undefined ? Number(expected_version) : undefined
    });

    return NextResponse.json({
      success: true,
      lead_id,
      new_status: status,
      lead: result.lead
    });
  } catch (err: any) {
    const message = err.message || '';
    if (message.startsWith('INVALID_STATE_TRANSITION') || message.startsWith('INVALID_MONETARY_VALUE')) {
      return NextResponse.json({ error: message }, { status: 422 });
    }
    if (message.startsWith('CONCURRENCY_CONFLICT')) {
      return NextResponse.json({ error: message }, { status: 409 });
    }
    if (message.startsWith('LEAD_NOT_FOUND')) {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    console.error('[Admin Leads PATCH Error]', err);
    return NextResponse.json({ error: 'Erro ao atualizar status do lead.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const operator = authenticateAdminRequest(request);
  if (!operator) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const lead_id = searchParams.get('lead_id');

    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id é obrigatório.' }, { status: 400 });
    }

    const deleted = await deleteLead(lead_id, operator.email);
    if (!deleted) {
      return NextResponse.json({ error: 'Lead não encontrado para exclusão.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Registro excluído com sucesso nos termos do Art. 18 da LGPD.' });
  } catch (err: any) {
    console.error('[Admin Leads DELETE Error]', err);
    return NextResponse.json({ error: 'Erro ao excluir registro.' }, { status: 500 });
  }
}
