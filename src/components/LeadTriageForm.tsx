'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { pushDataLayer, generateLeadId, initUtmCapture, getStoredUtms } from '@/lib/tracking';

interface LeadTriageFormProps {
  campaignType?: string;
  title?: string;
  subtitle?: string;
  defaultModality?: 'convenio' | 'particular';
}

const INSURANCES = [
  { id: 'amil', label: 'Amil (Consultas no Instituto Orthesen)' },
  { id: 'bradesco', label: 'Bradesco Saúde (Reembolso / Procedimentos no Vera Cruz)' },
  { id: 'sulamerica', label: 'SulAmérica (Reembolso / Procedimentos no Vera Cruz)' },
  { id: 'omint', label: 'Omint (Reembolso / Procedimentos no Vera Cruz)' },
  { id: 'porto', label: 'Porto Seguro Saúde (Reembolso / Vera Cruz)' },
  { id: 'caixa', label: 'Saúde Caixa (Reembolso / Vera Cruz)' },
  { id: 'outro', label: 'Outro Convênio com Reembolso Médico' },
  { id: 'unimed', label: 'Unimed (⚠️ Não Atendemos)' }
];

const REASONS = [
  'Coluna / Hérnia de Disco / Nervo Ciático',
  'Dor Lombar ou Cervical Crônica',
  'Joelho (Artrose, Infiltração, Condromalácia)',
  'Ombro (Tendinite, Manguito Rotador)',
  'Quadril (Bursite, Artrose)',
  'Outra Dor Articular ou Muscular'
];

