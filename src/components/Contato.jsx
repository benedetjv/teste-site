import React from "react";
import { siteContent } from "../content";

export default function Contato() {
  const { titulo, clinicas } = siteContent.contato;

  return (
    <section id="contato" className="section-soft">
      <div className="container">
        <h2 className="section-title">{titulo}</h2>

        <div className="row justify-content-center mb-3 contato-grid">
          {clinicas.map((clinic, index) => (
            <div
              className={`col-md-5 contato-item text-center ${
                index === 0 ? "text-md-end" : "text-md-start"
              }`}
              key={clinic.nome}
            >
              <h4 className="contato-clinic">{clinic.nome}</h4>
              <p className="contato-endereco">{clinic.endereco}</p>
              <p className="contato-phone">
                <i className={clinic.nome === "Clínica Somamed" ? "bi bi-whatsapp" : "bi bi-telephone-fill"}></i>{" "}
                <strong>{clinic.telefone}</strong>
              </p>
            </div>
          ))}
        </div>

        <div className="text-center contato-actions">
          {clinicas.map((clinic, index) => (
            <a
              href={clinic.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className={`btn btn-whatsapp ${index === 1 ? "ms-3" : ""}`}
              key={`whatsapp-${clinic.nome}`}
            >
              <i className="bi bi-whatsapp"></i> {clinic.telefone}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}