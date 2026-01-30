"use client";

import React, { useState } from 'react';

interface Stage {
    label: string;
    title: string;
    description: string;
    allowed: string[];
    restricted: string[];
}

const STAGES: Stage[] = [
    {
        label: 'Dia 1',
        title: 'Primeiras 24h',
        description: 'Sensação esperada: Dor leve a moderada no trajeto operado. Analgésicos e repouso são fundamentais.',
        allowed: ['Caminhar em casa com apoio (curtos períodos)', 'Sentar-se para refeições'],
        restricted: ['Dirigir', 'Subir escadas repetidamente', 'Qualquer esforço físico']
    },
    {
        label: 'Dias 2-7',
        title: 'Primeira Semana',
        description: 'Sensação esperada: Melhora progressiva. Ainda pode haver dor muscular ou sensação de tensão local.',
        allowed: ['Banho completo', 'Caminhadas leves dentro de casa', 'Atividades domésticas muito leves'],
        restricted: ['Dirigir veículos (mínimo 7 dias)', 'Agachar, torcer o tronco ou dobrar-se', 'Levantar peso']
    },
    {
        label: 'Sem. 2-6',
        title: 'Reabilitação Inicia',
        description: 'Sensação esperada: Redução significativa da dor original. Pode persistir leve dor muscular ou parestesias residuais.',
        allowed: ['Dirigir curtas distâncias (após liberação)', 'Atividades de escritório / Home office', 'Início da fisioterapia orientada'],
        restricted: ['Exercícios físicos regulares', 'Movimentos de flexão/extensão exagerados', 'Academia ou corrida']
    },
    {
        label: '6 Sem. +',
        title: 'Fortalecimento',
        description: 'A melhora é progressiva ao longo de meses. O cuidado com postura e ergonomia deve continuar.',
        allowed: ['Fisioterapia ativa de fortalecimento', 'Atividades físicas leves (Musculação leve)', 'Caminhada rápida'],
        restricted: ['Esportes de contato ou impacto (até 3 meses)', 'Levantar peso acima de 10 kg']
    }
];

export default function RecoveryTimelineSurgery() {
    const [activeStage, setActiveStage] = useState(0);

    return (
        <div className="card shadow-sm border-0 my-5 bg-white" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>
                    <i className="bi bi-hospital me-2"></i>
                    Recuperação Pós-Cirúrgica
                </h4>

                <div className="d-flex justify-content-between mb-5 position-relative pt-3">
                    <div className="position-absolute top-50 start-0 end-0 border-top translate-middle-y" style={{ zIndex: 0 }}></div>
                    {STAGES.map((stage, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveStage(index)}
                            className="position-relative d-flex flex-column align-items-center"
                            style={{ zIndex: 1, cursor: 'pointer', width: '25%' }}
                        >
                            <div
                                className={`rounded-circle d-flex align-items-center justify-content-center transition-all ${activeStage === index ? 'bg-success text-white scale-110 shadow' : 'bg-light text-secondary'
                                    }`}
                                style={{ width: '40px', height: '40px', border: activeStage === index ? 'none' : '2px solid #dee2e6' }}
                            >
                                {index + 1}
                            </div>
                            <span className={`mt-2 small fw-bold text-center ${activeStage === index ? 'text-success' : 'text-muted'}`} style={{ fontSize: '0.8rem' }}>
                                {stage.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-4 rounded-3 border bg-light animate__animated animate__fadeIn">
                    <h5 className="fw-bold mb-2" style={{ color: 'var(--azul-medio)' }}>{STAGES[activeStage].title}</h5>
                    <p className="mb-4 text-secondary">{STAGES[activeStage].description}</p>

                    <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <h6 className="text-success fw-bold small text-uppercase">
                                <i className="bi bi-check-circle-fill me-1"></i> Permitido
                            </h6>
                            <ul className="list-unstyled small mb-0">
                                {STAGES[activeStage].allowed.map((item, i) => (
                                    <li key={i} className="mb-1">• {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6 className="text-danger fw-bold small text-uppercase">
                                <i className="bi bi-x-circle-fill me-1"></i> Evitar
                            </h6>
                            <ul className="list-unstyled small mb-0">
                                {STAGES[activeStage].restricted.map((item, i) => (
                                    <li key={i} className="mb-1">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="mt-4 small text-muted text-center italic">
                    *Esta é uma orientação geral para endoscopia. A reabilitação é individual e depende da avaliação médica.
                </p>
            </div>
        </div>
    );
}
