"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
    { id: 'q1', text: 'Sinto dor há mais de 3 meses, mesmo tomando remédios.' },
    { id: 'q2', text: 'Já fiz sessões de fisioterapia, mas a dor sempre volta.' },
    { id: 'q3', text: 'Minha dor piora o meu sono ou me acorda à noite.' },
    { id: 'q4', text: 'Tenho medo de precisar de uma cirurgia grande.' },
    { id: 'q5', text: 'Sinto que estou deixando de fazer coisas que gosto por causa da dor.' },
    { id: 'q6', text: 'Já me disseram que minha dor é "coisa da idade" ou normal.' }
];

export default function TreatmentQuizSpecialist() {
    const [selected, setSelected] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const toggleOption = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleFinish = () => {
        setShowResult(true);
    };

    return (
        <div className="card shadow border-0 my-4 bg-white" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <div className="card-header bg-primary text-white p-4 text-center border-0">
                <h4 className="mb-0 fw-bold"><i className="bi bi-clipboard-pulse me-2"></i> Está na hora de procurar um especialista?</h4>
                <p className="small mb-0 mt-2 opacity-75">Marque todas as frases que combinam com você</p>
            </div>

            <div className="card-body p-4">
                {!showResult ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="d-flex flex-column gap-3 mb-4">
                            {QUESTIONS.map((q) => (
                                <div
                                    key={q.id}
                                    onClick={() => toggleOption(q.id)}
                                    className={`p-3 rounded-3 border d-flex align-items-center gap-3 cursor-pointer transition-all ${selected.includes(q.id) ? 'border-primary bg-primary bg-opacity-10' : 'border-light bg-light'}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${selected.includes(q.id) ? 'bg-primary text-white' : 'bg-white border'}`} style={{ width: '24px', height: '24px' }}>
                                        {selected.includes(q.id) && <i className="bi bi-check-lg small"></i>}
                                    </div>
                                    <span className={selected.includes(q.id) ? 'fw-bold text-primary' : 'text-secondary'}>{q.text}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm"
                            onClick={handleFinish}
                            disabled={selected.length === 0}
                        >
                            VER RESULTADO <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                        <div className="mb-4">
                            <i className="bi bi-shield-check text-success display-1"></i>
                        </div>
                        <h4 className="fw-bold text-dark mb-3">Sua saúde precisa de atenção especializada.</h4>

                        <p className="text-secondary mb-4 px-md-5">
                            Você assinalou <b>{selected.length}</b> sinais que indicam que a sua dor não está sendo tratada na raiz.
                            <br /><br />
                            A boa notícia é que casos como o seu costumam ter <b>excelente resposta</b> à medicina intervencionista, muitas vezes sem necessidade de cirurgias agressivas.
                        </p>

                        <div className="p-3 bg-light rounded-3 border mb-4 text-start">
                            <small className="text-muted d-block mb-2 fw-bold text-uppercase">O próximo passo ideal:</small>
                            <p className="mb-0 text-dark small">
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                Agendar uma avaliação completa para identificar a origem exata da dor e traçar um plano de tratamento personalizado.
                            </p>
                        </div>

                        <a
                            href="https://wa.me/5519999439824?text=Olá,%20fiz%20o%20quiz%20no%20site%20e%20gostaria%20de%20agendar%20uma%20avaliação."
                            target="_blank"
                            className="btn btn-success w-100 py-3 rounded-pill fw-bold shadow pulse-button"
                        >
                            <i className="bi bi-whatsapp me-2"></i>
                            FALAR COM DR. OTTO AGORA
                        </a>
                        <button className="btn btn-link text-muted mt-3 text-decoration-none small" onClick={() => { setShowResult(false); setSelected([]); }}>
                            Refazer o teste
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
