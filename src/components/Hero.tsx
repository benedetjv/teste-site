"use client";

import React from "react";
import Image from "next/image";
import { siteContent } from "../content";

interface HeroProps {
  customTitle?: string;
}

export default function Hero({ customTitle }: HeroProps) {
  const { title, crmRqe, text1, text2, ctaLabel, ctaLink } = siteContent.hero;

  const imagePath = "/img/foto-otto.jpg";

  // VALORES DEFINITIVOS PASSADOS PELO USUÁRIO
  const imgSize = 300;
  const imgScale = 1;
  const imgPosY = 24;

  return (
    <section id="topo" className="hero-section position-relative overflow-hidden" style={{ backgroundColor: 'var(--bg-light)', paddingBottom: '60px' }}>



      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* align-items-start: Alinha texto e foto pelo topo */}
        <div className="row align-items-start g-5">
          <div className="col-lg-7 py-5">
            {/* Tagline com CRM */}
            <div className="d-inline-block px-3 py-1 mb-3 rounded-pill" style={{ backgroundColor: 'rgba(var(--azul-principal-rgb), 0.1)', color: 'var(--azul-escuro)' }}>
              <small className="fw-bold text-uppercase ls-1">{crmRqe}</small>
            </div>

            <h1 className="display-4 fw-bold mb-4 lh-sm animate__animated animate__fadeInUp" style={{ color: 'var(--azul-escuro)' }}>
              {customTitle || title}
            </h1>

            <p className="lead mb-4 text-muted animate__animated animate__fadeInUp animate__delay-1s" style={{ fontSize: '1.25rem' }}>
              {text1}
            </p>

            <p className="text-secondary mb-5 animate__animated animate__fadeInUp animate__delay-2s" style={{ maxWidth: '90%' }}>
              {text2}
            </p>

            <div className="d-flex flex-wrap gap-3 animate__animated animate__fadeInUp animate__delay-3s">
              <a href="/sobre" className="btn btn-lg btn-outline-dark rounded-pill px-5 fw-bold hover-lift">
                Saiba mais
              </a>
            </div>
          </div>

          <div className="col-lg-5 text-center position-relative py-5">
            {/* py-5 acima adicionado para garantir que a foto não cole no teto absoluto se a coluna da esquerda tiver padding */}
            {/* Ou melhor: vamos confiar no align-items-start e só dar margem se necessário */}

            <div className="position-relative d-inline-block mt-lg-4">
              {/* mt-lg-4: Empurra um pouquinho pra baixo pra "casar" visualmente com a altura da linha do Título H1 */}

              {/* Moldura ou efeito na foto removido a pedido */}
              <Image
                src={imagePath}
                alt={title}
                width={imgSize * 2} // Carrega 2x maior para retina
                height={imgSize * 2}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="img-fluid position-relative rounded-circle shadow-lg animate__animated animate__zoomIn"
                style={{
                  objectFit: "cover",
                  objectPosition: `center ${imgPosY}%`,
                  width: `${imgSize}px`,
                  height: `${imgSize}px`,
                  border: '8px solid white',
                  transform: `scale(${imgScale})`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-lift { transition: transform 0.3s; }
        .hover-lift:hover { transform: translateY(-3px); }
      `}</style>
    </section>
  );
}