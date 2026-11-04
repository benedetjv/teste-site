/**
 * Centralized Google Tag Manager (GTM) and GA4 DataLayer Tracking
 * 
 * Strict Compliance:
 * - Exactly one event per user action (no double firing between components and listeners)
 * - Zero PII or sensitive health data:
 *   * Strips name, phone, email, CPF, address, lead_id
 *   * Strips utm_term (search keywords often contain health symptoms)
 *   * Strips insurance, unimed, plan category
 *   * Strips clinical terms (pain, symptoms, diagnosis, anatomy, conditions)
 * - Micro-events (click_whatsapp, click_phone, click_doctoralia, form_start) are secondary analytics events
 * - generate_lead fires ONLY after confirmed 200 HTTP response from server
 */

export interface TrackingParams {
  page_path?: string;
  landing_page?: string;
  cta_name?: string;
  cta_location?: string;
  campaign_type?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  timestamp?: string;
  [key: string]: any;
}

// Strictly blocked keys (PII, sensitive health, lead_id, specific plan or search queries)
const FORBIDDEN_KEYS = new Set([
  'name', 'nome',
  'phone', 'telefone', 'whatsapp', 'celular',
  'email',
  'insurance', 'convenio', 'unimed', 'plan_category', 'plano', 'operadora',
  'reason', 'motivo', 'symptom', 'symptoms', 'sintoma', 'sintomas',
  'diagnosis', 'diagnostico', 'laudo', 'exames', 'regiao_anatomica',
  'city', 'cidade', 'region', 'bairro',
  'lead_id', 'id',
  'cpf', 'rg', 'address', 'endereco',
  // utm_term is explicitly blocked because user search keywords may contain sensitive medical terms
  'utm_term', 'term', 'keyword', 'query'
]);

// Clinical and anatomical terms that must NEVER appear in dataLayer values (supports snake_case, kebab-case, spaces)
const SENSITIVE_CLINICAL_REGEX = /(^|[_ \-\/])(dor|dores|coluna|hernia|ciatico|ciatalgia|joelho|ombro|quadril|artrose|artrite|bursite|tendinite|infiltracao|bloqueio|radiofrequencia|rizotomia|cirurgia|medicamento|remedio|cid|diagnostico|laudo|unimed)(?=[_ \-\/]|$)/gi;

/**
 * Strips all sensitive, clinical, search query, or identifying fields before pushing to dataLayer
 */
export function sanitizeForDataLayer(params: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();

    // 1. Check if key is strictly forbidden
    if (FORBIDDEN_KEYS.has(lowerKey)) {
      continue;
    }

    // 2. Block phone numbers, emails, or numeric identifiers
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.includes('@') || /^\+?[0-9]{8,}/.test(trimmed.replace(/\s/g, ''))) {
        continue;
      }

      // 3. Sanitize sensitive clinical strings in values (e.g. in utm_campaign)
      if (SENSITIVE_CLINICAL_REGEX.test(trimmed)) {
        // Redact clinical terms to preserve privacy
        const sanitizedVal = trimmed.replace(SENSITIVE_CLINICAL_REGEX, '$1health_general');
        clean[key] = sanitizedVal;
        continue;
      }

      if (trimmed !== '') {
        clean[key] = trimmed;
      }
    } else if (value !== undefined && value !== null) {
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
    const trackingKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'gbraid',
      'wbraid'
    ];

    const currentParams: Record<string, string> = {};

    trackingKeys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        currentParams[key] = val;
        sessionStorage.setItem(`drotto_${key}`, val);
      } else {
        const stored = sessionStorage.getItem(`drotto_${key}`);
        if (stored) {
          currentParams[key] = stored;
        }
      }
    });

    return currentParams;
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
 * Central event dispatcher to Google Tag Manager dataLayer
 * Only pushes to window.dataLayer (prevents double firing via gtag)
 * Strictly sanitizes all data before pushing
 */
export function pushDataLayer(eventName: string, params: TrackingParams = {}) {
  if (typeof window === 'undefined') return;

  try {
    const utms = getStoredUtms();
    // Exclude gclid/gbraid/wbraid from frontend dataLayer to minimize fingerprinting
    const safeUtms: Record<string, string> = {};
    if (utms.utm_source) safeUtms.utm_source = utms.utm_source;
    if (utms.utm_medium) safeUtms.utm_medium = utms.utm_medium;
    if (utms.utm_campaign) safeUtms.utm_campaign = utms.utm_campaign;

    const payload: TrackingParams = {
      event: eventName,
      page_path: window.location.pathname,
      landing_page: window.location.pathname,
      timestamp: new Date().toISOString(),
      ...safeUtms,
      ...params
    };

    const sanitized = sanitizeForDataLayer(payload);

    // Push to Google Tag Manager dataLayer only
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(sanitized);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[DataLayer Push] ${eventName}:`, sanitized);
    }
  } catch (err) {
    console.error('[DataLayer Error]', err);
  }
}
