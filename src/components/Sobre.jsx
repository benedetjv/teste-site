import React from "react";
import { siteContent } from "../content";

export default function Sobre() {
  const { titulo, crmRqe, text1, text2 } = siteContent.sobre;
  const imagePathWebp = "img/otto-em-procedimento.webp";
  const imagePathJpg = "img/otto-em-procedimento.jpg";

  return (
    <section id="sobre" className="section-light">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <div className="sobre-foto">
              {/* Otimização WEBP: Carregamento LAZY */}
              <picture>
                <source srcSet={imagePathWebp} type="image/webp" />
                <img 
                  src={imagePathJpg} 
                  alt="Dr. Otto Beckedorff em procedimento" 
                  loading="lazy" 
                />
              </picture>
            </div>
          </div>
          <div className="col-lg-6">
            <h2>{titulo}</h2>
            <p><strong>{crmRqe}</strong></p>
            <p>{text1}</p>
            <p>{text2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}