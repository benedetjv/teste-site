"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HerniaMap() {
    const [step, setStep] = useState(1);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    // DADOS SIMPLIFICADOS (APENAS LABELS)
    const levels = ["L2-L3", "L3-L4", "L4-L5", "L5-S1"];

    const handleLevelSelect = (level: string) => {
        setSelectedLevel(level);
        setStep(2);
    };

    const reset = () => {
        setStep(1);
        setSelectedLevel(null);
    }

    return (
        <div className="card border-0 shadow-lg overflow-hidden my-5 rounded-4 bg-white" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-header bg-primary text-white text-center py-3 border-0">
                <h5 className="mb-0 fw-bold"><i className="bi bi-activity me-2"></i> Simulador de Sintomas</h5>
            </div>

            <div className="card-body p-4 p-md-5 text-center">
                <AnimatePresence mode="wait">

                    {/* PASSO 1: ESCOLHA DO NÍVEL */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 className="fw-bold mb-3 text-dark">O que apareceu no seu laudo?</h4>
                            <p className="text-muted mb-4">Clique na região indicada na sua ressonância:</p>

                            <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
                                {levels.map((lvl) => (
                                    <button
                                        key={lvl}
                                        onClick={() => handleLevelSelect(lvl)}
                                        className="btn btn-outline-primary btn-lg rounded-pill fw-bold hover-scale py-3"
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 border-top pt-3">
                                <p className="small text-muted mb-2">Não achou o seu nível?</p>
                                <a href="https://wa.me/5519999439824?text=Tenho hérnia em outro nível (Cervical ou Torácica), pode ajudar?"
                                    target="_blank"
                                    className="btn btn-link text-secondary text-decoration-none fw-bold"
                                >
                                    Falar com a equipe <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </motion.div>
                    )}

                    {/* PASSO 2: VALIDAÇÃO DO SINTOMA (SIMPLIFICADO) */}
                    {step === 2 && selectedLevel && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="badge bg-light text-primary mb-4 px-3 py-2 rounded-pill border border-primary border-opacity-25">
                                Nível Selecionado: <strong>{selectedLevel}</strong>
                            </span>

                            <h4 className="fw-bold mb-3 text-dark">Como é a sua dor?</h4>

                            <div className="alert alert-light border border-primary border-opacity-10 rounded-3 p-4 mb-4 shadow-sm text-center mx-auto" style={{ maxWidth: '450px' }}>
                                <i className="bi bi-lightning-charge-fill text-warning display-4 mb-3 d-block"></i>
                                <p className="mb-0 fs-5">
                                    Você sente <strong>choque, queimação</strong> ou a dor <strong>correndo para a perna</strong>?
                                </p>
                            </div>

                            <div className="d-grid gap-3 d-sm-flex justify-content-center">
                                <button
                                    onClick={() => setStep(3)}
                                    className="btn btn-primary rounded-pill px-4 py-3 fw-bold shadow-sm"
                                >
                                    Sim, sinto isso!
                                </button>
                                <button
                                    onClick={reset}
                                    className="btn btn-outline-secondary rounded-pill px-4 py-3"
                                >
                                    Não, é só local
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* PASSO 3: CONCLUSÃO / AGENDE */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="mb-3 text-success display-1">
                                <i className="bi bi-whatsapp"></i>
                            </div>

                            <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Podemos te ajudar!</h3>

                            <p className="lead text-muted mb-4 px-md-5">
                                Esses sintomas típicos de irradiação indicam que a hérnia pode estar inflamando o nervo.<br /><br />
                                <strong>O Dr. Otto é especialista em tratar exatamente esse tipo de dor</strong> sem precisar de grandes cirurgias.
                            </p>

                            <a
                                href={`https://wa.me/5519999439824?text=Olá, sofro com hérnia ${selectedLevel} e sinto dor irradiada (choque). Gostaria de agendar.`}
                                target="_blank"
                                className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow hover-lift"
                            >
                                Agendar Consulta
                            </a>

                            <div className="mt-3">
                                <button onClick={reset} className="btn btn-link text-muted btn-sm text-decoration-none">
                                    Começar de novo
                                </button>
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
