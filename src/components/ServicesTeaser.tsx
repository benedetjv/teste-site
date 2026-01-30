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
        icon: "bi-stars",
        title: "Medicina Regenerativa",
        desc: "Ácido Hialurônico e Terapias."
    }
];

export default function ServicesTeaser() {
    return (
        <section className="py-5 bg-white">
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-lg-5">
                        <span className="text-primary fw-bold text-uppercase small ls-2">Especialidades</span>
                        <h2 className="display-6 fw-bold mb-4 mt-2">Tecnologia a favor do seu alívio.</h2>
                        <p className="text-muted lead mb-4">
                            Atuamos com procedimentos minimamente invasivos guiados por imagem, garantindo precisão e segurança.
                        </p>
                        <Link href="/procedimentos" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
                            Ver todos os tratamentos <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>

                    <div className="col-lg-7">
                        <div className="row g-3">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="col-md-4">
                                    <div className="p-4 rounded-4 bg-light h-100 text-center border-0 shadow-sm transition-hover">
                                        <div className="mb-3 text-primary">
                                            <i className={`bi ${item.icon} display-4`}></i>
                                        </div>
                                        <h5 className="fw-bold mb-2">{item.title}</h5>
                                        <p className="text-muted small mb-0">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
