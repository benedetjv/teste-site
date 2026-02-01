"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function MariaPlantarJourney() {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "A Maria e o 'Primeiro Passo'",
            description: "Maria acorda todos os dias com uma dor insuportável no calcanhar. O primeiro passo da cama para o chão parece um prego entrando no pé.",
            animation: "🚶‍♀️⚖️",
            button: "Ajudar a Maria"
        },
        {
            title: "Dica 1: Relaxando a fáscia",
            description: "Use uma bolinha de tênis sob a sola do pé. Role-a com pressão moderada por 5 minutos antes de dormir e logo ao acordar.",
            animation: "🎾🦶",
            button: "Próxima Dica"
        },
        {
            title: "Dica 2: Controlando a Inflamação",
            description: "A Maria agora usa uma garrafa de água congelada. Massagear a sola do pé por 10 a 15 minutos, 2x ao dia, ajuda a aliviar a inflamação.",
            animation: "🧊💧",
            button: "E se a dor continuar?"
        },
        {
            title: "A vez da Solução Real",
            description: "A amiga da Maria, que já tratou o pé, deu o caminho: a dor só resolveu de verdade com medicina de precisão.",
            animation: "👩‍⚕️✨",
            button: "Ver recomendação"
        }
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    return (
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-body p-0">
                <div className="row g-0">
                    <div className="col-lg-5 p-5 d-flex flex-column justify-content-center bg-primary text-white text-center">
                        <div className="display-1 mb-4 animate__animated animate__bounceIn">
                            {steps[step].animation}
                        </div>
                        <div className="progress mb-4" style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                            <div
                                className="progress-bar bg-white shadow-sm"
                                role="progressbar"
                                style={{ width: `${((step + 1) / steps.length) * 100}%`, transition: 'width 0.5s ease' }}
                            ></div>
                        </div>
                        <small className="text-white text-opacity-75 text-uppercase fw-bold">Passo {step + 1} de {steps.length}</small>
                    </div>
                    <div className="col-lg-7 p-5 bg-white">
                        {step < 3 ? (
                            <div className="animate__animated animate__fadeIn">
                                <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>{steps[step].title}</h3>
                                <p className="lead text-muted mb-4">{steps[step].description}</p>
                                <button
                                    onClick={nextStep}
                                    className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
                                >
                                    {steps[step].button} <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="animate__animated animate__fadeInUp text-center">
                                <div className="mb-4">
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src="/img/foto-otto.jpg"
                                            alt="Dr. Otto Beckedorff"
                                            className="rounded-circle shadow-lg border border-4 border-white"
                                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                        />
                                        <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style={{ width: '20px', height: '20px' }}></div>
                                    </div>
                                </div>
                                <h4 className="fw-bold mb-2">"O Dr. Otto me ajudou!"</h4>
                                <p className="text-muted mb-4">
                                    A amiga da Maria indicou: <strong>"Não fique só no gelo. O Dr. Otto usa infiltrações de precisão que resolvem a causa, não só o sintoma."</strong>
                                </p>
                                <div className="d-grid gap-3">
                                    <Link
                                        href="https://wa.me/5519999439824"
                                        className="btn btn-success btn-lg rounded-pill shadow-sm"
                                        target="_blank"
                                    >
                                        <i className="bi bi-whatsapp me-2"></i> Falar com o especialista
                                    </Link>
                                    <button
                                        onClick={() => setStep(0)}
                                        className="btn btn-link text-muted"
                                    >
                                        Reiniciar dicas
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .bg-gradient-primary {
                    background: linear-gradient(135deg, var(--azul-medio), var(--azul-escuro));
                }
            `}</style>
        </div>
    );
}
