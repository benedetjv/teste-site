/**
 * Centralized Tracking Library for Google Tag Manager (GTM), GA4, and Google Ads
 * 
 * Rules:
 * - Pushes non-sensitive data to window.dataLayer
 * - Never pushes PII (name, phone, email) or sensitive health details (symptoms, diagnoses)
 * - Persists and captures UTMs and Click IDs (gclid, gbraid, wbraid) throughout the session
 */

export interface TrackingParams {
  lead_id?: string;
  page_path?: string;
  landing_page?: string;
  cta_name?: string;
  cta_location?: string;
  campaign_type?: string;
  plan_category?: string;
  region?: string;
  contact_preference?: string;
  disqualification_reason?: string;
  phone_number?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  timestamp?: string;
  [key: string]: any;
}

const PII_KEYS = [
  'name', 'nome',
  'phone', 'telefone', 'whatsapp', 'celular',
  'email',
  'symptom', 'symptoms', 'sintomas',
  'diagnosis', 'diagnostico', 'laudo', 'exames',
  'cpf', 'rg', 'address', 'endereco'
];

/**
 * Strips PII and sensitive health information from event payloads before sending to dataLayer/GA4
 */
function sanitizeParams(params: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();
    if (PII_KEYS.includes(lowerKey)) {
      continue; // Skip any sensitive field
    }
    if (value !== undefined && value !== null && value !== '') {
      clean[key] = value;
    }
  }
  return clean;
}

/**
 * Initializes and captures UTM parameters and Click IDs from current URL into sessionStorage
 */
export function initUtmCapture(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'gbraid',
      'wbraid'
    ];

    const currentUtms: Record<string, string> = {};

    utmKeys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        currentUtms[key] = val;
        sessionStorage.setItem(`drotto_${key}`, val);
      } else {
        const stored = sessionStorage.getItem(`drotto_${key}`);
        if (stored) {
          currentUtms[key] = stored;
        }
      }
    });

    return currentUtms;
  } catch {
    return {};
  }
}

/**
 * Returns currently stored UTM parameters and Click IDs
 */
export function getStoredUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const keys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'gbraid',
      'wbraid'
    ];

    const result: Record<string, string> = {};
    keys.forEach((k) => {
      const val = sessionStorage.getItem(`drotto_${k}`);
      if (val) result[k] = val;
    });

    return result;
  } catch {
    return {};
  }
}

/**
 * Generates an immutable, unique lead_id for the session
 */
export function generateLeadId(): string {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LEAD_${dateStr}_${randomStr}`;
}

/**
 * Central event dispatcher to Google Tag Manager dataLayer and gtag
 */
export function pushDataLayer(eventName: string, params: TrackingParams = {}) {
  if (typeof window === 'undefined') return;

  try {
    const utms = getStoredUtms();
    const payload: TrackingParams = {
      event: eventName,
      page_path: window.location.pathname,
      landing_page: window.location.pathname,
      timestamp: new Date().toISOString(),
      ...utms,
      ...params
    };

    const sanitized = sanitizeParams(payload);

    // Push to Google Tag Manager dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(sanitized);

    // Also mirror to gtag if present
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, {
        ...sanitized,
        transport_type: 'beacon'
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Tracking] Event: ${eventName}`, sanitized);
    }
  } catch (err) {
    console.error('[Tracking Error]', err);
  }
}
