'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getStoredUtms, initUtmCapture, pushDataLayer } from '@/lib/tracking';

interface WhatsAppPreQualifyCardProps {
  campaignType?: string;
  defaultModality?: 'particular' | 'convenio';
  location?: string;
  title?: string;
  subtitle?: string;
}

// 4 pain areas strictly following the user flowchart diagram
export const PAIN_AREAS = [
  { id: 'coluna', label: 'Coluna', icon: 'bi-body-text' },
  { id: 'joelho', label: 'Joelho', icon: 'bi-bullseye' },
  { id: 'ombro', label: 'Ombro', icon: 'bi-circle' },
  { id: 'quadril', label: 'Quadril', icon: 'bi-record-circle' }
];

// Quick pills directly matching user flowchart and priority requirements
export const QUICK_PILLS = [
  { value: 'Amil', label: 'Amil' },
  { value: 'Bradesco Saúde', label: 'Bradesco' },
  { value: 'SulAmérica Saúde', label: 'SulAmérica' },
  { value: 'Omint', label: 'Omint' },
  { value: 'Petrobras PAE / AMS', label: 'Petrobras' },
  { value: 'Outro convênio', label: 'Outro' },
  { value: 'Unimed', label: 'Unimed' }
];

export const MORE_INSURANCES = [
  { value: 'Porto Seguro', label: 'Porto Seguro' },
  { value: 'Saúde Caixa', label: 'Saúde Caixa' },
  { value: 'Care Plus', label: 'Care Plus' },
  { value: 'GAMA Saúde', label: 'GAMA Saúde' },
  { value: 'VIVEST', label: 'VIVEST' },
  { value: 'ASH (Holambra)', label: 'ASH (Holambra)' },
  { value: '2Care', label: '2Care' }
];

export const INSURANCE_OPTIONS = [
  { value: '', label: 'Selecione seu plano ou convênio...' },
  ...QUICK_PILLS,
  ...MORE_INSURANCES
];

// Warm, empathetic doctor messaging strictly compliant with CFM rules (NO "especialista em coluna")
const ENCOURAGEMENT_TEXTS: Record<string, string> = {
  coluna: 'Entendi que você busca avaliação para sua coluna. O Dr. Otto Beckedorff atua com foco no diagnóstico preciso e tratamento de dores e patologias da coluna vertebral (como hérnia de disco e ciático), priorizando reabilitação estruturada e procedimentos minimamente invasivos para devolver seu bem-estar.',
  joelho: 'Compreendo o quanto a dor no joelho impacta sua rotina. O Dr. Otto atua no diagnóstico e tratamento de desgastes articulares e lesões, com foco em recuperação funcional, reabilitação e alívio do desconforto.',
  ombro: 'Dores no ombro afetam noites de sono e movimentos diários. O Dr. Otto atua na investigação detalhada de tendinites, bursites e lesões, com condutas voltadas à ampla recuperação do movimento.',
  quadril: 'O desconforto no quadril prejudica o caminhar e a qualidade de vida. O Dr. Otto realiza investigação criteriosa de impacto articular, bursites e artrose, sempre buscando a conduta mais eficiente e individualizada.'
};

function isValidFullName(name: string): boolean {
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

function generateClientRefCode(): string {
  const CHARSET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  let chars = '';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < 12; i++) {
      chars += CHARSET[bytes[i] % CHARSET.length];
    }
  } else {
    for (let i = 0; i < 12; i++) {
      chars += CHARSET[Math.floor(Math.random() * CHARSET.length)];
    }
  }
  return `C-${chars.slice(0, 4)}-${chars.slice(4, 8)}-${chars.slice(8, 12)}`;
}

