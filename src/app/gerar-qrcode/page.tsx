"use client";

import React, { useState } from 'react';

const QR_LINKS = [
    {
        title: "Cartão de Visita Digital",
        url: "https://drotto.com.br/cartao",
        desc: "QR Code oficial para impressão no cartão de visita físico.",
        color: "6B9BB4", // Cor solicitada: #6B9BB4
        destaque: true
    },
    {
        title: "Censo da Dor (Pesquisa)",
        url: "https://drotto.com.br/censo-dor",
        desc: "Para pacientes contribuírem com a pesquisa.",
        color: "000000" // Preto
    },
    {
        title: "Passatempo (Caça-Palavras)",
        url: "https://drotto.com.br/passatempo",
        desc: "Para relaxar na sala de espera.",
        color: "2E8B57" // Verde (SeaGreen)
    },
    {
        title: "Teste do Joelho",
        url: "https://drotto.com.br/blog/protese-vs-viscossuplementacao",
        desc: "Quiz direto para avaliar artrose.",
        color: "00008B" // Azul Escuro
    },
    {
        title: "Agendamento (WhatsApp)",
        url: "https://wa.me/5519999439824",
        desc: "Link direto para o WhatsApp da Clínica.",
        color: "25D366" // Verde WhatsApp
    },
    {
        title: "Site Oficial (Home)",
        url: "https://drotto.com.br",
        desc: "Acesso à página inicial completa.",
        color: "000000"
    },
    {
        title: "Página de Contato/Endereços",
        url: "https://drotto.com.br/contato",
        desc: "Mapa e Telefones das Clínicas.",
        color: "DC3545" // Vermelho (destaque)
    },
    {
        title: "Facilitador de Agendamentos",
        url: "https://drotto.com.br/facilitadoragendamentos",
        desc: "Links rápidos para agendamento de exames e consultas.",
        color: "8A2BE2" // Roxo
    }
];

