import React, { useEffect, useRef } from "react";
import { siteContent } from "../content";

const DOCTORALIA_SCRIPT_URL = "//platform.docplanner.com/js/widget.js";
const DOCTORALIA_WIDGET_ID = "zl-widget-s";

export default function Doctoralia() {
  const { label, url, doctor } = siteContent.doctoralia;
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Garante que o script seja carregado apenas uma vez
    if (document.getElementById(DOCTORALIA_WIDGET_ID) || scriptLoaded.current) {
      return;
    }

    const loadDoctoraliaScript = () => {
      const d = document;
      const s = "script";
      let js, fjs = d.getElementsByTagName(s)[0];
      
      js = d.createElement(s);
      js.id = DOCTORALIA_WIDGET_ID;
      js.src = DOCTORALIA_SCRIPT_URL;
      fjs.parentNode.insertBefore(js, fjs);
      scriptLoaded.current = true;
    };

    loadDoctoraliaScript();
  }, []);

  return (
    <section id="agende" className="section-light">
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
        </div>
      </div>
    </section>
  );
}