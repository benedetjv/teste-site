"use client";

import React, { useState } from 'react';

export default function MedicationRiskCalculator() {
    const [days, setDays] = useState(0);
    const [frequency, setFrequency] = useState('ocasional');
    const [showResult, setShowResult] = useState(false);

    const calculateRisk = () => {
        let score = 0;

        // Day factors
        if (days > 7) score += 2;
        if (days > 30) score += 3;
        if (days > 365) score += 5;

        // Frequency factors
        if (frequency === 'diaria') score += 4;
        if (frequency === 'semanal') score += 2;

        return score;
    };

    const riskScore = calculateRisk();

    const getRiskLevel = () => {
        if (riskScore < 3) return { label: 'Baixo', color: 'success', advice: 'Seu uso parece controlado, mas evite a automedicação prolongada.' };
        if (riskScore < 7) return { label: 'Moderado', color: 'warning', advice: 'O uso frequente de anti-inflamatórios pode começar a afetar seu estômago e rins. Considere uma avaliação para tratar a causa da dor.' };
        return { label: 'Alto / Crítico', color: 'danger', advice: 'Atenção! O uso crônico de anti-inflamatórios é uma das principais causas de insuficiência renal e úlceras gástricas. Uma intervenção para dor pode ser muito mais segura para seu organismo.' };
    };

    const risk = getRiskLevel();

    return (
        <div className="card shadow-sm border-0 my-5 bg-white" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-dark text-white p-4">
                <h4 className="mb-0 fw-bold">
                    <i className="bi bi-capsule me-2"></i>
                    Calculadora de Risco de Medicação
                </h4>
            </div>
            <div className="card-body p-4 p-md-5">
                <p className="text-secondary mb-4">Muitos pacientes tomam anti-inflamatórios por meses sem saber os riscos. Avalie seu perfil:</p>

                <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase">Há quanto tempo você toma remédios para dor?</label>
                    <select
                        className="form-select border-2"
                        onChange={(e) => setDays(Number(e.target.value))}
                        style={{ borderRadius: '10px' }}
                    >
                        <option value="0">Menos de 7 dias</option>
                        <option value="15">Entre 1 a 4 semanas</option>
                        <option value="60">Alguns meses (2-6)</option>
                        <option value="400">Mais de 1 ano</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase">Com que frequência?</label>
                    <div className="d-flex flex-column gap-2">
                        {['Ocasional (só na crise)', 'Semanal (2-3x na semana)', 'Diária (todos os dias)'].map((opt, i) => (
                            <div
                                key={i}
                                onClick={() => setFrequency(opt.split(' ')[0].toLowerCase().replace('á', 'a'))}
                                className={`p-3 rounded-3 border transition-all cursor-pointer ${frequency === opt.split(' ')[0].toLowerCase().replace('á', 'a') ? 'bg-light border-primary fw-bold' : 'bg-white'
                                    }`}
                                style={{ cursor: 'pointer' }}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => setShowResult(true)}
                    className="btn btn-primary w-100 py-3 mt-2 fw-bold rounded-pill shadow"
                >
                    Analisar meu Risco
                </button>

                {showResult && (
                    <div className={`mt-4 p-4 rounded-3 animate__animated animate__fadeIn bg-${risk.color} text-white`}>
                        <div className="d-flex align-items-center mb-2">
                            <span className="h5 fw-bold mb-0 me-2">Risco: {risk.label}</span>
                            <i className={`bi ${riskScore > 6 ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'}`}></i>
                        </div>
                        <p className="mb-0 small" style={{ lineHeight: '1.5' }}>{risk.advice}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
