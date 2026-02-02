"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Region = 'ombro' | 'cotovelo' | 'calcanhar' | 'lombar' | 'nenhuma';

interface Symptom {
    id: string;
    label: string;
}

const symptomsByRegion: Record<Region, Symptom[]> = {
    ombro: [
        { id: 'dor-cabeca', label: 'Dor para levantar o braço acima da cabeça?' },
        { id: 'dor-noite', label: 'Dor que piora à noite, ao deitar?' },
        { id: 'fraqueza-smash', label: 'Perda de força ou dificuldade em movimentos como saque ou smash?' },
    ],
    cotovelo: [
        { id: 'dor-objetos', label: 'Dor ao segurar objetos, pegar peso ou segurar a raquete?' },
        { id: 'dor-lateral', label: 'Dor na lateral externa do cotovelo que piora com esforço?' },
        { id: 'dificuldade-macaneta', label: 'Dificuldade em girar maçanetas ou abrir potes?' },
    ],
    calcanhar: [
        { id: 'dor-acordar', label: 'Dor ao acordar, ao colocar o pé no chão?' },
        { id: 'agulhada', label: 'Sensação de agulhada no calcanhar?' },
        { id: 'dor-pular', label: 'Dor ao correr ou pular na areia?' },
    ],
    lombar: [
        { id: 'dor-pos-jogo', label: 'Dor que aparece após jogar, ao ficar muito tempo em pé?' },
        { id: 'dor-irradiada', label: 'Dor que irradia para glúteo ou perna?' },
        { id: 'travamento', label: 'Travamentos nas costas ao sacar ou se agachar?' },
    ],
    nenhuma: []
};

const resultsByRegion: Record<Region, { title: string; hint: string; description: string }> = {
    ombro: {
        title: "Tendinopatia do Manguito Rotador",
        hint: "Essa lesão é comum em esportes de raquete e pode responder muito bem a tratamentos modernos como bloqueios, infiltrações guiadas ou radiofrequência.",
        description: "Mas atenção: é necessário exame físico e de imagem para confirmar."
    },
    cotovelo: {
        title: "Epicondilite Lateral (Cotovelo de Tenista)",
        hint: "Há técnicas como infiltrações regenerativas e liberação do nervo radial que podem acelerar sua recuperação.",
        description: "Confirme seu diagnóstico com consulta especializada com o Dr. Otto."
    },
    calcanhar: {
        title: "Fascite Plantar ou sobrecarga na fáscia do pé",
        hint: "Tratamentos como infiltrações guiadas e reeducação biomecânica auxiliam no retorno mais rápido às quadras.",
        description: "Agende uma consulta para avaliação e plano individualizado."
    },
    lombar: {
        title: "Origem Facetária ou Discogênica",
        hint: "Há alternativas não cirúrgicas como bloqueios, viscossuplementação lombar e radiofrequência.",
        description: "Marque consulta com o Dr. Otto para diagnóstico de precisão."
    },
    nenhuma: {
        title: "Resultado inconclusivo",
        hint: "Sua dor não se encaixa nos padrões mais comuns de lesão no Beach Tennis.",
        description: "Por isso, uma avaliação presencial é essencial para entender a causa e traçar o melhor plano."
    }
};

