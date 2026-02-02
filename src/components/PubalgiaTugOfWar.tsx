"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function PubalgiaTugOfWar() {
    return (
        <div className="my-5 p-4 bg-light rounded-4 border shadow-sm">
            <h5 className="fw-bold text-center mb-4" style={{ color: 'var(--azul-escuro)' }}>
                Infográfico: O "Cabo de Guerra" na Pelve
            </h5>

            <div className="position-relative mx-auto" style={{ maxWidth: '400px', height: '300px' }}>
                {/* Pelvis Area Representation */}
                <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle shadow-sm border d-flex align-items-center justify-content-center"
                    style={{ width: '80px', height: '80px', zIndex: 10 }}>
                    <span className="fw-bold text-primary small text-center">Sínfise<br />Púbica</span>
                </div>

                {/* Vector Abdominals (Up) */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: -10 }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}
                    className="position-absolute start-50 translate-middle-x d-flex flex-column align-items-center"
                    style={{ bottom: '60%', zIndex: 5 }}
                >
                    <div className="badge bg-primary mb-2 shadow-sm px-3 py-2">Músculos Abdominais</div>
                    <div style={{ width: '4px', height: '60px', backgroundColor: 'var(--azul-medio)', borderRadius: '2px' }}></div>
                    <i className="bi bi-chevron-up text-primary" style={{ marginTop: '-10px', fontSize: '24px' }}></i>
                </motion.div>

                {/* Vector Adductors (Down) */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 10 }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}
                    className="position-absolute start-50 translate-middle-x d-flex flex-column align-items-center"
                    style={{ top: '60%', zIndex: 5 }}
                >
                    <i className="bi bi-chevron-down text-danger" style={{ marginBottom: '-10px', fontSize: '24px' }}></i>
                    <div style={{ width: '4px', height: '60px', backgroundColor: '#dc3545', borderRadius: '2px' }}></div>
                    <div className="badge bg-danger mt-2 shadow-sm px-3 py-2">Músculos Adutores</div>
                </motion.div>

                {/* Lateral Indicators */}
                <div className="position-absolute top-50 start-0 translate-middle-y text-muted small opacity-50 fst-italic ms-1 d-none d-sm-block">
                    Força para cima<br />vs Força para baixo
                </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-3 border-start border-primary border-4 shadow-sm">
                <p className="mb-0 small text-dark">
                    <strong>Como funciona:</strong> Os abdominais puxam a bacia para cima, enquanto os adutores da coxa puxam para baixo. O desequilíbrio nessas forças gera inflamação constante no ponto central (sínfise púbica).
                </p>
            </div>

            <style jsx>{`
                .bi-chevron-up, .bi-chevron-down {
                    line-height: 1;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}
