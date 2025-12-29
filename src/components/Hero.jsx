import React from "react";
import Image from "next/image";
import { siteContent } from "../content";

export default function Hero({ customTitle }) {
  const { title, crmRqe, text1, text2, ctaLabel, ctaLink } = siteContent.hero;

  // Imagem local: no Next.js basta o caminho a partir de public (sem /public)
  const imagePath = "/img/foto-otto.jpg";

  return (
    <section id="topo" className="hero-section section-light">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="hero-title">{customTitle || title}</h1>
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
              {/* Otimização Image do Next.js */}
              <Image
                src={imagePath}
                alt={title}
                width={500}
                height={550}
                priority
                className="img-fluid"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}