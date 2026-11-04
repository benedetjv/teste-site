'use client';

import React, { useState, useEffect } from 'react';
import { getStoredUtms, initUtmCapture, pushDataLayer } from '@/lib/tracking';

interface WhatsAppPreQualifyCardProps {
  campaignType?: string;
  defaultModality?: 'particular' | 'convenio';
  location?: string;
  title?: string;
  subtitle?: string;
}

export const INSURANCE_OPTIONS = [
  { value: '', label: 'Selecione seu plano ou convênio...' },
  { value: 'Amil', label: 'Amil' },
  { value: 'Bradesco Saúde', label: 'Bradesco Saúde' },
  { value: 'SulAmérica Saúde', label: 'SulAmérica Saúde' },
  { value: 'Omint', label: 'Omint' },
  { value: 'Porto Seguro', label: 'Porto Seguro' },
  { value: 'Saúde Caixa', label: 'Saúde Caixa' },
  { value: 'Care Plus', label: 'Care Plus' },
  { value: 'Petrobras PAE / AMS', label: 'Petrobras PAE / AMS' },
  { value: 'GAMA Saúde', label: 'GAMA Saúde' },
  { value: 'VIVEST', label: 'VIVEST' },
  { value: 'ASH (Holambra)', label: 'ASH (Holambra)' },
  { value: '2Care', label: '2Care' },
  { value: 'Unimed', label: 'Unimed' },
  { value: 'Outro convênio', label: 'Outro convênio (não listado acima)' },
];

