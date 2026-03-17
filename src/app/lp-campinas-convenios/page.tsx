import React from 'react';
import InsuranceChecker from '@/components/InsuranceChecker';
import Link from 'next/link';

export const metadata = {
    title: 'Dr. Otto Beckedorff | Ortopedia e Dor Crônica - Campinas',
    description: 'Especialista em dor crônica, intervencionismo em Campinas. Corpo Clínico do Hospital Vera Cruz. Aceitamos Amil, Bradesco e convênios selecionados na Clínica Adora.',
    robots: 'noindex, nofollow' // Escondido do Google geral, só quem clica no Anúncio acha!
};

export default function LPVeraCruzCampinas() {
    return (
        <main className="bg-light min-vh-100">
            {/* Minimalist Ads Navbar (without external distraction links) */}
            <nav className="navbar navbar-expand-lg px-4 py-3 bg-white shadow-sm sticky-top">
                <div className="container d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center">
                    <Link className="navbar-brand fw-bold mb-2 mb-md-0 d-flex flex-column flex-md-row align-items-center text-center text-md-start" href="/lp-campinas-convenios">
                        <div>
                            <span className="fs-5 me-1" style={{ color: 'var(--azul-secundario)' }}>Dr.</span>
                            <span className="fs-4" style={{ color: 'var(--azul-principal)' }}>Otto Beckedorff</span>
                        </div>
                    </Link>
                    <div className="d-flex align-items-center text-muted small fw-medium mt-1 mt-md-0 text-center">
                        <i className="bi bi-geo-alt-fill me-2 text-danger"></i> Atendimento em Campinas - Clinica Adora / Vera Cruz
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="py-5 position-relative" style={{ backgroundColor: '#f8fbfe', overflow: 'hidden' }}>
                <div className="container py-4 position-relative z-index-1">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start animate__animated animate__fadeInLeft">
                            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-3 shadow-sm border border-primary border-opacity-25">
                                <i className="bi bi-star-fill text-warning me-2"></i> Clínica Adora & Hospital Vera Cruz
                            </span>
                            
                            <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--azul-escuro)', lineHeight: '1.2' }}>
                                Tratamento de Precisão para a sua <span style={{ color: 'var(--azul-principal)' }}>Dor Crônica.</span>
                            </h1>
                            
                            <p className="lead text-secondary mb-4" style={{ fontSize: '1.15rem' }}>
                                Sofre com dores na coluna, joelhos ou nervo ciático que tratamentos comuns não resolvem? 
                                Descubra a medicina intervencionista da dor de alto padrão em Campinas.
                            </p>

                            <ul className="list-unstyled mb-5 text-start d-inline-block d-lg-block mx-auto">
                                <li className="mb-3 d-flex align-items-center text-dark fw-medium">
                                    <i className="bi bi-check-circle-fill fs-5 text-success me-3 shadow-sm rounded-circle"></i> Bloqueios guiados e Infiltrações
                                </li>
                                <li className="mb-3 d-flex align-items-center text-dark fw-medium">
                                    <i className="bi bi-check-circle-fill fs-5 text-success me-3 shadow-sm rounded-circle"></i> Corpo Clínico do Hospital Vera Cruz
                                </li>
                                <li className="mb-3 d-flex align-items-center text-dark fw-medium">
                                    <i className="bi bi-check-circle-fill fs-5 text-success me-3 shadow-sm rounded-circle"></i> <strong>Amil, Bradesco, Porto, SulAmérica e mais.</strong>
                                </li>
                            </ul>
                        </div>

                        {/* INSURANCE CHECKER WIDGET */}
                        <div className="col-lg-5 animate__animated animate__fadeInRight animate__delay-1s">
                            <div className="text-center mb-3">
                                <span className="text-uppercase fw-bold text-muted small" style={{ letterSpacing: '1px' }}>
                                    Inicie seu Agendamento
                                </span>
                            </div>
                            <InsuranceChecker />
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="position-absolute rounded-circle shadow-lg" style={{ 
                    width: '600px', height: '600px', 
                    top: '-200px', right: '-150px', 
                    background: 'radial-gradient(circle, rgba(14,115,219,0.06) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: 0 
                }}></div>
            </section>

            {/* TRUST SECTION (DR. OTTO) */}
            <section className="py-5 bg-white border-top">
                <div className="container py-5">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-5 col-lg-4 text-center mb-4 mb-md-0">
                            <div className="position-relative d-inline-block">
                                <img src="/img/foto-otto.jpg" alt="Dr. Otto Beckedorff" className="img-fluid rounded-4 shadow-lg border border-3 border-white object-fit-cover" style={{ height: '350px', width: '350px' }} />
                                <div className="position-absolute start-0 bottom-0 bg-white p-3 rounded-4 shadow-lg mb-n3 ms-n3 border">
                                    <div className="d-flex align-items-center">
                                        <div className="display-4 text-primary me-3"><i className="bi bi-hospital"></i></div>
                                        <div className="text-start">
                                            <div className="fw-bold small text-dark">Ortopedista com foco</div>
                                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>em Tratamento da Dor</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-6 ms-lg-5">
                            <h2 className="h1 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Quem cuidará da sua dor?</h2>
                            <p className="lead text-primary mb-4 fw-medium">Alívio da Dor com Precisão, Tecnologia e Cuidado Humano.</p>
                            <p className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                                Sou ortopedista com formação pelo Hospital Vera Cruz (Campinas/SP) e atuação focada no diagnóstico e tratamento da dor musculoesquelética, especialmente dores na coluna, joelho, quadril e ombro. Atendo pacientes com dores agudas ou crônicas, que muitas vezes convivem com limitações físicas e impacto direto na qualidade de vida.
                            </p>
                            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                                Utilizo procedimentos minimamente invasivos, como bloqueios, infiltrações, ácido hialurônico, neuromodulação e radiofrequência, para oferecer alívio efetivo da dor — com recuperação rápida e, ajudando muitos pacientes a evitar cirurgias desnecessárias. Minha missão é ajudar meus pacientes a voltarem às suas atividades com mais conforto, movimento e autonomia, sempre com escuta ativa, abordagem moderna e tratamento individualizado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
