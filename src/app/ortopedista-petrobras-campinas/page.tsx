import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Ortopedista Saúde Petrobras Campinas | AMS Petrobras',
    description: 'Atendimento ortopédico para beneficiários Saúde Petrobras (antiga AMS) em Campinas. Tratamento para dor, coluna, joelho e ombro. Agende fácil pelo WhatsApp.',
    robots: 'noindex, nofollow'
};

export default function LPPetrobrasCampinas() {
    return (
        <main className="bg-light" style={{ minHeight: '100vh', fontSize: '1.15rem' }}>
            {/* WhatsApp Fixo Gigante */}
            <a 
                href="https://wa.me/5519999439824?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta%20pela%20Saúde%20Petrobras." 
                target="_blank" 
                rel="noopener noreferrer"
                className="position-fixed bottom-0 end-0 m-3 mb-4 bg-success text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                style={{ width: '75px', height: '75px', zIndex: 1000 }}
                aria-label="Falar pelo WhatsApp"
            >
                <i className="bi bi-whatsapp" style={{ fontSize: '2.5rem' }}></i>
            </a>

            {/* NAVBAR */}
            <nav className="navbar px-3 py-3 bg-white shadow-sm sticky-top border-bottom">
                <div className="container d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center gap-2">
                    <Link className="navbar-brand fw-bold m-0 text-center text-md-start" href="/ortopedista-petrobras-campinas" style={{ textDecoration: 'none' }}>
                        <div>
                            <span className="fs-4 me-1" style={{ color: 'var(--azul-secundario)' }}>Dr.</span>
                            <span className="fs-3 fw-bolder" style={{ color: 'var(--azul-escuro)' }}>Otto Beckedorff</span>
                        </div>
                    </Link>
                    <div className="d-flex align-items-center fw-bold text-center" style={{ color: 'var(--azul-escuro)', fontSize: '1.2rem' }}>
                        <i className="bi bi-geo-alt-fill text-danger me-2 fs-3"></i> Atendimento em Campinas
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="py-5 bg-white border-bottom">
                <div className="container py-4">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-10">
                            <div className="mb-4">
                                <span className="d-inline-block bg-primary bg-opacity-10 text-dark border border-primary border-opacity-25 px-4 py-2 rounded-pill fw-bold fs-5">
                                    Atendimento Saúde Petrobras
                                </span>
                            </div>
                            
                            <h1 className="fw-bolder mb-4" style={{ color: 'var(--azul-escuro)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
                                Ortopedista Saúde Petrobras em Campinas
                            </h1>
                            
                            <p className="fw-bold text-dark mx-auto mb-4" style={{ fontSize: '1.5rem', maxWidth: '800px', lineHeight: '1.4' }}>
                                Atendimento em ortopedia, coluna, joelho, ombro e tratamento da dor.
                            </p>
                            
                            <p className="text-secondary mx-auto mb-5" style={{ fontSize: '1.3rem', maxWidth: '750px' }}>
                                Agende sua avaliação de forma simples e rápida pelo WhatsApp, conversando direto com nossa equipe.
                            </p>

                            <div className="d-flex justify-content-center mb-5">
                                <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp px-4 py-3 shadow-sm text-center d-flex justify-content-center" style={{ width: '100%', maxWidth: '400px', fontSize: '1.3rem', borderRadius: '8px' }}>
                                    <i className="bi bi-whatsapp"></i> Agendar pelo WhatsApp
                                </a>
                            </div>
                            
                            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center fw-bold gap-3 gap-md-4 text-dark" style={{ fontSize: '1.2rem' }}>
                                <span><i className="bi bi-geo-alt text-danger me-2"></i> Atendimento em Campinas</span>
                                <span className="d-none d-md-inline text-muted">|</span>
                                <span><i className="bi bi-shield-check text-success me-2"></i> Saúde Petrobras (Antiga AMS)</span>
                                <span className="d-none d-md-inline text-muted">|</span>
                                <span><i className="bi bi-clock text-primary me-2"></i> Consulta com hora marcada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMO FUNCIONA */}
            <section className="py-5" style={{ backgroundColor: '#f4f6f8' }}>
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder" style={{ color: 'var(--azul-escuro)', fontSize: '2.5rem' }}>Como funciona o atendimento</h2>
                        <p className="text-muted fs-5 mt-2">Um processo rápido, claro e sem complicações.</p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4 bg-white">
                                <div className="display-4 fw-bold text-primary mb-3">1</div>
                                <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Fale no WhatsApp</h3>
                                <p className="text-dark mb-0">Envie uma mensagem pelo WhatsApp para a nossa equipe de recepção.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4 bg-white">
                                <div className="display-4 fw-bold text-primary mb-3">2</div>
                                <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Informe seu Plano</h3>
                                <p className="text-dark mb-0">Avise que você possui o convênio Saúde Petrobras ou AMS Petrobras.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4 bg-white">
                                <div className="display-4 fw-bold text-primary mb-3">3</div>
                                <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Confirmação</h3>
                                <p className="text-dark mb-0">Nossa equipe confirma as condições de atendimento e agenda sua avaliação com o Dr. Otto.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4 bg-white">
                                <div className="display-4 fw-bold text-primary mb-3">4</div>
                                <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Orientações</h3>
                                <p className="text-dark mb-0">Após a consulta, caso precise de exames ou procedimentos, orientamos você sobre os próximos passos.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp px-4 py-3 shadow-sm d-inline-flex justify-content-center" style={{ fontSize: '1.25rem' }}>
                            <i className="bi bi-whatsapp"></i> Iniciar agendamento agora
                        </a>
                    </div>
                </div>
            </section>

            {/* PROBLEMAS TRATADOS */}
            <section className="py-5 bg-white border-bottom">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder" style={{ color: 'var(--azul-escuro)', fontSize: '2.5rem' }}>Problemas que tratamos</h2>
                        <p className="text-muted fs-5 mt-2">Avaliação médica focada em aliviar sua dor e melhorar seus movimentos.</p>
                    </div>
                    
                    <div className="row g-4 justify-content-center">
                        {[
                            'Dor na coluna',
                            'Hérnia de disco',
                            'Dor ciática',
                            'Artrose no joelho',
                            'Dor no ombro',
                            'Dor persistente'
                        ].map((problema, idx) => (
                            <div key={idx} className="col-12 col-sm-6 col-md-4">
                                <div className="p-4 border rounded-3 bg-light text-center h-100 d-flex align-items-center justify-content-center shadow-sm">
                                    <h3 className="h4 fw-bold m-0" style={{ color: 'var(--azul-principal)' }}>{problema}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OPÇÕES DE TRATAMENTO */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container py-4 text-center">
                    <h2 className="fw-bolder mb-4" style={{ color: 'var(--azul-escuro)', fontSize: '2.5rem' }}>Opções de tratamento</h2>
                    <p className="text-dark fw-medium fs-5 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
                        Após a avaliação presencial, o médico poderá indicar tratamentos modernos, que vão desde orientações medicamentosas até procedimentos para alívio da dor.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4 mb-5">
                        {[
                            'Infiltrações',
                            'Ácido hialurônico no joelho',
                            'Viscossuplementação',
                            'Bloqueios para controle da dor',
                            'Bloqueios de coluna',
                            'Radiofrequência',
                            'Rizotomia',
                            'Tratamentos para hérnia de disco',
                            'Tratamentos para artrose'
                        ].map((tratamento, idx) => (
                            <div key={idx} className="bg-white border rounded-pill px-4 py-3 shadow-sm d-flex align-items-center justify-content-center">
                                <span className="fw-bold text-dark fs-5">{tratamento}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-4 rounded-4 border shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
                        <h4 className="fw-bold text-danger mb-3">Preciso de autorização?</h4>
                        <p className="text-dark fs-5 m-0" style={{ lineHeight: '1.6' }}>
                            A consulta e cada procedimento podem ter regras diferentes de autorização. Após a avaliação médica, nossa equipe orienta você sobre a documentação e o fluxo necessário para solicitar o procedimento indicado junto à Saúde Petrobras.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONVÊNIO AVISO */}
            <section className="py-5 bg-white border-bottom">
                <div className="container py-2 text-center">
                    <div className="p-4 bg-light border rounded-3 mx-auto" style={{ maxWidth: '900px' }}>
                        <p className="text-dark fw-bold fs-5 mb-0">
                            <i className="bi bi-info-circle-fill text-primary me-2"></i>
                            Cobertura e autorização de consultas ou procedimentos dependem das regras vigentes do plano Saúde Petrobras (AMS) e devem ser confirmadas individualmente antes do atendimento.
                        </p>
                    </div>
                </div>
            </section>

            {/* O MÉDICO */}
            <section className="py-5" style={{ backgroundColor: '#e9ecef' }}>
                <div className="container py-4">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-5 col-lg-4 text-center mb-4 mb-md-0">
                            <img src="/img/foto-otto.jpg" alt="Dr. Otto Beckedorff" className="img-fluid rounded-4 shadow-lg border border-4 border-white object-fit-cover" style={{ height: '350px', width: '350px' }} />
                        </div>
                        <div className="col-md-7 col-lg-6 ms-lg-4">
                            <h2 className="fw-bolder mb-2" style={{ color: 'var(--azul-escuro)', fontSize: '2.5rem' }}>Dr. Otto Beckedorff</h2>
                            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                                <span className="fw-bold d-block" style={{ color: 'var(--azul-principal)', fontSize: '1.3rem' }}>Ortopedia e Traumatologia</span>
                                <span className="text-dark fw-bold fs-6">CRM-SP 226325 | RQE 139078</span>
                            </div>
                            
                            <ul className="list-unstyled mb-4 fs-5 text-dark" style={{ lineHeight: '1.6' }}>
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-4"></i> 
                                    Ortopedista com atuação dedicada ao tratamento de condições da coluna, articulações e alívio da dor crônica.
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-4"></i> 
                                    Atendimento humanizado, buscando recuperar sua qualidade de vida com opções modernas e seguras.
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-4"></i> 
                                    Atendimentos realizados em excelentes estruturas de saúde em Campinas.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOCALIZAÇÃO */}
            <section className="py-5 bg-white border-bottom">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder" style={{ color: 'var(--azul-escuro)', fontSize: '2.5rem' }}>Atendimento em Campinas</h2>
                        <p className="text-dark fs-5 mt-2">Nossa estrutura é de fácil acesso e oferece todo o conforto e segurança.</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-light">
                                <div className="card-body p-4 text-center">
                                    <h3 className="fw-bold mb-3 text-dark">Clínica Adora / Hospital Vera Cruz</h3>
                                    <p className="fs-5 text-secondary mb-4">
                                        <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                                        Campinas - SP
                                    </p>
                                    
                                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                        <a href="https://maps.google.com/?q=Campinas+SP" target="_blank" className="btn btn-outline-dark fs-5 px-4 py-3 fw-bold rounded-3">
                                            <i className="bi bi-map me-2"></i> Abrir localização
                                        </a>
                                        <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp px-4 py-3 shadow-sm d-flex justify-content-center rounded-3" style={{ fontSize: '1.25rem' }}>
                                            <i className="bi bi-whatsapp"></i> Agendar atendimento
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder" style={{ color: 'var(--azul-escuro)', fontSize: '2.5rem' }}>Perguntas Frequentes</h2>
                        <p className="text-muted fs-5">Tire suas dúvidas rapidamente.</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion accordion-flush bg-white rounded-4 shadow-sm p-3 border" id="faqAccordion">
                                {[
                                    { 
                                        q: 'Vocês atendem Saúde Petrobras?', 
                                        a: 'Sim, recebemos beneficiários da Saúde Petrobras. As regras exatas de credenciamento ou reembolso para o seu plano específico devem ser confirmadas com nossa equipe no WhatsApp.' 
                                    },
                                    { 
                                        q: 'Saúde Petrobras é a antiga AMS?', 
                                        a: 'Isso mesmo. O convênio antes conhecido como AMS Petrobras hoje atende pelo nome de Saúde Petrobras.' 
                                    },
                                    { 
                                        q: 'Como agendo minha consulta?', 
                                        a: 'O agendamento é feito de forma muito fácil enviando uma mensagem no WhatsApp. Nós responderemos com os horários disponíveis.' 
                                    },
                                    { 
                                        q: 'Preciso de guia para consultar?', 
                                        a: 'Depende do seu plano. Muitas vezes nós mesmos auxiliamos nesse processo. Entre em contato para que possamos orientar sobre os documentos necessários.' 
                                    },
                                    { 
                                        q: 'Preciso de autorização?', 
                                        a: 'Para consultas, o processo costuma ser mais direto. Para procedimentos como infiltrações ou radiofrequência, uma autorização prévia junto à Saúde Petrobras geralmente é necessária. Nós orientamos em cada etapa.' 
                                    },
                                    { 
                                        q: 'Vocês atendem problemas de coluna?', 
                                        a: 'Sim. O Dr. Otto realiza avaliações cuidadosas para dores na coluna lombar, cervical, hérnias de disco e dor ciática.' 
                                    },
                                    { 
                                        q: 'Tratam artrose no joelho?', 
                                        a: 'Sim. A artrose (desgaste da cartilagem) é tratada com foco no alívio da dor e na melhora da sua capacidade de caminhar e se movimentar sem dor.' 
                                    },
                                    { 
                                        q: 'Realizam infiltração?', 
                                        a: 'Sim. Realizamos procedimentos de infiltração e viscossuplementação com ácido hialurônico, sempre que o médico avaliar que existe indicação para o seu caso.' 
                                    },
                                    { 
                                        q: 'Realizam bloqueio de coluna?', 
                                        a: 'Sim. Os bloqueios para tratamento da dor na coluna são opções indicadas para casos específicos visando o alívio sem cirurgia aberta.' 
                                    },
                                    { 
                                        q: 'Realizam radiofrequência?', 
                                        a: 'Sim, a radiofrequência ou rizotomia também é realizada quando há indicação médica após a consulta.' 
                                    },
                                    { 
                                        q: 'Onde fica a clínica?', 
                                        a: 'Nossos atendimentos ocorrem em Campinas, em estruturas modernas, de fácil acesso e seguras.' 
                                    },
                                    { 
                                        q: 'Como falar com a equipe?', 
                                        a: 'Basta clicar em qualquer botão verde nesta página para abrir o WhatsApp e falar direto com a nossa recepção.' 
                                    }
                                ].map((faq, idx) => (
                                    <div className="accordion-item border-0 border-bottom" key={idx}>
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed fw-bold py-4 bg-white text-dark shadow-none fs-5" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`}>
                                                {faq.q}
                                            </button>
                                        </h2>
                                        <div id={`collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body text-dark pt-0 pb-4 fs-5" style={{ lineHeight: '1.6' }}>
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5 pt-4">
                        <a href="https://wa.me/5519999439824" target="_blank" className="btn-whatsapp px-5 py-4 shadow-lg fs-4 d-inline-flex justify-content-center" style={{ borderRadius: '12px' }}>
                            <i className="bi bi-whatsapp"></i> Agendar pelo WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
