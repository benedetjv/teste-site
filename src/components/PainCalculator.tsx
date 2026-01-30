"use client";

import React, { useState } from 'react';

export default function PainCalculator() {
    const [level, setLevel] = useState(5);
    const [result, setResult] = useState<React.ReactNode | null>(null);

    const calculate = () => {
        if (level < 4) {
            setResult("Sua dor é considerada leve. Manter-se ativo e com acompanhamento adequado ajuda a evitar que ela se torne crônica.");
        } else if (level < 8) {
            setResult("Sua dor é moderada e já impacta sua rotina. É recomendado uma avaliação especializada para identificar a causa exata e iniciar o tratamento antes que o quadro se agrave.");
        } else {
            setResult(
                <div>
                    <strong className="text-danger d-block mb-3"><i className="bi bi-exclamation-triangle-fill me-2"></i>ATENÇÃO – Sinais de Alerta</strong>
                    Se sua dor intensa vier acompanhada de:
                    <ul className="my-2">
                        <li>Perda de força em pernas ou braços</li>
                        <li>Dificuldade para controlar urina ou fezes</li>
                        <li>Febre</li>
                    </ul>
                    <span className="d-block fw-bold text-danger mb-3">Procure um Pronto-Socorro imediatamente.</span>
                    <hr />
                    Caso não tenha esses sintomas graves, mas a dor seja incapacitante, agende uma avaliação urgente para definirmos a melhor estratégia de controle da dor.
                </div>
            );
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
