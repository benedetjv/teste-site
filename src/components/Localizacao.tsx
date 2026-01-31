"use client";

import React from "react";
import { siteContent } from "../content";

export default function Localizacao() {
  const { titulo, clinicas } = siteContent.localizacao;
  const contactClinics = siteContent.contato.clinicas;

  const getContactInfo = (name: string) => {
    return contactClinics.find(c => c.nome === name) || { telefone: '', whatsappLink: '' };
  };

  return (
    <section id="localizacao" className="py-5" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill mb-3 px-3 py-2">
            <i className="bi bi-geo-alt me-2"></i>Onde Estamos
          </span>
          <h2 className="fw-bold text-dark display-6">Locais de Atendimento</h2>
        </div>

        <div className="row g-5 justify-content-center">
          {clinicas.map((clinic) => {
            const contact = getContactInfo(clinic.nome);
            const city = clinic.nome.includes('Somamed') ? 'Jacutinga' : 'Campinas';
            return (
              <div className="col-lg-6" key={clinic.nome}>
                <div className="bg-white rounded-4 shadow-lg overflow-hidden h-100 hover-lift transition-all position-relative border border-light">
                  {/* Top Accent */}
                  <div className="h-1 w-100 bg-primary opacity-50"></div>

                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="badge bg-light text-muted border rounded-pill mb-2 px-3">{city === 'Jacutinga' ? 'Minas Gerais' : 'São Paulo'}</span>
                        <h3 className="fw-bold text-dark mb-1">{clinic.nome}</h3>
                      </div>
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                        <i className="bi bi-hospital fs-4"></i>
                      </div>
                    </div>

                    <p className="text-muted mb-4 small"><i className="bi bi-geo-alt-fill me-2 text-danger opacity-75"></i>{clinic.enderecoCompleto}</p>

                    {/* Phone Display */}
                    <div className="mb-4 d-flex align-items-center gap-2 text-muted small bg-light p-2 rounded-3 justify-content-center border border-light">
                      <i className="bi bi-telephone-fill"></i>
                      <span className="fw-bold">{contact.telefone}</span>
                    </div>

                    {/* Map */}
                    <div className="mapa-wrapper rounded-4 overflow-hidden shadow-sm border mb-4" style={{ height: '250px' }}>
                      <iframe
                        src={clinic.mapIframeSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Mapa para ${clinic.nome}`}
                        className="grayscale-map"
                      ></iframe>
                    </div>

                    {/* Actions Grid */}
                    <div className="row g-2">
                      {/* Contact Buttons */}
                      <div className="col-12 mb-2">
                        <a href={contact.whatsappLink} target="_blank" className="btn btn-outline-success w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2">
                          <i className="bi bi-whatsapp"></i> Agende em {city}
                        </a>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="col-6">
                        <a href={clinic.wazeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted hover-dark">
                          <i className="bi bi-sign-turn-right-fill text-info"></i> Waze
                        </a>
                      </div>
                      <div className="col-6">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.enderecoCompleto)}`} target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted hover-dark">
                          <i className="bi bi-google text-danger"></i> Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .hover-lift:hover { transform: translateY(-5px); }
        .transition-all { transition: all 0.3s ease; }
        .hover-dark:hover { background-color: #e2e6ea; border-color: #dbe0e5; color: #000!important; }
        .grayscale-map { filter: grayscale(0%); transition: filter 0.3s; }
        .hover-lift:hover .grayscale-map { filter: grayscale(0%); }
      `}</style>
    </section>
  );
}