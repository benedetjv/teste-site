"use client";

import Link from 'next/link';
import React from 'react';

export default function AboutTeaser() {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-center g-5">
                    <div className="col-lg-5 order-lg-2">
                        {/* Imagem com Borda Criativa */}
                        <div className="position-relative">
                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary rounded-circle opacity-10" style={{ transform: 'translate(-10px, -10px)' }}></div>
                            <img
                                src="img/foto-otto.jpg"
                                alt="Dr. Otto Beckedorff"
                                className="img-fluid rounded-circle shadow-lg position-relative"
                                style={{ width: '300px', height: '300px', objectFit: 'cover', border: '5px solid white' }}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 order-lg-1 text-center text-lg-start">
                        <span className="text-primary fw-bold text-uppercase small ls-2">Sobre o Médico</span>
                        <h2 className="display-6 fw-bold mb-3 mt-2">Dr. Otto Beckedorff</h2>
                        <h5 className="text-secondary fw-light mb-4">CRM 226325SP | RQE 139078</h5>

                        <p className="lead text-muted mb-4">
                            "Minha missão é devolver movimento, conforto e autonomia ao paciente, com tratamento preciso para evitar cirurgias desnecessárias."
                        </p>

                        <Link href="/sobre" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm">
                            Conheça minha trajetória
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
