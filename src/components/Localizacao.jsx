import React, { useEffect, useRef } from "react";
import { siteContent } from "../content";

// Componente para carregar o script do Instagram
function InstagramEmbed({ instagramUrl }) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Garante que o script seja carregado apenas uma vez
    if (document.getElementById("instagram-embed-script") || scriptLoaded.current) {
      return;
    }

    const loadInstagramScript = () => {
      const s = document.createElement("script");
      s.async = true;
      s.src = "//www.instagram.com/embed.js";
      s.id = "instagram-embed-script";
      document.body.appendChild(s);
      scriptLoaded.current = true;
    };

    loadInstagramScript();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="instagram-wrapper">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={instagramUrl}
          data-instgrm-version="14"
          style={{ maxWidth: "350px", width: "100%", border: 0, boxShadow: "none" }}
        >
          {/* Conteúdo de fallback enquanto o script carrega */}
          <p>[Feed do Instagram]</p>
        </blockquote>
      </div>
    </div>
  );
}

export default function Localizacao() {
  const { titulo, clinicas, instagramUrl } = siteContent.localizacao;

  return (
    <section id="localizacao" className="section-light">
      <div className="container">
        <h2 className="section-title">{titulo}</h2>

        <div className="row g-4 justify-content-center">
          {clinicas.map((clinic) => (
            <div className="col-lg-6" key={clinic.nome}>
              <div className="clinic-card">
                <h3 className="clinic-title">{clinic.nome}</h3>
                <p className="clinic-address">{clinic.enderecoCompleto}</p>

                <div className="mapa-wrapper">
                  <iframe
                    src={clinic.mapIframeSrc}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa para ${clinic.nome}`}
                  ></iframe>
                </div>

                <div>
                  <a href={clinic.wazeUrl} target="_blank" rel="noreferrer" className="btn btn-waze">
                    <i className="bi bi-geo-alt-fill"></i> WAZE
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Embed do Instagram */}
        <InstagramEmbed instagramUrl={instagramUrl} />
      </div>
    </section>
  );
}