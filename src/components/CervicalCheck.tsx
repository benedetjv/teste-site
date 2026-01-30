"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CervicalCheck() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            text: "A sua dor começa na nuca (atrás da cabeça) e 'sobe' para a testa ou olhos?",
            weight: 1
        },
        {
            text: "Mexer o pescoço ou ficar muito tempo no celular/computador piora a dor?",
            weight: 1
        },
        {
            text: "A dor costuma ser mais forte de um lado só da cabeça?",
            weight: 1
        }
    ];

    const handleAnswer = (isYes: boolean) => {
        if (isYes) setScore(score + 1);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(3); // Result
        }
    };

    const reset = () => {
        setStep(0);
        setScore(0);
    };

    return (
        <div className="card border-0 shadow-lg overflow-hidden my-5 rounded-4 bg-white mx-auto" style={{ maxWidth: '600px' }}>
            <div className="card-header bg-dark text-white text-center py-3 border-0">
                <h5 className="mb-0 fw-bold"><i className="bi bi-search me-2"></i> Rastreador de Dor de Cabeça</h5>
            </div>

            <div className="card-body p-4 p-md-5 text-center">
                <AnimatePresence mode="wait">

                    {step < 3 ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h5 className="text-primary text-uppercase small fw-bold ls-1 mb-3">Pergunta {step + 1} de 3</h5>
                            <h3 className="fw-bold mb-5 text-dark" style={{ minHeight: '80px' }}>
                                {questions[step].text}
                            </h3>

                            <div className="d-flex justify-content-center gap-3">
                                <button
                                    onClick={() => handleAnswer(true)}
                                    className="btn btn-primary btn-lg rounded-pill px-5 fw-bold hover-scale"
                                    style={{ minWidth: '140px' }}
                                >
                                    SIM
                                </button>
                                <button
                                    onClick={() => handleAnswer(false)}
                                    className="btn btn-outline-secondary btn-lg rounded-pill px-5 fw-bold hover-scale"
                                    style={{ minWidth: '140px' }}
                                >
                                    NÃO
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {score >= 2 ? (
                                <>
                                    <div className="mb-3 text-warning display-1"><i className="bi bi-person-check-fill"></i></div>
                                    <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Alta Probabilidade Cervical</h3>
                                    <p className="lead text-muted mb-4">
                                        Seus sintomas indicam que a dor de cabeça pode estar vindo de <strong>inflamação no pescoço</strong> (Cefaleia Cervicogênica), e não de uma enxaqueca comum.
                                    </p>
                                    <div className="alert alert-light border border-success p-3 mb-4 rounded-3 text-start">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Isso é uma <strong>boa notícia</strong>: significa que tratar as articulações do pescoço (sem remédios fortes) pode eliminar a dor.
                                    </div>
                                    <a
                                        href={`https://wa.me/5519999439824?text=Olá, fiz o teste e minha dor de cabeça parece vir do pescoço. Gostaria de avaliar.`}
                                        target="_blank"
                                        className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow hover-lift"
                                    >
                                        Agendar Avaliação do Pescoço
                                    </a>
                                </>
                            ) : (
                                <>
                                    <div className="mb-3 text-secondary display-1"><i className="bi bi-question-circle"></i></div>
                                    <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Pode ser Enxaqueca</h3>
                                    <p className="lead text-muted mb-4">
                                        Seus sintomas são mistos. Pode ser uma enxaqueca clássica ou ter um gatilho muscular.
                                    </p>
                                    <p className="mb-4">
                                        Ainda assim, uma avaliação médica é essencial para descartar compressões nervosas ou outras causas.
                                    </p>
                                    <a
                                        href={`https://wa.me/5519999439824?text=Olá, tenho dor de cabeça frequente e gostaria de uma avaliação especializada.`}
                                        target="_blank"
                                        className="btn btn-outline-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm hover-lift"
                                    >
                                        Falar com Consultor
                                    </a>
                                </>
                            )}

                            <div className="mt-4">
                                <button onClick={reset} className="btn btn-link text-muted btn-sm text-decoration-none">Refazer</button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            <style jsx>{`
        .hover-scale { transition: transform 0.2s; }
        .hover-scale:hover { transform: scale(1.05); }
        .hover-lift { transition: transform 0.3s, box-shadow 0.3s; }
        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important; }
      `}</style>
        </div>
    );
}