export default function QrCodePage() {
    const [cardModel, setCardModel] = useState<"clean" | "orientacao" | "grafica">("orientacao");
    const [printMode, setPrintMode] = useState<"single" | "sheet">("sheet");

    const qrUrlPB = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent("https://drotto.com.br/cartao")}&color=000000&margin=4`;
    const qrUrlAzul = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent("https://drotto.com.br/cartao")}&color=6B9BB4&margin=4`;

    const handlePrint = (mode: "single" | "sheet") => {
        setPrintMode(mode);
        setTimeout(() => {
            window.print();
        }, 150);
    };

    // Renderizador do Cartão Individual (9x5 cm em proporção CSS 90mm x 50mm)
    const renderCard = (model: "clean" | "orientacao" | "grafica") => {
        const isPB = model !== "grafica";
        const primaryColor = isPB ? "#000000" : "#2a4156";
        const accentColor = isPB ? "#333333" : "#6B9BB4";
        const qrImage = isPB ? qrUrlPB : qrUrlAzul;

        return (
            <div
                className="bg-white rounded-3 shadow-sm p-3 text-start position-relative d-flex justify-content-between align-items-center"
                style={{
                    width: "100%",
                    maxWidth: "520px",
                    minHeight: "260px",
                    border: `1.5px solid ${isPB ? "#222" : "#d0dbe2"}`,
                    boxSizing: "border-box",
                    fontFamily: "var(--font-nunito), -apple-system, sans-serif",
                    color: "#000000"
                }}
            >
                {/* LADO ESQUERDO: DADOS DO DR. OTTO E CONSULTÓRIO */}
                <div className="d-flex flex-column justify-content-between h-100 pe-3" style={{ flex: "1 1 65%" }}>
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="fw-bolder" style={{ fontSize: "1.25rem", color: primaryColor, letterSpacing: "-0.3px", lineHeight: "1.1" }}>
                                Dr. Otto Beckedorff
                            </span>
                        </div>
                        <div className="fw-bold mb-1" style={{ fontSize: "0.85rem", color: accentColor }}>
                            Ortopedia • Tratamento da Dor (Coluna e Articulações)
                        </div>
                        <div className="badge border text-dark bg-light px-2 py-1 mb-3" style={{ fontSize: "0.7rem", borderColor: "#bbb" }}>
                            CRM-SP 226325 | RQE 139078
                        </div>
                    </div>

                    {/* MODELO COM CHECKLIST PARA PACIENTE DO PS */}
                    {model === "orientacao" && (
                        <div className="p-2 rounded mb-2" style={{ backgroundColor: "#f5f5f5", border: "1px dashed #777", fontSize: "0.72rem" }}>
                            <div className="fw-bold mb-1" style={{ color: "#000", letterSpacing: "0.3px" }}>ORIENTAÇÕES PÓS-ATENDIMENTO:</div>
                            <div className="d-flex align-items-center gap-1 mb-1">
                                <span className="badge bg-dark rounded-circle" style={{ width: "16px", height: "16px", padding: "2px", fontSize: "9px" }}>1</span>
                                <span className="fw-bold">Agende seus exames</span>
                            </div>
                            <div className="d-flex align-items-start gap-1">
                                <span className="badge bg-dark rounded-circle mt-1" style={{ width: "16px", height: "16px", padding: "2px", fontSize: "9px" }}>2</span>
                                <span className="fw-bold" style={{ lineHeight: "1.25" }}>Agende seu retorno após os resultados dos exames.</span>
                            </div>
                        </div>
                    )}

                    {/* DADOS DE CONTATO & ORTHESEN */}
                    <div style={{ fontSize: "0.78rem", lineHeight: "1.35", color: "#222" }}>
                        <div className="fw-bold" style={{ color: primaryColor }}>
                            <i className="bi bi-geo-alt-fill me-1"></i> Instituto Orthesen
                        </div>
                        <div>Av. Andrade Neves, 707 - 5º Andar - Centro, Campinas - SP</div>
                        <div className="fw-bold mt-1">
                            <i className="bi bi-whatsapp me-1"></i> (19) 99943-9824 • drotto.com.br
                        </div>
                    </div>
                </div>

                {/* LADO DIREITO: QR CODE DE AGENDAMENTO RÁPIDO */}
                <div
                    className="d-flex flex-column align-items-center justify-content-center text-center ps-3"
                    style={{
                        flex: "0 0 38%",
                        borderLeft: `1px solid ${isPB ? "#ddd" : "#e4edf2"}`
                    }}
                >
                    <span className="fw-bolder text-uppercase mb-1" style={{ fontSize: "0.62rem", color: primaryColor, letterSpacing: "0.3px" }}>
                        Aponte a Câmera
                    </span>

                    <div className="p-1 bg-white border rounded shadow-sm mb-1">
                        <img
                            src={qrImage}
                            alt="QR Code Dr. Otto"
                            style={{ width: "105px", height: "105px", display: "block" }}
                        />
                    </div>

                    <span className="fw-bold text-dark" style={{ fontSize: "0.53rem", lineHeight: "1.15", textTransform: "uppercase" }}>
                        TUDO QUE PRECISA ESTÁ NESSE QR CODE, CASO NÃO CONSIGA ESCANEAR ENTRE NO SITE ABAIXO:
                    </span>

                    <span className="fw-bolder mt-1 text-dark" style={{ fontSize: "0.68rem" }}>
                        drotto.com.br/cartao
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="container py-5">
            {/* ESTILOS ESPECÍFICOS PARA IMPRESSÃO EM FOLHA A4 */}
            <style jsx global>{`
                @media print {
                    body {
                        background: #fff !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .print-area {
                        display: block !important;
                    }
                    .sheet-grid {
                        display: grid !important;
                        grid-template-columns: repeat(2, 90mm) !important;
                        grid-auto-rows: 50mm !important;
                        gap: 8mm !important;
                        justify-content: center !important;
                        align-content: start !important;
                        padding: 10mm !important;
                    }
                }
            `}</style>

            {/* CABEÇALHO */}
            <div className="text-center mb-5 no-print">
                <span className="badge rounded-pill px-3 py-2 text-white mb-2" style={{ backgroundColor: "#6B9BB4", fontSize: "0.8rem" }}>
                    Pronto-Socorro & Consultório
                </span>
                <h1 className="fw-bold display-6 mb-2">Central de Cartões de Visita & QR Codes 🖨️</h1>
                <p className="text-muted lead mx-auto" style={{ maxWidth: "700px", fontSize: "1rem" }}>
                    Gere o cartão para entregar em mãos ao paciente no pronto-socorro ou baixe os QR codes em alta resolução.
                </p>
            </div>

            {/* SEÇÃO PRINCIPAL: VISUALIZADOR E GERADOR DO CARTÃO DE VISITA */}
            <div className="card shadow-sm border-0 rounded-4 p-4 mb-5 no-print" style={{ backgroundColor: "#f8fafd", border: "1.5px solid #dce8ef" }}>
                <div className="row align-items-center mb-4">
                    <div className="col-lg-7">
                        <h3 className="fw-bold mb-1" style={{ color: "#2a4156" }}>
                            📇 Cartão de Visita Físico (9x5 cm)
                        </h3>
                        <p className="text-muted small mb-0">
                            Ideal para entregar no Pronto-Socorro após o atendimento. O paciente escaneia para agendar a RM (Vera Cruz/CDE) e marcar o retorno no Instituto Orthesen.
                        </p>
                    </div>

                    <div className="col-lg-5 text-lg-end mt-3 mt-lg-0">
                        {/* SELETOR DE MODELO */}
                        <div className="btn-group shadow-sm" role="group">
                            <button
                                type="button"
                                onClick={() => setCardModel("orientacao")}
                                className={`btn btn-sm ${cardModel === "orientacao" ? "btn-dark fw-bold" : "btn-outline-dark"}`}
                            >
                                P&B c/ Checklist (PS)
                            </button>
                            <button
                                type="button"
                                onClick={() => setCardModel("clean")}
                                className={`btn btn-sm ${cardModel === "clean" ? "btn-dark fw-bold" : "btn-outline-dark"}`}
                            >
                                P&B Clássico
                            </button>
                            <button
                                type="button"
                                onClick={() => setCardModel("grafica")}
                                className={`btn btn-sm ${cardModel === "grafica" ? "btn-primary fw-bold" : "btn-outline-primary"}`}
                                style={cardModel === "grafica" ? { backgroundColor: "#6B9BB4", borderColor: "#6B9BB4" } : {}}
                            >
                                Colorido (#6B9BB4)
                            </button>
                        </div>
                    </div>
                </div>

                {/* PRÉVIA DO CARTÃO */}
                <div className="d-flex justify-content-center p-3 p-md-4 rounded-4 mb-4 bg-light border">
                    {renderCard(cardModel)}
                </div>

                {/* BOTÕES DE AÇÃO: IMPRIMIR E BAIXAR */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                    <button
                        onClick={() => handlePrint("sheet")}
                        className="btn btn-dark fw-bold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    >
                        <i className="bi bi-printer-fill fs-5"></i>
                        Imprimir Folha A4 com 8 Cartões (Ideal para o PS)
                    </button>

                    <button
                        onClick={() => handlePrint("single")}
                        className="btn btn-outline-dark fw-bold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
                    >
                        <i className="bi bi-file-earmark-text fs-5"></i>
                        Imprimir Cartão Avulso
                    </button>

                    <a
                        href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent("https://drotto.com.br/cartao")}&color=${cardModel === "grafica" ? "6B9BB4" : "000000"}&margin=20`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary fw-bold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
                        style={{ color: "#2a4156", borderColor: "#2a4156" }}
                    >
                        <i className="bi bi-download fs-5"></i>
                        Baixar QR Code em Alta Resolução (1000px)
                    </a>
                </div>
            </div>

            {/* ÁREA OCULTA QUE APARECE NA IMPRESSÃO (GRADE DE CARTÕES A4) */}
            <div className="d-none print-area">
                {printMode === "sheet" ? (
                    <div className="sheet-grid">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} style={{ pageBreakInside: "avoid" }}>
                                {renderCard(cardModel)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 d-flex justify-content-center">
                        {renderCard(cardModel)}
                    </div>
                )}
            </div>

            {/* DEMAIS QR CODES DA CENTRAL */}
            <div className="no-print">
                <div className="text-center mb-4 pt-3 border-top">
                    <h3 className="fw-bold" style={{ color: "#2a4156" }}>Demais QR Codes do Site</h3>
                    <p className="text-muted small">QR Codes rápidos para outros serviços, testes e pesquisas.</p>
                </div>

                <div className="row g-4 justify-content-center">
                    {QR_LINKS.map((item, index) => {
                        const qrUrlNormal = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(item.url)}&color=${item.color}&margin=10`;
                        const qrUrlHighRes = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(item.url)}&color=${item.color}&margin=20`;

                        return (
                            <div key={index} className={item.destaque ? "col-12 col-md-8 col-lg-6" : "col-md-6 col-lg-4"}>
                                <div className={`card h-100 shadow-sm border-0 text-center ${item.destaque ? "border-2 border-primary" : ""}`} style={{ backgroundColor: item.destaque ? "#f8fbfe" : "#ffffff" }}>
                                    <div className="card-body p-4 d-flex flex-column align-items-center">
                                        {item.destaque && (
                                            <span className="badge rounded-pill px-3 py-1 text-white mb-2" style={{ backgroundColor: "#6B9BB4", fontSize: "0.75rem" }}>
                                                ⭐ Destaque Cartão de Visita (#6B9BB4)
                                            </span>
                                        )}

                                        <h5 className="fw-bold mb-2">{item.title}</h5>
                                        <p className="small text-muted mb-3">{item.desc}</p>

                                        <div className="bg-white p-3 rounded-4 shadow-sm mb-3 d-inline-block border">
                                            <img
                                                src={qrUrlNormal}
                                                alt={item.title}
                                                className="img-fluid rounded"
                                                style={{ width: item.destaque ? '220px' : '180px', height: item.destaque ? '220px' : '180px' }}
                                            />
                                        </div>

                                        <div className="small font-monospace text-muted mb-3 px-2 py-1 rounded bg-light border" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
                                            {item.url}
                                        </div>

                                        <div className="w-100 d-grid gap-2 mt-auto">
                                            <a
                                                href={qrUrlHighRes}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`btn btn-sm fw-bold ${item.destaque ? "btn-primary text-white" : "btn-outline-primary"}`}
                                                style={item.destaque ? { backgroundColor: "#6B9BB4", borderColor: "#6B9BB4" } : {}}
                                            >
                                                <i className="bi bi-download me-1"></i> Baixar Imagem para Gráfica (1000x1000)
                                            </a>
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">
                                                Testar Link no Navegador <i className="bi bi-box-arrow-up-right ms-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