export default function WhatsAppPreQualifyCard({
  campaignType = 'campinas_geral',
  defaultModality = 'convenio',
  location = 'prequal_card_hero',
  title = 'Solicitar Agendamento pelo WhatsApp',
  subtitle = 'Informe seus dados para direcionarmos seu contato com rapidez à nossa equipe em Campinas:'
}: WhatsAppPreQualifyCardProps) {
  const [name, setName] = useState('');
  const [modality, setModality] = useState<'particular' | 'convenio'>(defaultModality);
  const [insuranceName, setInsuranceName] = useState('');
  const [coverageVeraCruz, setCoverageVeraCruz] = useState<'sim' | 'nao' | 'nao_sei'>('nao_sei');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    initUtmCapture();
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

  const isReimbursementKnown =
    modality === 'convenio' && !isUnimed && !isAmil && !isOther && insuranceName !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    if (modality === 'convenio' && !insuranceName.trim()) {
      setErrorMessage('Por favor, selecione seu convênio ou plano na lista.');
      return;
    }

    setIsSubmitting(true);

    try {
      const storedUtms = getStoredUtms();

      // 1. Generate anonymous secure reference on the server (NO PII SENT)
      const res = await fetch('/api/session/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
          landing_page: typeof window !== 'undefined' ? window.location.pathname : '',
          modality: isUnimed ? 'particular' : (isAmil ? 'amil' : (modality === 'convenio' ? 'outro_convenio' : 'particular')),
          insurance_name: modality === 'convenio' ? insuranceName.trim() : null,
          coverage_vera_cruz: modality === 'convenio' ? coverageVeraCruz : 'particular',
          is_unimed: isUnimed,
          ...storedUtms
        })
      });

      const data = await res.json();
      if (!res.ok || !data.ref_code) {
        throw new Error(data.error || 'Falha ao gerar código de atendimento. Tente novamente.');
      }

      const refCode = data.ref_code;
      try {
        sessionStorage.setItem('drotto_ref_code', refCode);
      } catch {}

      // 2. Dispatch Secondary Event to dataLayer (strictly zero PII, zero answers)
      pushDataLayer('click_whatsapp', {
        cta_name: 'enviar_falar_whatsapp',
        cta_location: location,
        campaign_type: campaignType
      });

      // 3. Natural, friendly WhatsApp message with answers and safe anonymous ref
      let atdDesc = 'Particular';
      if (modality === 'convenio') {
        if (isUnimed) {
          atdDesc = 'Particular (paciente possui Unimed)';
        } else if (isOther) {
          atdDesc = 'Particular com reembolso (outro convênio)';
        } else if (isAmil) {
          atdDesc = 'Convênio (Amil)';
        } else {
          atdDesc = `Convênio (${insuranceName.trim()}) - suporte a reembolso`;
        }
      }

      const veraCruzDesc =
        coverageVeraCruz === 'sim' ? 'Sim' :
        coverageVeraCruz === 'nao' ? 'Não' : 'Não sei / A verificar';

      let messageText =
        `Olá! Gostaria de solicitar um agendamento de consulta em Campinas com o Dr. Otto Beckedorff.\n\n` +
        `• Nome: ${trimmedName}\n` +
        `• Atendimento: ${atdDesc}\n`;

      if (modality === 'convenio') {
        messageText += `• Cobertura Hospital Vera Cruz: ${veraCruzDesc}\n`;
      }

      messageText += `\n[Ref: ${refCode}]`;

      const whatsappUrl = `https://wa.me/5519999439824?text=${encodeURIComponent(messageText)}`;

      setSubmittedUrl(whatsappUrl);
      setSubmittedRef(refCode);

      // Open WhatsApp in new tab
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao preparar conversa. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="pre-qualificacao"
      className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white"
      style={{ maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Header Accent Bar */}
      <div style={{ height: '5px', backgroundColor: '#25D366' }}></div>

      <div className="card-body p-4 p-md-4">
        {/* Card Title & Subtitle */}
        <div className="mb-3 text-start">
          <div className="d-inline-flex align-items-center gap-2 mb-2">
            <span
              className="badge px-2 py-1 rounded-pill small fw-bold"
              style={{ backgroundColor: '#dcfce7', color: '#166534' }}
            >
              <i className="bi bi-whatsapp me-1"></i> Pré-atendimento Direto
            </span>
            <span className="small text-muted" style={{ fontSize: '0.78rem' }}>
              <i className="bi bi-clock-history me-1"></i> Resposta rápida
            </span>
          </div>

          <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--azul-escuro)' }}>
            {title}
          </h3>
          <p className="text-muted small mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
            {subtitle}
          </p>
        </div>

        {submittedUrl ? (
          /* Success / Clicked State */
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
              }}
              className="btn btn-link btn-sm text-muted text-decoration-none mt-2"
              style={{ fontSize: '0.78rem' }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Alterar dados do contato
            </button>
          </div>
        ) : (
          /* Short Pre-qualification Form */
          <form onSubmit={handleSubmit} className="text-start">
            
            {/* 1. Nome Completo (Obrigatório) */}
            <div className="mb-3">
              <label htmlFor="prequal-name" className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                1. Nome Completo <span className="text-danger">*</span>
              </label>
              <input
                id="prequal-name"
                type="text"
                required
                placeholder="Ex: Carlos Eduardo de Souza"
                className="form-control rounded-3 py-2 small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            {/* 2. Modalidade: Particular ou Convênio */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                2. Como deseja ser atendido? <span className="text-danger">*</span>
              </label>
              <div className="row g-2">
                <div className="col-6">
                  <button
                    type="button"
                    onClick={() => setModality('convenio')}
                    className={`btn w-100 py-2 rounded-3 fw-bold small transition-all ${
                      modality === 'convenio' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                    }`}
                    style={{ fontSize: '0.85rem' }}
                  >
                    <i className="bi bi-credit-card-2-front me-1"></i> Convênio
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    onClick={() => setModality('particular')}
                    className={`btn w-100 py-2 rounded-3 fw-bold small transition-all ${
                      modality === 'particular' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                    }`}
                    style={{ fontSize: '0.85rem' }}
                  >
                    <i className="bi bi-person-heart me-1"></i> Particular
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Nome do Convênio (quando modalidade = convenio) */}
            {modality === 'convenio' && (
              <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <label htmlFor="prequal-insurance" className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem' }}>
                  Qual é o seu plano ou convênio? <span className="text-danger">*</span>
                </label>
                <select
                  id="prequal-insurance"
                  required
                  className="form-select rounded-3 py-2 small"
                  value={insuranceName}
                  onChange={(e) => setInsuranceName(e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                >
                  {INSURANCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Feedback contextual elegante e sem vermelho */}
                {isAmil && (
                  <div className="p-2 mt-2 rounded-3 text-start" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '0.95rem' }}></i>
                      <div className="small text-success fw-medium" style={{ fontSize: '0.79rem', lineHeight: '1.4' }}>
                        <strong>Amil em Campinas:</strong> Consultas presenciais no Instituto Orthesen (Centro). Procedimentos hospitalares sob verificação de categoria do plano.
                      </div>
                    </div>
                  </div>
                )}

                {isReimbursementKnown && (
                  <div className="p-2 mt-2 rounded-3 text-start" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-file-earmark-medical text-primary" style={{ fontSize: '0.95rem' }}></i>
                      <div className="small text-primary fw-medium" style={{ fontSize: '0.79rem', lineHeight: '1.4' }}>
                        Atendimento médico com suporte completo de nota fiscal e laudo detalhado para solicitação de reembolso.
                      </div>
                    </div>
                  </div>
                )}

                {/* Regra Unimed: discreta, acolhedora, zero vermelho */}
                {isUnimed && (
                  <div className="p-3 mt-2 rounded-3 text-start" style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
                    <div className="d-flex align-items-start gap-2">
                      <i className="bi bi-info-circle text-secondary mt-1" style={{ fontSize: '1rem' }}></i>
                      <div>
                        <p className="fw-bold text-dark small mb-1" style={{ fontSize: '0.82rem' }}>Informação sobre Unimed</p>
                        <p className="text-secondary small mb-0" style={{ fontSize: '0.79rem', lineHeight: '1.45' }}>
                          O Dr. Otto Beckedorff não atende pela rede credenciada da Unimed. Seu agendamento será direcionado como <strong>consulta particular</strong>, com emissão de nota fiscal para você solicitar eventual reembolso ao plano.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regra Outro convênio: transparente, sem prometer cobertura */}
                {isOther && (
                  <div className="p-3 mt-2 rounded-3 text-start" style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
                    <div className="d-flex align-items-start gap-2">
                      <i className="bi bi-info-circle text-secondary mt-1" style={{ fontSize: '1rem' }}></i>
                      <div>
                        <p className="fw-bold text-dark small mb-1" style={{ fontSize: '0.82rem' }}>Atendimento para outros convênios</p>
                        <p className="text-secondary small mb-0" style={{ fontSize: '0.79rem', lineHeight: '1.45' }}>
                          O Dr. Otto não atende este convênio de forma direta. O atendimento é realizado no <strong>formato particular</strong>, e fornecemos nota fiscal com relatório médico detalhado para você solicitar o reembolso ao seu plano de saúde.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. Pergunta sobre o nível do plano no Hospital Vera Cruz (para Amil ou outros convênios) */}
            {modality === 'convenio' && (
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  3. Você sabe se o nível do seu plano atende no Hospital Vera Cruz? <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCoverageVeraCruz('sim')}
                    className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all ${
                      coverageVeraCruz === 'sim' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                    }`}
                    style={{ fontSize: '0.82rem' }}
                  >
                    <i className="bi bi-check-lg me-1"></i> Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverageVeraCruz('nao')}
                    className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all ${
                      coverageVeraCruz === 'nao' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                    }`}
                    style={{ fontSize: '0.82rem' }}
                  >
                    Não
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverageVeraCruz('nao_sei')}
                    className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all ${
                      coverageVeraCruz === 'nao_sei' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                    }`}
                    style={{ fontSize: '0.82rem' }}
                  >
                    Não sei
                  </button>
                </div>
                <small className="text-muted d-block mt-1" style={{ fontSize: '0.73rem', lineHeight: '1.4' }}>
                  O Dr. Otto realiza procedimentos e cirurgias no Hospital Vera Cruz. Caso não tenha certeza se a categoria do seu plano cobre no hospital, nossa equipe verifica para você.
                </small>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3" style={{ fontSize: '0.8rem' }}>
                <i className="bi bi-exclamation-circle-fill me-1"></i> {errorMessage}
              </div>
            )}

            {/* 5. Botão "Enviar e falar no WhatsApp" */}
            <button
              id="prequal-submit"
              type="submit"
              disabled={isSubmitting}
              className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center transition-all"
              style={{ backgroundColor: '#25D366', border: 'none', fontSize: '1.02rem' }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Conectando ao WhatsApp...
                </>
              ) : (
                <>
                  <i className="bi bi-whatsapp fs-5 me-2"></i> Enviar e falar no WhatsApp
                </>
              )}
            </button>

            <div className="text-center mt-2">
              <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                <i className="bi bi-shield-check text-success me-1"></i>
                Seus dados não são compartilhados com terceiros.
              </span>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