export default function BeachTennisSymptomTester() {
    const [step, setStep] = useState(1);
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    const handleRegionSelect = (region: Region) => {
        setSelectedRegion(region);
        if (region === 'nenhuma') {
            setStep(3);
        } else {
            setStep(2);
        }
    };

    const handleSymptomToggle = (id: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const reset = () => {
        setStep(1);
        setSelectedRegion(null);
        setSelectedSymptoms([]);
    };

    return (
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5 bg-white">
            <div className="card-header bg-primary text-white text-center py-4 border-0">
                <h4 className="fw-bold mb-0">Teste Interativo de Sintomas</h4>
                <p className="small mb-0 opacity-75">Identifique suas dores no Beach Tennis</p>
            </div>

            <div className="card-body p-4 p-lg-5">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h5 className="fw-bold mb-4 text-center">Etapa 1 – Onde você sente dor ao jogar?</h5>
                            <div className="row g-3 justify-content-center">
                                {[
                                    { id: 'ombro', label: 'Ombro', icon: '👤' },
                                    { id: 'cotovelo', label: 'Cotovelo', icon: '💪' },
                                    { id: 'calcanhar', label: 'Calcanhar / Sola', icon: '🦶' },
                                    { id: 'lombar', label: 'Lombar', icon: '🧘' },
                                    { id: 'nenhuma', label: 'Não tenho certeza', icon: '❓' }
                                ].map((item) => (
                                    <div key={item.id} className="col-12 col-md-6 col-lg-4">
                                        <button
                                            onClick={() => handleRegionSelect(item.id as Region)}
                                            className="btn btn-outline-primary w-100 py-3 rounded-4 d-flex align-items-center justify-content-center gap-2 hover-lift"
                                        >
                                            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                            <span className="fw-bold">{item.label}</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && selectedRegion && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h5 className="fw-bold mb-4 text-center">Etapa 2 – Sintomas específicos</h5>
                            <p className="text-center text-muted mb-4 small">Selecione os sintomas que você sente no(a) <strong>{selectedRegion}</strong>:</p>

                            <div className="d-flex flex-column gap-3 mb-5 mx-auto" style={{ maxWidth: '500px' }}>
                                {symptomsByRegion[selectedRegion].map(symptom => (
                                    <div
                                        key={symptom.id}
                                        onClick={() => handleSymptomToggle(symptom.id)}
                                        className={`p-3 border rounded-4 cursor-pointer transition-all d-flex align-items-center gap-3 ${selectedSymptoms.includes(symptom.id) ? 'bg-primary border-primary text-white shadow-sm' : 'bg-light border-light text-dark hover-bg-white'}`}
                                    >
                                        <div className={`rounded-circle border d-flex align-items-center justify-content-center shadow-sm ${selectedSymptoms.includes(symptom.id) ? 'bg-white text-primary border-white' : 'bg-white border-primary'}`} style={{ width: '24px', height: '24px', flexShrink: 0 }}>
                                            {selectedSymptoms.includes(symptom.id) && <i className="bi bi-check-lg" style={{ fontSize: '14px' }}></i>}
                                        </div>
                                        <span className="small fw-medium">{symptom.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => setStep(3)}
                                    className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm hover-lift"
                                    disabled={selectedSymptoms.length === 0}
                                >
                                    Ver Resultado <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                                <button onClick={() => setStep(1)} className="btn btn-link d-block mx-auto mt-3 text-muted small text-decoration-none">Voltar</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && selectedRegion && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="mb-4">
                                <span className="badge bg-success-subtle text-success px-4 py-2 rounded-pill fw-bold mb-3 shadow-sm border border-success border-opacity-25">RESULTADO POSSÍVEL</span>
                                <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>{resultsByRegion[selectedRegion].title}</h3>
                                <div className="p-4 bg-light rounded-4 mb-4 border shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                                    <p className="mb-0 text-dark opacity-90">{resultsByRegion[selectedRegion].hint}</p>
                                </div>
                                <p className="text-muted small mb-5">
                                    <i className="bi bi-info-circle me-2"></i>
                                    {resultsByRegion[selectedRegion].description}
                                </p>
                            </div>

                            <div className="card border-0 bg-primary bg-opacity-10 rounded-4 p-4 p-lg-5 mb-5 shadow-sm">
                                <h4 className="fw-bold mb-3">Deseja marcar uma consulta com o Dr. Otto Beckedorff?</h4>
                                <p className="text-muted mb-4">Receba uma avaliação individualizada e conheça os tratamentos modernos que podem acelerar seu retorno à quadra.</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-center">
                                    <Link
                                        href="https://wa.me/5519999439824"
                                        className="btn btn-success btn-lg rounded-pill px-5 shadow-sm hover-lift"
                                        target="_blank"
                                    >
                                        <i className="bi bi-whatsapp me-2"></i> Agendar sua consulta
                                    </Link>
                                    <button
                                        onClick={reset}
                                        className="btn btn-outline-primary btn-lg rounded-pill px-4"
                                    >
                                        Refazer Teste
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .hover-lift { transition: all 0.2s ease; }
                .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important; }
                .hover-bg-white:hover { background-color: white !important; border-color: #dee2e6 !important; }
                .cursor-pointer { cursor: pointer; }
            `}</style>
        </div>
    );
}
