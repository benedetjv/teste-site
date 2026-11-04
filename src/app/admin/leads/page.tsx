'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface LeadItem {
  id: string; // lead_id
  ref_code?: string;
  created_at: string;
  qualified_at?: string;
  scheduled_at?: string;
  attended_at?: string;
  lost_at?: string;
  conversion_value?: number;
  version: number;
  name: string;
  phone: string;
  modality: string;
  insurance_note?: string;
  is_unimed: boolean;
  status: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_campaign?: string;
  audit_log?: Array<{ timestamp: string; previous_status: string; new_status: string; operator_email: string; reason?: string }>;
}

interface OperatorProfile {
  email: string;
  role: string;
}

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  new: ['in_progress', 'qualified', 'disqualified', 'lost'],
  in_progress: ['qualified', 'disqualified', 'lost'],
  qualified: ['appointment_scheduled', 'lost'],
  appointment_scheduled: ['consultation_attended', 'lost'],
  disqualified: [],
  consultation_attended: [],
  lost: ['in_progress']
};

export default function AdminLeadsPage() {
  const [operator, setOperator] = useState<OperatorProfile | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login form states (Individual Auth + MFA)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [challengeToken, setChallengeToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard states
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modal for consultation attended revenue
  const [attendingLead, setAttendingLead] = useState<LeadItem | null>(null);
  const [revenueInput, setRevenueInput] = useState<string>('450.00');

  // Session search and conversion states (from WhatsApp messages)
  const [unconvertedSession, setUnconvertedSession] = useState<any | null>(null);
  const [convertingSession, setConvertingSession] = useState<any | null>(null);
  const [convertName, setConvertName] = useState('');
  const [convertPhone, setConvertPhone] = useState('');
  const [convertModality, setConvertModality] = useState('particular');
  const [convertInsurance, setConvertInsurance] = useState('');
  const [convertIsSubmitting, setConvertIsSubmitting] = useState(false);

  useEffect(() => {
    checkCurrentSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkCurrentSession = async () => {
    setCheckingAuth(true);
    try {
      const res = await fetch('/api/admin/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setOperator(data.user);
          fetchLeads();
        } else {
          setOperator(null);
        }
      } else {
        setOperator(null);
      }
    } catch {
      setOperator(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Falha ao autenticar.');
      }

      if (data.mfa_required) {
        setChallengeToken(data.challenge_token);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Erro de autenticação.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/auth/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge_token: challengeToken,
          code: mfaCode
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Código MFA inválido.');
      }

      setOperator(data.user);
      setChallengeToken(null);
      setPassword('');
      setMfaCode('');
      fetchLeads();
    } catch (err: any) {
      setAuthError(err.message || 'Código MFA incorreto.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    setOperator(null);
    setLeads([]);
  };

  const fetchLeads = async (searchOverride?: string) => {
    setLoadingLeads(true);
    setActionMessage(null);
    try {
      const termToSearch = typeof searchOverride === 'string' ? searchOverride : searchTerm;
      const url = termToSearch.trim()
        ? `/api/admin/leads?search=${encodeURIComponent(termToSearch.trim())}`
        : '/api/admin/leads';
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 401) {
          setOperator(null);
          return;
        }
        throw new Error('Erro ao buscar dados.');
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setUnconvertedSession(data.unconverted_session || null);
    } catch (err: any) {
      setActionMessage(`Erro: ${err.message}`);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleConvertSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingSession) return;
    setConvertIsSubmitting(true);
    setActionMessage(null);
    try {
      const res = await fetch('/api/admin/leads?action=convert_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref_code: convertingSession.ref_code,
          name: convertName,
          phone: convertPhone,
          modality: convertModality,
          insurance_note: convertInsurance,
          is_unimed: convertingSession.is_unimed
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Falha ao converter sessão em lead.');
      }
      setConvertingSession(null);
      setUnconvertedSession(null);
      setActionMessage(`Sucesso: Sessão ${convertingSession.ref_code} convertida em lead com atribuição Google Ads preservada!`);
      fetchLeads();
    } catch (err: any) {
      setActionMessage(`Erro na conversão: ${err.message}`);
    } finally {
      setConvertIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (lead: LeadItem, newStatus: string, conversionVal?: number) => {
    setUpdatingId(lead.id);
    setActionMessage(null);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: lead.id,
          status: newStatus,
          expected_version: lead.version,
          conversion_value: conversionVal,
          reason: `Alterado para ${newStatus} pelo operador ${operator?.email}`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Falha ao atualizar status.');
      }

      setActionMessage(`Sucesso: Lead atualizado para "${newStatus}".`);
      await fetchLeads();
    } catch (err: any) {
      alert(err.message || 'Erro ao atualizar.');
    } finally {
      setUpdatingId(null);
      setAttendingLead(null);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('ATENÇÃO: Confirma a exclusão deste lead nos termos do Art. 18 da LGPD (Direito ao Esquecimento)? Esta ação é permanente e registrada na trilha de auditoria.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/leads?lead_id=${leadId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao excluir.');
      setActionMessage('Registro removido com sucesso nos termos da LGPD.');
      await fetchLeads();
    } catch (err: any) {
      alert(err.message || 'Erro na exclusão.');
    }
  };

  const handlePurgeRetention = async () => {
    if (!confirm('Deseja executar a rotina de expurgo LGPD de 180 dias? Todos os leads não convertidos com mais de 6 meses serão excluídos da base.')) {
      return;
    }

    try {
      const res = await fetch('/api/admin/leads?action=purge_retention', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao executar expurgo.');
      alert(data.message || 'Rotina concluída.');
      await fetchLeads();
    } catch (err: any) {
      alert(err.message || 'Erro ao executar expurgo.');
    }
  };

  const handleDownloadBackup = async () => {
    try {
      const res = await fetch('/api/admin/leads?action=backup');
      const data = await res.json();
      if (!res.ok) throw new Error('Falha ao gerar backup.');

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_drotto_encrypted_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
    } catch (err: any) {
      alert(err.message || 'Erro ao baixar backup.');
    }
  };

  // Filter and search
  const filteredLeads = leads.filter(l => {
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const nameMatch = l.name.toLowerCase().includes(term);
      const phoneMatch = l.phone.includes(term);
      const refMatch = l.ref_code && l.ref_code.toLowerCase().includes(term);
      return nameMatch || phoneMatch || refMatch;
    }
    return true;
  });

  if (checkingAuth) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando sessão...</span>
        </div>
      </div>
    );
  }

  // 1. LOGIN & MFA VIEW (No tokens in browser storage)
  if (!operator) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
        <div className="bg-white p-4 p-md-5 rounded-4 shadow border" style={{ maxWidth: '440px', width: '100%' }}>
          <div className="text-center mb-4">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-2">
              Acesso Restrito
            </span>
            <h1 className="h4 fw-bold text-dark">Portal da Secretária & Triagem</h1>
            <p className="text-muted small">Autenticação individual com sessão HttpOnly e MFA</p>
          </div>

          {authError && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
              <i className="bi bi-exclamation-triangle-fill me-1"></i> {authError}
            </div>
          )}

          {!challengeToken ? (
            /* Step 1: Email and Password */
            <form onSubmit={handlePasswordLogin}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">E-mail Cadastrado</label>
                <input
                  type="email"
                  required
                  className="form-control rounded-3"
                  placeholder="operador@drotto.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Senha</label>
                <input
                  type="password"
                  required
                  className="form-control rounded-3"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
              >
                {authLoading ? 'Verificando...' : 'Avançar para Segundo Fator (MFA)'}
              </button>
            </form>
          ) : (
            /* Step 2: 6-Digit TOTP MFA */
            <form onSubmit={handleVerifyMfa}>
              <div className="alert alert-info py-2 px-3 small rounded-3 mb-3">
                <i className="bi bi-shield-lock-fill me-1"></i> Insira o código de 6 dígitos gerado no seu aplicativo autenticador (Google Authenticator / 1Password).
              </div>
              <div className="mb-4 text-center">
                <label className="form-label small fw-bold text-muted d-block mb-2">Código de Autenticação (MFA)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  className="form-control form-control-lg text-center rounded-3 fw-bold letter-spacing-2"
                  style={{ letterSpacing: '8px', fontSize: '1.5rem' }}
                  placeholder="000000"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <button
                type="submit"
                disabled={authLoading || mfaCode.length !== 6}
                className="btn btn-success w-100 rounded-pill py-2 fw-bold"
              >
                {authLoading ? 'Validando MFA...' : 'Confirmar e Acessar'}
              </button>
              <button
                type="button"
                onClick={() => setChallengeToken(null)}
                className="btn btn-link btn-sm text-muted w-100 mt-2 text-decoration-none"
              >
                ← Voltar ao login
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <Link href="/" className="small text-muted text-decoration-none">
              ← Voltar ao site público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD VIEW
  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4 py-3 sticky-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold fs-5 text-dark">Dr. Otto Beckedorff</span>
            <span className="badge bg-primary text-white small">Gestão de Leads & Ads</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="small text-muted d-none d-md-inline">
              <i className="bi bi-person-check-fill text-success me-1"></i>
              Operador: <strong>{operator.email}</strong> ({operator.role})
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold"
            >
              <i className="bi bi-box-arrow-right me-1"></i> Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">
        {/* Actions Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="h4 fw-bold text-dark mb-1">Painel de Triagem e Conversões Offline</h1>
            <p className="text-muted small mb-0">Atualização do funil pós-clique e exportação oficial para o Google Ads</p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <a
              href="/api/admin/leads?format=google_ads_csv"
              download="google_ads_offline_conversions.csv"
              className="btn btn-success btn-sm rounded-pill px-3 fw-bold shadow-sm"
            >
              <i className="bi bi-file-earmark-spreadsheet me-1"></i> Exportar CSV Google Ads (Offline)
            </a>
            <a
              href="/api/admin/leads?format=enhanced_conversions_csv"
              download="google_ads_enhanced_conversions.csv"
              className="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold"
            >
              <i className="bi bi-shield-lock me-1"></i> Enhanced Conversions CSV
            </a>
            <button
              onClick={handleDownloadBackup}
              className="btn btn-outline-secondary btn-sm rounded-pill px-3"
            >
              <i className="bi bi-download me-1"></i> Backup Criptografado
            </button>
            <button
              onClick={handlePurgeRetention}
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
            >
              <i className="bi bi-trash3 me-1"></i> Expurgo LGPD (180 dias)
            </button>
          </div>
        </div>

        {actionMessage && (
          <div className="alert alert-info py-2 px-3 small rounded-3 mb-3">
            {actionMessage}
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-white p-3 rounded-4 shadow-sm border mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  placeholder="Buscar por Nome, Telefone ou [Ref: C-7K4M-9P2X-Q8RT]..."
                  className="form-control border-start-0"
                  value={searchTerm}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchTerm(val);
                    if (val.trim().toUpperCase().startsWith('C-') || val === '') {
                      fetchLeads(val);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      fetchLeads();
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="d-flex flex-wrap gap-1">
                {['all', 'new', 'in_progress', 'qualified', 'appointment_scheduled', 'consultation_attended', 'disqualified', 'lost'].map(st => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`btn btn-sm rounded-pill px-3 ${filterStatus === st ? 'btn-primary text-white fw-bold' : 'btn-light text-secondary border'}`}
                  >
                    {st === 'all' ? 'Todos' : st}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-2 text-md-end">
              <button
                onClick={() => fetchLeads()}
                disabled={loadingLeads}
                className="btn btn-sm btn-outline-primary rounded-pill px-3"
              >
                <i className="bi bi-arrow-clockwise me-1"></i> Buscar / Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* Unconverted WhatsApp Click Session Banner */}
        {unconvertedSession && (
          <div className="alert alert-warning border-warning p-4 rounded-4 shadow-sm mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="badge bg-warning text-dark fw-bold">Sessão WhatsApp Localizada</span>
                  <span className="fw-bold font-monospace fs-6 text-dark">{unconvertedSession.ref_code}</span>
                  {unconvertedSession.gclid && (
                    <span className="badge bg-success ms-1">
                      <i className="bi bi-google me-1"></i>GCLID Detectado
                    </span>
                  )}
                  {unconvertedSession.is_unimed && (
                    <span className="badge bg-danger ms-1">Unimed (Reembolso)</span>
                  )}
                </div>
                <p className="small text-dark mb-1">
                  Clique gerado em {new Date(unconvertedSession.created_at).toLocaleString('pt-BR')} • Origem: <strong>{unconvertedSession.page_path}</strong>
                </p>
                <p className="small text-muted mb-0">
                  Modalidade informada: <strong>{unconvertedSession.modality || 'Não especificada'}</strong>
                  {unconvertedSession.insurance_note ? ` (${unconvertedSession.insurance_note})` : ''} • Cobertura Vera Cruz: <strong>{unconvertedSession.coverage_vera_cruz || 'Não informada'}</strong>
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setConvertingSession(unconvertedSession);
                    setConvertName('');
                    setConvertPhone('');
                    setConvertModality(unconvertedSession.modality === 'convenio' ? 'outro_convenio' : 'particular');
                    setConvertInsurance(unconvertedSession.insurance_note || '');
                  }}
                  className="btn btn-primary fw-bold rounded-pill px-4 py-2 shadow-sm d-inline-flex align-items-center"
                >
                  <i className="bi bi-person-plus-fill me-2"></i> Converter em Lead
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Convert Session Modal */}
        {convertingSession && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title fw-bold">Converter Sessão em Lead</h5>
                  <button type="button" className="btn-close" onClick={() => setConvertingSession(null)}></button>
                </div>
                <form onSubmit={handleConvertSessionSubmit}>
                  <div className="modal-body p-4">
                    <div className="alert alert-light border small mb-3">
                      <strong>Referência:</strong> <span className="font-monospace text-primary">{convertingSession.ref_code}</span><br />
                      <strong>Atribuição Google Ads:</strong> {convertingSession.gclid ? `GCLID: ${convertingSession.gclid.slice(0, 20)}...` : 'Tráfego sem GCLID'}
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Nome do Paciente (extraído da mensagem)</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Eduardo"
                        className="form-control rounded-3"
                        value={convertName}
                        onChange={(e) => setConvertName(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">Telefone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="19999999999"
                        className="form-control rounded-3"
                        value={convertPhone}
                        onChange={(e) => setConvertPhone(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">Modalidade</label>
                      <select
                        className="form-select rounded-3"
                        value={convertModality}
                        onChange={(e) => setConvertModality(e.target.value)}
                      >
                        <option value="particular">Particular</option>
                        <option value="amil">Amil</option>
                        <option value="outro_convenio">Outro Convênio</option>
                      </select>
                    </div>

                    {convertModality === 'outro_convenio' && (
                      <div className="mb-3">
                        <label className="form-label small fw-bold">Nome do Convênio</label>
                        <input
                          type="text"
                          placeholder="Ex: Bradesco, SulAmérica..."
                          className="form-control rounded-3"
                          value={convertInsurance}
                          onChange={(e) => setConvertInsurance(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="modal-footer border-top">
                    <button type="button" className="btn btn-light rounded-pill px-3" onClick={() => setConvertingSession(null)}>Cancelar</button>
                    <button type="submit" disabled={convertIsSubmitting} className="btn btn-primary rounded-pill px-4 fw-bold">
                      {convertIsSubmitting ? 'Salvando...' : 'Salvar e Vincular ao Google Ads'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Leads Table */}
        <div className="bg-white rounded-4 shadow-sm border overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 small">
              <thead className="table-light">
                <tr>
                  <th>Data/Hora (UTC)</th>
                  <th>Paciente & Contato</th>
                  <th>Ref / Campanha</th>
                  <th>Modalidade</th>
                  <th>Status Atual</th>
                  <th>Ações Permitidas</th>
                  <th>Privacidade</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5 text-muted">
                      {loadingLeads ? 'Carregando registros...' : 'Nenhum lead encontrado com os filtros aplicados.'}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => {
                    const allowedNext = ALLOWED_TRANSITIONS[lead.status] || [];
                    return (
                      <tr key={lead.id}>
                        <td>
                          <div className="fw-bold">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            {new Date(lead.created_at).toLocaleTimeString('pt-BR')} (v{lead.version})
                          </div>
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{lead.name}</div>
                          <div className="text-muted">
                            <a href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              <i className="bi bi-whatsapp text-success me-1"></i> {lead.phone}
                            </a>
                          </div>
                        </td>
                        <td>
                          {lead.ref_code ? (
                            <span className="badge bg-secondary text-white font-monospace mb-1">{lead.ref_code}</span>
                          ) : (
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>Sem ref</span>
                          )}
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            {lead.gclid ? <span className="badge bg-success bg-opacity-10 text-success">GCLID</span> : null}
                            {lead.utm_source ? ` • ${lead.utm_source}` : ''}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${lead.is_unimed ? 'bg-danger' : lead.modality === 'amil' ? 'bg-primary' : 'bg-secondary'}`}>
                            {lead.is_unimed ? 'Unimed (Não atende)' : lead.modality}
                          </span>
                          {lead.insurance_note && (
                            <div className="text-muted text-truncate" style={{ maxWidth: '140px', fontSize: '0.72rem' }}>
                              {lead.insurance_note}
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="badge bg-dark rounded-pill px-3 py-1">
                            {lead.status}
                          </span>
                          {lead.conversion_value && (
                            <div className="text-success fw-bold mt-1" style={{ fontSize: '0.75rem' }}>
                              R$ {Number(lead.conversion_value).toFixed(2)}
                            </div>
                          )}
                        </td>
                        <td>
                          {/* Valid Transitions Only */}
                          {allowedNext.length > 0 ? (
                            <div className="d-flex flex-wrap gap-1">
                              {allowedNext.map(nxt => (
                                <button
                                  key={nxt}
                                  disabled={updatingId === lead.id}
                                  onClick={() => {
                                    if (nxt === 'consultation_attended') {
                                      setAttendingLead(lead);
                                    } else {
                                      handleUpdateStatus(lead, nxt);
                                    }
                                  }}
                                  className={`btn btn-sm py-1 px-2 rounded-3 ${
                                    nxt === 'qualified' ? 'btn-outline-primary' :
                                    nxt === 'appointment_scheduled' ? 'btn-outline-info' :
                                    nxt === 'consultation_attended' ? 'btn-outline-success fw-bold' :
                                    'btn-outline-secondary'
                                  }`}
                                  style={{ fontSize: '0.75rem' }}
                                >
                                  → {nxt}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="bi bi-check2-circle text-success me-1"></i> Estado final
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            title="Exclusão por Direito ao Esquecimento (LGPD Art. 18)"
                            className="btn btn-sm btn-outline-danger py-0 px-2 rounded"
                            style={{ fontSize: '0.72rem' }}
                          >
                            Expurgar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for consultation revenue validation */}
      {attendingLead && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg border" style={{ maxWidth: '420px', width: '100%' }}>
            <h5 className="fw-bold text-dark mb-2">Confirmar Consulta Realizada</h5>
            <p className="small text-muted mb-3">
              Informe o valor monetário real faturado na consulta de <strong>{attendingLead.name}</strong> para exportação ao Google Ads:
            </p>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Valor da Consulta (R$)</label>
              <div className="input-group">
                <span className="input-group-text">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="50000"
                  className="form-control"
                  value={revenueInput}
                  onChange={(e) => setRevenueInput(e.target.value)}
                />
              </div>
              <small className="text-muted d-block mt-1">Este valor real alimenta os lances Smart Bidding com receita autêntica.</small>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setAttendingLead(null)}
                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const val = parseFloat(revenueInput);
                  if (isNaN(val) || val <= 0) {
                    alert('Insira um valor numérico positivo válido.');
                    return;
                  }
                  handleUpdateStatus(attendingLead, 'consultation_attended', val);
                }}
                className="btn btn-sm btn-success rounded-pill px-4 fw-bold"
              >
                Confirmar Presença e Faturamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
