"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BodySelector from './BodySelector';
import { Region } from '@/constants/regions';

// Configuração das Perguntas
const STEPS = [
    {
        id: 'location',
        title: 'Onde dói? (Pode marcar mais de um)',
        type: 'body',
        multiple: true
    },
    {
        id: 'painLevel',
        title: 'De 0 a 10, qual a intensidade da sua dor hoje?',
        type: 'slider',
        min: 0, max: 10
    },
    {
        id: 'duration',
        title: 'Há quanto tempo você sente essa dor?',
        type: 'radio',
        options: ['Menos de 3 meses', '3 a 6 meses', '1 a 3 anos', 'Mais de 5 a 10 anos']
    },
    {
        id: 'impact',
        title: 'Como essa dor afeta sua vida? (Marque todos)',
        type: 'checkbox',
        options: ['Atrapalha meu sono', 'Limita meu trabalho', 'Me impede de fazer exercícios', 'Afeta meu humor/irritação', 'Prejudica minha vida social']
    },
    {
        id: 'diagnosis',
        title: 'Você já tem algum diagnóstico confirmado?',
        type: 'radio',
        options: ['Sim, por exame de imagem', 'Sim, apenas clínico', 'Não, nunca investiguei a fundo', 'Tenho dúvida sobre o diagnóstico']
    },
    {
        id: 'treatments',
        title: 'O que você já tentou sem sucesso?',
        type: 'checkbox',
        options: ['Fisioterapia Convencional', 'Acupuntura', 'Quiropraxia', 'Remédios (Anti-inflamatórios)', 'Infiltrações', 'Cirurgia']
    },
    {
        id: 'fear',
        title: 'Qual seu maior receio hoje?',
        type: 'radio',
        options: ['Ter que operar', 'Ficar dependente de remédios', 'Perder a mobilidade no futuro', 'A dor ser "psicológica"']
    }
];

