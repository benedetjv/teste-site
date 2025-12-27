import React from "react";
import { siteContent } from "../content";

export default function Hero() {
  const { title, crmRqe, text1, text2, ctaLabel, ctaLink } = siteContent.hero;
  const imagePathWebp = "img/foto-otto.webp";
  const imagePathJpg = "img/foto-otto.jpg";

  return (
    <section id="topo" className="hero-section section-light">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="hero-title">{title}</h1>
            {/* Conteúdo de texto aqui... */}
            <p className="hero-text">
              <strong>{crmRqe}</strong>
              <br />
              {text1}
            </p>
            <p className="hero-text">{text2}</p>
            <a href={ctaLink} className="btn-primary-custom">{ctaLabel}</a>
          </div>

          <div className="col-lg-5">
            <div className="hero-photo">
              {/* Otimização WEBP: Carregamento EAGER para LCP */}
              <picture>
                <source srcSet={imagePathWebp} type="image/webp" />
                <img 
                  src={imagePathJpg} 
                  alt={title} 
                  loading="eager" 
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}