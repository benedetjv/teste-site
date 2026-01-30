"use client";

import React from 'react';

const stats = [
    {
        number: "+8.000",
        label: "Atendimentos Realizados",
        icon: "bi-people-fill"
    },
    {
        number: "90%",
        label: "Casos Tratados Sem Cirurgia",
        icon: "bi-heart-pulse-fill"
    },
    {
        number: "2",
        label: "Clínicas de Excelência",
        icon: "bi-geo-alt-fill"
    }
];

export default function StatsBar() {
    return (
        <section className="py-5 text-white position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--azul-escuro) 0%, var(--azul-medio) 100%)' }}>
            {/* Background Pattern Minimalista */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row g-4 justify-content-center text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-12 col-md-4">
                            <div className="p-3">
                                <i className={`bi ${stat.icon} display-4 mb-3 d-block opacity-75`}></i>
                                <h2 className="display-4 fw-bold mb-1 tracking-tight">{stat.number}</h2>
                                <p className="lead mb-0 fw-light text-white-50 text-uppercase ls-1" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
