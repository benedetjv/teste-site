"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-5 pb-3" style={{ backgroundColor: '#2a4156', color: '#ecf0f1' }}>
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Coluna 1: Marca e Resumo */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold text-white mb-3">Dr. Otto Beckedorff</h4>
            <p className="small text-white-50 mb-3" style={{ lineHeight: '1.6' }}>
              Medicina focada em devolver sua qualidade de vida. Diagnóstico preciso e tratamentos minimamente invasivos para dor crônica.
            </p>
            <div className="d-flex gap-3">
              <a href="https://instagram.com" target="_blank" className="text-white opacity-75 hover-opacity-100 fs-5"><i className="bi bi-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" className="text-white opacity-75 hover-opacity-100 fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="mailto:contato@drotto.com.br" className="text-white opacity-75 hover-opacity-100 fs-5"><i className="bi bi-envelope"></i></a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3 text-uppercase small" style={{ letterSpacing: '1px' }}>Menu</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link href="/" className="text-white-50 text-decoration-none hover-white">Início</Link></li>
              <li><Link href="/sobre" className="text-white-50 text-decoration-none hover-white">Sobre Mim</Link></li>
              <li><Link href="/procedimentos" className="text-white-50 text-decoration-none hover-white">Procedimentos</Link></li>
              <li><Link href="/blog" className="text-white-50 text-decoration-none hover-white">Blog de Saúde</Link></li>
              <li><Link href="/contato" className="text-white-50 text-decoration-none hover-white">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Tratamentos SEO */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3 text-uppercase small" style={{ letterSpacing: '1px' }}>Especialidades</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link href="/blog/hernia-de-disco-L4-L5-tratamentos" className="text-white-50 text-decoration-none hover-white">Hérnia de Disco</Link></li>
              <li><Link href="/blog/radiofrequencia-coluna-como-funciona" className="text-white-50 text-decoration-none hover-white">Radiofrequência Lombar</Link></li>
              <li><Link href="/blog/protese-vs-viscossuplementacao" className="text-white-50 text-decoration-none hover-white">Infiltração de Joelho</Link></li>
              <li><Link href="/blog/bursite-quadril-tratamento" className="text-white-50 text-decoration-none hover-white">Bursite de Quadril</Link></li>
              <li><a href="#" className="text-white-50 text-decoration-none hover-white">Tratamento da Dor</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3 text-uppercase small" style={{ letterSpacing: '1px' }}>Atendimento</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-white-50">
              <li className="d-flex gap-2">
                <i className="bi bi-geo-alt-fill text-primary"></i>
                <span>Campinas - SP<br />Jacutinga - MG</span>
              </li>
              <li className="d-flex gap-2">
                <i className="bi bi-whatsapp text-success"></i>
                <span>(19) 99943-9824</span>
              </li>
            </ul>
            <Link href="/agendamento" className="btn btn-sm btn-outline-light rounded-pill mt-2 w-100">
              Agendar Consulta
            </Link>
          </div>
        </div>

        <hr className="border-secondary opacity-25" />

        {/* SEO BARRA FINAL (Discreta) */}
        <div className="row align-items-center py-2">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0 text-white-50" style={{ fontSize: '0.8rem' }}>
              © {currentYear} Dr. Otto Beckedorff. Todos os direitos reservados. CRM-SP 123456.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="small mb-0 text-white-50" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
              Referência em <strong>Dor Campinas</strong>. Tratamento de Coluna, Hérnia e Dor Crônica.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hover-white:hover { color: #fff !important; text-decoration: underline !important; }
        .hover-opacity-100:hover { opacity: 1 !important; }
      `}</style>
    </footer>
  );
}