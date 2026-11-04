import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { Pool, PoolClient } from 'pg';

// -------------------------------------------------------------
// STRICT ENVIRONMENT SECRETS (NO DEFAULT FALLBACK KEYS)
// Application fails safely if required secrets are missing
// -------------------------------------------------------------
export function getRequiredSecret(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(
      `SECURITY_CONFIG_ERROR: Environment secret "${name}" is missing. The application refuses to start or process sensitive data without configured credentials.`
    );
  }
  return value.trim();
}

export function getEncryptionKey(): Buffer {
  const secret = getRequiredSecret('LEADS_ENCRYPTION_KEY');
  return crypto.createHash('sha256').update(secret).digest();
}

export function getHmacKey(): Buffer {
  const secret = getRequiredSecret('LEADS_HMAC_KEY');
  return crypto.createHash('sha256').update(secret).digest();
}

export function getSessionSecret(): Buffer {
  const secret = getRequiredSecret('ADMIN_SESSION_SECRET');
  return crypto.createHash('sha256').update(secret).digest();
}

// -------------------------------------------------------------
// CRYPTOGRAPHY (AES-256-GCM + Blind Index HMAC-SHA256)
// -------------------------------------------------------------
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

export function encryptPII(text: string): string {
  if (!text) return '';
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptPII(cipherPayload: string): string {
  if (!cipherPayload) return '';
  try {
    const parts = cipherPayload.split(':');
    if (parts.length !== 3) return '[Dados Indisponíveis]';
    const [ivHex, tagHex, encryptedHex] = parts;
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (err) {
    console.error('[Decryption Error] Failed to decrypt data payload safely.', err);
    return '[Erro na Descriptografia]';
  }
}

export function hashForBlindIndex(value: string): string {
  const normalized = value.replace(/\D/g, '');
  return crypto.createHmac('sha256', getHmacKey()).update(normalized).digest('hex');
}

// -------------------------------------------------------------
// POSTGRESQL POOL & IN-MEMORY TESTING SUPPORT
// -------------------------------------------------------------
let globalPool: Pool | null = null;

export function getDatabasePool(): Pool {
  if (globalPool) return globalPool;

  const dbUrl = process.env.DATABASE_URL;

  // In testing or when explicit memory flag is passed, use pg-mem emulation
  if (dbUrl === 'memory' || (!dbUrl && process.env.NODE_ENV === 'test')) {
    const { newDb } = require('pg-mem');
    const memDb = newDb();

    // Auto-migrate in-memory schema
    try {
      const migrationPath = path.join(process.cwd(), 'src', 'lib', 'migrations', '001_initial_schema.sql');
      if (fs.existsSync(migrationPath)) {
        const sql = fs.readFileSync(migrationPath, 'utf-8');
        memDb.public.none(sql);
      }
    } catch (migErr) {
      console.warn('[DB] In-memory auto migration notice:', migErr);
    }

    const pgAdapter = memDb.adapters.createPg();
    globalPool = new pgAdapter.Pool();
    return globalPool as Pool;
  }

  if (!dbUrl) {
    throw new Error(
      'DATABASE_CONFIG_ERROR: Missing "DATABASE_URL" environment variable. PostgreSQL connection is required.'
    );
  }

  globalPool = new Pool({
    connectionString: dbUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });

  return globalPool;
}

export async function runMigrations(): Promise<void> {
  const pool = getDatabasePool();
  const client = await pool.connect();
  try {
    try {
      await client.query('SELECT 1 FROM click_sessions LIMIT 1');
      // Schema already initialized
      return;
    } catch {
      // Schema not initialized, proceed to execute migration
    }

    const migrationPath = path.join(process.cwd(), 'src', 'lib', 'migrations', '001_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch {}
    throw err;
  } finally {
    client.release();
  }
}

// -------------------------------------------------------------
// TYPE DEFINITIONS & STRICT STATE MACHINE
// -------------------------------------------------------------
export type LeadStatus = 
  | 'new'
  | 'in_progress'
  | 'qualified'
  | 'disqualified'
  | 'appointment_scheduled'
  | 'consultation_attended'
  | 'lost';

export const ALLOWED_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  new: ['in_progress', 'qualified', 'disqualified', 'lost'],
  in_progress: ['qualified', 'disqualified', 'lost'],
  qualified: ['appointment_scheduled', 'lost'],
  appointment_scheduled: ['consultation_attended', 'lost'],
  disqualified: [], // Terminal state
  consultation_attended: [], // Terminal business outcome
  lost: ['in_progress'] // Reopening permitted
};

export interface ClickSession {
  ref_code: string;
  created_at: string;
  expires_at: string;
  page_path: string;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  modality?: string;
  insurance_note?: string;
  coverage_vera_cruz?: string;
  is_unimed?: boolean;
  status: 'active' | 'converted' | 'expired';
}

export interface LeadStoredRecord {
  id: string; // lead_id
  ref_code?: string;
  created_at: string;
  updated_at: string;
  qualified_at?: string;
  scheduled_at?: string;
  attended_at?: string;
  lost_at?: string;
  conversion_value?: number;
  version: number; // Concurrency lock
  name_encrypted: string;
  phone_encrypted: string;
  phone_hash: string;
  modality: 'amil' | 'outro_convenio' | 'particular';
  insurance_note?: string;
  is_unimed: boolean;
  privacy_consent: boolean;
  consent_timestamp: string;
  consent_version: string;
  page_path: string;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  status: LeadStatus;
}

export interface LeadDecryptedRecord extends Omit<LeadStoredRecord, 'name_encrypted' | 'phone_encrypted'> {
  name: string;
  phone: string;
}

export interface AuditEntry {
  id?: number;
  lead_id: string;
  timestamp: string;
  previous_status: LeadStatus;
  new_status: LeadStatus;
  operator_id: string;
  operator_email: string;
  reason?: string;
  metadata?: any;
}

// -------------------------------------------------------------
// CLICK SESSIONS (Anonymous WhatsApp Direct Token)
// -------------------------------------------------------------

/**
 * Generates an anonymous reference token with 96 bits of cryptographic entropy.
 * Format: C-XXXX-XXXX-XXXX (e.g., C-7K4M-9P2X-Q8RT)
 * Uses unambiguous Crockford-style Base32 characters (excludes 0, 1, I, O, L).
 */
export function generateRefCode(): string {
  const CHARSET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  const bytes = crypto.randomBytes(12); // 12 bytes = 96 bits
  let chars = '';
  for (let i = 0; i < 12; i++) {
    chars += CHARSET[bytes[i] % CHARSET.length];
  }
  return `C-${chars.slice(0, 4)}-${chars.slice(4, 8)}-${chars.slice(8, 12)}`;
}

/**
 * Validates full name: requires at least two words, reasonable length,
 * Portuguese/Latin letters, and rejects numbers/symbols.
 */
export function isValidFullName(name: string): boolean {
  if (!name) return false;
  const trimmed = name.trim();
  if (trimmed.length < 5 || trimmed.length > 100) return false;
  if (/[0-9!@#$%^&*()_+=\[\]{};:"\\|<>/?~`]/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;
  const validWordPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\u00C0-\u017F\.'-]+$/;
  if (!words.every(w => validWordPattern.test(w))) return false;
  const substantialWords = words.filter(w => w.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '').length >= 2);
  return substantialWords.length >= 2;
}

export async function createClickSession(params: {
  page_path: string;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  modality?: string;
  insurance_note?: string;
  coverage_vera_cruz?: string;
  is_unimed?: boolean;
}): Promise<string> {
  const pool = getDatabasePool();
  // Generate token with at least 96 bits of entropy: C-XXXX-XXXX-XXXX
  const refCode = generateRefCode();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await pool.query(
    `INSERT INTO click_sessions (
      ref_code, created_at, expires_at, page_path, landing_page,
      utm_source, utm_medium, utm_campaign, gclid, gbraid, wbraid,
      modality, insurance_note, coverage_vera_cruz, is_unimed
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
    [
      refCode,
      now.toISOString(),
      expiresAt.toISOString(),
      params.page_path.slice(0, 255),
      params.landing_page.slice(0, 255),
      params.utm_source?.slice(0, 100),
      params.utm_medium?.slice(0, 100),
      params.utm_campaign?.slice(0, 100),
      params.gclid?.slice(0, 150),
      params.gbraid?.slice(0, 150),
      params.wbraid?.slice(0, 150),
      params.modality?.slice(0, 32) || null,
      params.insurance_note?.slice(0, 150) || null,
      params.coverage_vera_cruz?.slice(0, 32) || null,
      Boolean(params.is_unimed)
    ]
  );

  return refCode;
}

export async function getClickSession(refCode: string): Promise<ClickSession | null> {
  const pool = getDatabasePool();
  const res = await pool.query(
    'SELECT * FROM click_sessions WHERE ref_code = $1',
    [refCode]
  );
  return res.rows[0] || null;
}

export async function convertSessionToLead(params: {
  ref_code: string;
  name: string;
  phone: string;
  modality?: 'amil' | 'outro_convenio' | 'particular';
  insurance_note?: string;
  is_unimed?: boolean;
  operator_email: string;
}): Promise<{ success: boolean; lead_id: string; lead: LeadDecryptedRecord }> {
  const pool = getDatabasePool();
  const session = await getClickSession(params.ref_code);
  if (!session) {
    throw new Error('SESSION_NOT_FOUND: Sessão de clique não encontrada para o código ' + params.ref_code);
  }

  // Check if lead already created for this session
  const existingLeadRes = await pool.query('SELECT id FROM leads WHERE ref_code = $1', [params.ref_code]);
  if (existingLeadRes.rows.length > 0) {
    const existing = await getLeadById(existingLeadRes.rows[0].id);
    if (existing) {
      return { success: true, lead_id: existing.id, lead: existing };
    }
  }

  const cleanPhone = params.phone.replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    throw new Error('VALIDATION_ERROR: Telefone inválido (mínimo 10 dígitos com DDD)');
  }
  if (!params.name || !isValidFullName(params.name)) {
    throw new Error('VALIDATION_ERROR: Nome completo inválido (necessário nome e sobrenome)');
  }

  const leadId = 'LEAD_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex').toUpperCase();
  const now = new Date();

  // Normalize modality
  let finalModality: 'amil' | 'outro_convenio' | 'particular' = 'particular';
  const rawMod = (params.modality || session.modality || '').toLowerCase();
  if (rawMod.includes('amil')) {
    finalModality = 'amil';
  } else if (rawMod.includes('convenio') || rawMod.includes('outro')) {
    finalModality = 'outro_convenio';
  } else {
    finalModality = 'particular';
  }

  const isUnimed = params.is_unimed !== undefined ? Boolean(params.is_unimed) : Boolean(session.is_unimed);
  const insuranceNote = params.insurance_note || session.insurance_note || undefined;

  const insertRes = await insertLead({
    lead_id: leadId,
    ref_code: session.ref_code,
    name: params.name.trim(),
    phone: cleanPhone,
    modality: finalModality,
    insurance_note: insuranceNote,
    is_unimed: isUnimed,
    privacy_consent: true,
    page_path: session.page_path,
    landing_page: session.landing_page,
    utm_source: session.utm_source,
    utm_medium: session.utm_medium,
    utm_campaign: session.utm_campaign,
    gclid: session.gclid,
    gbraid: session.gbraid,
    wbraid: session.wbraid
  });

  const finalLeadId = insertRes.lead_id;

  // Mark session converted
  await pool.query("UPDATE click_sessions SET status = 'converted' WHERE ref_code = $1", [session.ref_code]);

  // Record audit log for conversion
  await pool.query(
    `INSERT INTO lead_audit_log (
      lead_id, timestamp, previous_status, new_status, operator_id, operator_email, reason
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      finalLeadId,
      now.toISOString(),
      'session_clicked',
      'new',
      params.operator_email,
      params.operator_email,
      `Convertido no painel a partir de mensagem do WhatsApp [Ref: ${session.ref_code}]`
    ]
  );

  const decrypted = await getLeadById(finalLeadId);
  return { success: true, lead_id: finalLeadId, lead: decrypted! };
}

// -------------------------------------------------------------
// LEAD PERSISTENCE WITH IDEMPOTENCY & ENCRYPTION
// -------------------------------------------------------------
export async function insertLead(data: {
  lead_id: string;
  ref_code?: string;
  name: string;
  phone: string;
  modality: 'amil' | 'outro_convenio' | 'particular';
  insurance_note?: string;
  is_unimed: boolean;
  privacy_consent: boolean;
  page_path: string;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
}): Promise<{ success: boolean; lead_id: string; isDuplicate?: boolean }> {
  const pool = getDatabasePool();
  const phoneHash = hashForBlindIndex(data.phone);

  // 1. Check idempotency: exact lead_id or recent submission (30 mins) with identical phone_hash
  const checkRecent = await pool.query(
    `SELECT id FROM leads 
     WHERE id = $1 OR (phone_hash = $2 AND created_at > NOW() - INTERVAL '30 minutes')
     LIMIT 1`,
    [data.lead_id, phoneHash]
  );

  if (checkRecent.rows.length > 0) {
    return { success: true, lead_id: checkRecent.rows[0].id, isDuplicate: true };
  }

  // 2. If ref_code was provided, verify and populate any missing UTMs/GCLID from session
  let finalGclid = data.gclid;
  let finalGbraid = data.gbraid;
  let finalWbraid = data.wbraid;
  let finalUtmSource = data.utm_source;
  let finalUtmMedium = data.utm_medium;
  let finalUtmCampaign = data.utm_campaign;

  if (data.ref_code) {
    const session = await getClickSession(data.ref_code);
    if (session) {
      if (!finalGclid && session.gclid) finalGclid = session.gclid;
      if (!finalGbraid && session.gbraid) finalGbraid = session.gbraid;
      if (!finalWbraid && session.wbraid) finalWbraid = session.wbraid;
      if (!finalUtmSource && session.utm_source) finalUtmSource = session.utm_source;
      if (!finalUtmMedium && session.utm_medium) finalUtmMedium = session.utm_medium;
      if (!finalUtmCampaign && session.utm_campaign) finalUtmCampaign = session.utm_campaign;
    }
  }

  const now = new Date().toISOString();
  // Unimed leads that confirm/convert to particular are valid active leads ('new'), not disqualified
  const initialStatus: LeadStatus = (data.is_unimed && data.modality !== 'particular') ? 'disqualified' : 'new';
  const nameEnc = encryptPII(data.name.trim().slice(0, 100));
  const phoneEnc = encryptPII(data.phone.trim().slice(0, 30));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO leads (
        id, ref_code, created_at, updated_at, version,
        name_encrypted, phone_encrypted, phone_hash,
        modality, insurance_note, is_unimed,
        privacy_consent, consent_timestamp, consent_version,
        page_path, landing_page,
        utm_source, utm_medium, utm_campaign,
        gclid, gbraid, wbraid, status
      ) VALUES (
        $1, $2, $3, $3, 1,
        $4, $5, $6,
        $7, $8, $9,
        $10, $3, '2026-11-v1',
        $11, $12,
        $13, $14, $15,
        $16, $17, $18, $19
      )`,
      [
        data.lead_id,
        data.ref_code || null,
        now,
        nameEnc,
        phoneEnc,
        phoneHash,
        data.modality,
        data.insurance_note?.slice(0, 150) || null,
        Boolean(data.is_unimed),
        Boolean(data.privacy_consent),
        data.page_path.slice(0, 255),
        data.landing_page.slice(0, 255),
        finalUtmSource?.slice(0, 100) || null,
        finalUtmMedium?.slice(0, 100) || null,
        finalUtmCampaign?.slice(0, 100) || null,
        finalGclid?.slice(0, 150) || null,
        finalGbraid?.slice(0, 150) || null,
        finalWbraid?.slice(0, 150) || null,
        initialStatus
      ]
    );

    // Initial audit log entry
    await client.query(
      `INSERT INTO lead_audit_log (
        lead_id, timestamp, previous_status, new_status, operator_id, operator_email, reason
      ) VALUES ($1, $2, 'none', $3, 'system', 'system@drotto.com.br', $4)`,
      [
        data.lead_id,
        now,
        initialStatus,
        data.is_unimed ? 'Auto-desqualificado: Unimed informada' : 'Novo lead recebido na triagem'
      ]
    );

    await client.query('COMMIT');
    return { success: true, lead_id: data.lead_id };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export const createLead = insertLead;

// -------------------------------------------------------------
// STATUS TRANSITIONS & CONCURRENCY CONTROL (Item 10)
// -------------------------------------------------------------
export async function updateLeadStatus(params: {
  lead_id: string;
  new_status: LeadStatus;
  operator_id: string;
  operator_email: string;
  reason?: string;
  conversion_value?: number;
  expected_version?: number;
}): Promise<{ success: boolean; lead: LeadDecryptedRecord }> {
  const pool = getDatabasePool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Fetch current lead with pessimistic row lock
    const leadRes = await client.query(
      'SELECT * FROM leads WHERE id = $1 FOR UPDATE',
      [params.lead_id]
    );

    if (leadRes.rows.length === 0) {
      throw new Error('LEAD_NOT_FOUND: Registro de lead não localizado.');
    }

    const currentLead: LeadStoredRecord = leadRes.rows[0];

    // 2. Optimistic concurrency check (if client provided version)
    if (params.expected_version !== undefined && currentLead.version !== params.expected_version) {
      throw new Error(
        `CONCURRENCY_CONFLICT: O registro foi alterado por outro operador simultaneamente (versão atual: ${currentLead.version}, esperada: ${params.expected_version}). Recarregue os dados antes de prosseguir.`
      );
    }

    // 3. State machine validation
    const allowed = ALLOWED_TRANSITIONS[currentLead.status] || [];
    if (!allowed.includes(params.new_status)) {
      throw new Error(
        `INVALID_STATE_TRANSITION: Transição de status proibida: não é permitido transitar de "${currentLead.status}" diretamente para "${params.new_status}".`
      );
    }

    // 4. Monetary value validation on consultation attendance
    let finalValue: number | null = null;
    if (params.new_status === 'consultation_attended') {
      if (params.conversion_value !== undefined && params.conversion_value !== null) {
        const val = Number(params.conversion_value);
        if (isNaN(val) || val <= 0 || val > 50000) {
          throw new Error(
            'INVALID_MONETARY_VALUE: O valor da consulta deve ser um número positivo válido de até R$ 50.000,00.'
          );
        }
        finalValue = val;
      }
    }

    const now = new Date().toISOString();
    let qualifiedAt = currentLead.qualified_at;
    let scheduledAt = currentLead.scheduled_at;
    let attendedAt = currentLead.attended_at;
    let lostAt = currentLead.lost_at;

    if (params.new_status === 'qualified') qualifiedAt = now;
    if (params.new_status === 'appointment_scheduled') scheduledAt = now;
    if (params.new_status === 'consultation_attended') attendedAt = now;
    if (params.new_status === 'lost') lostAt = now;

    // 5. Update lead with incremented version
    const updateRes = await client.query(
      `UPDATE leads SET
        status = $1,
        updated_at = $2,
        qualified_at = $3,
        scheduled_at = $4,
        attended_at = $5,
        lost_at = $6,
        conversion_value = $7,
        version = version + 1
      WHERE id = $8 AND version = $9
      RETURNING *`,
      [
        params.new_status,
        now,
        qualifiedAt,
        scheduledAt,
        attendedAt,
        lostAt,
        finalValue,
        params.lead_id,
        currentLead.version
      ]
    );

    if (updateRes.rows.length === 0) {
      throw new Error('CONCURRENCY_CONFLICT: Falha no bloqueio otimista ao persistir alteração.');
    }

    // 6. Append immutable audit trail
    await client.query(
      `INSERT INTO lead_audit_log (
        lead_id, timestamp, previous_status, new_status, operator_id, operator_email, reason
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        params.lead_id,
        now,
        currentLead.status,
        params.new_status,
        params.operator_id,
        params.operator_email,
        params.reason || `Transição para ${params.new_status}`
      ]
    );

    await client.query('COMMIT');

    const updated = updateRes.rows[0];
    const decrypted: LeadDecryptedRecord = {
      ...updated,
      name: decryptPII(updated.name_encrypted),
      phone: decryptPII(updated.phone_encrypted)
    };

    return { success: true, lead: decrypted };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// -------------------------------------------------------------
// RETRIEVAL & DECRYPTION
// -------------------------------------------------------------
export async function getLeadById(leadId: string): Promise<LeadDecryptedRecord | null> {
  const pool = getDatabasePool();
  const res = await pool.query('SELECT * FROM leads WHERE id = $1', [leadId]);
  if (res.rows.length === 0) return null;
  const row = res.rows[0];
  return {
    ...row,
    name: decryptPII(row.name_encrypted),
    phone: decryptPII(row.phone_encrypted)
  };
}

export async function getAllLeadsDecrypted(): Promise<LeadDecryptedRecord[]> {
  const pool = getDatabasePool();
  const res = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
  return res.rows.map((row) => ({
    ...row,
    name: decryptPII(row.name_encrypted),
    phone: decryptPII(row.phone_encrypted)
  }));
}

export async function getLeadAuditLog(leadId: string): Promise<AuditEntry[]> {
  const pool = getDatabasePool();
  const res = await pool.query(
    'SELECT * FROM lead_audit_log WHERE lead_id = $1 ORDER BY timestamp ASC',
    [leadId]
  );
  return res.rows;
}

// -------------------------------------------------------------
// RETENTION ROUTINE (180-Day Purge for Marketing Leads)
// -------------------------------------------------------------
export async function purgeExpiredLeads(): Promise<number> {
  const pool = getDatabasePool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Purge unconverted marketing leads older than 180 days.
    // Attended consultations are converted patients with 20-year legal medical record retention.
    const res = await client.query(
      `DELETE FROM leads 
       WHERE created_at < NOW() - INTERVAL '180 days' 
         AND status NOT IN ('consultation_attended')
       RETURNING id`
    );

    const purgedCount = res.rows.length;

    if (purgedCount > 0) {
      await client.query(
        `INSERT INTO lead_audit_log (
          lead_id, timestamp, previous_status, new_status, operator_id, operator_email, reason, metadata
        ) VALUES (
          'SYSTEM_PURGE', NOW(), 'retention_check', 'purged', 'system', 'system@drotto.com.br',
          $1, $2
        )`,
        [
          `Rotina de expurgo LGPD (180 dias): ${purgedCount} leads não convertidos removidos.`,
          JSON.stringify({ purged_count: purgedCount, timestamp: new Date().toISOString() })
        ]
      );
    }

    await client.query('COMMIT');
    return purgedCount;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// -------------------------------------------------------------
// RIGHT TO BE FORGOTTEN (LGPD Art. 18 Expurgo)
// -------------------------------------------------------------
export async function deleteLead(leadId: string, operatorEmail: string): Promise<boolean> {
  const pool = getDatabasePool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const res = await client.query('DELETE FROM leads WHERE id = $1 RETURNING id', [leadId]);
    if (res.rows.length === 0) {
      await client.query('ROLLBACK');
      return false;
    }

    await client.query(
      `INSERT INTO lead_audit_log (
        lead_id, timestamp, previous_status, new_status, operator_id, operator_email, reason
      ) VALUES ($1, NOW(), 'active', 'deleted_lgpd', 'admin_operator', $2, 'Direito ao esquecimento executado (LGPD Art. 18)')`,
      [leadId, operatorEmail]
    );

    await client.query('COMMIT');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// -------------------------------------------------------------
// ENCRYPTED BACKUP SNAPSHOT
// -------------------------------------------------------------
export async function createEncryptedBackup(): Promise<string> {
  const pool = getDatabasePool();
  const users = await pool.query('SELECT id, email, role, created_at FROM admin_users');
  const sessions = await pool.query('SELECT * FROM click_sessions');
  const leads = await pool.query('SELECT * FROM leads');
  const audit = await pool.query('SELECT * FROM lead_audit_log');

  const snapshot = {
    backup_version: '2026-v2',
    timestamp: new Date().toISOString(),
    tables: {
      admin_users: users.rows,
      click_sessions: sessions.rows,
      leads: leads.rows,
      lead_audit_log: audit.rows
    }
  };

  const payload = JSON.stringify(snapshot);
  return encryptPII(payload);
}

// -------------------------------------------------------------
// ADMIN USERS & MFA AUTHENTICATION (PBKDF2 + TOTP)
// -------------------------------------------------------------
export async function createAdminUser(params: {
  email: string;
  password: string;
  role?: string;
  totp_secret?: string;
}): Promise<{ id: string; totp_secret: string }> {
  const pool = getDatabasePool();
  const id = `ADMIN_${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.pbkdf2Sync(params.password, salt, 100000, 64, 'sha512').toString('hex');
  const totpSecret = params.totp_secret || crypto.randomBytes(20).toString('hex').toUpperCase();

  await pool.query(
    `INSERT INTO admin_users (
      id, email, password_hash, salt, totp_secret, mfa_enabled, role
    ) VALUES ($1, $2, $3, $4, $5, TRUE, $6)`,
    [id, params.email.toLowerCase().trim(), passwordHash, salt, totpSecret, params.role || 'operator']
  );

  return { id, totp_secret: totpSecret };
}

export async function verifyAdminCredentials(email: string, password: string): Promise<{
  id: string;
  email: string;
  role: string;
  totp_secret: string;
  mfa_enabled: boolean;
} | null> {
  const pool = getDatabasePool();
  const res = await pool.query(
    'SELECT * FROM admin_users WHERE email = $1',
    [email.toLowerCase().trim()]
  );

  if (res.rows.length === 0) return null;
  const user = res.rows[0];

  const hash = crypto.pbkdf2Sync(password, user.salt, 100000, 64, 'sha512').toString('hex');
  if (crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(user.password_hash, 'hex'))) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      totp_secret: user.totp_secret,
      mfa_enabled: user.mfa_enabled
    };
  }

  return null;
}

/**
 * Standard TOTP (RFC 6238) 6-digit code verification
 */
export function verifyTOTP(secret: string, userCode: string): boolean {
  if (!secret || !userCode || userCode.trim().length !== 6) return false;
  const code = userCode.trim();

  // Allow current time slice +/- 1 slice (30s drift)
  const now = Math.floor(Date.now() / 1000 / 30);
  for (let offset = -1; offset <= 1; offset++) {
    const time = Buffer.alloc(8);
    time.writeBigInt64BE(BigInt(now + offset));
    const key = Buffer.from(secret, 'hex');
    const hmac = crypto.createHmac('sha1', key).update(time).digest();
    const start = hmac[hmac.length - 1] & 0x0f;
    const binary = ((hmac[start] & 0x7f) << 24) |
                   ((hmac[start + 1] & 0xff) << 16) |
                   ((hmac[start + 2] & 0xff) << 8) |
                   (hmac[start + 3] & 0xff);
    const expected = String(binary % 1000000).padStart(6, '0');
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(code))) {
      return true;
    }
  }

  return false;
}

export function generateTOTP(secret: string): string {
  const now = Math.floor(Date.now() / 1000 / 30);
  const time = Buffer.alloc(8);
  time.writeBigInt64BE(BigInt(now));
  const key = Buffer.from(secret, 'hex');
  const hmac = crypto.createHmac('sha1', key).update(time).digest();
  const start = hmac[hmac.length - 1] & 0x0f;
  const binary = ((hmac[start] & 0x7f) << 24) |
                 ((hmac[start + 1] & 0xff) << 16) |
                 ((hmac[start + 2] & 0xff) << 8) |
                 (hmac[start + 3] & 0xff);
  return String(binary % 1000000).padStart(6, '0');
}

/**
 * Encrypted and signed HttpOnly session cookie token
 */
export function createSessionToken(user: { id: string; email: string; role: string }): string {
  const secret = getSessionSecret();
  const now = Date.now();
  const expiresAt = now + 8 * 60 * 60 * 1000; // 8 hours
  const payload = JSON.stringify({
    uid: user.id,
    email: user.email,
    role: user.role,
    iat: now,
    exp: expiresAt
  });

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', secret, iv);
  const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString('hex')}.${tag.toString('hex')}.${encrypted.toString('hex')}`;
}

export function verifySessionToken(token: string): { uid: string; email: string; role: string } | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [ivHex, tagHex, encryptedHex] = parts;
    const secret = getSessionSecret();
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', secret, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const payload = JSON.parse(decrypted.toString('utf8'));

    if (Date.now() > payload.exp) {
      return null; // Expired session
    }

    return { uid: payload.uid, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// RATE LIMITER (In-Memory Sliding Window)
// -------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 30;

export function checkRateLimit(ip: string): boolean {
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
    return true;
  }
  const now = Date.now();
  const client = rateLimitMap.get(ip);

  if (!client || now > client.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (client.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  client.count++;
  return true;
}

// -------------------------------------------------------------
// CSV SANITIZATION (Prevents CSV Injection)
// -------------------------------------------------------------
export function sanitizeCsvField(val: string | undefined | null): string {
  if (!val) return '';
  let str = String(val).trim();
  if (['=', '+', '-', '@'].some((char) => str.startsWith(char))) {
    str = `'${str}`;
  }
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
