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
    <section id="localizacao" className="py-5" style={{ backgroundColor: '#f5f4f2' }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <span className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(125, 153, 178, 0.1)', color: '#7d99b2', border: '1px solid rgba(125, 153, 178, 0.2)' }}>
            <i className="bi bi-geo-alt me-2"></i>Onde Estamos
          </span>
          <h2 className="fw-bold display-6" style={{ color: '#2a4156' }}>Locais de Atendimento</h2>
        </div>

        <div className="row g-5 justify-content-center">
          {clinicas.map((clinic) => {
            const contact = getContactInfo(clinic.nome);
            const city = clinic.nome.includes('Somamed') ? 'Jacutinga' : 'Campinas';
            return (
              <div className="col-lg-6" key={clinic.nome}>
                <div className="bg-white rounded-4 shadow-sm overflow-hidden h-100 hover-lift transition-all position-relative border-0">
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="badge bg-light text-muted border rounded-pill mb-2 px-3">{city === 'Jacutinga' ? 'Minas Gerais' : 'São Paulo'}</span>
                        <h3 className="fw-bold mb-1" style={{ color: '#2a4156' }}>{clinic.nome}</h3>
                      </div>
                      <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(125, 153, 178, 0.1)', color: '#7d99b2' }}>
                        <i className="bi bi-hospital fs-4"></i>
                      </div>
                    </div>

                    <p className="text-muted mb-4 small"><i className="bi bi-geo-alt-fill me-2 opacity-75" style={{ color: '#7d99b2' }}></i>{clinic.enderecoCompleto}</p>

                    {/* Phone Display */}
                    <div className="mb-4 d-flex align-items-center gap-2 text-muted small p-2 rounded-3 justify-content-center" style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee' }}>
                      <i className="bi bi-telephone-fill" style={{ color: '#7d99b2' }}></i>
                      <span className="fw-bold" style={{ color: '#39586d' }}>{contact.telefone}</span>
                    </div>

                    {/* Map */}
                    <div className="mapa-wrapper rounded-4 overflow-hidden border mb-4" style={{ height: '250px', borderColor: '#eee' }}>
                      <iframe
                        src={clinic.mapIframeSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Mapa para ${clinic.nome}`}
                      ></iframe>
                    </div>

                    {/* Actions Grid */}
                    <div className="row g-2">
                      {/* Contact Buttons */}
                      <div className="col-12 mb-2">
                        <a href={contact.whatsappLink} target="_blank" className="btn w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 transition-all whatsapp-btn" style={{ border: '2px solid #25D366', color: '#128C7E' }}>
                          <i className="bi bi-whatsapp"></i> Agende em {city}
                        </a>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="col-6">
                        <a href={clinic.wazeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted hover-nav-btn">
                          <i className="bi bi-sign-turn-right-fill" style={{ color: '#33b1ff' }}></i> Waze
                        </a>
                      </div>
                      <div className="col-6">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.enderecoCompleto)}`} target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted hover-nav-btn">
                          <i className="bi bi-google" style={{ color: '#ea4335' }}></i> Maps
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
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important; }
        .transition-all { transition: all 0.3s ease; }
        .whatsapp-btn:hover { background-color: #25D366; color: white !important; }
        .hover-nav-btn:hover { background-color: #f0f0f0; color: #2a4156 !important; }
      `}</style>
    </section>
  );
}