export default function LeadTriageForm({
  campaignType = 'campinas_geral',
  title = 'Verifique a Disponibilidade de Atendimento',
  subtitle = 'Preencha a triagem rápida para receber as orientações da nossa equipe sobre convênios e agendamento.',
  defaultModality = 'convenio'
}: LeadTriageFormProps) {
  const [leadId, setLeadId] = useState<string>('');
  const [formStarted, setFormStarted] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [modality, setModality] = useState<'convenio' | 'particular'>(defaultModality);
  const [insurance, setInsurance] = useState('Amil (Consultas no Instituto Orthesen)');
  const [region, setRegion] = useState('Campinas - SP');
  const [reason, setReason] = useState(REASONS[0]);
  const [contactPreference, setContactPreference] = useState<'whatsapp' | 'phone'>('whatsapp');
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{
    lead_id: string;
    status: string;
    disqualified: boolean;
    whatsapp_url: string;
  } | null>(null);

  useEffect(() => {
    initUtmCapture();
    setLeadId(generateLeadId());
  }, []);

  const handleFirstInteraction = () => {
    if (!formStarted) {
      setFormStarted(true);
      pushDataLayer('form_start', {
        cta_name: 'iniciar_triagem',
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

  const isUnimedSelected = modality === 'convenio' && insurance.toLowerCase().includes('unimed');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/\D/g, '');
    if (name.trim().length < 3) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMessage('Por favor, informe um número de telefone com DDD válido (mínimo 10 dígitos).');
      return;
    }
    if (!privacyAccepted) {
      setErrorMessage('É necessário aceitar os termos de privacidade para continuar.');
      return;
    }

    setIsSubmitting(true);

    try {
      const storedUtms = getStoredUtms();
      const payload = {
        lead_id: leadId,
        name: name.trim(),
        phone: phone.trim(),
        modality,
        insurance: modality === 'particular' ? 'Atendimento Particular' : insurance,
        region,
        reason,
        contact_preference: contactPreference,
        privacy_accepted: privacyAccepted,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        landing_page: typeof window !== 'undefined' ? window.location.pathname : '',
        campaign_type: campaignType,
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

      if (data.disqualified) {
        // Track disqualification event
        pushDataLayer('disqualify_lead', {
          lead_id: data.lead_id,
          disqualification_reason: 'unimed',
          plan_category: 'unimed',
          cta_location: 'triage_form',
          campaign_type: campaignType
        });
      } else {
        // Track qualified generate_lead event with non-sensitive data
        pushDataLayer('generate_lead', {
          lead_id: data.lead_id,
          plan_category: modality === 'particular' ? 'particular' : insurance.split(' ')[0].toLowerCase(),
          region,
          contact_preference: contactPreference,
          cta_location: 'triage_form',
          campaign_type: campaignType
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ocorreu um erro no envio. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    pushDataLayer('click_whatsapp', {
      cta_name: 'continuar_whatsapp_triagem',
      cta_location: 'triage_success',
      lead_id: submittedLead?.lead_id || leadId,
      campaign_type: campaignType
    });
  };

  const handlePhoneClick = () => {
    pushDataLayer('click_phone', {
      cta_name: 'ligar_telefone',
      cta_location: 'triage_form',
      phone_number: '19999439824',
      campaign_type: campaignType
    });
  };

  const handleDoctoraliaClick = () => {
    pushDataLayer('click_doctoralia', {
      cta_name: 'agendar_doctoralia',
      cta_location: 'triage_form',
      campaign_type: campaignType
    });
  };

  return (
    <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border position-relative" id="triagem-form" style={{ borderColor: '#e2e8f0' }}>
      
      {/* Header */}
      <div className="text-center mb-4">
        <span className="badge rounded-pill px-3 py-2 fw-bold mb-2 shadow-sm" style={{ backgroundColor: 'rgba(14, 115, 219, 0.1)', color: 'var(--azul-principal)', letterSpacing: '0.5px' }}>
          <i className="bi bi-clipboard2-check me-1"></i> TRIAGEM DE ATENDIMENTO
        </span>
        <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>{title}</h3>
        <p className="text-muted small mb-0">{subtitle}</p>
      </div>

      {/* Success View */}
      {submittedLead ? (
        <div className="text-center py-4 animate__animated animate__fadeIn">
          {submittedLead.disqualified ? (
            <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
              <div className="fs-1 text-warning mb-2"><i className="bi bi-info-circle-fill"></i></div>
              <h4 className="fw-bold mb-2 text-dark">Informação Importante sobre a Unimed</h4>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.7' }}>
                O <strong>Dr. Otto Beckedorff não atende pelo convênio Unimed</strong> (nem para consultas ambulatoriais, nem para cirurgias ou procedimentos no Vera Cruz).
              </p>
              <div className="bg-white p-3 rounded-3 border text-start small text-muted mb-3">
                <p className="mb-1 fw-bold text-dark"><i className="bi bi-arrow-right-circle text-primary me-2"></i>Opções para seu atendimento:</p>
                <ul className="mb-0 ps-3">
                  <li>Atendimento <strong>particular</strong> com emissão de nota fiscal médica e relatório detalhado para eventual pedido de reembolso junto à sua operadora.</li>
                  <li>Consulta direta ao guia médico da Unimed para localização de ortopedistas credenciados na rede própria.</li>
                </ul>
              </div>
              <p className="small text-muted mb-3">Protocolo de registro: <code>{submittedLead.lead_id}</code></p>
              <a
                href={submittedLead.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold small"
              >
                <i className="bi bi-whatsapp me-2 text-success"></i> Desejo saber valores do particular no WhatsApp
              </a>
            </div>
          ) : (
            <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div className="fs-1 text-success mb-2"><i className="bi bi-check-circle-fill"></i></div>
              <h4 className="fw-bold text-success mb-2">Triagem Registrada com Sucesso!</h4>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.7' }}>
                Olá, <strong>{name}</strong>! Seus dados foram recebidos com segurança e sua solicitação já está na fila de atendimento da nossa secretária em Campinas.
              </p>
              <p className="small text-muted mb-4">Protocolo de atendimento: <span className="badge bg-light text-dark border px-2 py-1">{submittedLead.lead_id}</span></p>

              <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
                <a
                  href={submittedLead.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="btn btn-lg text-white fw-bold px-5 py-3 rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center w-100"
                  style={{ backgroundColor: '#25D366', maxWidth: '380px' }}
                >
                  <i className="bi bi-whatsapp fs-5 me-2"></i> Abrir WhatsApp da Secretária
                </a>
                <span className="text-muted small">
                  <i className="bi bi-shield-check text-success me-1"></i> Mensagem direta e segura, sem exposição de dados de saúde.
                </span>
              </div>
            </div>
          )}

          <div className="mt-3">
            <button
              onClick={() => {
                setSubmittedLead(null);
                setName('');
                setPhone('');
                setLeadId(generateLeadId());
              }}
              className="btn btn-link btn-sm text-muted text-decoration-none"
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Iniciar nova triagem
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} onFocus={handleFirstInteraction} className="needs-validation">
          
          {/* Modalidade */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--azul-escuro)' }}>
              1. Modalidade Desejada
            </label>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setModality('convenio');
                  handleFirstInteraction();
                }}
                className={`btn flex-fill py-2 fw-bold rounded-3 transition-all ${
                  modality === 'convenio' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                }`}
                style={{ fontSize: '0.9rem' }}
              >
                <i className="bi bi-hospital me-1"></i> Convênio Médico
              </button>
              <button
                type="button"
                onClick={() => {
                  setModality('particular');
                  handleFirstInteraction();
                }}
                className={`btn flex-fill py-2 fw-bold rounded-3 transition-all ${
                  modality === 'particular' ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary'
                }`}
                style={{ fontSize: '0.9rem' }}
              >
                <i className="bi bi-person-check me-1"></i> Atendimento Particular
              </button>
            </div>
          </div>

          {/* Convênio Picker */}
          {modality === 'convenio' && (
            <div className="mb-3 animate__animated animate__fadeIn">
              <label htmlFor="triage-insurance" className="form-label small fw-bold text-uppercase" style={{ color: 'var(--azul-escuro)' }}>
                2. Selecione a Operadora do seu Plano
              </label>
              <select
                id="triage-insurance"
                className="form-select rounded-3 py-2"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
              >
                {INSURANCES.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>

              {/* Informative Guidance Alerts */}
              {isUnimedSelected ? (
                <div className="alert alert-warning py-2 px-3 mt-2 mb-0 small rounded-3 d-flex align-items-start border-warning">
                  <i className="bi bi-exclamation-triangle-fill text-warning me-2 mt-1 fs-6"></i>
                  <div>
                    <strong>Aviso importante:</strong> O Dr. Otto Beckedorff <strong>não aceita Unimed</strong> (nem consultas nem procedimentos). O atendimento para pacientes Unimed pode ser realizado exclusivamente na modalidade particular com recibo para reembolso.
                  </div>
                </div>
              ) : insurance.includes('Amil') ? (
                <div className="alert alert-info py-2 px-3 mt-2 mb-0 small rounded-3 d-flex align-items-start border-info bg-light">
                  <i className="bi bi-info-circle-fill text-primary me-2 mt-1"></i>
                  <div>
                    <strong>Amil em Campinas:</strong> Atendimento de consultas no Instituto Orthesen. Procedimentos e cirurgias no Hospital Vera Cruz estão sujeitos à categoria do plano e autorização prévia da operadora.
                  </div>
                </div>
              ) : (
                <div className="alert alert-light py-2 px-3 mt-2 mb-0 small rounded-3 border d-flex align-items-start">
                  <i className="bi bi-shield-check text-success me-2 mt-1"></i>
                  <div>
                    <strong>Reembolso Médico Facilitado:</strong> Consulta particular com fornecimento de nota fiscal e relatório médico para solicitação de reembolso. Procedimentos hospitalares no Vera Cruz podem ser cobertos dependendo da sua categoria.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Nome e Telefone */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="triage-name" className="form-label small fw-bold text-uppercase" style={{ color: 'var(--azul-escuro)' }}>
                {modality === 'convenio' ? '3.' : '2.'} Seu Nome Completo
              </label>
              <input
                id="triage-name"
                type="text"
                required
                placeholder="Ex: Maria da Silva"
                className="form-control rounded-3 py-2"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleFirstInteraction();
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="triage-phone" className="form-label small fw-bold text-uppercase" style={{ color: 'var(--azul-escuro)' }}>
                WhatsApp / Celular com DDD
              </label>
              <input
                id="triage-phone"
                type="tel"
                required
                placeholder="(19) 99999-9999"
                className="form-control rounded-3 py-2"
                value={phone}
                onChange={(e) => {
                  setPhone(maskPhone(e.target.value));
                  handleFirstInteraction();
                }}
              />
            </div>
          </div>

          {/* Região e Motivo Geral */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="triage-region" className="form-label small fw-bold text-uppercase" style={{ color: 'var(--azul-escuro)' }}>
                Cidade / Região
              </label>
              <select
                id="triage-region"
                className="form-select rounded-3 py-2"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="Campinas - SP">Campinas - SP</option>
                <option value="Região Metropolitana de Campinas (RMC)">Região de Campinas (RMC)</option>
                <option value="Jacutinga / Sul de Minas">Jacutinga / Sul de Minas</option>
                <option value="Outra Cidade / Telemedicina">Outra Cidade / Teleconsulta</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="triage-reason" className="form-label small fw-bold text-uppercase" style={{ color: 'var(--azul-escuro)' }}>
                Motivo Geral do Contato
              </label>
              <select
                id="triage-reason"
                className="form-select rounded-3 py-2"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferência de Contato */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--azul-escuro)' }}>
              Como prefere receber as informações?
            </label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="prefContact"
                  id="prefWhatsapp"
                  value="whatsapp"
                  checked={contactPreference === 'whatsapp'}
                  onChange={() => setContactPreference('whatsapp')}
                />
                <label className="form-check-label small" htmlFor="prefWhatsapp">
                  <i className="bi bi-whatsapp text-success me-1"></i> Mensagem no WhatsApp
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="prefContact"
                  id="prefPhone"
                  value="phone"
                  checked={contactPreference === 'phone'}
                  onChange={() => setContactPreference('phone')}
                />
                <label className="form-check-label small" htmlFor="prefPhone">
                  <i className="bi bi-telephone text-primary me-1"></i> Ligação telefônica
                </label>
              </div>
            </div>
          </div>

          {/* LGPD Consent Checkbox */}
          <div className="mb-4">
            <div className="form-check d-flex align-items-start">
              <input
                className="form-check-input me-2 mt-1"
                type="checkbox"
                id="triage-privacy"
                required
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
              />
              <label className="form-check-label text-muted small" htmlFor="triage-privacy" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                Concordo com a <Link href="/privacidade" target="_blank" className="text-decoration-underline text-primary">Política de Privacidade</Link> e autorizo o contato exclusivo da equipe do Dr. Otto Beckedorff para orientações sobre consulta médica. Seus dados estão seguros e não são compartilhados com terceiros.
              </label>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center">
              <i className="bi bi-exclamation-circle-fill me-2 fs-6"></i>
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-lg w-100 text-white fw-bold rounded-pill py-3 shadow-sm d-flex align-items-center justify-content-center transition-all"
            style={{ backgroundColor: 'var(--azul-principal)', border: 'none' }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processando triagem...
              </>
            ) : isUnimedSelected ? (
              <>
                <i className="bi bi-info-circle me-2"></i> Registrar Interesse (Apenas Particular)
              </>
            ) : (
              <>
                <i className="bi bi-check2-circle fs-5 me-2"></i> Solicitar Orientação e Agendamento
              </>
            )}
          </button>

          {/* Sub-CTAs (Phone / Doctoralia) */}
          <div className="text-center mt-3 pt-2 border-top">
            <p className="text-muted small mb-2" style={{ fontSize: '0.8rem' }}>Outros canais de agendamento disponíveis:</p>
            <div className="d-flex justify-content-center gap-3">
              <a
                href="tel:19999439824"
                onClick={handlePhoneClick}
                className="text-decoration-none small fw-bold"
                style={{ color: 'var(--azul-escuro)' }}
              >
                <i className="bi bi-telephone-fill me-1 text-primary"></i> (19) 99943-9824
              </a>
              <span className="text-muted small">•</span>
              <a
                href="https://www.doctoralia.com.br/otto-beckedorff/ortopedista-traumatologista/campinas"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDoctoraliaClick}
                className="text-decoration-none small fw-bold"
                style={{ color: 'var(--azul-escuro)' }}
              >
                <i className="bi bi-calendar2-check-fill me-1 text-info"></i> Agenda Doctoralia
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
