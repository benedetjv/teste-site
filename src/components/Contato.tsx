"use client";

import React from "react";
import { siteContent } from "../content";

export default function Contato() {
  const { clinicas } = siteContent.contato;
  const { instagramUrl } = siteContent.localizacao;

  return (
    <section id="contato" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <span className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(125, 153, 178, 0.1)', color: '#7d99b2', border: '1px solid rgba(125, 153, 178, 0.2)' }}>
            <i className="bi bi-chat-dots me-2"></i>Atendimento
          </span>
          <h2 className="fw-bold display-6" style={{ color: '#2a4156' }}>Canais de Contato</h2>
          <p className="text-muted">Escolha a melhor forma de falar com nossa equipe</p>
        </div>

        <div className="row g-4 justify-content-center">
          {clinicas.map((clinic) => (
            <div className="col-md-6 col-lg-5" key={clinic.nome}>
              <div className="bg-white rounded-4 p-4 h-100 hover-lift transition-all border shadow-sm" style={{ borderColor: '#eee' }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="p-3 rounded-3 shadow-sm" style={{ backgroundColor: '#7d99b2', color: '#fff' }}>
                    <i className="bi bi-whatsapp fs-4"></i>
                  </div>
                  <div>
                    <span className="badge bg-light text-muted border rounded-pill mb-1 px-2" style={{ fontSize: '0.65rem' }}>{clinic.nome.includes('Somamed') ? 'JACUTINGA-MG' : 'CAMPINAS-SP'}</span>
                    <h4 className="fw-bold mb-0" style={{ color: '#2a4156' }}>{clinic.nome}</h4>
                    <span className="text-muted small">Atendimento via WhatsApp</span>
                  </div>
                </div>

                <div className="mb-4 text-center">
                  <p className="fw-bold mb-1" style={{ color: '#7d99b2' }}><i className="bi bi-telephone mb-1 d-block fs-4"></i></p>
                  <p className="h4 mb-0 fw-bold" style={{ color: '#39586d' }}>{clinic.telefone}</p>
                </div>

                <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn w-100 rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2 transition-all contact-btn-brand" style={{ backgroundColor: '#2a4156', color: '#fff' }}>
                  <i className="bi bi-whatsapp"></i> INICIAR CONVERSA
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media & Others */}
        <div className="mt-5 text-center">
          <hr className="w-25 mx-auto mb-5 opacity-10" />
          <div className="d-flex flex-column align-items-center">
            <p className="text-muted mb-3">Siga nossas redes sociais para dicas de saúde</p>
            <div className="d-flex gap-3">
              <a href={instagramUrl} target="_blank" className="btn btn-outline-dark rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="https://br.linkedin.com/in/otto-beckedorff-7a5283206" target="_blank" className="btn btn-outline-dark rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.04)!important; }
        .transition-all { transition: all 0.3s ease; }
        .contact-btn-brand:hover { background-color: #7d99b2 !important; box-shadow: 0 5px 15px rgba(125, 153, 178, 0.3) !important; }
      `}</style>
    </section>
  );
}