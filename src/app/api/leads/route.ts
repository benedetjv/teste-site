import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface LeadRecord {
  lead_id: string;
  created_at: string;
  name: string;
  phone: string;
  modality: 'particular' | 'convenio' | string;
  insurance: string;
  region: string;
  reason: string;
  contact_preference: 'whatsapp' | 'phone' | string;
  privacy_accepted: boolean;
  page_path: string;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  status: 'new' | 'in_progress' | 'qualified' | 'disqualified_unimed' | 'disqualified_other' | 'appointment_scheduled' | 'consultation_attended' | 'lost';
  disqualification_reason?: string;
  notes?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readLeads(): LeadRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLeads(leads: LeadRecord[]) {
  ensureDataFile();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lead_id,
      name,
      phone,
      modality,
      insurance,
      region,
      reason,
      contact_preference,
      privacy_accepted,
      page_path,
      landing_page,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
      gbraid,
      wbraid
    } = body;

    // Basic validation
    if (!name || !phone || !privacy_accepted) {
      return NextResponse.json(
        { error: 'Campos obrigatórios incompletos ou consentimento não informado.' },
        { status: 400 }
      );
    }

    const currentLeads = readLeads();

    // Prevent duplicate re-submission
    const existing = currentLeads.find((l) => l.lead_id === lead_id);
    if (existing) {
      return NextResponse.json({
        success: true,
        lead_id: existing.lead_id,
        status: existing.status,
        already_registered: true
      });
    }

    const isUnimed = (insurance || '').toLowerCase().includes('unimed');

    const status: LeadRecord['status'] = isUnimed ? 'disqualified_unimed' : 'new';
    const disqualification_reason = isUnimed ? 'unimed' : undefined;

    const newRecord: LeadRecord = {
      lead_id: lead_id || `LEAD_${Date.now()}`,
      created_at: new Date().toISOString(),
      name: String(name).trim().slice(0, 100),
      phone: String(phone).trim().slice(0, 30),
      modality: modality || 'particular',
      insurance: insurance || 'Particular',
      region: region || 'Campinas',
      reason: reason || 'Coluna',
      contact_preference: contact_preference || 'whatsapp',
      privacy_accepted: Boolean(privacy_accepted),
      page_path: page_path || '/',
      landing_page: landing_page || '/',
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
      utm_term: utm_term || undefined,
      utm_content: utm_content || undefined,
      gclid: gclid || undefined,
      gbraid: gbraid || undefined,
      wbraid: wbraid || undefined,
      status,
      disqualification_reason
    };

    currentLeads.push(newRecord);
    saveLeads(currentLeads);

    // Clean, non-sensitive WhatsApp URL
    const cleanWhatsappUrl = `https://wa.me/5519999439824?text=${encodeURIComponent(
      'Olá! Vim pelo site e gostaria de verificar informações sobre atendimento em Campinas.'
    )}`;

    return NextResponse.json({
      success: true,
      lead_id: newRecord.lead_id,
      status: newRecord.status,
      disqualified: isUnimed,
      disqualification_reason,
      whatsapp_url: cleanWhatsappUrl
    });
  } catch (err: any) {
    console.error('Error in /api/leads:', err);
    return NextResponse.json({ error: 'Erro interno ao processar lead.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const leads = readLeads();

    if (format === 'google_ads_csv') {
      // Format according to Google Ads Offline Conversions Template
      // Required headers: Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
      let csv = 'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n';
      
      leads
        .filter((l) => l.gclid && (l.status === 'qualified' || l.status === 'appointment_scheduled' || l.status === 'consultation_attended'))
        .forEach((l) => {
          const conversionName = l.status === 'consultation_attended' 
            ? 'consultation_attended' 
            : l.status === 'appointment_scheduled' 
            ? 'appointment_scheduled' 
            : 'qualify_lead';
            
          const conversionTime = new Date(l.created_at)
            .toISOString()
            .replace('T', ' ')
            .replace(/\..+/, ' -0300'); // Brazilian timezone approx
          csv += `${l.gclid},${conversionName},${conversionTime},1.0,BRL\n`;
        });

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="google_ads_offline_conversions.csv"'
        }
      });
    }

    return NextResponse.json({
      total: leads.length,
      leads: leads.map(l => ({
        lead_id: l.lead_id,
        created_at: l.created_at,
        modality: l.modality,
        insurance: l.insurance,
        region: l.region,
        status: l.status,
        gclid: l.gclid ? 'Present' : 'None',
        utm_source: l.utm_source,
        utm_campaign: l.utm_campaign
      }))
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
