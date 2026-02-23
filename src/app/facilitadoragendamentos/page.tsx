import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
    title: "Facilitador de Agendamentos | Dr. Otto Beckedorff",
    description: "Links rápidos para agendamento de exames e consultas.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function FacilitadorAgendamentosPage() {
    const whatsappMessageExames = encodeURIComponent("Olá! O Dr. Otto solicitou um exame de imagem, gostaria de agendar!");
    const whatsappMessageAnestesia = encodeURIComponent("Olá! Gostaria de agendar minha consulta pré-anestésica.");
    const whatsappMessageAutorizacao = encodeURIComponent("Olá! Gostaria de ver sobre a autorização do meu procedimento com o Dr. Otto.");

    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden bg-light">
            <Header />

            <main className="flex-grow-1" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(57, 88, 109, 0.1)', color: 'var(--azul-medio)', border: '1px solid rgba(57, 88, 109, 0.2)' }}>
                            <i className="bi bi-calendar-check me-2"></i>Facilitador
                        </span>
                        <h1 className="fw-bold display-5 mb-3" style={{ color: 'var(--azul-escuro)' }}>Agendamentos Rápidos</h1>
                        <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                            Links e contatos diretos para facilitar a marcação de seus exames, consultas pré-anestésicas e autorizações.
                        </p>
                    </div>

                    <div className="row justify-content-center mb-4">
                        <div className="col-12 text-center text-muted mb-3">
                            <h5 className="fw-bold d-inline-block px-4 py-2 bg-white rounded-pill shadow-sm border">
                                EXAMES DE IMAGEM
                            </h5>
                            <p className="small mt-2 text-danger fw-bold"><i className="bi bi-exclamation-circle-fill me-1"></i> Dê preferência aos locais sugeridos abaixo, na ordem apresentada:</p>
                        </div>
                    </div>

                    {/* VERA CRUZ */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 rounded-4 transition-all hover-lift">
                                <div className="card-body p-4">
                                    <h3 className="fw-bold mb-1" style={{ color: 'var(--azul-escuro)' }}>Vera Cruz - Medicina Diagnóstica</h3>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="badge bg-primary rounded-pill me-2">1ª Opção</span>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-muted mb-2"><i className="bi bi-geo-alt-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>R. Barreto Leme, 245 - Conceição, Campinas - SP, 13025-085</p>
                                        <p className="text-muted mb-1"><i className="bi bi-telephone-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>(19) 3739-3700</p>
                                        <div className="mt-2">
                                            <a href="https://app.tuotempo.com/mop/index.php?dbName=tt_elf_tasy_careveracruz_prod#search/query/typologyid%3Dsc164a82826642fc%26typologyTitle%3DEXAMES%7BPERCENT%7D20DE%7BPERCENT%7D20RESSON%7BPERCENT%7DC3%7BPERCENT%7D82NCIA%7BPERCENT%7D20MAGN%7BPERCENT%7DC3%7BPERCENT%7D89TICA%26activityid%3Dsc164b01fdd02d3b%26activityTitle%3DRM%7BPERCENT%7D20DE%7BPERCENT%7D20COLUNA%7BPERCENT%7D20LOMBAR%26areaid%7BPERCENT%7D5B%7BPERCENT%7D5D%3Dsc164a6cf0d57ddc" target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold" style={{ color: 'var(--azul-medio)' }}>
                                                <i className="bi bi-laptop me-1"></i> Agendar direto pelo site
                                            </a>
                                        </div>
                                    </div>

                                    <div className="row g-2">
                                        <div className="col-md-6">
                                            <a href={`https://wa.me/551937393700?text=${whatsappMessageExames}`} target="_blank" rel="noopener noreferrer" className="btn w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 text-white" style={{ backgroundColor: '#25D366' }}>
                                                <i className="bi bi-whatsapp"></i> WhatsApp Agendamento
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href="https://waze.com/ul?q=R.+Barreto+Leme,+245+-+Conceição,+Campinas+-+SP" target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted">
                                                <i className="bi bi-sign-turn-right-fill" style={{ color: '#33b1ff' }}></i> Waze
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("R. Barreto Leme, 245 - Conceicao, Campinas - SP, 13025-085")}`} target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted">
                                                <i className="bi bi-google" style={{ color: '#ea4335' }}></i> Maps
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CDE */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 rounded-4 transition-all hover-lift">
                                <div className="card-body p-4">
                                    <h3 className="fw-bold mb-1" style={{ color: 'var(--azul-escuro)' }}>CDE - Clínica de Imagem Campinas</h3>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="badge bg-secondary rounded-pill me-2">2ª Opção</span>
                                        <span className="small text-warning fw-bold"><i className="bi bi-star-fill"></i> 4,8 (3.871 avaliações no Google)</span>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-muted mb-2"><i className="bi bi-geo-alt-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>Av. Barão de Itapura, 933 - Vila Itapura, Campinas - SP, 13020-431</p>
                                        <p className="text-muted mb-1"><i className="bi bi-telephone-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>(19) 3737-0770</p>
                                        <p className="text-muted mb-0 small"><i className="bi bi-clock-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>Funciona até as 21:00</p>
                                    </div>

                                    <div className="row g-2">
                                        <div className="col-md-6">
                                            <a href={`https://wa.me/551937370770?text=${whatsappMessageExames}`} target="_blank" rel="noopener noreferrer" className="btn w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 text-white" style={{ backgroundColor: '#25D366' }}>
                                                <i className="bi bi-whatsapp"></i> WhatsApp Agendamento
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href="https://waze.com/ul?q=Av.+Barão+de+Itapura,+933+-+Vila+Itapura,+Campinas+-+SP" target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted">
                                                <i className="bi bi-sign-turn-right-fill" style={{ color: '#33b1ff' }}></i> Waze
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Av. Barão de Itapura, 933 - Vila Itapura, Campinas - SP, 13020-431")}`} target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted">
                                                <i className="bi bi-google" style={{ color: '#ea4335' }}></i> Maps
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RCC */}
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 rounded-4 transition-all hover-lift">
                                <div className="card-body p-4">
                                    <h3 className="fw-bold mb-1" style={{ color: 'var(--azul-escuro)' }}>RCC Radiologia Clínica de Campinas</h3>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="badge bg-secondary rounded-pill me-2">3ª Opção</span>
                                        <span className="small text-warning fw-bold"><i className="bi bi-star-fill"></i> 4,5 (2,6 mil avaliações)</span>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-muted mb-2"><i className="bi bi-geo-alt-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>Av. José de Sousa Campos, 840 - Jardim Planalto, Campinas - SP, 13092-123</p>
                                        <p className="text-muted mb-1"><i className="bi bi-telephone-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>(19) 3753-5700</p>
                                        <p className="text-muted mb-0 small"><i className="bi bi-clock-fill me-2" style={{ color: 'var(--azul-claro)' }}></i>Funciona até as 20:00</p>
                                    </div>

                                    <div className="row g-2">
                                        <div className="col-md-6">
                                            <a href={`https://wa.me/551937535700?text=${whatsappMessageExames}`} target="_blank" rel="noopener noreferrer" className="btn w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 text-white" style={{ backgroundColor: '#25D366' }}>
                                                <i className="bi bi-whatsapp"></i> WhatsApp Agendamento
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href="https://waze.com/ul?q=Av.+José+de+Sousa+Campos,+840+-+Campinas+-+SP" target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted">
                                                <i className="bi bi-sign-turn-right-fill" style={{ color: '#33b1ff' }}></i> Waze
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Av. José de Sousa Campos, 840 - Jardim Planalto, Campinas - SP, 13092-123")}`} target="_blank" rel="noopener noreferrer" className="btn btn-light w-100 rounded-pill fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 border text-muted">
                                                <i className="bi bi-google" style={{ color: '#ea4335' }}></i> Maps
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OUTROS CONTATOS UTEIS */}
                    <div className="row justify-content-center mb-4 mt-5">
                        <div className="col-12 text-center text-muted mb-3">
                            <h5 className="fw-bold d-inline-block px-4 py-2 bg-white rounded-pill shadow-sm border">
                                CONTATOS IMPORTANTES
                            </h5>
                        </div>
                    </div>

                    <div className="row justify-content-center g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="card shadow-sm border-0 rounded-4 h-100 transition-all hover-lift" style={{ backgroundColor: 'rgba(57, 88, 109, 0.05)' }}>
                                <div className="card-body p-4 text-center">
                                    <div className="d-inline-flex p-3 rounded-circle mb-3 bg-white shadow-sm" style={{ color: 'var(--azul-medio)' }}>
                                        <i className="bi bi-clipboard2-pulse fs-3"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Pré-Anestésica</h5>
                                    <p className="text-muted small mb-4">Agende sua avaliação pré-anestésica com a equipe responsável.</p>
                                    <a href={`https://wa.me/551937513700?text=${whatsappMessageAnestesia}`} target="_blank" rel="noopener noreferrer" className="btn w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 text-white" style={{ backgroundColor: '#25D366' }}>
                                        <i className="bi bi-whatsapp"></i>(19) 3751-3700
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card shadow-sm border-0 rounded-4 h-100 transition-all hover-lift" style={{ backgroundColor: 'rgba(57, 88, 109, 0.05)' }}>
                                <div className="card-body p-4 text-center">
                                    <div className="d-inline-flex p-3 rounded-circle mb-3 bg-white shadow-sm" style={{ color: 'var(--azul-medio)' }}>
                                        <i className="bi bi-ui-checks-grid fs-3"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Autorizações 2Care</h5>
                                    <p className="text-muted small mb-4">Central para verificar andamento das guias e autorizações cirúrgicas.</p>
                                    <a href={`https://wa.me/551937901200?text=${whatsappMessageAutorizacao}`} target="_blank" rel="noopener noreferrer" className="btn w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 text-white" style={{ backgroundColor: '#25D366' }}>
                                        <i className="bi bi-whatsapp"></i>(19) 3790-1200
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

            <Footer />

            <style jsx>{`
                .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }
            `}</style>
        </div>
    );
}
