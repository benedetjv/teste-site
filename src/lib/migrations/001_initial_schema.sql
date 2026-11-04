-- Migration 001: Initial PostgreSQL Schema for Dr. Otto Beckedorff Landing Pages
-- Concurrency control, encrypted PII, audit trails, click sessions, and admin users

CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  salt VARCHAR(64) NOT NULL,
  totp_secret VARCHAR(64) NOT NULL,
  mfa_enabled BOOLEAN DEFAULT TRUE,
  role VARCHAR(32) DEFAULT 'operator',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS click_sessions (
  ref_code VARCHAR(32) PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  page_path VARCHAR(255) NOT NULL,
  landing_page VARCHAR(255) NOT NULL,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  gclid VARCHAR(150),
  gbraid VARCHAR(150),
  wbraid VARCHAR(150),
  status VARCHAR(32) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(64) PRIMARY KEY,
  ref_code VARCHAR(32) REFERENCES click_sessions(ref_code) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  qualified_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  attended_at TIMESTAMPTZ,
  lost_at TIMESTAMPTZ,
  conversion_value NUMERIC(10, 2),
  version INT DEFAULT 1,
  
  -- Encrypted PII (AES-256-GCM iv:tag:ciphertext)
  name_encrypted TEXT NOT NULL,
  phone_encrypted TEXT NOT NULL,
  phone_hash VARCHAR(64) NOT NULL,
  
  modality VARCHAR(32) NOT NULL,
  insurance_note VARCHAR(150),
  is_unimed BOOLEAN DEFAULT FALSE,
  privacy_consent BOOLEAN NOT NULL DEFAULT TRUE,
  consent_timestamp TIMESTAMPTZ NOT NULL,
  consent_version VARCHAR(32) NOT NULL,
  
  page_path VARCHAR(255) NOT NULL,
  landing_page VARCHAR(255) NOT NULL,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  gclid VARCHAR(150),
  gbraid VARCHAR(150),
  wbraid VARCHAR(150),
  
  status VARCHAR(32) NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_leads_phone_hash ON leads (phone_hash);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_ref_code ON leads (ref_code);

CREATE TABLE IF NOT EXISTS lead_audit_log (
  id SERIAL PRIMARY KEY,
  lead_id VARCHAR(64) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  previous_status VARCHAR(32) NOT NULL,
  new_status VARCHAR(32) NOT NULL,
  operator_id VARCHAR(64) NOT NULL,
  operator_email VARCHAR(255) NOT NULL,
  reason TEXT,
  metadata TEXT
);

CREATE INDEX IF NOT EXISTS idx_audit_lead_id ON lead_audit_log (lead_id);

