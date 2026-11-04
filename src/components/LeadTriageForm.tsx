'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { pushDataLayer, initUtmCapture, getStoredUtms } from '@/lib/tracking';

interface LeadTriageFormProps {
  campaignType?: string;
  title?: string;
  subtitle?: string;
  defaultModality?: 'amil' | 'outro_convenio' | 'particular';
}

export default function LeadTriageForm({
  campaignType = 'campinas_geral',
  title = 'Verificar Atendimento e Convênios',
  subtitle = 'Informe seus dados de contato para que nossa secretária consulte a disponibilidade de horários e a cobertura para o seu caso.',
  defaultModality = 'amil'
}: LeadTriageFormProps) {
  const [formStarted, setFormStarted] = useState(false);
  const [refCode, setRefCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('drotto_ref_code') || '';
      } catch {
        return '';
      }
    }
    return '';
  });

  // Form Fields (Minimalist & Optional Flow)
  const [modality, setModality] = useState<'amil' | 'outro_convenio' | 'particular'>(defaultModality);
  const [otherInsuranceName, setOtherInsuranceName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Consent starts strictly unchecked per LGPD guidelines
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{
    lead_id: string;
    is_unimed: boolean;
    whatsapp_url: string;
  } | null>(null);

  useEffect(() => {
    initUtmCapture();
    if (!refCode) {
      const utms = getStoredUtms();
      fetch('/api/session/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_path: window.location.pathname,
          landing_page: window.location.pathname,
          ...utms
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ref_code) {
          try {
            sessionStorage.setItem('drotto_ref_code', data.ref_code);
          } catch {}
          setRefCode(data.ref_code);
        }
      })
      .catch(() => {});
    }
  }, [refCode]);

  const handleFirstInteraction = () => {
    if (!formStarted) {
      setFormStarted(true);
      pushDataLayer('form_start', {
        cta_name: 'iniciar_triagem_curta',
        cta_location: 'triage_card',
        campaign_type: campaignType
      });
    }
  };

  const maskPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const isUnimedMentioned = 
    modality === 'outro_convenio' && 
    otherInsuranceName.toLowerCase().includes('unimed');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/\D/g, '');
    if (name.trim().length < 2) {
      setErrorMessage('Por favor, informe seu nome.');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMessage('Por favor, informe um número de telefone celular com DDD.');
      return;
    }
    if (!privacyAccepted) {
      setErrorMessage('Para enviar o formulário, é necessário assinalar o consentimento de contato.');
      return;
    }

    setIsSubmitting(true);

    try {
      const storedUtms = getStoredUtms();
      const payload = {
        name: name.trim(),
        phone: cleanPhone,
        modality,
        insurance_note: modality === 'outro_convenio' ? otherInsuranceName.trim() : undefined,
        privacy_consent: true,
        ref_code: refCode || undefined,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        landing_page: typeof window !== 'undefined' ? window.location.pathname : '',
        ...storedUtms
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha ao registrar triagem. Tente novamente.');
      }

      setSubmittedLead(data);

      // Only operational non-sensitive data in dataLayer (NO name, phone, email, unimed, insurance, symptoms)
      pushDataLayer('generate_lead', {
        cta_name: 'enviar_triagem_curta',
        cta_location: 'triage_form',
        campaign_type: campaignType
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Ocorreu um erro ao enviar. Por favor, tente novamente ou use o WhatsApp direto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border position-relative" id="triagem-card" style={{ borderColor: '#e2e8f0' }}>
      
      {/* Header */}
      <div className="text-center mb-4">
        <span className="badge rounded-pill px-3 py-1 fw-bold mb-2 shadow-sm text-uppercase" style={{ backgroundColor: 'rgba(14, 115, 219, 0.08)', color: 'var(--azul-principal)', letterSpacing: '0.5px', fontSize: '0.78rem' }}>
          <i className="bi bi-shield-check me-1"></i> Triagem Rápida & Opcional
        </span>
        <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--azul-escuro)' }}>{title}</h3>
        <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>{subtitle}</p>
      </div>

      {submittedLead ? (
        /* Success Screen */
        <div className="text-center py-3 animate__animated animate__fadeIn">
          {submittedLead.is_unimed ? (
            <div className="p-4 rounded-4 mb-3 text-start" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-info-circle-fill text-warning fs-5"></i>
                <h4 className="h6 fw-bold mb-0 text-dark">Informação sobre Atendimento Unimed</h4>
              </div>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                O Dr. Otto Beckedorff <strong>não faz parte da rede credenciada da Unimed</strong> (nem para consultas, nem para procedimentos no Vera Cruz).
              </p>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                Caso deseje, o atendimento pode ser realizado de forma <strong>particular</strong>, com fornecimento de nota fiscal e relatório médico detalhado para eventual solicitação de reembolso junto à sua operadora.
              </p>
              <div className="d-flex flex-column gap-2">
                <a
                  href={submittedLead.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="triage_unimed_whatsapp"
                  className="btn btn-sm btn-outline-dark rounded-pill py-2 fw-bold text-center"
                >
                  <i className="bi bi-whatsapp me-2 text-success"></i> Consultar valores do atendimento particular no WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-4 mb-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div className="fs-1 text-success mb-2"><i className="bi bi-check-circle-fill"></i></div>
              <h4 className="h6 fw-bold text-success mb-2">Dados Recebidos com Sucesso!</h4>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                Obrigado, <strong>{name}</strong>. Nossa equipe entrará em contato para verificar os horários disponíveis e confirmar a cobertura.
              </p>
              <a
                href={submittedLead.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="triage_success_whatsapp"
                className="btn btn-success rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center justify-content-center w-100"
                style={{ backgroundColor: '#25D366', border: 'none' }}
              >
                <i className="bi bi-whatsapp me-2 fs-5"></i> Continuar no WhatsApp Agora
              </a>
            </div>
          )}

          <button
            onClick={() => {
              setSubmittedLead(null);
              setName('');
              setPhone('');
              setOtherInsuranceName('');
              setPrivacyAccepted(false);
            }}
            className="btn btn-link btn-sm text-muted text-decoration-none mt-2"
          >
            <i className="bi bi-arrow-counterclockwise me-1"></i> Nova consulta
          </button>
        </div>
      ) : (
        /* Short & Non-Intrusive Form */
        <form onSubmit={handleSubmit} onFocus={handleFirstInteraction} className="needs-validation">
          
          {/* 1. Modalidade */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase mb-2" style={{ fontSize: '0.78rem' }}>
              1. Modalidade de Atendimento Desejada
            </label>
            <div className="row g-2">
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => {
                    setModality('amil');
                    handleFirstInteraction();
                  }}
                  className={`btn w-100 py-2 rounded-3 fw-bold small transition-all ${
                    modality === 'amil' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: '0.82rem' }}
                >
                  Amil
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => {
                    setModality('outro_convenio');
                    handleFirstInteraction();
                  }}
                  className={`btn w-100 py-2 rounded-3 fw-bold small transition-all ${
                    modality === 'outro_convenio' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: '0.82rem' }}
                >
                  Outro Plano
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => {
                    setModality('particular');
                    handleFirstInteraction();
                  }}
                  className={`btn w-100 py-2 rounded-3 fw-bold small transition-all ${
                    modality === 'particular' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: '0.82rem' }}
                >
                  Particular
                </button>
              </div>
            </div>
          </div>

          {/* Conditional Guidance based on Modality */}
          {modality === 'amil' && (
            <div className="alert alert-info py-2 px-3 mb-3 small rounded-3 bg-light border-info" style={{ fontSize: '0.82rem' }}>
              <i className="bi bi-info-circle-fill text-primary me-2"></i>
              <strong>Amil em Campinas:</strong> Atendimento de consultas no Instituto Orthesen. Procedimentos e cirurgias no Hospital Vera Cruz estão sujeitos à categoria do plano e autorização da operadora.
            </div>
          )}

          {modality === 'outro_convenio' && (
            <div className="mb-3 animate__animated animate__fadeIn">
              <label htmlFor="triage-other-insurance" className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.78rem' }}>
                Qual é a operadora do seu plano? (Opcional)
              </label>
              <input
                id="triage-other-insurance"
                type="text"
                placeholder="Ex: Bradesco, SulAmérica, Omint, Porto Seguro..."
                className="form-control rounded-3 py-2 small"
                value={otherInsuranceName}
                onChange={(e) => setOtherInsuranceName(e.target.value)}
              />
              {isUnimedMentioned ? (
                <div className="alert alert-warning py-2 px-3 mt-2 mb-0 small rounded-3 border-warning" style={{ fontSize: '0.8rem' }}>
                  <i className="bi bi-exclamation-triangle-fill text-warning me-1"></i>
                  <strong>Aviso:</strong> Não atendemos Unimed. Oferecemos atendimento particular com nota fiscal para eventual pedido de reembolso.
                </div>
              ) : (
                <small className="text-muted d-block mt-1" style={{ fontSize: '0.78rem' }}>
                  <i className="bi bi-shield-check text-success me-1"></i> Atendemos consultas no modelo particular com recibo/relatório para reembolso. Procedimentos hospitalares no Vera Cruz sob verificação.
                </small>
              )}
            </div>
          )}

          {modality === 'particular' && (
            <div className="alert alert-light py-2 px-3 mb-3 small rounded-3 border" style={{ fontSize: '0.82rem' }}>
              <i className="bi bi-person-check-fill text-primary me-2"></i>
              <strong>Atendimento Particular:</strong> Tempo dedicado, avaliação aprofundada e emissão de documentação para reembolso ou declaração de IRPF.
            </div>
          )}

          {/* 2. Nome e Telefone */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="triage-name" className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.78rem' }}>
                Seu Nome Completo
              </label>
              <input
                id="triage-name"
                type="text"
                required
                placeholder="Ex: João Silva"
                className="form-control rounded-3 py-2 small"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleFirstInteraction();
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="triage-phone" className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.78rem' }}>
                WhatsApp / Celular (com DDD)
              </label>
              <input
                id="triage-phone"
                type="tel"
                required
                placeholder="(19) 99999-9999"
                className="form-control rounded-3 py-2 small"
                value={phone}
                onChange={(e) => {
                  setPhone(maskPhone(e.target.value));
                  handleFirstInteraction();
                }}
              />
            </div>
          </div>

          {/* 3. Consentimento LGPD (Starts Unchecked by Default) */}
          <div className="mb-3">
            <div className="form-check d-flex align-items-start">
              <input
                className="form-check-input me-2 mt-1"
                type="checkbox"
                id="triage-consent"
                required
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
              />
              <label className="form-check-label text-muted" htmlFor="triage-consent" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                Autorizo o uso do meu nome e telefone exclusivamente pela equipe do Dr. Otto Beckedorff para contato sobre agendamento de consulta. Estou ciente de que posso revogar ou solicitar a exclusão de meus dados conforme a <Link href="/privacidade" target="_blank" className="text-decoration-underline text-primary">Política de Privacidade</Link>.
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
              <i className="bi bi-exclamation-circle-fill me-1"></i> {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-100 text-white fw-bold rounded-pill py-2 shadow-sm d-flex align-items-center justify-content-center transition-all"
            style={{ backgroundColor: 'var(--azul-principal)', border: 'none', fontSize: '0.95rem' }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Consultando disponibilidade...
              </>
            ) : (
              <>
                <i className="bi bi-send-check me-2"></i> Enviar Triagem para a Secretária
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
