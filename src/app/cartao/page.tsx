"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CartaoVisitaPage() {
  const [modoFacil, setModoFacil] = useState(false);
  const [activeRmTab, setActiveRmTab] = useState<"veracruz" | "cde">("veracruz");
  const [showTreatments, setShowTreatments] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mensagens pré-configuradas para o WhatsApp
  const msgSecretaria = encodeURIComponent(
    "Olá! Peguei o cartão de visita do Dr. Otto Beckedorff e gostaria de agendar uma consulta, por favor."
  );
  const msgRmVeraCruz = encodeURIComponent(
    "Olá! O Dr. Otto Beckedorff solicitou meu exame de ressonância magnética e gostaria de agendar no Vera Cruz."
  );
  const msgRmCdeCentral = encodeURIComponent(
    "Olá! O Dr. Otto Beckedorff solicitou meu exame de ressonância magnética e gostaria de agendar no CDE."
  );
  const msgRmPatricia = encodeURIComponent(
    "Olá, Patrícia! O Dr. Otto Beckedorff solicitou meu exame de ressonância magnética e gostaria de agendar no CDE."
  );

  const enderecoCampinas = "Av. Andrade Neves, 707 - 5º Andar - Centro, Campinas - SP, CEP 13013-161";
  const urlGoogleReview = "https://g.page/r/CQ3gfOvMQ6SEEBM/review";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(enderecoCampinas);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Dr. Otto Beckedorff | Ortopedia e Tratamento da Dor",
      text: "Cartão de visita digital e facilitador do Dr. Otto Beckedorff.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // usuário cancelou
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Beckedorff;Otto;Dr.;;
FN:Dr. Otto Beckedorff
ORG:Instituto Orthesen;Hospital Vera Cruz
TITLE:Médico Ortopedista (RQE 139078 | CRM 226325SP)
TEL;TYPE=CELL,VOICE,WHATSAPP:+5519999439824
ADR;TYPE=WORK:;;Av. Andrade Neves\\, 707 - 5 Andar;Campinas;SP;13013-161;Brasil
URL:https://drotto.com.br
URL;TYPE=Doctoralia:https://www.doctoralia.com.br/z/QqNAB4
NOTE:Ortopedista com foco nos tratamentos de dor na coluna e articulações.
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Dr_Otto_Beckedorff.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tratamentos = [
    {
      titulo: "Infiltrações & Bloqueios Guiados",
      desc: "Aplicação precisa de medicação no foco da dor sob visão de ultrassom ou raio-x em tempo real.",
      icon: "bi-shield-plus",
    },
    {
      titulo: "Hérnia de Disco e Dor Ciática",
      desc: "Tratamento conservador e procedimentos minimamente invasivos sem necessidade de cirurgia tradicional.",
      icon: "bi-activity",
    },
    {
      titulo: "Viscossuplementação com Ácido Hialurônico",
      desc: "Lubrificação e amortecimento para artrose de joelho, quadril e condromalácia patelar.",
      icon: "bi-droplet-half",
    },
    {
      titulo: "Radiofrequência Facetária (Rizotomia)",
      desc: "Técnica térmica que neutraliza nervos sensitivos na coluna, proporcionando alívio duradouro.",
      icon: "bi-lightning-charge",
    },
    {
      titulo: "Dor no Ombro, Joelho e Quadril",
      desc: "Abordagem para tendinites, bursites, lesões articulares e dores crônicas persistentes.",
      icon: "bi-heart-pulse",
    },
  ];

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center py-3 px-2 px-sm-3"
      style={{
        backgroundColor: "#edf2f7",
        fontFamily: "var(--font-nunito), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="w-100" style={{ maxWidth: "480px" }}>

        {/* ======================================================== */}
        {/* BOTÃO MODO FÁCIL / ACESSIBILIDADE NO TOPO (ALTA VISIBILIDADE) */}
        {/* ======================================================== */}
        <div className="mb-2">
          <button
            type="button"
            onClick={() => setModoFacil(!modoFacil)}
            className="btn w-100 rounded-4 py-3 px-3 fw-bolder shadow d-flex align-items-center justify-content-center gap-2 transition-all border-2"
            style={{
              backgroundColor: modoFacil ? "#2a4156" : "#FFD500",
              color: modoFacil ? "#ffffff" : "#0d1b2a",
              borderColor: modoFacil ? "#6B9BB4" : "#e6bf00",
              boxShadow: "0 4px 12px rgba(255, 213, 0, 0.35)",
              fontSize: "1.05rem",
              letterSpacing: "-0.2px",
            }}
          >
            <i className={`bi ${modoFacil ? "bi-arrow-counterclockwise fs-4 text-warning" : "bi-eyeglasses fs-3 text-dark"}`}></i>
            <span style={{ lineHeight: "1.25" }}>
              {modoFacil
                ? "Voltar ao Modo Normal (Letras padrão)"
                : "Dificuldade na leitura ou tecnologia? Toque aqui"}
            </span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* HEADER COMPACTO COM CONTRASTE IMPECÁVEL */}
        {/* ======================================================== */}
        <header
          className="rounded-4 p-3 text-white position-relative shadow-sm mb-3 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1b2834 0%, #2a4156 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* BOTÃO COMPARTILHAR COMPACTO */}
          <div className="d-flex justify-content-end align-items-center mb-2">
            <button
              onClick={handleShare}
              className="btn btn-sm text-white border-0 rounded-pill px-3 py-1 d-flex align-items-center gap-1"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                fontSize: "0.75rem",
              }}
              aria-label="Compartilhar Cartão"
            >
              <i className="bi bi-share-fill"></i>
              <span>{copiedLink ? "Link copiado!" : "Compartilhar"}</span>
            </button>
          </div>

          {/* DADOS DO DR. OTTO (LAYOUT COMPACTO E ELEGANTE) */}
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative flex-shrink-0">
              <img
                src="/img/foto-otto.webp"
                alt="Dr. Otto Beckedorff"
                className="rounded-circle shadow object-fit-cover"
                style={{
                  width: "74px",
                  height: "74px",
                  border: "3px solid #ffffff",
                }}
              />
              <span
                className="position-absolute bottom-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "22px", height: "22px" }}
                title="Médico Ortopedista Verificado"
              >
                <i className="bi bi-patch-check-fill text-primary" style={{ fontSize: "14px" }}></i>
              </span>
            </div>

            <div className="flex-grow-1 min-w-0">
              <h1 className="h5 fw-bold text-white mb-0" style={{ letterSpacing: "-0.2px", lineHeight: "1.2" }}>
                Dr. Otto Beckedorff
              </h1>
              <p className="fw-semibold mb-1" style={{ color: "#d9e8f2", fontSize: "0.82rem" }}>
                Ortopedia • Tratamento da Dor (Coluna e Articulações)
              </p>
              <div className="d-flex flex-wrap gap-1">
                <span
                  className="badge fw-bold"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#1d2d3a",
                    fontSize: "0.68rem",
                  }}
                >
                  CRM-SP 226325 • RQE 139078
                </span>
                <span
                  className="badge fw-bold"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    fontSize: "0.68rem",
                  }}
                >
                  Corpo Clínico Vera Cruz
                </span>
              </div>
            </div>
          </div>

          {/* BOTÃO SALVAR CONTATO NA AGENDA */}
          <div className="mt-2 pt-2 border-top border-white border-opacity-10 d-flex justify-content-between align-items-center">
            <span className="small text-white-50" style={{ fontSize: "0.72rem" }}>
              <i className="bi bi-geo-alt-fill text-danger me-1"></i>
              Campinas - SP
            </span>
            <button
              onClick={handleDownloadVCard}
              className="btn btn-light btn-sm rounded-pill fw-bold px-3 py-1 shadow-sm d-inline-flex align-items-center gap-1"
              style={{
                color: "#1d2d3a",
                fontSize: "0.75rem",
              }}
            >
              <i className="bi bi-person-plus-fill text-primary"></i>
              Salvar Contato
            </button>
          </div>
        </header>

        {/* ======================================================== */}
        {/* MODO FÁCIL: LETRAS GRANDES & BOTÕES GIGANTES */}
        {/* ======================================================== */}
        {modoFacil ? (
          <main className="d-flex flex-column gap-3 animate__animated animate__fadeIn">
            <div className="alert alert-info rounded-4 border-0 p-3 shadow-sm d-flex align-items-center gap-2 mb-0" style={{ backgroundColor: "#eaf3fa" }}>
              <i className="bi bi-info-circle-fill text-primary fs-3"></i>
              <div className="small fw-semibold text-dark" style={{ fontSize: "0.95rem" }}>
                Modo Fácil Ativado com letras grandes. Toque no botão grande do que você precisa fazer:
              </div>
            </div>

            {/* 1. WHATSAPP SECRETÁRIA (GIGANTE) */}
            <a
              href={`https://wa.me/5519999439824?text=${msgSecretaria}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-100 rounded-4 p-4 text-white text-start d-flex align-items-center gap-3 shadow"
              style={{ backgroundColor: "#25D366" }}
            >
              <i className="bi bi-whatsapp display-4 flex-shrink-0"></i>
              <div>
                <div className="fw-bolder fs-4">Falar no WhatsApp</div>
                <div className="small text-white-50 fs-6">
                  Mandar mensagem para a secretária e marcar consulta
                </div>
              </div>
            </a>

            {/* 2. LIGAR POR TELEFONE (GIGANTE) */}
            <a
              href="tel:+5519996558008"
              className="btn w-100 rounded-4 p-4 text-white text-start d-flex align-items-center gap-3 shadow"
              style={{ backgroundColor: "#2a4156" }}
            >
              <i className="bi bi-telephone-fill display-4 flex-shrink-0 text-warning"></i>
              <div>
                <div className="fw-bolder fs-4">Ligar por Telefone</div>
                <div className="small text-white-50 fs-6">
                  Toque para telefonar agora: (19) 99655-8008
                </div>
              </div>
            </a>

            {/* 3. COMO CHEGAR COM WAZE (GIGANTE) */}
            <a
              href="https://waze.com/ul?q=Av.+Andrade+Neves+707+Campinas"
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-100 rounded-4 p-4 text-white text-start d-flex align-items-center gap-3 shadow"
              style={{ backgroundColor: "#33b1ff" }}
            >
              <i className="bi bi-sign-turn-right-fill display-4 flex-shrink-0"></i>
              <div>
                <div className="fw-bolder fs-4">Como Chegar (Waze)</div>
                <div className="small text-white-50 fs-6">
                  Av. Andrade Neves, 707 - 5º Andar - Centro, Campinas
                </div>
              </div>
            </a>

            {/* 4. AGENDAR DOCTORALIA ONLINE (GIGANTE) */}
            <a
              href="https://www.doctoralia.com.br/z/QqNAB4"
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-100 rounded-4 p-4 text-white text-start d-flex align-items-center gap-3 shadow"
              style={{ backgroundColor: "#00b39b" }}
            >
              <i className="bi bi-calendar2-check-fill display-4 flex-shrink-0"></i>
              <div>
                <div className="fw-bolder fs-4">Agendar no Doctoralia</div>
                <div className="small text-white-50 fs-6">
                  Ver dias e horários livres pela internet
                </div>
              </div>
            </a>

            {/* 5. AGENDAR RESSONÂNCIA (GIGANTE) */}
            <div className="card rounded-4 border-0 shadow-sm p-4 bg-white">
              <h3 className="fw-bold mb-3 fs-4" style={{ color: "#2a4156" }}>
                <i className="bi bi-clipboard2-pulse me-2 text-primary"></i>
                Agendar Ressonância Magnética:
              </h3>

              <div className="d-flex flex-column gap-3">
                <a
                  href={`https://wa.me/551937393700?text=${msgRmVeraCruz}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary rounded-4 p-3 text-start fw-bold fs-5 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-hospital fs-3 text-primary"></i>
                  <div>
                    <div>Agendar no Vera Cruz</div>
                    <div className="small fw-normal text-muted fs-6">WhatsApp Central: (19) 3739-3700</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/5519971480134?text=${msgRmPatricia}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success rounded-4 p-3 text-start fw-bold fs-5 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-whatsapp fs-3 text-success"></i>
                  <div>
                    <div>Falar com Patrícia (CDE)</div>
                    <div className="small fw-normal text-muted fs-6">WhatsApp direto: (19) 97148-0134</div>
                  </div>
                </a>
              </div>
            </div>

            {/* 6. AVALIAÇÃO GOOGLE NO MODO FÁCIL */}
            <a
              href={urlGoogleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning w-100 rounded-4 p-4 text-dark text-start d-flex align-items-center gap-3 shadow"
            >
              <i className="bi bi-star-fill display-4 flex-shrink-0 text-dark"></i>
              <div>
                <div className="fw-bolder fs-4">Gostou da Consulta?</div>
                <div className="small text-dark fs-6">
                  Toque aqui para dar 5 estrelas no Google! ⭐⭐⭐⭐⭐
                </div>
              </div>
            </a>

            {/* BOTÃO VOLTAR */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setModoFacil(false)}
                className="btn btn-secondary rounded-pill px-4 py-2 fw-bold"
              >
                Voltar para o Modo Padrão
              </button>
            </div>
          </main>
        ) : (
          <main className="d-flex flex-column gap-3">

            {/* ======================================================== */}
            {/* NOVO: BANNER AVALIAÇÃO GOOGLE LOGO NO COMEÇO */}
            {/* ======================================================== */}
            <div
              className="card border-0 rounded-4 shadow-sm overflow-hidden"
              style={{
                backgroundColor: "#fffdf5",
                border: "1.5px solid #ffeeba",
              }}
            >
              <div className="p-3 d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3 min-w-0">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                    style={{ width: "44px", height: "44px", backgroundColor: "#ffc107", color: "#1d2d3a" }}
                  >
                    <i className="bi bi-star-fill fs-5"></i>
                  </div>
                  <div className="min-w-0">
                    <div className="d-flex align-items-center gap-1 mb-0">
                      <span className="fw-bold text-dark" style={{ fontSize: "0.88rem" }}>Gostou da sua consulta?</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 text-warning mb-1" style={{ fontSize: "0.75rem" }}>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <span className="text-muted ms-1" style={{ fontSize: "0.72rem" }}>Deixe uma avaliação no Google</span>
                    </div>
                  </div>
                </div>

                <a
                  href={urlGoogleReview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-warning btn-sm rounded-pill fw-bold px-3 py-2 flex-shrink-0 text-dark shadow-sm d-flex align-items-center gap-1"
                  style={{ fontSize: "0.78rem" }}
                >
                  <span>Avaliar</span>
                  <i className="bi bi-box-arrow-up-right small"></i>
                </a>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SEÇÃO 1: AGENDAR CONSULTA */}
            {/* ======================================================== */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
              <div
                className="px-4 pt-3 pb-2 d-flex align-items-center justify-content-between"
                style={{ borderBottom: "1px solid #f1f4f7" }}
              >
                <span className="fw-bold text-uppercase small" style={{ color: "#2a4156", letterSpacing: "1px", fontSize: "0.75rem" }}>
                  <i className="bi bi-calendar2-check-fill me-2" style={{ color: "#6B9BB4" }}></i>
                  Agendamento de Consultas
                </span>
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1" style={{ fontSize: "0.68rem" }}>
                  Horários Disponíveis
                </span>
              </div>

              <div className="p-3 d-flex flex-column gap-2">
                {/* DOCTORALIA */}
                <a
                  href="https://www.doctoralia.com.br/z/QqNAB4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-4 text-decoration-none d-flex align-items-center gap-3 transition-all"
                  style={{
                    backgroundColor: "#f0f7fb",
                    border: "1.5px solid #d2e7f3",
                    color: "#1e3a4c",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-sm"
                    style={{ width: "46px", height: "46px", backgroundColor: "#00b39b" }}
                  >
                    <i className="bi bi-calendar-event fs-5"></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-bold fs-6" style={{ color: "#0e5a6d" }}>Agendar pelo Doctoralia</span>
                      <i className="bi bi-lightning-charge-fill text-warning small"></i>
                    </div>
                    <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                      Veja a agenda livre e marque direto pelo site
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted fs-6"></i>
                </a>

                {/* SECRETÁRIA WHATSAPP */}
                <a
                  href={`https://wa.me/5519999439824?text=${msgSecretaria}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-4 text-decoration-none d-flex align-items-center gap-3 transition-all"
                  style={{
                    backgroundColor: "#f4fbf7",
                    border: "1.5px solid #ccebd9",
                    color: "#17432b",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-sm"
                    style={{ width: "46px", height: "46px", backgroundColor: "#25D366" }}
                  >
                    <i className="bi bi-whatsapp fs-5"></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold fs-6" style={{ color: "#196b3d" }}>Falar com a Secretária</div>
                    <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                      Tire dúvidas e agende pelo WhatsApp com mensagem automática
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted fs-6"></i>
                </a>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SEÇÃO 2: AGENDAR RM (RESSONÂNCIA MAGNÉTICA) */}
            {/* ======================================================== */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
              <div
                className="px-4 pt-3 pb-2 d-flex align-items-center justify-content-between"
                style={{ borderBottom: "1px solid #f1f4f7" }}
              >
                <span className="fw-bold text-uppercase small" style={{ color: "#2a4156", letterSpacing: "1px", fontSize: "0.75rem" }}>
                  <i className="bi bi-clipboard2-pulse-fill me-2" style={{ color: "#6B9BB4" }}></i>
                  Agendamento de RM (Ressonância)
                </span>
                <span className="badge rounded-pill text-white px-2 py-1" style={{ backgroundColor: "#6B9BB4", fontSize: "0.68rem" }}>
                  Exames de Imagem
                </span>
              </div>

              <div className="p-3">
                <p className="text-muted mb-3" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                  O Dr. Otto solicitou Ressonância Magnética? Escolha onde prefere realizar:
                </p>

                {/* TABS SELECTOR (VERA CRUZ / CDE) */}
                <div className="d-flex p-1 rounded-pill mb-3" style={{ backgroundColor: "#eef3f7" }}>
                  <button
                    type="button"
                    onClick={() => setActiveRmTab("veracruz")}
                    className={`btn btn-sm w-50 rounded-pill fw-bold py-2 border-0 transition-all ${
                      activeRmTab === "veracruz" ? "bg-white shadow-sm" : "text-muted"
                    }`}
                    style={{
                      color: activeRmTab === "veracruz" ? "#2a4156" : "#6c757d",
                      fontSize: "0.82rem",
                    }}
                  >
                    <i className="bi bi-hospital me-1"></i> Hospital Vera Cruz
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveRmTab("cde")}
                    className={`btn btn-sm w-50 rounded-pill fw-bold py-2 border-0 transition-all ${
                      activeRmTab === "cde" ? "bg-white shadow-sm" : "text-muted"
                    }`}
                    style={{
                      color: activeRmTab === "cde" ? "#2a4156" : "#6c757d",
                      fontSize: "0.82rem",
                    }}
                  >
                    <i className="bi bi-building me-1"></i> CDE Diagnósticos
                  </button>
                </div>

                {/* CONTEÚDO VERA CRUZ */}
                {activeRmTab === "veracruz" && (
                  <div className="d-flex flex-column gap-2 animate__animated animate__fadeIn">
                    <div className="p-3 rounded-4 mb-1" style={{ backgroundColor: "#f8fbfe", border: "1px solid #e1ecf4" }}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-primary rounded-pill px-2" style={{ fontSize: "0.68rem" }}>Opção 1</span>
                        <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Vera Cruz - Medicina Diagnóstica</span>
                      </div>
                      <div className="text-muted small" style={{ fontSize: "0.76rem" }}>
                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                        R. Barreto Leme, 245 - Conceição, Campinas - SP
                      </div>
                    </div>

                    {/* Agendar Online TuoTempo */}
                    <a
                      href="https://app.tuotempo.com/mop/index.php?dbName=tt_elf_tasy_careveracruz_prod#search/query/typologyid%3Dsc164a82826642fc%26typologyTitle%3DEXAMES%7BPERCENT%7D20DE%7BPERCENT%7D20RESSON%7BPERCENT%7DC3%7BPERCENT%7D82NCIA%7BPERCENT%7D20MAGN%7BPERCENT%7DC3%7BPERCENT%7D89TICA%26activityid%3Dsc164b01fdd02d3b%26activityTitle%3DRM%7BPERCENT%7D20DE%7BPERCENT%7D20COLUNA%7BPERCENT%7D20LOMBAR%26areaid%7BPERCENT%7D5B%7BPERCENT%7D5D%3Dsc164a6cf0d57ddc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn w-100 rounded-pill py-2 fw-bold text-white d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      style={{ backgroundColor: "#2a4156", fontSize: "0.85rem" }}
                    >
                      <i className="bi bi-laptop"></i> Agendar Diretamente Online (Vera Cruz)
                    </a>

                    <div className="row g-2 pt-1">
                      <div className="col-6">
                        <a
                          href={`https://wa.me/551937393700?text=${msgRmVeraCruz}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-success w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1"
                          style={{ fontSize: "0.78rem" }}
                        >
                          <i className="bi bi-whatsapp"></i> WhatsApp Central
                        </a>
                      </div>
                      <div className="col-6">
                        <a
                          href="tel:+551937393700"
                          className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1"
                          style={{ fontSize: "0.78rem" }}
                        >
                          <i className="bi bi-telephone-fill"></i> (19) 3739-3700
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTEÚDO CDE */}
                {activeRmTab === "cde" && (
                  <div className="d-flex flex-column gap-2 animate__animated animate__fadeIn">
                    <div className="p-3 rounded-4 mb-1" style={{ backgroundColor: "#fafbfc", border: "1px solid #e7ecf0" }}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-secondary rounded-pill px-2" style={{ fontSize: "0.68rem" }}>Opção 2</span>
                        <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>CDE - Clínica de Imagem Campinas</span>
                      </div>
                      <div className="text-muted small" style={{ fontSize: "0.76rem" }}>
                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                        Av. Barão de Itapura, 933 - Vila Itapura, Campinas - SP
                      </div>
                    </div>

                    {/* Falar Direto com Patrícia */}
                    <a
                      href={`https://wa.me/5519971480134?text=${msgRmPatricia}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-4 text-decoration-none d-flex align-items-center gap-3 transition-all"
                      style={{
                        backgroundColor: "#f0fbf5",
                        border: "1.5px solid #bde6ce",
                        color: "#155724",
                      }}
                    >
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-sm"
                        style={{ width: "42px", height: "42px", backgroundColor: "#25D366" }}
                      >
                        <i className="bi bi-whatsapp fs-5"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-1">
                          <span className="fw-bold" style={{ fontSize: "0.88rem" }}>Falar Direto com Patrícia</span>
                          <span className="badge bg-success rounded-pill px-2 py-0" style={{ fontSize: "0.62rem" }}>Dedicado</span>
                        </div>
                        <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
                          Atendimento pelo WhatsApp: +55 19 97148-0134
                        </div>
                      </div>
                      <i className="bi bi-arrow-right-short fs-4 text-success"></i>
                    </a>

                    {/* Central CDE Geral */}
                    <div className="row g-2 pt-1">
                      <div className="col-6">
                        <a
                          href={`https://wa.me/551937370770?text=${msgRmCdeCentral}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1"
                          style={{ fontSize: "0.78rem" }}
                        >
                          <i className="bi bi-whatsapp"></i> Central CDE
                        </a>
                      </div>
                      <div className="col-6">
                        <a
                          href="tel:+551937370770"
                          className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1"
                          style={{ fontSize: "0.78rem" }}
                        >
                          <i className="bi bi-telephone-fill"></i> (19) 3737-0770
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ======================================================== */}
            {/* SEÇÃO 3: ROTAS ATÉ O CONSULTÓRIO (WAZE) */}
            {/* ======================================================== */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
              <div
                className="px-4 pt-3 pb-2 d-flex align-items-center justify-content-between"
                style={{ borderBottom: "1px solid #f1f4f7" }}
              >
                <span className="fw-bold text-uppercase small" style={{ color: "#2a4156", letterSpacing: "1px", fontSize: "0.75rem" }}>
                  <i className="bi bi-geo-alt-fill me-2" style={{ color: "#6B9BB4" }}></i>
                  Rotas até o Consultório
                </span>
                <span className="badge bg-light text-muted border rounded-pill px-2 py-1" style={{ fontSize: "0.68rem" }}>
                  Campinas - SP
                </span>
              </div>

              <div className="p-3">
                <div className="mb-3">
                  <div className="fw-bold text-dark fs-6 mb-1">Instituto Orthesen</div>
                  <div className="text-muted small" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                    <i className="bi bi-pin-map-fill text-danger me-1"></i>
                    Av. Andrade Neves, 707 - 5º Andar - Centro
                    <br />
                    Campinas - SP • CEP 13013-161
                  </div>
                </div>

                {/* BOTÃO PRINCIPAL WAZE */}
                <a
                  href="https://waze.com/ul?q=Av.+Andrade+Neves+707+Campinas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-100 rounded-pill py-3 fw-bold text-white d-flex align-items-center justify-content-center gap-2 shadow-sm mb-2"
                  style={{
                    backgroundColor: "#33b1ff",
                    fontSize: "0.92rem",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <i className="bi bi-sign-turn-right-fill fs-5"></i>
                  Navegar com Waze até o Consultório
                </a>

                {/* BOTÕES AUXILIARES: MAPS E COPIAR */}
                <div className="row g-2">
                  <div className="col-6">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Av.+Andrade+Neves,+707+-+Centro,+Campinas+-+SP"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: "0.78rem" }}
                    >
                      <i className="bi bi-google text-danger"></i> Google Maps
                    </a>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: "0.78rem" }}
                    >
                      <i className="bi bi-copy"></i>
                      <span>{copiedAddress ? "Copiado!" : "Copiar Endereço"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SEÇÃO 4: VER TRATAMENTOS QUE O DR. FAZ */}
            {/* ======================================================== */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
              <div
                className="px-4 py-3 d-flex align-items-center justify-content-between"
                onClick={() => setShowTreatments(!showTreatments)}
                style={{ cursor: "pointer" }}
              >
                <span className="fw-bold text-uppercase small" style={{ color: "#2a4156", letterSpacing: "1px", fontSize: "0.75rem" }}>
                  <i className="bi bi-heart-pulse-fill me-2" style={{ color: "#6B9BB4" }}></i>
                  Tratamentos Realizados
                </span>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge rounded-pill text-muted bg-light border px-2 py-1" style={{ fontSize: "0.68rem" }}>
                    {showTreatments ? "Ocultar" : "Ver lista"}
                  </span>
                  <i className={`bi bi-chevron-${showTreatments ? "up" : "down"} text-muted small`}></i>
                </div>
              </div>

              {/* LISTA EXPANSÍVEL DE TRATAMENTOS */}
              {showTreatments && (
                <div className="px-3 pb-3 pt-1 border-top animate__animated animate__fadeIn">
                  <div className="d-flex flex-column gap-2 mb-3 mt-2">
                    {tratamentos.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-3"
                        style={{ backgroundColor: "#f8fafd", border: "1px solid #edf2f7" }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <i className={`bi ${t.icon} text-primary fs-5`}></i>
                          <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: "0.88rem" }}>
                            {t.titulo}
                          </h4>
                        </div>
                        <p className="text-muted mb-0 small" style={{ fontSize: "0.78rem", lineHeight: "1.4" }}>
                          {t.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/procedimentos"
                    className="btn btn-outline-primary w-100 rounded-pill py-2 fw-bold text-center d-flex align-items-center justify-content-center gap-2"
                    style={{ fontSize: "0.82rem" }}
                  >
                    Ver Todos os Procedimentos no Site
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* CANAIS ADICIONAIS & REDES */}
            {/* ======================================================== */}
            <div className="d-flex justify-content-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/drottobeckedorff/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light rounded-pill px-3 py-2 text-muted fw-semibold small shadow-sm border d-flex align-items-center gap-1"
                style={{ fontSize: "0.75rem" }}
              >
                <i className="bi bi-instagram text-danger"></i> @drottobeckedorff
              </a>
              <Link
                href="/"
                className="btn btn-light rounded-pill px-3 py-2 text-muted fw-semibold small shadow-sm border d-flex align-items-center gap-1"
                style={{ fontSize: "0.75rem" }}
              >
                <i className="bi bi-globe text-primary"></i> Site Oficial
              </Link>
            </div>

          </main>
        )}

        {/* FOOTER */}
        <footer className="text-center text-muted small mt-4 pt-2 pb-2" style={{ fontSize: "0.72rem" }}>
          <p className="mb-1">
            Dr. Otto Beckedorff — Ortopedia • Tratamento da Dor (Coluna e Articulações) • RQE 139078 • CRM-SP 226325
          </p>
          <p className="mb-0 text-secondary">
            Instituto Orthesen & Hospital Vera Cruz • Campinas - SP
          </p>
        </footer>

      </div>
    </div>
  );
}
