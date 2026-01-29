"use client";

import React, { useRef } from "react";
import Script from "next/script";
import { siteContent } from "../content";

// Componente para carregar o script do Instagram
function InstagramEmbed({ instagramUrl }: { instagramUrl: string }) {
  const scriptLoaded = useRef(false);

  return (
    <div className="d-flex justify-content-center mt-5">
      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          // O script do instagram processa automaticamente quando carrega
          if ((window as any).instgrm) (window as any).instgrm.Embeds.process();
        }}
      />
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
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa para ${clinic.nome}`}
                  ></iframe>
                </div>

                <div>
                  <a href={clinic.wazeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-waze">
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