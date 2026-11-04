"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BodySelectorAssessment from './BodySelectorAssessment';

interface PainDetail {
    regionId: string;
    label: string;
    duration: string;
    type: string[];
}

export default function PreConsultationForm() {
    const [step, setStep] = useState(1); // 1: Mapping, 2: Details, 3: Exams, 4: Finalize
    const [selectedRegions, setSelectedRegions] = useState<any[]>([]);
    const [painDetails, setPainDetails] = useState<Record<string, PainDetail>>({});
    const [hasExams, setHasExams] = useState<string>('');
    const [isVeraCruz, setIsVeraCruz] = useState<string>('');
    const [hasDigitalFiles, setHasDigitalFiles] = useState<string>('');
    const [hasPortalAccess, setHasPortalAccess] = useState<string>('');

    const [examFiles, setExamFiles] = useState<File[]>([]);
    const [portalLogin, setPortalLogin] = useState('');
    const [portalPassword, setPortalPassword] = useState('');

    const [patientEmail, setPatientEmail] = useState('');
    const [patientName, setPatientName] = useState('');
    const [consentGiven, setConsentGiven] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const painTypes = [
        'Latejante / Pulsátil',
        'Queimação / Ardência',
        'Pontada / Agulhada',
        'Choque Elétrico',
        'Peso / Cansaço',
        'Formigamento / Dormência',
        'Surda / Constante',
        'Aperto / Compressão'
    ];
    const durations = ['Menos de 1 mês', '1 a 6 meses', 'Mais de 6 meses (Crônica)'];

    const handleRegionChange = (regions: any[]) => {
        setSelectedRegions(regions);
        const newDetails = { ...painDetails };
        regions.forEach(r => {
            if (!newDetails[r.id]) {
                newDetails[r.id] = {
                    regionId: r.id,
                    label: r.label,
                    duration: '',
                    type: []
                };
            }
        });
        setPainDetails(newDetails);
    };

    const updateDetail = (id: string, field: keyof PainDetail, value: any) => {
        setPainDetails(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const togglePainType = (id: string, type: string) => {
        const currentTypes = painDetails[id].type;
        const newTypes = currentTypes.includes(type)
            ? currentTypes.filter(t => t !== type)
            : [...currentTypes, type];
        updateDetail(id, 'type', newTypes);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert(`O arquivo ${file.name} é muito grande (Máx 5MB).`);
                return false;
            }
            return true;
        });
        setExamFiles(validFiles);
    };

    const generateReport = () => {
        let report = `REALTÓRIO PRÉ-CONSULTA - DR. OTTO BECKEDORFF\n\n`;
        selectedRegions.forEach(r => {
            const detail = painDetails[r.id];
            report += `📍 ${detail.label}\n`;
            report += `- Tempo: ${detail.duration || 'Não informado'}\n`;
            report += `- Características: ${detail.type.join(', ') || 'Não informado'}\n\n`;
        });

        report += `📂 EXAMES DE IMAGEM:\n`;
        if (hasExams === 'no') {
            report += `- Não possui exames no momento.\n`;
        } else {
            if (isVeraCruz === 'yes') {
                report += `- [X] Realizados no Hospital Vera Cruz (Acesso Interno)\n`;
            } else {
                if (hasDigitalFiles === 'yes') {
                    report += `- ${examFiles.length} arquivo(s) anexado(s).\n`;
                } else if (hasPortalAccess === 'yes') {
                    report += `\n🔐 DADOS DE ACESSO AO PORTAL DO PACIENTE:\n`;
                    report += `- Login/Usuário: ${portalLogin}\n`;
                    report += `- Senha: ${portalPassword}\n`;
                } else {
                    report += `- Paciente levará exames físicos ou providenciará acesso até a consulta.\n`;
                }
            }
        }

        return report;
    };

    const handleWhatsAppSend = () => {
        const report = generateReport();
        if (typeof window !== 'undefined') {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
                event: 'click_whatsapp',
                cta_name: 'preconsultation_whatsapp',
                cta_location: 'preconsultation_form',
                timestamp: new Date().toISOString()
            });
        }
        window.open(`https://wa.me/5519999439824?text=${encodeURIComponent(report)}`, '_blank');
    };

    const resetStep3 = () => {
        setIsVeraCruz('');
        setHasDigitalFiles('');
        setHasPortalAccess('');
        setExamFiles([]);
        setPortalLogin('');
        setPortalPassword('');
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    {/* Header */}
                    <div className="text-center mb-5">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 fw-bold">PROCESSO DE TRIAGEM</span>
                        <h1 className="fw-bold display-5" style={{ color: 'var(--azul-escuro)' }}>Avaliação de Precisão Pré-Consulta</h1>
                        <p className="lead text-secondary text-center mx-auto" style={{ maxWidth: '600px' }}>Preencha os detalhes para que o Dr. Otto analise seu caso antes mesmo da consulta.</p>
                    </div>

                    {/* Step Indicator */}
                    <div className="d-flex justify-content-between mb-5 px-md-5">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className="d-flex flex-column align-items-center" style={{ flex: 1 }}>
                                <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm transition-all mb-2`}
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        backgroundColor: step >= s ? 'var(--azul-medio)' : 'white',
                                        color: step >= s ? 'white' : '#ccc',
                                        border: `2px solid ${step >= s ? 'var(--azul-medio)' : '#eee'}`,
                                        fontSize: '14px'
                                    }}>
                                    {s}
                                </div>
                                <span className="small fw-bold" style={{ color: step >= s ? 'var(--azul-escuro)' : '#ccc', fontSize: '10px' }}>
                                    {s === 1 ? 'MAPA' : s === 2 ? 'DOR' : s === 3 ? 'EXAMES' : 'FIM'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                                    <div className="bg-light p-4 text-center border-bottom">
                                        <h4 className="fw-bold mb-3">Vamos começar</h4>
                                        <div className="mb-4 text-start bg-white p-3 rounded-3 shadow-sm border">
                                            <label className="form-label small fw-bold text-muted">Qual é o seu nome completo?</label>
                                            <input
                                                type="text"
                                                autoFocus
                                                placeholder="Digite seu nome aqui..."
                                                className="form-control form-control-lg border-0 bg-transparent fw-bold text-primary p-0"
                                                style={{ boxShadow: 'none' }}
                                                value={patientName}
                                                onChange={e => setPatientName(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-muted small mb-0">Agora, selecione onde você sente dor no mapa abaixo.</p>
                                    </div>
                                    <div className="p-0">
                                        <BodySelectorAssessment
                                            onSelectionChange={handleRegionChange}
                                            hideFormInSelector={true}
                                        />
                                        <div className="p-4 bg-light border-top text-end">
                                            <button
                                                disabled={selectedRegions.length === 0 || !patientName.trim()}
                                                className="btn btn-primary btn-lg rounded-pill px-5 fw-bold"
                                                onClick={() => setStep(2)}
                                                style={{ backgroundColor: 'var(--azul-escuro)' }}
                                            >
                                                Próximo <i className="bi bi-arrow-right ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
                                    <h3 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>Características da Dor</h3>
                                    {selectedRegions.map(region => (
                                        <div key={region.id} className="mb-4 p-4 rounded-4 border-start border-5 border-primary" style={{ backgroundColor: 'rgba(125, 153, 178, 0.05)' }}>
                                            <h5 className="fw-bold text-primary mb-3"><i className="bi bi-geo-alt-fill me-2"></i> {region.label}</h5>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold small text-secondary">A QUANTO TEMPO?</label>
                                                    <select className="form-select shadow-none border-0 bg-white" onChange={(e) => updateDetail(region.id, 'duration', e.target.value)}>
                                                        <option value="">Selecione...</option>
                                                        {durations.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold small text-secondary">TIPO DE DOR:</label>
                                                    <div className="d-flex flex-wrap gap-1">
                                                        {painTypes.map(t => (
                                                            <button key={t} className={`btn btn-sm rounded-pill px-3 py-1 ${painDetails[region.id].type.includes(t) ? 'btn-primary' : 'btn-outline-secondary opacity-50'}`}
                                                                onClick={() => togglePainType(region.id, t)} style={{ fontSize: '11px' }}>{t}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-between mt-5">
                                        <button className="btn btn-light rounded-pill px-4" onClick={() => setStep(1)}>Voltar</button>
                                        <button className="btn btn-primary rounded-pill px-5 fw-bold" onClick={() => setStep(3)} style={{ backgroundColor: 'var(--azul-escuro)' }}>Continuar</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="bg-white rounded-4 shadow-lg p-5 text-center">
                                    <div className="display-4 text-primary mb-4"><i className="bi bi-file-earmark-medical"></i></div>
                                    <h3 className="fw-bold mb-4">Sobre seus Exames</h3>

                                    {/* Pergunta 1: Tem Exames? */}
                                    <div className="mb-5">
                                        <p className="fw-bold mb-3">Você possui exames de imagem recentes?</p>
                                        <div className="d-flex justify-content-center gap-3">
                                            <button className={`btn btn-lg px-4 py-2 rounded-pill ${hasExams === 'yes' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => { setHasExams('yes'); resetStep3(); }}>SIM</button>
                                            <button className={`btn btn-lg px-4 py-2 rounded-pill ${hasExams === 'no' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => { setHasExams('no'); resetStep3(); }}>NÃO</button>
                                        </div>
                                    </div>

                                    {/* Pergunta 2: Vera Cruz? (Só se tem exames) */}
                                    {hasExams === 'yes' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 bg-light rounded-4 border">
                                            <p className="fw-bold mb-3">O exame foi feito no Hospital Vera Cruz?</p>
                                            <div className="d-flex justify-content-center gap-3 mb-3">
                                                <button className={`btn px-4 py-2 rounded-pill ${isVeraCruz === 'yes' ? 'btn-success text-white' : 'btn-outline-secondary'}`} onClick={() => setIsVeraCruz('yes')}>SIM</button>
                                                <button className={`btn px-4 py-2 rounded-pill ${isVeraCruz === 'no' ? 'btn-danger text-white' : 'btn-outline-secondary'}`} onClick={() => { setIsVeraCruz('no'); setHasDigitalFiles(''); }}>NÃO</button>
                                            </div>
                                            {isVeraCruz === 'yes' && <p className="text-success small fw-bold"><i className="bi bi-check-circle-fill me-1"></i> Ótimo! Temos acesso direto ao sistema.</p>}
                                        </motion.div>
                                    )}

                                    {/* Pergunta 3: Arquivos Digitais? (Só se não for Vera Cruz) */}
                                    {isVeraCruz === 'no' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 bg-light rounded-4 border">
                                            <p className="fw-bold mb-3">Você tem o arquivo digital (PDF/Imagem) do laudo?</p>
                                            <div className="d-flex justify-content-center gap-3 mb-3">
                                                <button className={`btn px-4 py-2 rounded-pill ${hasDigitalFiles === 'yes' ? 'btn-success text-white' : 'btn-outline-secondary'}`} onClick={() => setHasDigitalFiles('yes')}>SIM, TENHO</button>
                                                <button className={`btn px-4 py-2 rounded-pill ${hasDigitalFiles === 'no' ? 'btn-danger text-white' : 'btn-outline-secondary'}`} onClick={() => { setHasDigitalFiles('no'); setHasPortalAccess(''); }}>NÃO TENHO</button>
                                            </div>

                                            {hasDigitalFiles === 'yes' && (
                                                <div className="mt-3">
                                                    <label className="form-label small text-muted">Anexe seus arquivos aqui (Max 5MB un):</label>
                                                    <input type="file" multiple accept=".pdf,image/*" className="form-control" onChange={handleFileChange} />
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Pergunta 4: Portal? (Só se não tem arquivo digital) */}
                                    {hasDigitalFiles === 'no' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 bg-light rounded-4 border">
                                            <p className="fw-bold mb-3">Você tem LOGIN e SENHA do portal da clínica onde fez o exame?</p>
                                            <div className="d-flex justify-content-center gap-3 mb-3">
                                                <button className={`btn px-4 py-2 rounded-pill ${hasPortalAccess === 'yes' ? 'btn-success text-white' : 'btn-outline-secondary'}`} onClick={() => setHasPortalAccess('yes')}>SIM, TENHO</button>
                                                <button className={`btn px-4 py-2 rounded-pill ${hasPortalAccess === 'no' ? 'btn-danger text-white' : 'btn-outline-secondary'}`} onClick={() => setHasPortalAccess('no')}>NÃO TENHO</button>
                                            </div>

                                            {hasPortalAccess === 'yes' && (
                                                <div className="row g-2 mt-3 p-3 bg-white rounded-3 border">
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control form-control-sm" placeholder="Login / Usuário" value={portalLogin} onChange={e => setPortalLogin(e.target.value)} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control form-control-sm" placeholder="Senha" value={portalPassword} onChange={e => setPortalPassword(e.target.value)} />
                                                    </div>
                                                    <div className="col-12 text-muted small">*Dados enviados com segurança.</div>
                                                </div>
                                            )}

                                            {hasPortalAccess === 'no' && (
                                                <div className="alert alert-warning small mt-3">
                                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                                    Por favor, traga os exames físicos no dia da consulta ou tente recuperar o acesso digital antes do atendimento.
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    <div className="d-flex justify-content-between mt-5">
                                        <button className="btn btn-light rounded-pill px-4" onClick={() => setStep(2)}>Voltar</button>
                                        <button
                                            disabled={
                                                hasExams === '' ||
                                                (hasExams === 'yes' && isVeraCruz === '') ||
                                                (isVeraCruz === 'no' && hasDigitalFiles === '') ||
                                                (hasDigitalFiles === 'no' && hasPortalAccess === '')
                                            }
                                            className="btn btn-primary rounded-pill px-5 fw-bold"
                                            onClick={() => setStep(4)}
                                            style={{ backgroundColor: 'var(--azul-escuro)' }}
                                        >
                                            Finalizar
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="bg-white rounded-4 shadow-lg p-5">
                                    <div className="text-center mb-5">
                                        <div className="display-4 text-success mb-3"><i className="bi bi-check-circle-fill"></i></div>
                                        <h3 className="fw-bold">Avaliação Concluída</h3>
                                        <p className="text-secondary">Seu relatório está pronto. Envie agora para análise do Dr. Otto.</p>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="p-4 rounded-4 border h-100 d-flex flex-column shadow-sm bg-light">
                                                <h5 className="fw-bold mb-3"><i className="bi bi-envelope-at me-2 text-primary"></i> Enviar Analise por E-mail</h5>
                                                <p className="small text-muted flex-grow-1">O relatório será enviado instantaneamente para a equipe médica.</p>
                                                {!isEmailSent ? (
                                                    <form onSubmit={async (e) => {
                                                        e.preventDefault();
                                                        try {
                                                            // Convert files to base64
                                                            const convertFileToBase64 = (file: File): Promise<string> => {
                                                                return new Promise((resolve, reject) => {
                                                                    const reader = new FileReader();
                                                                    reader.readAsDataURL(file);
                                                                    reader.onload = () => resolve(reader.result as string);
                                                                    reader.onerror = error => reject(error);
                                                                });
                                                            };

                                                            const attachments = await Promise.all(
                                                                examFiles.map(async (file) => ({
                                                                    filename: file.name,
                                                                    content: await convertFileToBase64(file)
                                                                }))
                                                            );

                                                            const res = await fetch('/api/send', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({
                                                                    patientName,
                                                                    patientEmail,
                                                                    subject: `Pré-Consulta: ${patientName} - ${selectedRegions.map(r => r.label).join(', ')}`,
                                                                    reportContent: generateReport(),
                                                                    attachments
                                                                })
                                                            });
                                                            if (res.ok) {
                                                                setIsEmailSent(true);
                                                            } else {
                                                                alert('Erro ao enviar. Tente novamente.');
                                                            }
                                                        } catch (err) {
                                                            console.error(err);
                                                            alert('Erro de conexão.');
                                                        }
                                                    }}>

                                                        <div className="alert alert-info small mb-3">
                                                            <i className="bi bi-info-circle-fill me-2"></i>
                                                            Confirmo o envio do relatório de <strong>{patientName}</strong> para análise.
                                                        </div>

                                                        <div className="form-check mb-4">
                                                            <input className="form-check-input" type="checkbox" id="consentCheck" required checked={consentGiven} onChange={e => setConsentGiven(e.target.checked)} />
                                                            <label className="form-check-label small text-muted" htmlFor="consentCheck" style={{ fontSize: '11px', lineHeight: '1.2' }}>
                                                                Declaro que autorizo o compartilhamento desses dados médicos para fins de pré-análise clínica, estando ciente que serão enviados para a equipe do Dr. Otto Beckedorff.
                                                            </label>
                                                        </div>

                                                        <button type="submit" disabled={!consentGiven} className="btn btn-primary w-100 rounded-pill fw-bold py-3 text-uppercase" style={{ letterSpacing: '1px' }}>
                                                            Enviar Relatório <i className="bi bi-send-fill ms-2"></i>
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <div className="text-center py-4">
                                                        <div className="text-success h1 mb-3"><i className="bi bi-check-lg"></i></div>
                                                        <h5 className="fw-bold text-success">Relatório Enviado com Sucesso!</h5>
                                                        <p className="text-muted small mb-4">Nossa equipe entrará em contato em breve.</p>

                                                        {/* Convite para o Blog */}
                                                        <div className="card border-0 bg-primary bg-opacity-10 mb-4 p-3 rounded-4">
                                                            <div className="d-flex align-items-center">
                                                                <div className="display-6 text-primary me-3"><i className="bi bi-journal-medical"></i></div>
                                                                <div className="text-start">
                                                                    <h6 className="fw-bold text-primary mb-1">Enquanto aguarda...</h6>
                                                                    <p className="small text-muted mb-0" style={{ lineHeight: '1.2' }}>Visite nosso blog e tire suas dúvidas sobre tratamentos e condições ortopédicas.</p>
                                                                </div>
                                                            </div>
                                                            <a href="/blog" className="btn btn-primary w-100 rounded-pill mt-3 btn-sm fw-bold">
                                                                Ler Artigos do Blog <i className="bi bi-arrow-right ms-1"></i>
                                                            </a>
                                                        </div>

                                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => window.location.reload()}>Nova Avaliação</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mt-4 bg-light p-4 rounded-4 small text-start">
                                        <h6 className="fw-bold text-muted">PRÉVIA DO RELATÓRIO:</h6>
                                        <pre className="mb-0 mt-2 text-muted" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px' }}>{generateReport()}</pre>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <style jsx>{`
                .transform-hover:hover { transform: translateY(-3px); }
            `}</style>
        </div>
    );
}
