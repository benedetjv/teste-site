"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BodySelector from './BodySelector';

// Definindo as etapas da pesquisa
const STEPS = [
    { id: 'location', title: 'Onde dói mais hoje?', type: 'body' },
    { id: 'duration', title: 'Há quanto tempo você sente essa dor?', type: 'radio', options: ['Menos de 3 meses', '3 a 6 meses', '1 a 3 anos', 'Mais de 5 a 10 anos'] },
    { id: 'doctors', title: 'Quantos profissionais você já consultou por isso?', type: 'radio', options: ['Este é o primeiro', 'Entre 2 e 3', 'Mais de 4 médicos'] },
    { id: 'fear', title: 'Qual seu maior medo em relação à dor?', type: 'radio', options: ['Precisar de cirurgia', 'Ficar dependente de remédios', 'Perder mobilidade/trabalho', 'A dor nunca passar'] },
    { id: 'treatments', title: 'O que você já tentou sem sucesso?', type: 'checkbox', options: ['Fisioterapia Convencional', 'Acupuntura', 'Quiropraxia', 'Infiltrações', 'Cirurgia prévia'] }
];

export default function PainCensus() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (key: string, value: any) => {
        setAnswers({ ...answers, [key]: value });

        // Se for checkbox, não avança automatico. Se for radio/body, avança.
        if (STEPS[currentStep].type !== 'checkbox') {
            setTimeout(() => nextStep(), 300);
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
        // Aqui poderia enviar para um Webhook ou API
        console.log("Censo Finalizado:", answers);
    };

    // Recomendação baseada na área da dor
    const getRecommendation = () => {
        const part = answers['location'] || '';

        if (part.includes('lombar') || part.includes('costas'))
            return { title: 'Estenose ou Hérnia?', link: '/blog/estenose-canal-lombar', text: 'Entenda por que sua coluna pode estar sobrecarregada.' };
        if (part.includes('cervical') || part.includes('pescoco'))
            return { title: 'Dor de Cabeça e Pescoço', link: '/blog/dor-de-cabeca-pescoco-cervical', text: 'Sua dor de cabeça pode vir do pescoço. Saiba mais.' };
        if (part.includes('joelho'))
            return { title: 'Salvar o Joelho sem Prótese', link: '/blog/protese-vs-viscossuplementacao', text: 'Descubra tratamentos modernos para artrose.' };

        return { title: 'Dor Crônica tem Solução', link: '/blog/dor-costas-cronica-faq', text: 'Conheça as opções da medicina intervencionista.' };
    };

    const rec = getRecommendation();

    if (isFinished) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-5">
                <div className="mb-4 text-success display-1">
                    <i className="bi bi-check-circle-fill"></i>
                </div>
                <h2 className="fw-bold mb-3">Obrigado pela contribuição!</h2>
                <p className="text-muted mb-4 px-md-5">
                    Sua resposta ajuda a mapear a dor crônica no Brasil. <br />
                    Com base no seu perfil, separamos esta leitura para você enquanto aguarda:
                </p>

                <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="card-body p-4">
                        <span className="badge bg-primary mb-2">Recomendado para você</span>
                        <h4 className="fw-bold fs-5 mb-3">{rec.title}</h4>
                        <p className="small text-muted mb-4">{rec.text}</p>
                        <a href={rec.link} className="btn btn-outline-primary rounded-pill w-100 fw-bold">
                            Ler Artigo Agora
                        </a>
                    </div>
                </div>
            </motion.div>
        );
    }

    const step = STEPS[currentStep];

    return (
        <div className="py-4">
            {/* Barra de Progresso */}
            <div className="progress mb-4" style={{ height: '6px' }}>
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                ></div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="fw-bold text-center mb-4" style={{ color: 'var(--azul-escuro)' }}>
                        {step.title}
                    </h3>

                    <div className="d-flex justify-content-center">
                        {step.type === 'body' && (
                            <div style={{ transform: 'scale(0.85)', marginTop: '-20px' }}>
                                <BodySelector
                                    onSelectionChange={(regions) => {
                                        if (regions.length > 0) handleAnswer('location', regions[0].label);
                                    }}
                                    hideFormInSelector={true}
                                />
                                <p className="text-center text-muted small mt-2">Toque na região da sua maior dor</p>
                            </div>
                        )}

                        {(step.type === 'radio' || step.type === 'checkbox') && (
                            <div className="w-100" style={{ maxWidth: '400px' }}>
                                {step.options?.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(step.id, opt)}
                                        className="btn btn-outline-secondary w-100 mb-2 py-3 text-start px-4 rounded-3 d-flex justify-content-between align-items-center shadow-sm bg-white border-0"
                                        style={{ transition: 'all 0.2s' }}
                                    >
                                        {opt}
                                        <i className="bi bi-chevron-right text-muted small"></i>
                                    </button>
                                ))}
                                {step.type === 'checkbox' && (
                                    <button onClick={nextStep} className="btn btn-primary w-100 mt-3 rounded-pill fw-bold py-3 shadow">
                                        Continuar <i className="bi bi-arrow-right ms-2"></i>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
