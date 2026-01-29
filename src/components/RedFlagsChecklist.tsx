"use client";

import React, { useState } from 'react';

const RED_FLAGS = [
    { id: 'fraqueza', label: 'Perda de força súbita nas pernas ou pés' },
    { id: 'urina', label: 'Dificuldade para controlar a urina ou fezes' },
    { id: 'febre', label: 'Febre associada à dor nas costas' },
    { id: 'peso', label: 'Perda de peso inexplicável' },
    { id: 'noite', label: 'Dor intensa que impede o sono' },
    { id: 'trauma', label: 'Dor após queda ou acidente grave' }
];

export default function RedFlagsChecklist() {
    const [selected, setSelected] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const toggleFlag = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const hasRedFlags = selected.length > 0;

    return (
        <div className="card shadow-sm border-0 my-5" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <div className="card-header bg-danger text-white p-4">
                <h4 className="mb-0 fw-bold">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Autoavaliação de Sinais de Alerta
                </h4>
            </div>
            <div className="card-body p-4 p-md-5 bg-light">
                <p className="mb-4">Selecione se você apresenta algum dos sintomas abaixo:</p>

                <div className="row g-3">
                    {RED_FLAGS.map(item => (
                        <div key={item.id} className="col-12">
                            <div
                                className={`p-3 rounded-3 border transition-all cursor-pointer d-flex align-items-center ${selected.includes(item.id)
                                    ? 'bg-white border-danger shadow-sm'
                                    : 'bg-white border-light'
                                    }`}
                                onClick={() => toggleFlag(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={`me-3 d-flex align-items-center justify-content-center border rounded-circle`} style={{
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: selected.includes(item.id) ? 'var(--danger)' : 'transparent',
                                    borderColor: selected.includes(item.id) ? 'var(--danger)' : '#dee2e6'
                                }}>
                                    {selected.includes(item.id) && <i className="bi bi-check text-white"></i>}
                                </div>
                                <span className={selected.includes(item.id) ? 'fw-bold' : ''}>{item.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setShowResult(true)}
                    className="btn btn-dark w-100 py-3 mt-4 fw-bold rounded-pill text-uppercase shadow"
                >
                    Verificar Gravidade
                </button>

                {showResult && (
                    <div className={`mt-4 p-4 rounded-3 animate__animated animate__fadeIn ${hasRedFlags ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                        <h5 className="fw-bold mb-2">
                            <i className={`bi ${hasRedFlags ? 'bi-exclamation-octagon-fill' : 'bi-check-circle-fill'} me-2`}></i>
                            {hasRedFlags ? 'Atenção Necessária' : 'Baixa Probabilidade de Gravidade'}
                        </h5>
                        <p className="mb-0">
                            {hasRedFlags
                                ? 'Você marcou um ou mais sinais de alerta. Estes sintomas exigem uma avaliação médica presencial o mais rápido possível para investigar causas graves.'
                                : 'Você não marcou sinais de alerta clássicos. No entanto, se a dor persistir ou for incapacitante, uma avaliação especializada ainda é recomendada.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
