import React from "react";
import { siteContent } from "../content";

// Componente para renderizar o ícone SVG (seguro com dangerouslySetInnerHTML)
function ServiceIcon({ svgPath }) {
  return (
    <svg 
      className="servico-icon-custom" 
      viewBox="0 0 24 24" 
      role="img" 
      aria-hidden="true" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      // Utilizamos dangerouslySetInnerHTML para renderizar o código SVG puro
      dangerouslySetInnerHTML={{ __html: svgPath }}
    />
  );
}

export default function Servicos() {
  const { titulo, items } = siteContent.servicos;

  return (
    <section id="servicos" className="section-light">
      <div className="container">
        <h2 className="section-title">{titulo}</h2>
      </div>

      <div className="servicos-grid">
        <div className="servicos-grid-inner">
          <div className="row g-0">
            {items.map((item, index) => (
              <div className="col-md-4 servico-card" key={index}>
                <div className="servico-card-inner">
                  <ServiceIcon svgPath={item.iconSvgPath} />
                  <h3 className="servico-titulo">{item.titulo}</h3>
                  <p className="servico-descricao">{item.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}