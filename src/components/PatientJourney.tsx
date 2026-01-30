"use client";

import React from 'react';

const steps = [
    {
        icon: "bi-search-heart",
        title: "Diagnóstico Preciso",
        description: "Não tratamos apenas o sintoma. Identificamos a origem exata da dor com exame físico e bloqueios diagnósticos."
    },
    {
        icon: "bi-bullseye",
        title: "Intervenção Alvo",
        description: "Tratamentos minimamente invasivos (como Infiltração ou Radiofrequência) aplicados diretamente no foco da lesão."
    },
    {
        icon: "bi-activity",
        title: "Reabilitação Acelerada",
        description: "Com a dor controlada, você retoma a fisioterapia e o movimento muito mais rápido e sem sofrimento."
    },
    {
        icon: "bi-emoji-smile",
        title: "Autonomia",
        description: "O objetivo final: você de volta às suas atividades, esportes e vida social com qualidade."
    }
];

export default function PatientJourney() {
    return (
        <section className="py-5 bg-light position-relative">
            <div className="container">
                <div className="text-center mb-5">
                    <h6 className="text-primary fw-bold text-uppercase tracking-wider">Metodologia</h6>
                    <h2 className="fw-bold text-dark">Sua Jornada para uma Vida sem Dor</h2>
                    <div className="mx-auto mt-3" style={{ width: '60px', height: '4px', backgroundColor: 'var(--azul-principal)', borderRadius: '2px' }}></div>
                </div>

                <div className="row g-4 position-relative">
                    {/* Linha Conectora (Visível apenas em Desktop) */}
                    <div className="d-none d-lg-block position-absolute start-0 end-0 top-50 translate-middle-y border-top border-2 border-primary border-opacity-25" style={{ zIndex: 0 }}></div>

                    {steps.map((step, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3 position-relative" style={{ zIndex: 1 }}>
                            <div className="h-100 p-4 bg-white rounded-4 shadow-sm text-center transition-hover hover-lift border-bottom border-4 border-white hover-border-primary">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center text-white bg-gradient-primary rounded-circle mb-4 shadow"
                                    style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--azul-medio), var(--azul-escuro))' }}
                                >
                                    <i className={`bi ${step.icon} fs-2`}></i>
                                </div>
                                <h5 className="fw-bold mb-3 text-dark">{step.title}</h5>
                                <p className="text-muted small mb-0">{step.description}</p>

                                {/* Número do Passo */}
                                <div className="position-absolute top-0 end-0 mt-3 me-3 text-secondary opacity-10 fw-bold fs-1">
                                    {index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
                .hover-border-primary:hover { border-bottom-color: var(--azul-principal) !important; }
            `}</style>
        </section>
    );
}
