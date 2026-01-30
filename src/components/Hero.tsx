"use client";

import React from "react";
import Image from "next/image";
import { siteContent } from "../content";

interface HeroProps {
  customTitle?: string;
}

export default function Hero({ customTitle }: HeroProps) {
  const { title, crmRqe, text1, text2, ctaLabel, ctaLink } = siteContent.hero;

  // Imagem local: no Next.js basta o caminho a partir de public (sem /public)
  const imagePath = "/img/foto-otto.jpg";

  return (
    <section id="topo" className="hero-section position-relative overflow-hidden" style={{ backgroundColor: 'var(--bg-light)', paddingBottom: '60px' }}>

      {/* Círculo decorativo de fundo (opcional, para dar profundidade) */}
      <div className="position-absolute top-0 end-0 rounded-circle opacity-10"
        style={{ width: '600px', height: '600px', background: 'var(--azul-principal)', filter: 'blur(80px)', transform: 'translate(30%, -30%)' }}>
      </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-7 py-5">
            {/* Tagline com CRM */}
            <div className="d-inline-block px-3 py-1 mb-3 rounded-pill" style={{ backgroundColor: 'rgba(var(--azul-principal-rgb), 0.1)', color: 'var(--azul-escuro)' }}>
              <small className="fw-bold text-uppercase ls-1">Dr. Otto Beckedorff | CRM 226325SP | RQE 139078</small>
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

          <div className="col-lg-5 text-center position-relative">
            <div className="position-relative d-inline-block">
              {/* Moldura ou efeito na foto */}
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary rounded-circle opacity-25" style={{ transform: 'translate(15px, 15px)', filter: 'blur(0px)' }}></div>

              <Image
                src={imagePath}
                alt={title}
                width={500}
                height={550}
                priority
                className="img-fluid position-relative rounded-circle shadow-lg animate__animated animate__zoomIn"
                style={{ objectFit: "cover", width: '400px', height: '400px', border: '8px solid white' }}
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