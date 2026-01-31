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
      <Script
        id="doctoralia-widget"
        src={DOCTORALIA_SCRIPT_URL}
        strategy="lazyOnload"
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill mb-3 px-3 py-2">
              <i className="bi bi-calendar-check me-2"></i>Agendamento Online
            </span>
            <h2 className="fw-bold mb-3 text-dark">Marque sua Consulta</h2>
            <p className="text-muted mb-5">
              Visualize a agenda em tempo real e escolha o melhor horário para você.<br className="d-none d-md-block" />
              Prático, rápido e seguro.
            </p>

            <div className="bg-white p-2 rounded-4 shadow-lg mx-auto position-relative" style={{ maxWidth: '380px', minHeight: '380px' }}>
              <div className="doctoralia-card border-0 shadow-none">
                <a
                  id="zl-url"
                  className="zl-url"
                  href={url}
                  rel="nofollow"
                  data-zlw-doctor={doctor}
                  data-zlw-type="big"
                  data-zlw-opinion="false"
                  data-zlw-hide-branding="true"
                  data-zlw-saas-only="true"
                  data-zlw-a11y-title="Widget de marcação de consultas médicas"
                >
                  {doctor.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} - Doctoralia.com.br
                </a>
              </div>
            </div>

            <div className="mt-5 d-flex flex-column align-items-center">
              <span className="text-muted small text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Ou se preferir</span>
              <a href="https://wa.me/5519999439824" target="_blank" className="btn btn-outline-success rounded-pill px-4 py-2 fw-bold hover-scale transition-all">
                <i className="bi bi-whatsapp me-2"></i>Agendar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-scale:hover { transform: scale(1.05); }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </section>
  );
}