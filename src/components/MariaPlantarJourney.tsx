"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function MariaPlantarJourney() {
    const [step, setStep] = useState(0);

    const dialogues = [
        {
            character1: { name: "Maria", text: "Júlia, eu não aguento mais... O primeiro passo do dia parece um prego entrando no meu calcanhar!", avatar: "😫" },
            character2: { name: "Júlia", text: "Eu sei exatamente como é, Maria! Você está seguindo as orientações de gelo e massagem que o doutor passou?", avatar: "🙋‍♀️" },
            background: "bg-light",
            button: "O que ela respondeu?"
        },
        {
            character1: { name: "Maria", text: "Estou fazendo tudo: massagem com bolinha e garrafa de gelo todo dia, mas a dor continua me travando.", avatar: "🦶🧊" },
            character2: { name: "Júlia", text: "Eu estava exatamente assim também! Fazia o milagre do gelo e nada de melhorar de vez.", avatar: "😔" },
            background: "bg-primary bg-opacity-10",
            button: "E como você melhorou?"
        },
        {
            character1: { name: "Maria", text: "Mas o que você fez de diferente? Achei que não teria jeito...", avatar: "😰" },
            character2: { name: "Júlia", text: "O ponto de virada foi quando o Dr. Otto fez uma infiltração de precisão. Foi aí que tudo mudou e a dor sumiu!", avatar: "✨" },
            background: "bg-success bg-opacity-10",
            button: "Ver recomendação"
        }
    ];

    const nextStep = () => {
        if (step < dialogues.length - 1) {
            setStep(step + 1);
        } else {
            setStep(3); // Mostra o CTA final
        }
    };

    return (
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-body p-0">
                {step < 3 ? (
                    <div className={`p-4 p-lg-5 transition-all ${dialogues[step].background}`} style={{ minHeight: '400px' }}>
                        <div className="d-flex flex-column gap-4">
                            {/* Maria's Side */}
                            <div className="d-flex align-items-start gap-3 animate__animated animate__fadeInLeft pointer-event-none">
                                <div className="flex-shrink-0 bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center border" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                                    {dialogues[step].character1.avatar}
                                </div>
                                <div className="bg-white p-3 rounded-4 shadow-sm position-relative chat-bubble-left border">
                                    <strong className="d-block small text-primary mb-1">{dialogues[step].character1.name}</strong>
                                    <p className="mb-0 text-dark small">{dialogues[step].character1.text}</p>
                                </div>
                            </div>

                            {/* Júlia's Side */}
                            <div className="d-flex align-items-start gap-3 flex-row-reverse animate__animated animate__fadeInRight animate__delay-1s">
                                <div className="flex-shrink-0 bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center border" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                                    {dialogues[step].character2.avatar}
                                </div>
                                <div className="bg-primary text-white p-3 rounded-4 shadow-sm position-relative chat-bubble-right">
                                    <strong className="d-block small text-white text-opacity-75 mb-1">{dialogues[step].character2.name}</strong>
                                    <p className="mb-0 small">{dialogues[step].character2.text}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-5 animate__animated animate__fadeInUp animate__delay-2s">
                            <button
                                onClick={nextStep}
                                className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm hover-lift"
                            >
                                {dialogues[step].button} <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-5 bg-white text-center animate__animated animate__fadeIn">
                        <div className="mb-4">
                            <div className="position-relative d-inline-block">
                                <img
                                    src="/img/foto-otto.jpg"
                                    alt="Dr. Otto Beckedorff"
                                    className="rounded-circle shadow-lg border border-4 border-white"
                                    style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                                />
                                <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style={{ width: '25px', height: '25px' }}></div>
                            </div>
                        </div>
                        <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>O Ponto de Virada na Fascite</h3>
                        <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                            Como a Júlia contou, as orientações caseiras são excelentes aliadas, mas para muitos pacientes, a <strong>medicina intervencionista</strong> é o que realmente devolve a caminhada sem dor.
                        </p>
                        <div className="d-grid gap-3 d-sm-flex justify-content-center">
                            <Link
                                href="https://wa.me/5519999439824"
                                className="btn btn-success btn-lg rounded-pill px-5 shadow-sm hover-lift"
                                target="_blank"
                            >
                                <i className="bi bi-whatsapp me-2"></i> Agendar Avaliação Especializada
                            </Link>
                            <button
                                onClick={() => setStep(0)}
                                className="btn btn-link text-muted"
                            >
                                Rever conversa
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .chat-bubble-left::before {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 15px;
                    border-width: 10px 10px 10px 0;
                    border-style: solid;
                    border-color: transparent white transparent transparent;
                }
                .chat-bubble-right::before {
                    content: '';
                    position: absolute;
                    right: -10px;
                    top: 15px;
                    border-width: 10px 0 10px 10px;
                    border-style: solid;
                    border-color: transparent transparent transparent var(--bs-primary);
                }
                .hover-lift { transition: all 0.2s ease; }
                .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
            `}</style>
        </div>
    );
}
