
import React from 'react';

export const metadata = {
    title: 'Gerador de QR Codes | Uso Interno',
    robots: {
        index: false,
        follow: false,
    },
};

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
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold">Central de QR Codes 🖨️</h1>
                <p className="text-muted">Salve estas imagens para imprimir placas ou cartões de visita.</p>
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
    );
}