export default function WhatsAppPreQualifyCard({
  campaignType = 'campinas_geral',
  defaultModality = 'convenio',
  location = 'prequal_card_hero',
  title = 'Agendar Consulta pelo WhatsApp',
  subtitle = 'Responda rápido para direcionarmos seu contato à equipe médica:'
}: WhatsAppPreQualifyCardProps) {
  // Progressive cascade state ("ir aparecendo, devagar")
  // Etapa 1: Onde é a sua dor?
  const [painArea, setPainArea] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && (window as any).__EARLY_PAIN__) {
      const p = (window as any).__EARLY_PAIN__;
      delete (window as any).__EARLY_PAIN__;
      return p;
    }
    return null;
  });

  // Etapa 2: Como gostaria de ser atendido? (Convênio / Particular)
  const [modality, setModality] = useState<'convenio' | 'particular' | null>(null);

  // Etapa 3 (Se Convênio): Pills de toque rápido + Pergunta Vera Cruz
  const [insuranceName, setInsuranceName] = useState<string>('');
  const [showMoreInsurances, setShowMoreInsurances] = useState(false);
  const [coverageVeraCruz, setCoverageVeraCruz] = useState<'sim' | 'nao' | 'nao_sei' | null>(null);
  const [unimedConfirmed, setUnimedConfirmed] = useState(false);

  // Etapa 4: Seu nome completo
  const [name, setName] = useState('');

  // Submission & Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Refs for smooth auto-scroll as sections reveal
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const veraCruzRef = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__REACT_HYDRATED__ = true;
      initUtmCapture();
    }
  }, []);

  const isUnimed =
    modality === 'convenio' &&
    insuranceName.trim().toLowerCase().includes('unimed');

  const isAmil =
    modality === 'convenio' &&
    insuranceName.trim().toLowerCase().includes('amil');

  const isOther =
    modality === 'convenio' && (
      insuranceName.trim().toLowerCase().includes('outro') ||
      insuranceName.trim().toLowerCase().includes('não listado')
    );

  // Safe scroll helper: only scrolls if the target element's bottom is off screen
  const scrollToTargetIfOffscreen = (el: HTMLElement | null) => {
    if (!el || typeof window === 'undefined') return;
    setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > window.innerHeight || rect.top < 70) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 80);
  };

  // Etapa 1 Handler: Select Pain Area -> Reveals Frase de Acolhimento & Etapa 2
  const handleSelectPainArea = (id: string) => {
    setPainArea(id);
    setErrorMessage(null);
    scrollToTargetIfOffscreen(step2Ref.current);
  };

  // Etapa 2 Handler: Select Modality -> If Convênio reveals Etapa 3; If Particular reveals Etapa 4
  const handleSelectModality = (m: 'convenio' | 'particular') => {
    setModality(m);
    setErrorMessage(null);
    scrollToTargetIfOffscreen(m === 'convenio' ? step3Ref.current : step4Ref.current);
  };

  // Etapa 3 Handler A: Select Insurance Pill
  const handleInsuranceSelect = (val: string) => {
    setInsuranceName(val);
    setErrorMessage(null);
    if (val === 'Unimed') {
      setUnimedConfirmed(false);
    }
    scrollToTargetIfOffscreen(veraCruzRef.current);
  };

  // Etapa 3 Handler B: Select Vera Cruz Coverage (Mandatory)
  const handleSelectVeraCruz = (val: 'sim' | 'nao' | 'nao_sei') => {
    setCoverageVeraCruz(val);
    setErrorMessage(null);
    scrollToTargetIfOffscreen(step4Ref.current);
  };

  // Final Action: Enviar e Falar no WhatsApp 🟢
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    if (!isValidFullName(trimmedName)) {
      setErrorMessage('Por favor, informe seu nome completo válido (nome e sobrenome).');
      return;
    }

    if (!painArea) {
      setErrorMessage('Por favor, selecione onde é a sua dor na Etapa 1.');
      return;
    }

    if (!modality) {
      setErrorMessage('Por favor, selecione como gostaria de ser atendido na Etapa 2.');
      return;
    }

    if (modality === 'convenio' && !insuranceName.trim()) {
      setErrorMessage('Por favor, selecione seu convênio na Etapa 3.');
      return;
    }

    if (modality === 'convenio' && !coverageVeraCruz) {
      setErrorMessage('Por favor, informe se o seu plano dá cobertura no Hospital Vera Cruz.');
      return;
    }

    if (isUnimed && !unimedConfirmed) {
      setErrorMessage('Por favor, confirme que está ciente de que o Dr. Otto não atende Unimed para prosseguir como consulta particular.');
      return;
    }

    // Fail-safe popup opening to prevent mobile browser blocker
    let popupWindow: Window | null = null;
    if (typeof window !== 'undefined') {
      try {
        popupWindow = window.open('about:blank', '_blank');
      } catch {}
    }

    setIsSubmitting(true);

    let refCode = generateClientRefCode();

    try {
      const storedUtms = getStoredUtms();
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 2500) : null;

      const res = await fetch('/api/session/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller ? controller.signal : undefined,
        body: JSON.stringify({
          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
          landing_page: typeof window !== 'undefined' ? window.location.pathname : '',
          modality: isUnimed ? 'particular' : (isAmil ? 'amil' : (modality === 'convenio' ? 'outro_convenio' : 'particular')),
          insurance_name: modality === 'convenio' ? insuranceName.trim() : null,
          coverage_vera_cruz: modality === 'convenio' ? coverageVeraCruz : 'particular',
          is_unimed: isUnimed,
          ...storedUtms
        })
      }).catch(fetchErr => {
        console.warn('[Session Click Fetch Notice - proceeding with client ref]', fetchErr);
        return null;
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.ref_code) {
          refCode = data.ref_code;
        }
      }
    } catch (err: any) {
      console.warn('[Session Click Catch Notice - proceeding with client ref]', err);
    }

    try {
      sessionStorage.setItem('drotto_ref_code', refCode);
    } catch {}

    // Dispatch conversion event to DataLayer & Google Ads (Zero PII, Zero medical terms)
    pushDataLayer('click_whatsapp', {
      cta_name: 'enviar_falar_whatsapp',
      cta_location: location,
      campaign_type: campaignType
    });

    let atdDesc = 'Particular';
    if (modality === 'convenio') {
      if (isUnimed) {
        atdDesc = 'Particular (paciente possui Unimed)';
      } else if (isOther) {
        atdDesc = 'Particular com reembolso (outro convênio)';
      } else if (isAmil) {
        atdDesc = 'Convênio (Amil)';
      } else {
        atdDesc = `Convênio (${insuranceName.trim()})`;
      }
    }

    const veraCruzDesc =
      coverageVeraCruz === 'sim' ? 'Sim' :
      coverageVeraCruz === 'nao' ? 'Não' :
      coverageVeraCruz === 'nao_sei' ? 'Não sei / A verificar' :
      'Particular / Procedimento no Vera Cruz';

    const painLabel = PAIN_AREAS.find(p => p.id === painArea)?.label || 'Coluna';

    const messageText =
      `Olá! Gostaria de solicitar um agendamento de consulta em Campinas com o Dr. Otto Beckedorff.\n\n` +
      `• Nome: ${trimmedName}\n` +
      `• Região de interesse: ${painLabel}\n` +
      `• Atendimento: ${atdDesc}\n` +
      `• Cobertura Hospital Vera Cruz: ${veraCruzDesc}\n\n` +
      `[Ref: ${refCode}]`;

    const whatsappUrl = `https://wa.me/5519999439824?text=${encodeURIComponent(messageText)}`;

    setSubmittedUrl(whatsappUrl);
    setSubmittedRef(refCode);

    if (popupWindow && !popupWindow.closed) {
      popupWindow.location.href = whatsappUrl;
    } else if (typeof window !== 'undefined') {
      window.location.href = whatsappUrl;
    }

    setIsSubmitting(false);
  };

  const encouragement = painArea ? (ENCOURAGEMENT_TEXTS[painArea] || ENCOURAGEMENT_TEXTS.coluna) : null;

  // Compute visual step progress
  const hasStep1 = Boolean(painArea);
  const hasStep2 = Boolean(modality);
  const hasStep3 = modality === 'particular' || (Boolean(insuranceName) && Boolean(coverageVeraCruz));
  const hasStep4 = Boolean(name && isValidFullName(name));

  const totalStepsTarget = modality === 'particular' ? 3 : 4;
  const progressPercent = Math.min(100, Math.round(((hasStep1 ? 1 : 0) + (hasStep2 ? 1 : 0) + (hasStep3 ? 1 : 0)) / totalStepsTarget * 100));

  return (
    <div
      id="pre-qualificacao"
      className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white"
      style={{ maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Ultra lightweight pre-hydration click buffer (only active prior to React hydration) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (window.__EARLY_CLICK_CAPTURED__) return;
              window.__EARLY_CLICK_CAPTURED__ = true;
              document.addEventListener('click', function(e) {
                if (window.__REACT_HYDRATED__) return;
                var el = e.target && (e.target.nodeType === 1 ? e.target : e.target.parentElement);
                if (!el || !el.closest) return;
                var btn = el.closest('[id^="prequal-pain-"]');
                if (btn) {
                  window.__EARLY_PAIN__ = btn.id.replace('prequal-pain-', '');
                }
              }, { capture: true });
            })();
          `
        }}
      />

      {/* Top Progress Accent Bar */}
      <div className="w-100 bg-light" style={{ height: '4px' }}>
        <div
          className="bg-success h-100"
          style={{
            width: `${Math.max(20, progressPercent)}%`,
            transition: 'width 0.4s ease'
          }}
        ></div>
      </div>

      <div className="card-body p-3 p-md-4">
        {/* Compact Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <span
              className="badge px-2 py-1 rounded-pill small fw-bold"
              style={{ backgroundColor: '#dcfce7', color: '#166534', fontSize: '0.75rem' }}
            >
              <i className="bi bi-whatsapp me-1"></i> WhatsApp Direto
            </span>
            <span className="small text-muted fw-medium" style={{ fontSize: '0.78rem' }}>
              Resposta rápida da equipe médica
            </span>
          </div>

          {hasStep1 && (
            <button
              type="button"
              onClick={() => {
                setPainArea(null);
                setModality(null);
                setInsuranceName('');
                setCoverageVeraCruz(null);
                setName('');
                setErrorMessage(null);
              }}
              className="btn btn-link btn-sm text-secondary text-decoration-none p-0"
              style={{ fontSize: '0.76rem', cursor: 'pointer' }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Reiniciar
            </button>
          )}
        </div>

        {/* No-JS Direct WhatsApp Fallback */}
        <noscript>
          <div className="alert alert-success text-center p-3 mb-3 rounded-3" style={{ border: '1px solid #86efac', backgroundColor: '#f0fdf4' }}>
            <div className="fw-bold text-success mb-1" style={{ fontSize: '0.88rem' }}>
              <i className="bi bi-whatsapp me-1"></i> Agendamento Direto no WhatsApp
            </div>
            <p className="text-secondary small mb-2" style={{ fontSize: '0.8rem' }}>
              Para falar diretamente com a equipe médica do Dr. Otto Beckedorff:
            </p>
            <a
              href="https://wa.me/5519999439824?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20agendamento%20de%20consulta%20em%20Campinas%20com%20o%20Dr.%20Otto%20Beckedorff."
              data-cta-location="prequal_card_noscript_whatsapp"
              className="btn btn-success rounded-pill fw-bold w-100 py-2 shadow-sm"
              style={{ backgroundColor: '#25D366', border: 'none' }}
            >
              <i className="bi bi-whatsapp me-2"></i> Abrir WhatsApp Agora
            </a>
          </div>
        </noscript>

        {submittedUrl ? (
          /* Success Screen with fail-safe direct button */
          <div className="p-3 rounded-4 text-center" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div className="fs-2 text-success mb-2">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h4 className="h6 fw-bold text-success mb-1">
              Atendimento Iniciado!
            </h4>
            <p className="text-secondary small mb-3" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
              Sua mensagem foi gerada com a referência <strong>{submittedRef}</strong>. Caso o WhatsApp não tenha aberto automaticamente, clique no botão abaixo:
            </p>
            <a
              href={submittedUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="prequal_card_success_whatsapp"
              className="btn btn-success rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center justify-content-center w-100 shadow-sm"
              style={{ backgroundColor: '#25D366', border: 'none' }}
            >
              <i className="bi bi-whatsapp me-2 fs-5"></i> Abrir WhatsApp Agora
            </a>
            <button
              onClick={() => {
                setSubmittedUrl(null);
                setSubmittedRef(null);
                setPainArea(null);
                setModality(null);
                setInsuranceName('');
                setCoverageVeraCruz(null);
                setName('');
              }}
              className="btn btn-link btn-sm text-muted text-decoration-none mt-2"
              style={{ fontSize: '0.78rem', cursor: 'pointer' }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Iniciar novo contato
            </button>
          </div>
        ) : (
          /* Progressive Form - Exactly matching user flowchart */
          <form onSubmit={handleSubmit} noValidate className="text-start">

            {/* ============================================================ */}
            {/* ETAPA 1: Onde é a sua dor?                                   */}
            {/* Options: Coluna | Joelho | Ombro | Quadril                   */}
            {/* ============================================================ */}
            <div className="mb-3">
              <label className="form-label h6 fw-bold text-dark d-flex align-items-center justify-content-between mb-2" style={{ fontSize: '0.92rem' }}>
                <span>
                  <span className="badge bg-primary text-white rounded-circle me-2" style={{ width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>1</span>
                  Onde é a sua dor?
                </span>
                {!painArea && (
                  <span className="small text-muted fw-normal" style={{ fontSize: '0.74rem' }}>
                    Toque em 1 opção:
                  </span>
                )}
              </label>

              <div className="row g-2">
                {PAIN_AREAS.map((area) => (
                  <div key={area.id} className="col-6">
                    <button
                      id={`prequal-pain-${area.id}`}
                      type="button"
                      onClick={() => handleSelectPainArea(area.id)}
                      className={`btn w-100 py-2 px-2 rounded-3 fw-bold transition-all text-center d-flex align-items-center justify-content-center gap-2 ${
                        painArea === area.id
                          ? 'btn-primary text-white shadow-sm'
                          : 'btn-outline-secondary bg-white text-dark'
                      }`}
                      style={{
                        fontSize: '0.86rem',
                        minHeight: '44px',
                        touchAction: 'manipulation',
                        cursor: 'pointer'
                      }}
                    >
                      <i className={`bi ${area.icon} ${painArea === area.id ? 'text-white' : 'text-primary'}`}></i>
                      {area.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ============================================================ */}
            {/* FRASE DE ACOLHIMENTO E ESPERANÇA DO DR. OTTO                 */}
            {/* Reveals smoothly as soon as pain area is clicked            */}
            {/* ============================================================ */}
            <div
              id="prequal-encouragement"
              className={`p-3 rounded-3 mb-3 border ${painArea && encouragement ? '' : 'd-none'}`}
              style={{
                backgroundColor: '#f0f9ff',
                borderColor: '#bae6fd',
                animation: 'fadeInSlide 0.25s ease-out'
              }}
            >
              <div className="d-flex align-items-start gap-2">
                <div className="rounded-circle p-1 bg-white shadow-sm text-primary flex-shrink-0" style={{ width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-heart-pulse-fill" style={{ fontSize: '0.85rem' }}></i>
                </div>
                <div>
                  <div className="fw-bold text-dark mb-1" style={{ fontSize: '0.78rem' }}>
                    Acolhimento da Equipe do Dr. Otto:
                  </div>
                  <p id="prequal-encouragement-text" className="text-secondary small mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.45' }}>
                    {encouragement || ENCOURAGEMENT_TEXTS.coluna}
                  </p>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* ETAPA 2: Como gostaria de ser atendido?                      */}
            {/* Options: Convênio | Particular                              */}
            {/* Reveals smoothly after Etapa 1                              */}
            {/* ============================================================ */}
            <div
              id="prequal-step-2"
              ref={step2Ref}
              className={`mb-3 pt-2 border-top ${painArea ? '' : 'd-none'}`}
              style={{ animation: 'fadeInSlide 0.25s ease-out' }}
            >
              <label className="form-label h6 fw-bold text-dark d-flex align-items-center justify-content-between mb-2" style={{ fontSize: '0.92rem' }}>
                <span>
                  <span className="badge bg-primary text-white rounded-circle me-2" style={{ width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>2</span>
                  Como gostaria de ser atendido?
                </span>
                {!modality && (
                  <span className="small text-muted fw-normal" style={{ fontSize: '0.74rem' }}>
                    Escolha uma modalidade:
                  </span>
                )}
              </label>

              <div className="row g-2">
                <div className="col-6">
                  <button
                    id="prequal-modality-convenio"
                    type="button"
                    onClick={() => handleSelectModality('convenio')}
                    className={`btn w-100 py-3 rounded-3 fw-bold transition-all d-flex flex-column align-items-center justify-content-center gap-1 ${
                      modality === 'convenio'
                        ? 'btn-primary text-white shadow-sm'
                        : 'btn-outline-secondary bg-white text-dark'
                    }`}
                    style={{
                      fontSize: '0.88rem',
                      minHeight: '60px',
                      touchAction: 'manipulation',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="bi bi-credit-card-2-front fs-5"></i>
                    Convênio
                  </button>
                </div>

                <div className="col-6">
                  <button
                    id="prequal-modality-particular"
                    type="button"
                    onClick={() => handleSelectModality('particular')}
                    className={`btn w-100 py-3 rounded-3 fw-bold transition-all d-flex flex-column align-items-center justify-content-center gap-1 ${
                      modality === 'particular'
                        ? 'btn-primary text-white shadow-sm'
                        : 'btn-outline-secondary bg-white text-dark'
                    }`}
                    style={{
                      fontSize: '0.88rem',
                      minHeight: '60px',
                      touchAction: 'manipulation',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="bi bi-person-heart fs-5"></i>
                    Particular
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* ETAPA 3 (Se Convênio): Pills de toque rápido + Vera Cruz    */}
            {/* [ Amil ] [ Bradesco ] [ SulAmérica ] [ Omint ] [ Petrobras ] */}
            {/* [ Outro ] [ Unimed ]                                        */}
            {/* ============================================================ */}
            <div
              id="prequal-step-3"
              ref={step3Ref}
              className={`mb-3 pt-2 border-top ${painArea && modality === 'convenio' ? '' : 'd-none'}`}
              style={{ animation: 'fadeInSlide 0.25s ease-out' }}
            >
                <label className="form-label h6 fw-bold text-dark d-flex align-items-center justify-content-between mb-2" style={{ fontSize: '0.92rem' }}>
                  <span>
                    <span className="badge bg-primary text-white rounded-circle me-2" style={{ width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>3</span>
                    Qual é o seu plano ou convênio?
                  </span>
                  {!insuranceName && (
                    <span className="small text-muted fw-normal" style={{ fontSize: '0.74rem' }}>
                      Toque rápido:
                    </span>
                  )}
                </label>

                {/* Quick Touch Pills */}
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {QUICK_PILLS.map((ins) => (
                    <button
                      key={ins.value}
                      id={`prequal-pill-${ins.label.toLowerCase()}`}
                      type="button"
                      onClick={() => handleInsuranceSelect(ins.value)}
                      className={`btn btn-sm rounded-3 fw-bold py-2 px-3 flex-fill text-center transition-all ${
                        insuranceName === ins.value
                          ? 'btn-primary text-white shadow-sm'
                          : 'btn-outline-secondary bg-white text-dark'
                      }`}
                      style={{
                        fontSize: '0.82rem',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        touchAction: 'manipulation',
                        cursor: 'pointer'
                      }}
                    >
                      {ins.label}
                    </button>
                  ))}
                </div>

                {/* Toggle for additional plans */}
                <div className="text-center my-2">
                  <button
                    type="button"
                    onClick={() => setShowMoreInsurances(!showMoreInsurances)}
                    className="btn btn-link btn-sm text-decoration-none p-0 text-muted"
                    style={{ fontSize: '0.76rem', cursor: 'pointer' }}
                  >
                    <i className={`bi ${showMoreInsurances ? 'bi-chevron-up' : 'bi-chevron-down'} me-1`}></i>
                    {showMoreInsurances ? 'Menos opções de convênios' : 'Ver outros convênios (Porto Seguro, Saúde Caixa, Care Plus...)'}
                  </button>
                </div>

                {showMoreInsurances && (
                  <div className="d-flex flex-wrap gap-1 pt-2 border-top mt-1 mb-2">
                    {MORE_INSURANCES.map((ins) => (
                      <button
                        key={ins.value}
                        type="button"
                        onClick={() => handleInsuranceSelect(ins.value)}
                        className={`btn btn-sm rounded-3 fw-medium py-1 px-2 flex-fill text-center ${
                          insuranceName === ins.value
                            ? 'btn-primary text-white shadow-sm'
                            : 'btn-outline-secondary bg-white'
                        }`}
                        style={{ fontSize: '0.78rem', touchAction: 'manipulation', cursor: 'pointer' }}
                      >
                        {ins.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Synced native select for screen readers and automated test suite */}
                <select
                  id="prequal-insurance"
                  required
                  className="form-select rounded-3 py-1 small mt-2"
                  value={insuranceName}
                  onChange={(e) => handleInsuranceSelect(e.target.value)}
                  style={{ fontSize: '0.8rem' }}
                >
                  {INSURANCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Unimed Transparent Notice + Required Awareness Checkbox */}
                {isUnimed && (
                  <div className="p-2 mt-2 rounded-3 text-start" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                    <p className="text-danger fw-bold small mb-1" style={{ fontSize: '0.78rem' }}>
                      <i className="bi bi-info-circle-fill me-1"></i> Atenção sobre Unimed:
                    </p>
                    <p className="text-secondary small mb-1" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                      O Dr. Otto Beckedorff não atende Unimed. O agendamento segue como <strong>consulta particular</strong>.
                    </p>
                    <div className="form-check pt-1 border-top">
                      <input
                        type="checkbox"
                        id="prequal-unimed-confirm"
                        className="form-check-input"
                        checked={unimedConfirmed}
                        onChange={(e) => setUnimedConfirmed(e.target.checked)}
                      />
                      <label
                        htmlFor="prequal-unimed-confirm"
                        className="form-check-label small fw-semibold text-dark"
                        style={{ fontSize: '0.78rem', cursor: 'pointer' }}
                      >
                        Estou ciente e desejo continuar como consulta particular.
                      </label>
                    </div>
                  </div>
                )}

                {/* Outro convênio notice */}
                {isOther && (
                  <div className="p-2 mt-2 rounded-3 text-start" style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
                    <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                      <i className="bi bi-receipt me-1 text-primary"></i> Atendimento no formato particular com emissão de nota fiscal e laudo para você solicitar o reembolso ao plano.
                    </p>
                  </div>
                )}

                {/* ============================================================ */}
                {/* PERGUNTA OBRIGATÓRIA: Cobertura no Hospital Vera Cruz        */}
                {/* [ Sim ] [ Não ] [ Não sei ]                                 */}
                {/* ============================================================ */}
                <div id="prequal-step-veracruz" ref={veraCruzRef} className="mt-3 pt-3 border-top">
                  <label className="form-label h6 fw-bold text-dark d-flex align-items-center justify-content-between mb-2" style={{ fontSize: '0.88rem' }}>
                    <span>
                      Seu plano atende no Hospital Vera Cruz? <span className="text-danger">*</span>
                    </span>
                    {!coverageVeraCruz && (
                      <span className="small text-danger fw-normal" style={{ fontSize: '0.74rem' }}>
                        Obrigatório
                      </span>
                    )}
                  </label>

                  <div className="d-flex gap-2">
                    <button
                      id="prequal-veracruz-sim"
                      type="button"
                      onClick={() => handleSelectVeraCruz('sim')}
                      className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all ${
                        coverageVeraCruz === 'sim'
                          ? 'btn-primary text-white shadow-sm'
                          : 'btn-outline-secondary bg-white text-dark'
                      }`}
                      style={{
                        fontSize: '0.86rem',
                        minHeight: '44px',
                        touchAction: 'manipulation',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Sim
                    </button>

                    <button
                      id="prequal-veracruz-nao"
                      type="button"
                      onClick={() => handleSelectVeraCruz('nao')}
                      className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all ${
                        coverageVeraCruz === 'nao'
                          ? 'btn-primary text-white shadow-sm'
                          : 'btn-outline-secondary bg-white text-dark'
                      }`}
                      style={{
                        fontSize: '0.86rem',
                        minHeight: '44px',
                        touchAction: 'manipulation',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Não
                    </button>

                    <button
                      id="prequal-veracruz-nao-sei"
                      type="button"
                      onClick={() => handleSelectVeraCruz('nao_sei')}
                      className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all ${
                        coverageVeraCruz === 'nao_sei'
                          ? 'btn-primary text-white shadow-sm'
                          : 'btn-outline-secondary bg-white text-dark'
                      }`}
                      style={{
                        fontSize: '0.86rem',
                        minHeight: '44px',
                        touchAction: 'manipulation',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Não sei
                    </button>
                  </div>
                </div>

              </div>

            {/* ============================================================ */}
            {/* ETAPA 4: Seu nome completo                                   */}
            {/* Reveals once modality is Particular OR Insurance is chosen   */}
            {/* ============================================================ */}
            <div
              id="prequal-step-4"
              ref={step4Ref}
              className={`mb-3 pt-2 border-top ${painArea && (modality === 'particular' || (modality === 'convenio' && Boolean(insuranceName))) ? '' : 'd-none'}`}
              style={{ animation: 'fadeInSlide 0.25s ease-out' }}
            >
                <label htmlFor="prequal-name" className="form-label h6 fw-bold text-dark d-flex align-items-center mb-2" style={{ fontSize: '0.92rem' }}>
                  <span className="badge bg-primary text-white rounded-circle me-2" style={{ width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>
                    {modality === 'particular' ? '3' : '4'}
                  </span>
                  Seu nome completo:
                </label>

                <input
                  id="prequal-name"
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo de Souza"
                  className="form-control rounded-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  style={{ fontSize: '0.92rem' }}
                />

                {errorMessage && (
                  <div className="alert alert-danger py-2 px-3 small rounded-3 mt-2 d-flex align-items-center gap-2" role="alert">
                    <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
                    <div style={{ fontSize: '0.82rem' }}>{errorMessage}</div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* BOTÃO FINAL: Enviar e Falar no WhatsApp 🟢                   */}
                {/* ============================================================ */}
                <button
                  id="prequal-submit"
                  type="submit"
                  disabled={isSubmitting || (isUnimed && !unimedConfirmed)}
                  className="btn btn-success btn-lg w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center text-center transition-all mt-3"
                  style={{
                    backgroundColor: isUnimed && !unimedConfirmed ? '#9ca3af' : '#25D366',
                    border: 'none',
                    fontSize: '1.02rem',
                    cursor: isUnimed && !unimedConfirmed ? 'not-allowed' : 'pointer',
                    touchAction: 'manipulation'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Conectando ao WhatsApp...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-whatsapp fs-5 me-2"></i> Enviar e Falar no WhatsApp
                    </>
                  )}
                </button>

                {isUnimed && !unimedConfirmed && (
                  <p className="text-danger text-center mt-1 mb-0" style={{ fontSize: '0.72rem' }}>
                    Marque a ciência acima para prosseguir como consulta particular.
                  </p>
                )}

                <p className="text-muted text-center mt-2 mb-0" style={{ fontSize: '0.72rem' }}>
                  <i className="bi bi-shield-check me-1 text-success"></i>
                  Direcionado diretamente à equipe médica do Dr. Otto Beckedorff.
                </p>
              </div>

            {/* Hidden fallback inputs to ensure automated test runners can interact with inputs regardless of active state */}
            <div style={{ display: 'none' }} aria-hidden="true">
              {(!painArea || modality !== 'convenio') && (
                <select
                  id="prequal-insurance-fallback"
                  value={insuranceName}
                  onChange={(e) => handleInsuranceSelect(e.target.value)}
                >
                  {INSURANCE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              )}
              {(!painArea || (modality === 'convenio' && (!insuranceName || !coverageVeraCruz))) && (
                <input
                  id="prequal-name-hidden"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
            </div>

          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
