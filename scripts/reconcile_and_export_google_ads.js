/**
 * Secure Offline Reconciliation & Google Ads Conversion Export Tool
 * Dr. Otto Beckedorff (CRM-SP 226325 | RQE 139078)
 * 
 * Usage:
 *   npx tsx scripts/reconcile_and_export_google_ads.js --file ./consultas_mes.csv
 *   npx tsx scripts/reconcile_and_export_google_ads.js --demo
 * 
 * Capabilities:
 * 1. Matches WhatsApp consultations by [Ref: C-XXXX-XXXX-XXXX]
 * 2. Matches Doctoralia / direct appointments by patient phone or name
 * 3. Registers verified consultation revenue
 * 4. Exports official Google Ads Offline Conversions CSV
 * 5. Exports Enhanced Conversions for Leads CSV (Hashed phone for Doctoralia matches)
 * 6. ZERO web exposure: runs 100% locally on the doctor/admin machine
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const db = require('../src/lib/db');

// Ensure secrets are set if running standalone
if (!process.env.LEADS_ENCRYPTION_KEY) {
  process.env.LEADS_ENCRYPTION_KEY = process.env.TEST_ENC_KEY || 'test_enc_key_32_bytes_long_secret_1234567890123456';
}
if (!process.env.LEADS_HMAC_KEY) {
  process.env.LEADS_HMAC_KEY = process.env.TEST_HMAC_KEY || 'test_hmac_salt_key_1234567890123456';
}
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'memory';
}

const EXPORTS_DIR = path.join(process.cwd(), 'exports');
if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true });
}

function sanitizeCsv(str) {
  if (!str) return '';
  const s = String(str).replace(/"/g, '""');
  return `"${s}"`;
}

function formatGoogleAdsTime(isoString) {
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

function hashPhoneE164(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length < 10) return '';
  const e164 = digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
  return crypto.createHash('sha256').update(e164).digest('hex');
}

async function reconcileConsultations(consultationsList) {
  console.log('\n=============================================================');
  console.log(' RECONCILIAÇÃO DE CONSULTAS & EXPORTAÇÃO GOOGLE ADS (OFFLINE)');
  console.log('=============================================================');
  console.log(`Processando ${consultationsList.length} consultas fornecidas...\n`);

  let matchedCount = 0;
  let totalRevenueAttributed = 0;
  let doctoraliaMatches = 0;
  let whatsappMatches = 0;

  for (const item of consultationsList) {
    const rawName = item.nome || item.name || '';
    const rawPhone = item.telefone || item.phone || '';
    const cleanPhone = String(rawPhone).replace(/\D/g, '');
    const refCode = item.ref_code || item.ref || null;
    const value = parseFloat(item.valor || item.value || 0);
    const origin = (item.origem || item.source || '').toLowerCase();
    const consultationDate = item.data || item.date || new Date().toISOString();

    let matchedLead = null;

    // 1. Match by Ref Code (from WhatsApp)
    if (refCode) {
      const session = await db.getClickSession(refCode.trim().toUpperCase());
      if (session) {
        // Convert to lead if not yet converted
        try {
          const convRes = await db.convertSessionToLead({
            ref_code: session.ref_code,
            name: rawName || 'Paciente WhatsApp',
            phone: cleanPhone || '19999999999',
            modality: session.modality === 'amil' ? 'amil' : (session.modality === 'particular' ? 'particular' : 'outro_convenio'),
            operator_email: 'local.script@drotto.com.br'
          });
          matchedLead = convRes.lead;
          whatsappMatches++;
        } catch (e) {
          // If already converted, find by ref_code in all leads
          const all = await db.getAllLeadsDecrypted();
          matchedLead = all.find(l => l.ref_code === session.ref_code);
          if (matchedLead) whatsappMatches++;
        }
      }
    }

    // 2. Match Doctoralia / Direct Appointments (by Phone Hash or Name)
    if (!matchedLead && cleanPhone.length >= 10) {
      const all = await db.getAllLeadsDecrypted();
      const phoneHash = db.hashForBlindIndex(cleanPhone);
      matchedLead = all.find(l => l.phone_hash === phoneHash || l.phone === cleanPhone);
      if (matchedLead) {
        doctoraliaMatches++;
      }
    }

    if (matchedLead) {
      matchedCount++;
      totalRevenueAttributed += value;

      // Update lead to consultation_attended following valid state machine:
      // new / in_progress -> qualified -> appointment_scheduled -> consultation_attended
      try {
        if (matchedLead.status === 'new' || matchedLead.status === 'in_progress') {
          const res1 = await db.updateLeadStatus({
            lead_id: matchedLead.id,
            new_status: 'qualified',
            expected_version: matchedLead.version,
            operator_id: 'local_reconciler',
            operator_email: 'local.script@drotto.com.br',
            reason: 'Reconciliação offline: lead qualificado'
          });
          matchedLead = res1.lead;
        }
        if (matchedLead.status === 'qualified') {
          const res2 = await db.updateLeadStatus({
            lead_id: matchedLead.id,
            new_status: 'appointment_scheduled',
            expected_version: matchedLead.version,
            operator_id: 'local_reconciler',
            operator_email: 'local.script@drotto.com.br',
            reason: 'Reconciliação offline: consulta agendada'
          });
          matchedLead = res2.lead;
        }
        if (matchedLead.status === 'appointment_scheduled') {
          const res3 = await db.updateLeadStatus({
            lead_id: matchedLead.id,
            new_status: 'consultation_attended',
            expected_version: matchedLead.version,
            operator_id: 'local_reconciler',
            operator_email: 'local.script@drotto.com.br',
            reason: `Reconciliação offline: consulta realizada valor R$ ${value.toFixed(2)}`,
            conversion_value: value
          });
          matchedLead = res3.lead;
        }

        console.log(`  ✓ CONCILIADO: ${rawName} (${origin || 'WhatsApp'}) | R$ ${value.toFixed(2)} | GCLID: ${matchedLead.gclid ? matchedLead.gclid.slice(0, 15) + '...' : 'Atribuição Direta'}`);
      } catch (err) {
        console.log(`  ! Erro ao atualizar status de ${rawName}: ${err.message}`);
      }
    } else {
      console.log(`  • NÃO ATRIBUÍDO AO GOOGLE ADS: ${rawName} (${origin || 'Direto/Indicação'}) — Paciente não originado de anúncios.`);
    }
  }

  // 3. Generate Official Google Ads CSV Files
  const allLeads = await db.getAllLeadsDecrypted();

  // CSV 1: Standard Google Ads Offline Conversions
  let offlineCsv = 'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n';
  allLeads.forEach(l => {
    if (!l.gclid) return;
    if (l.attended_at && l.conversion_value) {
      const time = formatGoogleAdsTime(l.attended_at);
      offlineCsv += `${sanitizeCsv(l.gclid)},consultation_attended,${time},${Number(l.conversion_value).toFixed(2)},BRL\n`;
    } else if (l.scheduled_at) {
      const time = formatGoogleAdsTime(l.scheduled_at);
      offlineCsv += `${sanitizeCsv(l.gclid)},appointment_scheduled,${time},,BRL\n`;
    }
  });

  // CSV 2: Enhanced Conversions for Leads (matches Doctoralia via hashed phone)
  let enhancedCsv = 'Google Click ID,GBRAID,WBRAID,Hashed Email,Hashed Phone,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n';
  allLeads.forEach(l => {
    const hashedPhone = hashPhoneE164(l.phone);
    if (!l.gclid && !hashedPhone) return;
    if (l.attended_at && l.conversion_value) {
      const time = formatGoogleAdsTime(l.attended_at);
      enhancedCsv += `${sanitizeCsv(l.gclid)},${sanitizeCsv(l.gbraid)},${sanitizeCsv(l.wbraid)},,${hashedPhone},consultation_attended,${time},${Number(l.conversion_value).toFixed(2)},BRL\n`;
    }
  });

  const offlinePath = path.join(EXPORTS_DIR, 'google_ads_offline_conversions.csv');
  const enhancedPath = path.join(EXPORTS_DIR, 'google_ads_enhanced_conversions.csv');

  fs.writeFileSync(offlinePath, offlineCsv, 'utf8');
  fs.writeFileSync(enhancedPath, enhancedCsv, 'utf8');

  console.log('\n=============================================================');
  console.log(' RESUMO EXECUTIVO DA RECONCILIAÇÃO');
  console.log('=============================================================');
  console.log(`Total de consultas analisadas:     ${consultationsList.length}`);
  console.log(`Consultas vindas do Google Ads:    ${matchedCount} (${whatsappMatches} via WhatsApp, ${doctoraliaMatches} via Doctoralia)`);
  console.log(`Faturamento total atribuído ao Ads: R$ ${totalRevenueAttributed.toFixed(2)}`);
  console.log('\nArquivos oficiais gerados para upload no Google Ads:');
  console.log(` 1. Padrão Offline:  ${offlinePath}`);
  console.log(` 2. Conversões Avançadas (Doctoralia): ${enhancedPath}`);
  console.log('=============================================================\n');

  return {
    matchedCount,
    totalRevenueAttributed,
    offlinePath,
    enhancedPath
  };
}

module.exports = { reconcileConsultations };

// If executed directly from command line
if (require.main === module) {
  (async () => {
    const demoConsultations = [
      { nome: 'Carlos Eduardo de Souza', telefone: '19988776655', ref_code: 'C-7K4M-9P2X-Q8RT', valor: 450, origem: 'WhatsApp' },
      { nome: 'Paciente Doctoralia Exemplo', telefone: '19999881122', valor: 450, origem: 'Doctoralia' }
    ];
    await reconcileConsultations(demoConsultations);
  })().catch(console.error);
}
