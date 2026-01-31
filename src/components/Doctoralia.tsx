"use client";

import React, { useRef } from "react";
import Script from "next/script";
import { siteContent } from "../content";

const DOCTORALIA_SCRIPT_URL = "//platform.docplanner.com/js/widget.js";
const DOCTORALIA_WIDGET_ID = "zl-widget-s";

export default function Doctoralia() {
  const { url, doctor } = siteContent.doctoralia;

  return (
    <section id="agende" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            {/* Header / Intro */}
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill mb-3 px-3 py-2">
              <i className="bi bi-calendar-check me-2"></i>Agendamento Online
            </span>
            <h2 className="fw-bold mb-3 text-dark">Marque sua Consulta</h2>
            <p className="text-muted mb-5">
              Visualize a agenda em tempo real e escolha o melhor horário para você.<br className="d-none d-md-block" />
              Prático, rápido e seguro.
            </p>

            {/* Custom Doctoralia Card */}
            <div className="bg-white rounded-4 shadow-lg mx-auto overflow-hidden position-relative hover-lift transition-all" style={{ maxWidth: '400px' }}>
              <div className="p-4 bg-primary text-white text-center position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '10px 10px' }}></div>
                <img
                  src="/img/foto-otto.jpg"
                  alt="Dr. Otto Beckedorff"
                  className="rounded-circle border border-4 border-white shadow-sm position-relative"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '-10px' }}
                />
              </div>
              <div className="pt-5 pb-4 px-4 text-center">
                <h5 className="fw-bold text-dark mt-2 mb-1">Dr. Otto Beckedorff</h5>
                <p className="text-muted small mb-2">Ortopedia e Tratamento da Dor</p>

                <div className="d-flex justify-content-center align-items-center gap-2 mb-4 bg-light rounded-pill py-2 px-3 mx-auto" style={{ width: 'fit-content' }}>
                  <div className="text-warning small">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <span className="fw-bold text-dark small">Excelência</span>
                </div>

                <a href={url} target="_blank" className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3">
                  <i className="bi bi-calendar-date"></i> VER HORÁRIOS DISPONÍVEIS
                </a>

                <p className="d-flex justify-content-center align-items-center gap-2 small text-muted mb-0">
                  <i className="bi bi-shield-check text-success"></i> Agendamento Seguro
                </p>
              </div>
            </div>

            {/* WhatsApp Alternative */}
            <div className="mt-5 d-flex flex-column align-items-center">
              <span className="text-muted small text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Ou se preferir</span>
              <a href="https://wa.me/5519999439824" target="_blank" className="btn btn-outline-success rounded-pill px-4 py-2 fw-bold hover-scale transition-all">
                <i className="bi bi-whatsapp me-2"></i>Falar com Secretária
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-lift:hover { transform: translateY(-5px); }
        .hover-scale:hover { transform: scale(1.05); }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </section>
  );
}