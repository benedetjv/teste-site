import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata = {
    title: 'Ortopedista para Omint em Campinas | Coluna, Joelho e Dor',
    description: 'Atendimento ortopédico em Campinas para beneficiários Omint. Coluna, joelho, ombro, dor, infiltrações, bloqueios e radiofrequência conforme indicação.',
    robots: 'index, follow',
    alternates: {
        canonical: 'https://drotto.com.br/ortopedista-omint-campinas'
    }
};

export default function LPOmintCampinas() {
    const jsonLdPhysician = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Otto Beckedorff",
        "description": "Ortopedista e Traumatologia em Campinas (CRM-SP 226325 | RQE 139078).",
        "url": "https://drotto.com.br/ortopedista-omint-campinas",
        "image": "https://drotto.com.br/img/foto-otto.jpg",
        "medicalSpecialty": "Orthopedic",
        "telephone": "+55-19-99943-9824",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Campinas",
            "addressRegion": "SP",
            "addressCountry": "BR"
        }
    };

    const jsonLdWebPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Ortopedista para Omint em Campinas | Coluna, Joelho e Dor",
        "description": "Atendimento ortopédico em Campinas para beneficiários Omint. Coluna, joelho, ombro, dor, infiltrações, bloqueios e radiofrequência conforme indicação.",
        "url": "https://drotto.com.br/ortopedista-omint-campinas"
    };

    const jsonLdBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://drotto.com.br" },
            { "@type": "ListItem", "position": 2, "name": "Convênios", "item": "https://drotto.com.br/#convenios" },
            { "@type": "ListItem", "position": 3, "name": "Omint", "item": "https://drotto.com.br/ortopedista-omint-campinas" }
        ]
    };

    return (
        <main className="bg-light min-vh-100">
            <Script id="json-ld-physician" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPhysician) }} />
            <Script id="json-ld-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
            <Script id="json-ld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

            {/* WhatsApp Fixo */}
            <a 
                href="https://wa.me/5519999439824?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20atendimento%20para%20Omint." 
                target="_blank" 
                rel="noopener noreferrer"
                className="position-fixed bottom-0 end-0 m-4 bg-success text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                style={{ width: '60px', height: '60px', zIndex: 1000, transition: 'transform 0.3s' }}
                aria-label="Falar pelo WhatsApp"
            >
                <i className="bi bi-whatsapp fs-3"></i>
            </a>

            {/* Minimalist Ads Navbar */}
            <nav className="navbar navbar-expand-lg px-4 py-3 bg-white shadow-sm border-bottom sticky-top">
                <div className="container d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center">
                    <Link className="navbar-brand fw-bold mb-2 mb-md-0 d-flex flex-column flex-md-row align-items-center text-center text-md-start" href="/ortopedista-omint-campinas">
                        <div>
                            <span className="fs-5 me-1" style={{ color: 'var(--azul-secundario)' }}>Dr.</span>
                            <span className="fs-4" style={{ color: 'var(--azul-principal)' }}>Otto Beckedorff</span>
                        </div>
                    </Link>
                    <div className="d-flex align-items-center text-muted small fw-medium mt-1 mt-md-0 text-center">
                        <i className="bi bi-geo-alt-fill me-2 text-danger"></i> Campinas | Hospital Vera Cruz ou Instituto Orthesen
                    </div>
                </div>
            </nav>

            {/* BREADCRUMB VISUAL */}
            <div className="bg-light border-bottom pt-3 pb-2 px-3">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 small fw-medium">
                            <li className="breadcrumb-item"><Link href="/" className="text-decoration-none text-muted">Início</Link></li>
                            <li className="breadcrumb-item"><span className="text-muted">Convênios</span></li>
                            <li className="breadcrumb-item active fw-bold text-dark" aria-current="page">Omint</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* HERO SECTION */}
            <section className="py-5 position-relative bg-white" style={{ overflow: 'hidden' }}>
                <div className="container py-5 position-relative z-index-1">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-9 animate__animated animate__fadeInUp">
                            <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill fw-medium mb-4 shadow-sm" style={{ letterSpacing: '1px' }}>
                                Atendimento para beneficiários Omint
                            </span>
                            
                            <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--azul-escuro)', lineHeight: '1.2' }}>
                                Ortopedista para beneficiários Omint em Campinas
                            </h1>
                            
                            <p className="lead text-dark fw-medium mx-auto mb-3" style={{ fontSize: '1.35rem', maxWidth: '700px' }}>
                                Avaliação especializada em ortopedia, coluna e tratamento da dor.
                            </p>
                            
                            <p className="text-muted mx-auto mb-5" style={{ fontSize: '1.15rem', maxWidth: '750px', lineHeight: '1.7' }}>
                                Atendimento em Campinas com opções modernas de tratamento para coluna, joelho, ombro e dores persistentes. Um cuidado alinhado a quem valoriza excelência e conveniência.
                            </p>

                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5">
                                <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp">
                                    <i className="bi bi-whatsapp"></i> Consultar atendimento Omint
                                </a>
                                <a href="https://wa.me/5519999439824" target="_blank" className="btn-primary-custom bg-white text-dark border shadow-sm">
                                    Agendar pelo WhatsApp
                                </a>
                            </div>
                            
                            <div className="d-flex flex-wrap justify-content-center align-items-center text-muted small fw-medium gap-3">
                                <span><i className="bi bi-geo-alt me-1"></i> Campinas</span>
                                <span className="d-none d-md-inline text-light">•</span>
                                <span><i className="bi bi-building me-1"></i> Hospital Vera Cruz ou Instituto Orthesen</span>
                                <span className="d-none d-md-inline text-light">•</span>
                                <span><i className="bi bi-clock me-1"></i> Atendimento com hora marcada</span>
                            </div>
                            
                            <div className="mt-5 pt-4 border-top mx-auto" style={{ maxWidth: '650px' }}>
                                <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>
                                    Cobertura, reembolso e condições de atendimento dependem do produto contratado pelo beneficiário e devem ser confirmados previamente. A Omint possui produtos com livre escolha e reembolso, mas as regras aplicam-se a cada plano.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCO RESPOSTA DIRETA PARA IA E SEO */}
            <section className="py-5" style={{ backgroundColor: '#f0f4f8' }}>
                <div className="container py-4">
                    <div className="mx-auto" style={{ maxWidth: '800px' }}>
                        <h2 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)', fontSize: '1.8rem' }}>Atendimento ortopédico para Omint em Campinas</h2>
                        <div className="text-dark fs-5" style={{ lineHeight: '1.7' }}>
                            <p>
                                O Dr. Otto Beckedorff realiza atendimento ortopédico em Campinas para beneficiários Omint, com avaliação de problemas da coluna, joelho, ombro e dores persistentes. Também realiza procedimentos intervencionistas como infiltrações, bloqueios e radiofrequência quando há indicação médica.
                            </p>
                            <p className="mb-0">
                                As condições de atendimento, credenciamento, cobertura e reembolso dependem do produto Omint contratado e devem ser confirmadas previamente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST SECTION (DR. OTTO) */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container py-5">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-5 col-lg-4 text-center mb-4 mb-md-0">
                            <div className="position-relative d-inline-block">
                                <img src="/img/foto-otto.jpg" alt="Dr. Otto Beckedorff" className="img-fluid rounded-4 shadow-lg border border-3 border-white object-fit-cover" style={{ height: '380px', width: '380px' }} />
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-6 ms-lg-5">
                            <h2 className="h2 fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>Dr. Otto Beckedorff</h2>
                            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                                <span className="fw-bold fs-5 d-block" style={{ color: 'var(--azul-principal)' }}>Ortopedia e Traumatologia</span>
                                <span className="text-muted small">CRM-SP 226325 | RQE 139078</span>
                            </div>
                            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                                Médico ortopedista com experiência focada em tratamentos ortopédicos e procedimentos intervencionistas. Atuação dedicada à avaliação cuidadosa e manejo de condições que afetam a qualidade de vida.
                            </p>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-3 d-flex align-items-start text-dark fw-medium">
                                    <i className="bi bi-check2-circle text-primary me-3 fs-5"></i> 
                                    <span>Formação sólida e experiência em tratamentos ortopédicos</span>
                                </li>
                                <li className="mb-3 d-flex align-items-start text-dark fw-medium">
                                    <i className="bi bi-check2-circle text-primary me-3 fs-5"></i> 
                                    <span>Áreas de atuação em procedimentos intervencionistas para dor</span>
                                </li>
                                <li className="mb-3 d-flex align-items-start text-dark fw-medium">
                                    <i className="bi bi-check2-circle text-primary me-3 fs-5"></i> 
                                    <span>Atendimento realizado no Instituto Orthesen e Hospital Vera Cruz</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEMAS TRATADOS */}
            <section className="py-5 bg-white">
                <div className="container py-5">
                    <div className="text-center mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                        <h2 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Avaliação especializada</h2>
                        <p className="text-muted fs-5">Atenção médica focada na identificação precisa e manejo cuidadoso das seguintes condições:</p>
                    </div>
                    
                    <div className="row g-4 justify-content-center">
                        {[
                            { title: 'Coluna e hérnia de disco', desc: 'Avaliação dedicada para quadros agudos e crônicos da coluna.' },
                            { title: 'Dor lombar e cervical', desc: 'Investigação e manejo da dor persistente nas costas e pescoço.' },
                            { title: 'Joelho e artrose', desc: 'Cuidado especializado para desgaste articular e lesões no joelho.' },
                            { title: 'Ombro', desc: 'Abordagem para dores articulares e limitação de movimento.' },
                            { title: 'Dor ciática', desc: 'Identificação da causa e propostas terapêuticas para irradiação.' },
                            { title: 'Dor crônica', desc: 'Manejo de dores persistentes visando a recuperação da qualidade de vida.' }
                        ].map((item, i) => (
                            <div key={i} className="col-md-6 col-lg-4">
                                <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4" style={{ transition: 'transform 0.3s' }}>
                                    <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--azul-principal)' }}>{item.title}</h3>
                                    <p className="text-muted mb-0 small">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5 pt-3">
                        <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp">
                            <i className="bi bi-whatsapp"></i> Agendar avaliação pelo WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* TRATAMENTOS */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container py-5">
                    <div className="text-center mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                        <h2 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Opções modernas de tratamento</h2>
                        <p className="text-muted fs-5">Nossa abordagem busca soluções efetivas e individualizadas. A indicação de qualquer procedimento depende de avaliação médica rigorosa.</p>
                    </div>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                        {[
                            'Infiltração no joelho',
                            'Ácido hialurônico',
                            'Viscossuplementação',
                            'Bloqueios para tratamento da dor',
                            'Bloqueios de coluna',
                            'Radiofrequência',
                            'Rizotomia por radiofrequência',
                            'Infiltrações guiadas',
                            'Tratamento não cirúrgico da dor'
                        ].map((t, i) => (
                            <span key={i} className="bg-white border rounded-pill px-4 py-3 shadow-sm text-dark fw-medium">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="text-center mx-auto mb-4" style={{ maxWidth: '600px' }}>
                        <p className="small text-muted mb-0">
                            Todo procedimento deve ser compreendido como uma possibilidade terapêutica, cuja indicação depende da condição clínica do paciente e da avaliação presencial com o médico.
                        </p>
                    </div>

                    <div className="text-center mt-4">
                        <a href="https://wa.me/5519999439824" target="_blank" className="btn-primary-custom bg-white text-dark border shadow-sm">
                            Falar com nossa equipe
                        </a>
                    </div>
                </div>
            </section>

            {/* DIFERENCIAL */}
            <section className="py-5 text-white" style={{ backgroundColor: 'var(--azul-escuro, #1a252f)' }}>
                <div className="container py-5">
                    <div className="text-center mb-5 mx-auto" style={{ maxWidth: '800px' }}>
                        <h2 className="fw-bold mb-4">Uma experiência de atendimento compatível com quem valoriza seu tempo</h2>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-3 text-center">
                            <div className="fs-1 fw-bold text-white-50 mb-2">01</div>
                            <h4 className="h6 fw-bold">Agendamento Simples</h4>
                            <p className="small text-light text-opacity-75">Comunicação direta e rápida pelo WhatsApp.</p>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="fs-1 fw-bold text-white-50 mb-2">02</div>
                            <h4 className="h6 fw-bold">Atendimento Individualizado</h4>
                            <p className="small text-light text-opacity-75">Avaliação cuidadosa e detalhada, sem pressa.</p>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="fs-1 fw-bold text-white-50 mb-2">03</div>
                            <h4 className="h6 fw-bold">Clareza nas Opções</h4>
                            <p className="small text-light text-opacity-75">Explicação transparente sobre cada tratamento.</p>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="fs-1 fw-bold text-white-50 mb-2">04</div>
                            <h4 className="h6 fw-bold">Organização Documental</h4>
                            <p className="small text-light text-opacity-75">Orientação sobre autorizações e fluxos de reembolso.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* REEMBOLSO */}
            <section className="py-5 bg-white">
                <div className="container py-5 text-center">
                    <div className="mx-auto bg-light p-5 rounded-4 border shadow-sm" style={{ maxWidth: '800px' }}>
                        <h2 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Seu plano Omint possui reembolso?</h2>
                        <p className="text-muted fs-5 mb-4">
                            Algumas modalidades Omint permitem a opção de livre escolha com reembolso. Isso significa que você pode realizar o atendimento e solicitar o valor diretamente ao seu plano, de acordo com as regras do contrato.
                        </p>
                        <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp">
                            <i className="bi bi-whatsapp"></i> Fale conosco para entender como funciona
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container py-5">
                    <div className="text-center mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                        <h2 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Perguntas Frequentes</h2>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion accordion-flush bg-white rounded-4 shadow-sm p-2" id="faqAccordion">
                                {[
                                    { q: 'Vocês atendem beneficiários Omint em Campinas?', a: 'Sim, realizamos atendimento para beneficiários Omint em Campinas. As condições exatas (credenciamento ou reembolso) devem ser confirmadas de acordo com o seu produto Omint.' },
                                    { q: 'Como funciona o atendimento para Omint?', a: 'Basta entrar em contato com nossa equipe via WhatsApp. Iremos verificar a modalidade do seu plano e orientar sobre os próximos passos para o agendamento da sua consulta com hora marcada.' },
                                    { q: 'Meu plano Omint possui reembolso?', a: 'Se o produto Omint contratado tiver a funcionalidade de livre escolha, sim. A nossa equipe apoia integralmente no fornecimento da nota fiscal e relatório médico para você acionar a Omint.' },
                                    { q: 'Como funciona o reembolso Omint?', a: 'O paciente realiza o pagamento diretamente na clínica e em seguida solicita o reembolso à operadora utilizando a documentação que emitimos. O valor exato do reembolso depende do contrato.' },
                                    { q: 'Onde o Dr. Otto atende em Campinas?', a: 'Os atendimentos são realizados em estruturas de excelência em Campinas, como o Hospital Vera Cruz e o Instituto Orthesen.' },
                                    { q: 'Há atendimento para problemas de coluna?', a: 'Sim. A avaliação foca em dor na coluna lombar e cervical, incluindo quadros de hérnia de disco e dor ciática.' },
                                    { q: 'Realiza tratamento para joelho?', a: 'Sim. Avaliamos quadros de dor, desgaste articular e artrose no joelho, propondo abordagens que podem ajudar no alívio e mobilidade.' },
                                    { q: 'Realiza tratamento para ombro?', a: 'Sim. O tratamento visa identificar e tratar causas de dores persistentes ou lesões no ombro que limitam as atividades.' },
                                    { q: 'Realiza infiltração no joelho?', a: 'Sim. Procedimentos como a viscossuplementação com ácido hialurônico são realizados quando há avaliação médica indicando esse tratamento para artrose.' },
                                    { q: 'Realiza bloqueio para dor?', a: 'Sim. Bloqueios guiados são opções intervencionistas empregadas no manejo da dor crônica (especialmente dor na coluna) quando indicados.' },
                                    { q: 'Realiza radiofrequência?', a: 'Sim. A radiofrequência (ou rizotomia) também faz parte dos tratamentos para dor oferecidos pelo Dr. Otto, dependendo estritamente da indicação de cada paciente.' }
                                ].map((faq, idx) => (
                                    <div className="accordion-item border-0 border-bottom" key={idx}>
                                        <h3 className="accordion-header m-0 p-0">
                                            <button className="accordion-button collapsed fw-bold py-3 bg-white text-dark shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`}>
                                                {faq.q}
                                            </button>
                                        </h3>
                                        <div id={`collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body text-muted pt-0 pb-4">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5 pt-3">
                        <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp">
                            <i className="bi bi-whatsapp"></i> Iniciar conversa pelo WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
