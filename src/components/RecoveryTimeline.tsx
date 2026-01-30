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
        title: 'Poucas horas após',
        description: 'Nas primeiras horas, o efeito do anestésico local ajuda a reduzir a dor. Em muitos casos, já há alívio inicial — mas o efeito completo costuma ser avaliado após alguns dias, conforme o tipo de medicação utilizada.',
        allowed: ['Caminhadas leves dentro de casa', 'Subir poucos degraus', 'Sentar para refeições'],
        restricted: ['Dirigir (nas primeiras 6-12h)', 'Carregar peso', 'Atividades domésticas pesadas']
    },
    {
        label: '24-48h',
        title: 'Primeiros Dias',
        description: 'Pode haver um leve desconforto no local das agulhas. É o período de maior cicatrização dos tecidos.',
        allowed: ['Retorno ao trabalho de escritório', 'Dirigir trajetos curtos', 'Banho morno'],
        restricted: ['Academia', 'Movimentos bruscos de girar ou dobrar', 'Esforço físico intenso']
    },
    {
        label: '1-2 Semanas',
        title: 'Fase de Adaptação',
        description: 'O medicamento anti-inflamatório (corticoide) atinge seu pico de ação.',
        allowed: ['Fisioterapia suave', 'Caminhadas mais longas', 'Vida social normal'],
        restricted: ['Esportes de impacto', 'Levantamento de peso excessivo']
    },
    {
        label: '1 Mês+',
        title: 'Janela de Oportunidade',
        description: 'Momento ideal para fortalecimento muscular pesado, pois a dor deve estar estabilizada.',
        allowed: ['Treino de força / Musculação', 'Corrida leve', 'Rotina completa'],
        restricted: ['Nenhuma restrição específica (salvo orientação médica)']
    }
];

export default function RecoveryTimeline() {
    const [activeStage, setActiveStage] = useState(0);

    return (
        <div className="card shadow-sm border-0 my-5 bg-white" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>
                    <i className="bi bi-calendar-check me-2"></i>
                    Linha do Tempo da Recuperação
                </h4>

                <div className="d-flex justify-content-between mb-5 position-relative pt-3 overflow-hidden">
                    <div className="position-absolute top-50 start-0 end-0 border-top translate-middle-y" style={{ zIndex: 0 }}></div>
                    {STAGES.map((stage, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveStage(index)}
                            className="position-relative d-flex flex-column align-items-center"
                            style={{ zIndex: 1, cursor: 'pointer', width: '25%' }}
                        >
                            <div
                                className={`rounded-circle d-flex align-items-center justify-content-center transition-all ${activeStage === index ? 'bg-primary text-white scale-110 shadow' : 'bg-light text-secondary'
                                    }`}
                                style={{ width: '40px', height: '40px', border: activeStage === index ? 'none' : '2px solid #dee2e6' }}
                            >
                                {index + 1}
                            </div>
                            <span className={`mt-2 small fw-bold text-center ${activeStage === index ? 'text-primary' : 'text-muted'}`}>
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

                <p className="mt-4 small text-muted text-center fst-italic">
                    *Esta é uma orientação geral. Siga sempre as recomendações específicas dadas pela equipe médica após o seu procedimento.
                </p>
            </div>
        </div>
    );
}
