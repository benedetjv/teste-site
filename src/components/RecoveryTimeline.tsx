"use client";

import React, { useState } from 'react';

// DADOS PARA CADA TIPO DE PROCEDIMENTO
const DATA = {
    bloqueio: [
        {
            label: 'Dia 1',
            title: 'Poucas horas após',
            description: 'O efeito do anestésico local ainda é forte. Você se sente leve e com alívio imediato.',
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
    ],
    endoscopia: [
        {
            label: 'Dia 0-1',
            title: 'Alta Hospitalar',
            description: 'Você recebe alta no mesmo dia. A dor na perna costuma aliviar imediatamente após a descompressão.',
            allowed: ['Caminhar até o banheiro/cozinha', 'Sentar-se para comer', 'Usar notebook na cama'],
            restricted: ['Dirigir', 'Banhos de imersão (piscina/banheira)', 'Ficar sentado > 1h direto']
        },
        {
            label: 'Semana 1',
            title: 'Repouso Relativo',
            description: 'Focamos na cicatrização da pele (ponto) e tecidos internos. Vida tranquila em casa.',
            allowed: ['Caminhadas leves (10-15min)', 'Home Office leve', 'Trocar curativo conforme orientação'],
            restricted: ['Dirigir', 'Varrer casa/faxina', 'Carregar peso > 2kg']
        },
        {
            label: '2-4 Semanas',
            title: 'Retorno Gradual',
            description: 'Início da reabilitação e maior liberdade de movimento.',
            allowed: ['Dirigir (após liberação)', 'Fisioterapia motora', 'Volta ao trabalho presencial (sem esforço)'],
            restricted: ['Academia pesada', 'Esportes de contato', 'Torção brusca da coluna']
        },
        {
            label: 'Mês 2+',
            title: 'Vida Normal',
            description: 'A coluna está estável e o canal está livre. Hora de ganhar força.',
            allowed: ['Academia / Pilates', 'Caminhadas longas', 'Viagens'],
            restricted: ['Acompanhamento anual preventivo apenas.']
        }
    ]
};

interface Props {
    mode?: 'bloqueio' | 'endoscopia';
}

export default function RecoveryTimeline({ mode = 'bloqueio' }: Props) {
    const [activeStage, setActiveStage] = useState(0);

    // Seleciona os dados corretos (fallback para bloqueio se inválido)
    const currentStages = DATA[mode] || DATA['bloqueio'];

    return (
        <div className="card shadow-sm border-0 my-5 bg-white" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>
                    <i className="bi bi-calendar-check me-2"></i>
                    Linha do Tempo: Recuperação {mode === 'endoscopia' ? '(Endoscopia)' : '(Infiltração)'}
                </h4>

                <div className="d-flex justify-content-between mb-5 position-relative pt-3 overflow-hidden">
                    <div className="position-absolute top-50 start-0 end-0 border-top translate-middle-y" style={{ zIndex: 0 }}></div>
                    {currentStages.map((stage, index) => (
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
                            <span className={`mt-2 small fw-bold text-center ${activeStage === index ? 'text-primary' : 'text-muted'}`} style={{ fontSize: '0.8rem' }}>
                                {stage.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-4 rounded-3 border bg-light animate__animated animate__fadeIn">
                    <h5 className="fw-bold mb-2" style={{ color: 'var(--azul-medio)' }}>{currentStages[activeStage].title}</h5>
                    <p className="mb-4 text-secondary">{currentStages[activeStage].description}</p>

                    <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <h6 className="text-success fw-bold small text-uppercase">
                                <i className="bi bi-check-circle-fill me-1"></i> Permitido
                            </h6>
                            <ul className="list-unstyled small mb-0">
                                {currentStages[activeStage].allowed.map((item, i) => (
                                    <li key={i} className="mb-1">• {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6 className="text-danger fw-bold small text-uppercase">
                                <i className="bi bi-x-circle-fill me-1"></i> Evitar
                            </h6>
                            <ul className="list-unstyled small mb-0">
                                {currentStages[activeStage].restricted.map((item, i) => (
                                    <li key={i} className="mb-1">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="mt-4 small text-muted text-center fst-italic">
                    *Esta é uma estimativa média. A recuperação varia para cada paciente e técnica utilizada.
                </p>
            </div>
        </div>
    );
}
