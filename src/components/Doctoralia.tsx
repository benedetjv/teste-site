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

            {/* Direct Action Buttons */}
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 mb-4">
              <a
                href={url}
                target="_blank"
                className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow hover-lift d-flex align-items-center justify-content-center"
                style={{ minWidth: '280px' }}
              >
                <i className="bi bi-calendar-check me-2 fs-5"></i>
                AGENDAR ONLINE
              </a>

              <a
                href="https://wa.me/5519999439824"
                target="_blank"
                className="btn btn-outline-success btn-lg rounded-pill px-5 py-3 fw-bold hover-lift d-flex align-items-center justify-content-center"
                style={{ minWidth: '280px' }}
              >
                <i className="bi bi-whatsapp me-2 fs-5"></i>
                FALAR COM SECRETÁRIA
              </a>
            </div>

            <p className="small text-muted mb-0 opacity-75">
              <i className="bi bi-shield-lock-fill text-success me-1"></i>
              Plataforma segura e verificada
            </p>
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