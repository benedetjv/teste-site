"use client";

import React from "react";
import { siteContent } from "../content";

export default function Listas() {
  const { doencas, publicacoes, premios } = siteContent.listas;

  return (
    <section className="py-5 bg-white position-relative overflow-hidden">
      <div className="container">

        {/* SEÇÃO 1: DOENÇAS TRATADAS (GRID DE TAGS) */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <div className="d-inline-flex align-items-center justify-content-center mb-3 text-primary bg-primary bg-opacity-10 px-4 py-2 rounded-pill">
              <i className={`bi ${doencas.iconClass} me-2 fs-5`}></i>
              <span className="fw-bold text-uppercase ls-1 small">{doencas.titulo}</span>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
              {doencas.items.map((item, index) => (
                <div key={index} className="disease-tag shadow-sm">
                  <i className="bi bi-check-circle-fill me-2 text-success"></i>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-5 opacity-10" />

        {/* SEÇÃO 2: DADOS DE AUTORIDADE (CARDS LADO A LADO) */}
        <div className="row g-4">
          {/* PUBLICAÇÕES */}
          <div className="col-lg-6">
            <div className="h-100 p-4 p-md-5 bg-light rounded-4 border-start border-4 border-primary shadow-sm hover-up position-relative overflow-hidden">
              <i className={`bi ${publicacoes.iconClass} display-1 position-absolute top-0 end-0 text-secondary opacity-10 m-3`}></i>
              <h3 className="fw-bold mb-4 d-flex align-items-center" style={{ color: 'var(--azul-escuro)' }}>
                <i className={`bi ${publicacoes.iconClass} me-3 text-primary`}></i>
                {publicacoes.titulo}
              </h3>
              <ul className="list-unstyled mb-0 position-relative z-1">
                {publicacoes.items.map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-start">
                    <i className="bi bi-journal-text text-primary me-3 mt-1 flex-shrink-0"></i>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PRÊMIOS */}
          <div className="col-lg-6">
            <div className="h-100 p-4 p-md-5 bg-dark text-white rounded-4 shadow-sm hover-up position-relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--azul-escuro) 0%, #1a2c3d 100%)' }}>
              <i className={`bi ${premios.iconClass} display-1 position-absolute top-0 end-0 text-white opacity-10 m-3`}></i>
              <h3 className="fw-bold mb-4 d-flex align-items-center text-warning">
                <i className={`bi ${premios.iconClass} me-3`}></i>
                {premios.titulo}
              </h3>
              <ul className="list-unstyled mb-0 position-relative z-1">
                {premios.items.map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-start border-bottom border-secondary border-opacity-25 pb-2">
                    <i className="bi bi-star-fill text-warning me-3 mt-1 flex-shrink-0"></i>
                    <span className="text-white-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .disease-tag {
            background: #fff;
            color: var(--azul-escuro);
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 600;
            border: 1px solid #eee;
            transition: all 0.3s ease;
        }
        .disease-tag:hover {
            transform: translateY(-3px);
            border-color: var(--azul-principal);
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .hover-up {
            transition: transform 0.3s ease;
        }
        .hover-up:hover {
            transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
}