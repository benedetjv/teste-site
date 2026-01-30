"use client";

import React, { useRef } from "react";
import Script from "next/script";
import { siteContent } from "../content";

const DOCTORALIA_SCRIPT_URL = "//platform.docplanner.com/js/widget.js";
const DOCTORALIA_WIDGET_ID = "zl-widget-s";

export default function Doctoralia() {
  const { label, url, doctor } = siteContent.doctoralia;
  // scriptLoaded useRef is no longer needed

  // useEffect for manual script injection is no longer needed

  return (
    <section id="agende" className="section-light">
      <Script
        id="doctoralia-widget"
        src={DOCTORALIA_SCRIPT_URL}
        strategy="lazyOnload"
      />
      <div className="container">
        <div className="agende-wrapper">
          <p className="agende-label">{label}</p>

          <div className="doctoralia-card">
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
            {/* O widget será injetado na tag <a> */}
          </div>

          <div className="text-center mt-4">
            <span className="text-muted small d-block mb-2 text-uppercase ls-1" style={{ fontSize: '0.75rem' }}>Ou se preferir</span>
            <a href="https://wa.me/5519999439824" target="_blank" className="btn btn-outline-success rounded-pill px-4 btn-sm fw-bold">
              <i className="bi bi-whatsapp me-2"></i>Entrar em contato via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}