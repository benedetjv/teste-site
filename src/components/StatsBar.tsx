"use client";

import React from 'react';

export default function StatsBar() {
    return (
        <section className="py-5 text-white position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--azul-escuro) 0%, var(--azul-medio) 100%)' }}>
            {/* Background Pattern Minimalista */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row g-4 justify-content-center align-items-center text-center">

                    {/* Bloco 1: Atendimentos */}
                    <div className="col-12 col-md-5 border-end-md border-white-50">
                        <div className="p-3">
                            <i className="bi bi-people-fill display-4 mb-3 d-block opacity-75"></i>
                            <h2 className="display-4 fw-bold mb-1 tracking-tight">+8.000</h2>
                            <p className="lead mb-0 fw-light text-white-50 text-uppercase ls-1" style={{ letterSpacing: '2px', fontSize: '1rem' }}>Atendimentos Realizados</p>
                        </div>
                    </div>

                    {/* Bloco 2: Foco Conservador */}
                    <div className="col-12 col-md-5">
                        <div className="p-3">
                            <i className="bi bi-heart-pulse-fill display-4 mb-3 d-block opacity-75"></i>
                            <h2 className="h1 fw-bold mb-2">Foco em Reabilitação</h2>
                            <p className="lead mb-0 fw-light text-white-50" style={{ fontSize: '1.1rem' }}>
                                Maioria dos casos sem necessidade de tratamento cirúrgico
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