export default function PainCensus() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [isFinished, setIsFinished] = useState(false);
    const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);

    const step = STEPS[currentStep];

    const handleAnswer = (key: string, value: any) => {
        // Se for Radio, substitui. Se for Checkbox, adiciona/remove.
        if (step.type === 'checkbox') {
            const currentList = answers[key] || [];
            if (currentList.includes(value)) {
                setAnswers({ ...answers, [key]: currentList.filter((v: any) => v !== value) });
            } else {
                setAnswers({ ...answers, [key]: [...currentList, value] });
            }
        } else {
            setAnswers({ ...answers, [key]: value });
            // Avança automático apenas se for Radio simples
            if (step.type === 'radio') {
                setTimeout(() => nextStep(), 300);
            }
        }
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            finishCensus();
        }
    };

    const finishCensus = () => {
        setIsFinished(true);
        console.log("Censo Finalizado:", answers, selectedRegions);
    };

    // Recomendação Inteligente
    const getRecommendation = () => {
        const regionsLabels = selectedRegions.map(r => r.label.toLowerCase()).join(' ');
        const painHigh = (answers['painLevel'] || 0) > 7;

        if (regionsLabels.includes('lombar') || regionsLabels.includes('costas'))
            return { title: 'Dor Lombar Persistente', link: '/blog/estenose-canal-lombar', text: painHigh ? 'Para dores intensas, entenda a Descompressão.' : 'Veja como evitar que vire uma hérnia.' };

        if (regionsLabels.includes('cervical') || regionsLabels.includes('pescoço'))
            return { title: 'Cervical e Dor de Cabeça', link: '/blog/dor-de-cabeca-pescoco-cervical', text: 'Sua dor pode estar vindo de uma tensão nucal.' };

        if (regionsLabels.includes('joelho'))
            return { title: 'Joelho: Operar ou Tratar?', link: '/blog/protese-vs-viscossuplementacao', text: 'Saiba quando a infiltração salva o joelho.' };

        return { title: 'Vencendo a Dor Crônica', link: '/blog/dor-costas-cronica-faq', text: 'Entenda as opções da medicina moderna para o seu caso.' };
    };

    const rec = getRecommendation();

    if (isFinished) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-5">
                <div className="mb-4 text-success display-1">
                    <i className="bi bi-file-earmark-bar-graph"></i>
                </div>
                <h2 className="fw-bold mb-3">Pesquisa Concluída!</h2>
                <p className="text-muted mb-4 px-md-5">
                    Seus dados foram computados anonimamente. <br />
                    Como agradecimento pela participação, liberamos este conteúdo especial para você:
                </p>

                <div className="card border-0 shadow-lg mx-auto overflow-hidden" style={{ maxWidth: '400px' }}>
                    <div className="bg-primary p-2"></div>
                    <div className="card-body p-4">
                        <span className="badge bg-light text-primary border mb-3">Leitura Recomendada</span>
                        <h4 className="fw-bold fs-5 mb-3">{rec.title}</h4>
                        <p className="small text-muted mb-4">{rec.text}</p>
                        <a href={rec.link} className="btn btn-primary rounded-pill w-100 fw-bold shadow-sm">
                            Ler Agora
                        </a>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Calcular progresso
    const progress = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <div className="py-2">
            {/* Barra de Progresso */}
            <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                <span className="small text-muted fw-bold">Questão {currentStep + 1} de {STEPS.length}</span>
                <span className="small text-primary fw-bold">{Math.round(progress)}%</span>
            </div>
            <div className="progress mb-4 rounded-pill" style={{ height: '8px', backgroundColor: '#e9ecef' }}>
                <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
                ></div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="d-flex flex-column align-items-center"
                >
                    <h4 className="fw-bold text-center mb-4 px-3" style={{ color: 'var(--azul-escuro)' }}>
                        {step.title}
                    </h4>

                    {/* RENDERIZADOR DE TIPOS DE PERGUNTA */}

                    {/* TIPO: MAPA (BODY) */}
                    {step.type === 'body' && (
                        <div className="w-100 body-selector-wrapper">
                            {/* Wrapper com max-width para não estourar */}
                            <div className="mx-auto" style={{ maxWidth: '100%' }}>
                                <BodySelector
                                    onSelectionChange={(regions) => {
                                        setSelectedRegions(regions);
                                        const labels = regions.map(r => r.label);
                                        setAnswers({ ...answers, [step.id]: labels });
                                    }}
                                    hideFormInSelector={true}
                                    simplifiedMode={true} // Modo simplificado (sem textos extras)
                                />
                            </div>
                            <div className="text-center mt-3">
                                <p className="small text-muted mb-3">Selecione todos os pontos dolorosos.</p>
                                <button
                                    onClick={nextStep}
                                    disabled={selectedRegions.length === 0}
                                    className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm"
                                >
                                    Confirmar Pontos <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TIPO: RADIO (Única Escolha) */}
                    {step.type === 'radio' && (
                        <div className="w-100" style={{ maxWidth: '400px' }}>
                            {step.options?.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(step.id, opt)}
                                    className={`btn w-100 mb-2 py-3 text-start px-4 rounded-3 d-flex justify-content-between align-items-center border-0 shadow-sm transition-all
                                        ${answers[step.id] === opt ? 'bg-primary text-white' : 'bg-white text-dark hover-bg-light'}
                                    `}
                                >
                                    {opt}
                                    {answers[step.id] === opt && <i className="bi bi-check-circle-fill"></i>}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* TIPO: CHECKBOX (Múltipla Escolha) */}
                    {step.type === 'checkbox' && (
                        <div className="w-100" style={{ maxWidth: '400px' }}>
                            {step.options?.map((opt, i) => {
                                const isSelected = (answers[step.id] || []).includes(opt);
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(step.id, opt)}
                                        className={`btn w-100 mb-2 py-3 text-start px-4 rounded-3 d-flex justify-content-between align-items-center border transition-all
                                            ${isSelected ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'border-light bg-white text-dark shadow-sm'}
                                        `}
                                    >
                                        <span>
                                            <i className={`bi ${isSelected ? 'bi-check-square-fill' : 'bi-square'} me-2`}></i>
                                            {opt}
                                        </span>
                                    </button>
                                );
                            })}
                            <button onClick={nextStep} className="btn btn-primary w-100 mt-3 rounded-pill fw-bold py-3 shadow">
                                Continuar <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    )}

                    {/* TIPO: SLIDER (0-10) */}
                    {step.type === 'slider' && (
                        <div className="w-100 px-3" style={{ maxWidth: '400px' }}>
                            <div className="text-center mb-4">
                                <span className="display-1 fw-bold" style={{ color: (answers[step.id] || 0) > 7 ? 'var(--vermelho-alerta)' : 'var(--azul-medio)' }}>
                                    {answers[step.id] ?? 5}
                                </span>
                                <p className="text-muted small">Nível de Dor</p>
                            </div>
                            <input
                                type="range"
                                className="form-range custom-range"
                                min="0" max="10"
                                value={answers[step.id] ?? 5}
                                onChange={(e) => handleAnswer(step.id, parseInt(e.target.value))}
                                style={{ height: '30px' }}
                            />
                            <div className="d-flex justify-content-between text-muted small px-1 mb-4">
                                <span>0 (Sem dor)</span>
                                <span>10 (Insuportável)</span>
                            </div>
                            <button onClick={nextStep} className="btn btn-primary w-100 rounded-pill fw-bold py-3 shadow">
                                Confirmar Nível <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    )}

                </motion.div>
            </AnimatePresence>

            <style jsx>{`
                .hover-bg-light:hover { background-color: #f8f9fa !important; transform: translateX(5px); }
                .custom-range::-webkit-slider-thumb { background: var(--azul-escuro); box-shadow: 0 0 10px rgba(0,0,0,0.2); }
                .body-selector-wrapper :global(.card) { border: none !important; box-shadow: none !important; background: transparent !important; }
            `}</style>
        </div>
    );
}
