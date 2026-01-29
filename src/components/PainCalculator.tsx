"use client";

import React, { useState } from 'react';

export default function PainCalculator() {
    const [level, setLevel] = useState(5);
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        if (level < 4) {
            setResult("Sua dor é considerada leve. Exercícios físicos e fisioterapia podem ser muito eficazes.");
        } else if (level < 8) {
            setResult("Sua dor é moderada. É recomendado uma avaliação para verificar a necessidade de intervenção medicamentosa ou infiltrações.");
        } else {
            setResult("Sua dor é intensa. Consultar um especialista é urgente para investigar as causas e planejar o bloqueio da dor.");
        }
    };

    return (
        <div className="card shadow-sm border-0 my-5 bg-light">
            <div className="card-body p-4 p-md-5">
                <h3 className="h4 font-weight-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>
                    <i className="bi bi-calculator me-2"></i>Calculadora de Nível de Dor
                </h3>

                <div className="mb-4">
                    <label className="form-label fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>De 0 a 10, qual o nível da sua dor hoje?</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        className="form-range"
                        style={{ height: '1.5rem', accentColor: 'var(--azul-medio)' }}
                    />
                    <div className="text-center mt-3">
                        <span className="display-4 fw-bold" style={{ color: 'var(--azul-medio)' }}>{level}</span>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="btn w-100 py-3 text-white fw-bold shadow-sm"
                    style={{ backgroundColor: 'var(--azul-escuro)', borderRadius: '8px', border: 'none' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--azul-medio)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--azul-escuro)'}
                >
                    Analisar meu caso
                </button>

                {result && (
                    <div className="mt-4 p-4 rounded bg-white border-start border-5 shadow-sm animate__animated animate__fadeIn" style={{ borderColor: 'var(--azul-claro)' }}>
                        <h5 className="fw-bold mb-2" style={{ color: 'var(--azul-medio)' }}>Resultado:</h5>
                        <p className="mb-0 text-dark fs-5">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
