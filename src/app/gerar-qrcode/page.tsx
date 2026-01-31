
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
    }
];

export default function QrCodePage() {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold">Central de QR Codes 🖨️</h1>
                <p className="text-muted">Salve estas imagens para imprimir placas ou cartões.</p>
            </div>

            <div className="row g-4 justify-content-center">
                {QR_LINKS.map((item, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm border-0 text-center">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">{item.title}</h5>

                                <div className="bg-light p-3 rounded mb-3 d-inline-block">
                                    {/* Usando API QR Server (padrão da indústria, rápido e confiável) */}
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(item.url)}&color=${item.color}`}
                                        alt={item.title}
                                        className="img-fluid"
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </div>

                                <p className="small text-muted mb-3">{item.desc}</p>

                                <div className="d-grid gap-2">
                                    <a href={item.url} target="_blank" className="btn btn-outline-secondary btn-sm">
                                        Testar Link <i className="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
