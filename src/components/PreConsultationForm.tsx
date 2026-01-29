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
    const [examFiles, setExamFiles] = useState<File[]>([]);
    const [patientEmail, setPatientEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const painTypes = ['Formigamento', 'Pontada', 'Queimação', 'Peso', 'Choque', 'Focada', 'Irradiada'];
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

    const generateReport = () => {
        let report = `REALTÓRIO PRÉ-CONSULTA - DR. OTTO BECKEDORFF\n\n`;
        selectedRegions.forEach(r => {
            const detail = painDetails[r.id];
            report += `📍 ${detail.label}\n`;
            report += `- Tempo: ${detail.duration || 'Não informado'}\n`;
            report += `- Características: ${detail.type.join(', ') || 'Não informado'}\n\n`;
        });
        report += `📂 EXAMES DE IMAGEM: ${hasExams === 'yes' ? 'Sim, possui exames.' : 'Não possui exames no momento.'}\n`;
        return report;
    };

    const handleWhatsAppSend = () => {
        const report = generateReport();
        window.open(`https://wa.me/5519999439824?text=${encodeURIComponent(report)}`, '_blank');
    };

    const handleEmailSimulation = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEmailSent(true);
        // Simulation: in a real app, send back to dr.otto@email.com via API
        console.log("Sending report to dr.otto@email.com from patient:", patientEmail);
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
                                        <h4 className="fw-bold mb-0">Localização da Dor</h4>
                                        <p className="text-muted small mb-0">Selecione onde você sente dor no mapa abaixo.</p>
                                    </div>
                                    <div className="p-0">
                                        <BodySelectorAssessment
                                            onSelectionChange={handleRegionChange}
                                            hideFormInSelector={true}
                                        />
                                        <div className="p-4 bg-light border-top text-end">
                                            <button
                                                disabled={selectedRegions.length === 0}
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
                                    <h3 className="fw-bold mb-4">Você possui exames de imagem?</h3>
                                    <div className="d-flex justify-content-center gap-3 mb-5">
                                        <button className={`btn btn-lg px-5 py-3 rounded-4 ${hasExams === 'yes' ? 'btn-primary' : 'btn-outline-light text-dark border'}`} onClick={() => setHasExams('yes')}>SIM</button>
                                        <button className={`btn btn-lg px-5 py-3 rounded-4 ${hasExams === 'no' ? 'btn-primary' : 'btn-outline-light text-dark border'}`} onClick={() => setHasExams('no')}>NÃO</button>
                                    </div>
                                    {hasExams === 'yes' && (
                                        <div className="p-4 bg-light rounded-4 mb-4 border-2 border-dashed">
                                            <p className="small text-muted mb-3">Favor anexar arquivos (PDF/Imagem)</p>
                                            <input type="file" multiple className="form-control" onChange={(e) => setExamFiles(Array.from(e.target.files || []))} />
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-between mt-5">
                                        <button className="btn btn-light rounded-pill px-4" onClick={() => setStep(2)}>Voltar</button>
                                        <button disabled={!hasExams} className="btn btn-primary rounded-pill px-5 fw-bold" onClick={() => setStep(4)} style={{ backgroundColor: 'var(--azul-escuro)' }}>Finalizar</button>
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
                                        <p className="text-secondary">Escolha como deseja enviar o seu relatório ao Dr. Otto.</p>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 border h-100 d-flex flex-column shadow-sm">
                                                <h5 className="fw-bold mb-3"><i className="bi bi-envelope-at me-2 text-primary"></i> Enviar por E-mail</h5>
                                                <p className="small text-muted flex-grow-1">O relatório será enviado diretamente para a nossa equipe médica analisar.</p>
                                                {!isEmailSent ? (
                                                    <form onSubmit={handleEmailSimulation}>
                                                        <input type="email" required placeholder="Seu e-mail" className="form-control mb-2 rounded-pill" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} />
                                                        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">ENVIAR AGORA</button>
                                                    </form>
                                                ) : (
                                                    <div className="alert alert-success py-2 small rounded-pill text-center mt-2">Relatório enviado com sucesso!</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 border h-100 d-flex flex-column shadow-sm" style={{ borderColor: '#25D366' }}>
                                                <h5 className="fw-bold mb-3"><i className="bi bi-whatsapp me-2 text-success"></i> Via WhatsApp</h5>
                                                <p className="small text-muted flex-grow-1">Envie o relatório e fale com nossa secretária agora mesmo.</p>
                                                <button onClick={handleWhatsAppSend} className="btn btn-success w-100 rounded-pill fw-bold" style={{ backgroundColor: '#25D366', border: 'none' }}>ABRIR WHATSAPP</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 bg-light p-4 rounded-4 small">
                                        <h6 className="fw-bold">VISUALIZAÇÃO DO RELATÓRIO:</h6>
                                        <pre className="mb-0 mt-2" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', opacity: 0.7 }}>{generateReport()}</pre>
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
