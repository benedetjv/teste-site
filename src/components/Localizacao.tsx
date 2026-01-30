"use client";

import React from "react";
import { siteContent } from "../content";



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


      </div>
    </section>
  );
}