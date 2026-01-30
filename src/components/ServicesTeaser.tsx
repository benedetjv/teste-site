"use client";

import Link from 'next/link';
import React from 'react';

const highlights = [
    {
        icon: "bi-distribute-vertical",
        title: "Coluna Vertebral",
        desc: "Hérnias, Ciática e Lombalgia."
    },
    {
        icon: "bi-diagram-3",
        title: "Articulações",
        desc: "Joelho, Ombro e Quadril."
    },
    {
        icon: "bi-layers-fill",
        title: "Intervenção Guiada",
        desc: "Bloqueios, Radiofrequência e Viscossuplementação."
    }
];

export default function ServicesTeaser() {
    return (
        <section className="py-5 bg-white">
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-lg-5">
                        <span className="fw-bold text-uppercase small ls-2" style={{ color: 'var(--azul-principal)' }}>Especialidades</span>
                        <h2 className="display-6 fw-bold mb-4 mt-2" style={{ color: 'var(--azul-escuro)' }}>Tecnologia a favor do seu alívio.</h2>
                        <p className="text-muted lead mb-4">
                            Atuamos com procedimentos minimamente invasivos guiados por imagem, garantindo precisão e segurança.
                        </p>
                        <Link href="/procedimentos" className="btn rounded-pill px-4 fw-bold custom-outline-btn">
                            Ver todos os procedimentos <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>

                    <div className="col-lg-7">
                        <div className="row g-3">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="col-md-4">
                                    <div className="p-4 rounded-4 bg-light h-100 text-center border-0 shadow-sm transition-hover card-service">
                                        <div className="mb-3">
                                            <i className={`bi ${item.icon} display-4`} style={{ color: 'var(--azul-principal)' }}></i>
                                        </div>
                                        <h5 className="fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>{item.title}</h5>
                                        <p className="text-muted small mb-0">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-outline-btn {
                    color: var(--azul-principal);
                    border: 2px solid var(--azul-principal);
                    transition: all 0.3s;
                }
                .custom-outline-btn:hover {
                    background-color: var(--azul-principal);
                    color: white;
                }
                .card-service:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </section>
    );
}
