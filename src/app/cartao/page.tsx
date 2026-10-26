"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CartaoVisitaPage() {
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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(enderecoCampinas);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Dr. Otto Beckedorff | Ortopedia e Tratamento da Dor",
      text: "Cartão de visita digital e facilitador de agendamentos do Dr. Otto Beckedorff.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Usuário cancelou ou navegador não suportou compartilhamento direto
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Gerador de vCard para salvar direto no celular
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
NOTE:Especialista em Tratamento da Dor\\, Coluna e Articulações.
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
      className="min-vh-100 d-flex flex-column align-items-center py-4 px-3"
      style={{
        background: "linear-gradient(180deg, #1d2d3a 0%, #2a4156 220px, #f4f7f9 220px, #edf2f6 100%)",
        fontFamily: "var(--font-nunito), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* CONTAINER PRINCIPAL MOBILE-FIRST */}
      <div className="w-100" style={{ maxWidth: "480px" }}>
        
        {/* HEADER / PERFIL */}
        <header className="text-center text-white pt-2 pb-3 position-relative">
          <div className="d-flex justify-content-end mb-2">
            <button
              onClick={handleShare}
              className="btn btn-sm text-white border-0 rounded-pill px-3 py-1 shadow-sm d-flex align-items-center gap-1"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                fontSize: "0.8rem",
              }}
              aria-label="Compartilhar Cartão"
            >
              <i className="bi bi-share-fill"></i>
              <span>{copiedLink ? "Link copiado!" : "Compartilhar"}</span>
            </button>
          </div>

          <div className="position-relative d-inline-block mb-3">
            <img
              src="/img/foto-otto.webp"
              alt="Dr. Otto Beckedorff"
              className="rounded-circle shadow-lg object-fit-cover"
              style={{
                width: "115px",
                height: "115px",
                border: "4px solid #ffffff",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
              }}
            />
            <span
              className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow-sm d-flex align-items-center justify-content-center"
              style={{ width: "32px", height: "32px" }}
              title="Médico Verificado CRM 226325SP | RQE 139078"
            >
              <i className="bi bi-patch-check-fill text-primary fs-5"></i>
            </span>
          </div>

          <h1 className="h4 fw-bold mb-1 text-white" style={{ letterSpacing: "-0.3px" }}>
            Dr. Otto Beckedorff
          </h1>

          <p className="text-white-50 mb-2 small fw-medium" style={{ fontSize: "0.9rem" }}>
            Ortopedista & Especialista em Dor
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
            <span
              className="badge rounded-pill px-3 py-1 fw-semibold"
              style={{
                backgroundColor: "rgba(107, 155, 180, 0.3)",
                border: "1px solid rgba(107, 155, 180, 0.4)",
                color: "#e2eff7",
                fontSize: "0.72rem",
                letterSpacing: "0.3px",
              }}
            >
              CRM-SP 226325 • RQE 139078
            </span>
            <span
              className="badge rounded-pill px-3 py-1 fw-semibold"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                fontSize: "0.72rem",
              }}
            >
              <i className="bi bi-hospital me-1"></i>Corpo Clínico Vera Cruz
            </span>
          </div>

          {/* BOTÃO SALVAR CONTATO */}
          <button
            onClick={handleDownloadVCard}
            className="btn btn-light btn-sm rounded-pill fw-bold px-4 py-2 shadow-sm d-inline-flex align-items-center gap-2"
            style={{
              color: "#2a4156",
              fontSize: "0.82rem",
              transition: "transform 0.15s ease",
            }}
          >
            <i className="bi bi-person-vcard-fill fs-6 text-primary"></i>
            Salvar Contato no Celular
          </button>
        </header>

        {/* CORPO DE CARDS INTERATIVOS */}
        <main className="d-flex flex-column gap-3 mt-3">

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
                  style={{ width: "48px", height: "48px", backgroundColor: "#00b39b" }}
                >
                  <i className="bi bi-calendar-event fs-5"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-1">
                    <span className="fw-bold fs-6" style={{ color: "#0e5a6d" }}>Agendar pelo Doctoralia</span>
                    <i className="bi bi-lightning-charge-fill text-warning small"></i>
                  </div>
                  <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                    Escolha o melhor dia e horário livre online agora mesmo
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
                  style={{ width: "48px", height: "48px", backgroundColor: "#25D366" }}
                >
                  <i className="bi bi-whatsapp fs-5"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-bold fs-6" style={{ color: "#196b3d" }}>Falar com a Secretária</div>
                  <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                    Tire dúvidas, convênios e agende pelo WhatsApp
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
                Exames Solicitados
              </span>
            </div>

            <div className="p-3">
              <p className="text-muted mb-3" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                Se o Dr. Otto solicitou Ressonância Magnética, selecione abaixo o centro de diagnóstico de sua preferência:
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

                  {/* Falar Direto com Patrícia (Destaque VIP) */}
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
                        <span className="badge bg-success rounded-pill px-2 py-0" style={{ fontSize: "0.62rem" }}>Recomendado</span>
                      </div>
                      <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
                        Atendimento dedicado para pacientes do Dr. Otto: +55 19 97148-0134
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
              className="px-4 py-3 d-flex align-items-center justify-content-between cursor-pointer"
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
                  Ver Todos os Procedimentos Detalhados no Site
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* CANAIS ADICIONAIS & REDES */}
          {/* ======================================================== */}
          <div className="d-flex justify-content-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/drottobeckedorff/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light rounded-pill px-3 py-2 text-muted fw-semibold small shadow-sm border d-flex align-items-center gap-2"
              style={{ fontSize: "0.78rem" }}
            >
              <i className="bi bi-instagram text-danger"></i> @drottobeckedorff
            </a>
            <Link
              href="/"
              className="btn btn-light rounded-pill px-3 py-2 text-muted fw-semibold small shadow-sm border d-flex align-items-center gap-2"
              style={{ fontSize: "0.78rem" }}
            >
              <i className="bi bi-globe text-primary"></i> Visitar Site Completo
            </Link>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="text-center text-muted small mt-4 pt-3 pb-2" style={{ fontSize: "0.72rem" }}>
          <p className="mb-1">
            Dr. Otto Beckedorff — Ortopedia e Traumatologia • RQE 139078 • CRM-SP 226325
          </p>
          <p className="mb-0 text-secondary">
            Cartão Digital Oficial • Instituto Orthesen & Hospital Vera Cruz
          </p>
        </footer>

      </div>
    </div>
  );
}
