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
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <Link className="navbar-brand fw-bold mb-0 d-flex align-items-center" href="/lp-campinas-convenios">
                        <span className="fs-4 me-2" style={{ color: 'var(--azul-secundario)' }}>Dr.</span>
                        <span className="fs-4" style={{ color: 'var(--azul-principal)' }}>Otto Beckedorff</span>
                    </Link>
                    <div className="d-none d-md-flex align-items-center text-muted small fw-medium">
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
                                            <div className="fw-bold small text-dark">Especialista</div>
                                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Intervencionismo</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-6 ms-lg-5">
                            <h2 className="h1 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Quem cuidará da sua dor?</h2>
                            <p className="lead text-primary mb-4 fw-medium">Mão firme, medicina atualizada e empatia. O fim das dores não resolvidas.</p>
                            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                                Sou especializado em Medicina Esportiva e no Tratamento da Dor Crônica através de procedimentos da Medicina Intervencionista, como infiltrações de alta precisão baseadas em ultrassom, bloqueios articulares e rizotomias por radiofrequência térmicas. O objetivo não é apagar o sintoma com remédios que prejudicam o estômago, mas desativar a via da inflamação física no consultório ou no ambiente seguro de centro cirúrgico do <strong>Vera Cruz Hospital</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
