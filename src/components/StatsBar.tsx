"use client";

import React from 'react';

export default function StatsBar() {
    return (
        <section className="py-5 text-white position-relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--azul-escuro) 0%, var(--azul-medio) 100%)' }}>

            {/* Background Pattern Minimalista */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="text-center">
                    <i className="bi bi-people-fill display-3 mb-3 d-block opacity-75"></i>
                    <h2 className="display-3 fw-bold mb-2 tracking-tight">+8.000</h2>
                    <p className="lead mb-0 text-white-50 text-uppercase ls-2 fw-light" style={{ letterSpacing: '4px', fontSize: '1.2rem' }}>
                        Atendimentos Realizados
                    </p>
                </div>
            </div>
        </section>
    );
}
