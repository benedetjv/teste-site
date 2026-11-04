import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WhatsAppPreQualifyCard from '@/components/WhatsAppPreQualifyCard';
import MobileStickyBar from '@/components/MobileStickyBar';

export const metadata = {
  title: 'Dr. Otto Beckedorff • Ortopedista Especialista em Coluna e Dor em Campinas',
  description: 'Médico Ortopedista (CRM-SP 226325 | RQE 139078) com foco no tratamento de dor na coluna e articulações. Atendimento Amil no Instituto Orthesen e procedimentos no Hospital Vera Cruz.',
  robots: 'noindex, nofollow'
};

export default function LPVeraCruzCampinas() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light pb-5 pb-md-0">
      
      {/* 1. MINIMALIST ADS NAVBAR */}
      <header className="navbar navbar-expand-lg px-3 py-3 bg-white shadow-sm sticky-top border-bottom" style={{ zIndex: 1020 }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <span className="fw-bold fs-5 text-dark">Dr. Otto Beckedorff</span>
            <span className="badge bg-light text-secondary border ms-2 small fw-normal">CRM-SP 226325 • RQE 139078</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="small text-muted d-none d-sm-inline">
              <i className="bi bi-geo-alt-fill text-danger me-1"></i> Instituto Orthesen & Vera Cruz (Campinas)
            </span>
            <a
              href="tel:19999439824"
              data-cta-location="header_phone"
              className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold"
            >
              <i className="bi bi-telephone-fill me-1"></i> (19) 99943-9824
            </a>
          </div>
        </div>
      </header>

      {/* 2. NOTICE BAR: UNIMED & COVERAGE RULES */}
      <div className="py-2 px-3 text-center small border-bottom" style={{ backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 500, fontSize: '0.82rem' }}>
        <i className="bi bi-info-circle-fill me-1 text-warning"></i>
        <span>
          <strong>Informação importante sobre convênios:</strong> O Dr. Otto Beckedorff <u>não atende Unimed</u>. Atendemos consultas Amil no Instituto Orthesen e fornecemos nota fiscal com relatório médico para solicitação de reembolso nos demais convênios.
        </span>
      </div>

      <main>
        {/* 3. HERO SECTION (WITH TWO PRIMARY CTAS & OPTIONAL SHORT TRIAGE) */}
        <section className="py-5 position-relative" style={{ backgroundColor: '#f8fbfe', overflow: 'hidden' }}>
          <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="row g-5 align-items-start justify-content-between">
              
              {/* Left Column: Direct WhatsApp CTA + Value Proposition */}
              <div className="col-lg-6 pt-2">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 shadow-sm border border-primary border-opacity-25" style={{ backgroundColor: 'rgba(14, 115, 219, 0.08)' }}>
                  <i className="bi bi-hospital text-primary"></i>
                  <span className="small fw-bold text-primary">Corpo Clínico Hospital Vera Cruz • Instituto Orthesen</span>
                </div>

                <h1 className="display-6 fw-bold mb-2" style={{ color: 'var(--azul-escuro)', lineHeight: '1.2' }}>
                  Ortopedista Especialista — Foco no Tratamento de Dor na Coluna e Articulações em Campinas
                </h1>

                <p className="text-muted small fw-medium mb-3">
                  Dr. Otto Beckedorff • Médico Ortopedista e Traumatologista (CRM-SP 226325 | RQE 139078)
                </p>

                <p className="lead text-secondary mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                  Avaliação detalhada e procedimentos de precisão minimamente invasivos para dor na coluna lombar, cervical, nervo ciático e articulações. Abordagem individualizada e sem promessas milagrosas.
                </p>

                {/* Quick Trust Badges */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small fw-semibold shadow-sm">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i> Instituto Orthesen (Centro)
                  </span>
                  <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small fw-semibold shadow-sm">
                    <i className="bi bi-hospital text-primary me-1"></i> Procedimentos no Vera Cruz
                  </span>
                  <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small fw-semibold shadow-sm">
                    <i className="bi bi-shield-check text-success me-1"></i> Consultas Amil e Reembolso
                  </span>
                </div>

                {/* Scope of Care */}
                <div className="bg-white p-3 p-md-4 rounded-4 shadow-sm border mb-4">
                  <h2 className="h6 fw-bold text-uppercase mb-2" style={{ color: 'var(--azul-escuro)', letterSpacing: '0.5px' }}>
                    <i className="bi bi-check2-square text-primary me-2"></i>Dores e Condições Avaliadas:
                  </h2>
                  <div className="row g-2 small text-secondary">
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-dot text-primary fs-3"></i> Hérnia de disco e ciatalgia
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-dot text-primary fs-3"></i> Dor lombar e cervical crônica
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-dot text-primary fs-3"></i> Artrose e dores no joelho
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-dot text-primary fs-3"></i> Tendinite e dores no ombro
                    </div>
                  </div>
                </div>

                {/* Transparency Note */}
                <div className="p-3 rounded-3 border bg-white small text-muted">
                  <div className="fw-bold text-dark mb-1 d-flex align-items-center">
                    <i className="bi bi-shield-check text-success me-2"></i>
                    Transparência sobre Convênios e Reembolso:
                  </div>
                  <p className="mb-1" style={{ fontSize: '0.82rem' }}>
                    • <strong>Amil:</strong> Aceita para consultas no Instituto Orthesen (Centro de Campinas). Procedimentos hospitalares no Vera Cruz sob verificação prévia de elegibilidade da operadora.
                  </p>
                  <p className="mb-1" style={{ fontSize: '0.82rem' }}>
                    • <strong>Bradesco, SulAmérica, Omint, Porto Seguro, Caixa:</strong> Atendimento com suporte completo para solicitação de Reembolso Médico.
                  </p>
                  <p className="mb-0 text-danger fw-medium" style={{ fontSize: '0.82rem' }}>
                    • <strong>Unimed:</strong> Não atendemos este convênio. Oferecemos atendimento particular como alternativa.
                  </p>
                </div>
              </div>

              {/* Right Column: Short Pre-Qualification WhatsApp Flow */}
              <div className="col-lg-6">
                <WhatsAppPreQualifyCard
                  campaignType="campinas_convenios"
                  defaultModality="convenio"
                  title="Solicitar Consulta pelo WhatsApp"
                  subtitle="Informe seus dados para direcionarmos seu contato com agilidade à equipe do Dr. Otto Beckedorff:"
                />
              </div>

            </div>
          </div>

          <div className="position-absolute rounded-circle" style={{ 
            width: '450px', height: '450px', 
            top: '-150px', right: '-150px', 
            background: 'radial-gradient(circle, rgba(14,115,219,0.06) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0 
          }}></div>
        </section>

        {/* 4. DOCTOR PROFILE & VERIFIABLE CREDENTIALS */}
        <section className="py-5 bg-white border-top">
          <div className="container py-4">
            <div className="row align-items-center justify-content-center g-5">
              <div className="col-md-5 col-lg-4 text-center">
                <div className="position-relative d-inline-block">
                  <Image
                    src="/img/foto-otto.jpg"
                    alt="Dr. Otto Beckedorff - Ortopedista em Campinas"
                    width={330}
                    height={330}
                    priority
                    className="img-fluid rounded-4 shadow-lg border border-4 border-white object-fit-cover"
                  />
                  <div className="position-absolute start-0 bottom-0 bg-white p-3 rounded-4 shadow-sm mb-n2 ms-n2 border text-start">
                    <div className="fw-bold small text-dark">Dr. Otto Beckedorff</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>CRM-SP 226325 • RQE 139078</div>
                  </div>
                </div>
              </div>

              <div className="col-md-7 col-lg-6">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-3">
                  Qualificação Profissional
                </span>
                <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>
                  Quem conduzirá a sua avaliação médica?
                </h2>
                <p className="lead text-primary mb-3 fw-medium" style={{ fontSize: '1.05rem' }}>
                  Abordagem médica moderna, escuta atenta e plano terapêutico individualizado.
                </p>
                <p className="text-secondary small mb-3" style={{ lineHeight: '1.8' }}>
                  Sou médico ortopedista e traumatologista com formação e residência pelo <strong>Hospital Vera Cruz (Campinas/SP)</strong> e membro titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT). Minha prática clínica é dedicada ao tratamento de dores musculoesqueléticas agudas e crônicas, com ênfase em coluna, joelho, quadril e ombro.
                </p>
                <p className="text-secondary small mb-4" style={{ lineHeight: '1.8' }}>
                  Adoto uma conduta pautada pela medicina baseada em evidências, priorizando procedimentos minimamente invasivos (como bloqueios da coluna guiados por radioscopia, infiltrações articulares e radiofrequência), avaliando cada caso de forma criteriosa antes de cogitar intervenções cirúrgicas de maior porte.
                </p>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <div className="fw-bold text-dark small"><i className="bi bi-geo-alt-fill text-danger me-1"></i> Consultas Ambulatoriais:</div>
                      <div className="text-secondary small">Instituto Orthesen (Centro, Campinas - SP)</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <div className="fw-bold text-dark small"><i className="bi bi-hospital-fill text-primary me-1"></i> Procedimentos Hospitalares:</div>
                      <div className="text-secondary small">Hospital Vera Cruz (Campinas - SP)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LOCATIONS */}
        <section className="py-5 bg-light border-top">
          <div className="container py-3">
            <div className="text-center mb-5">
              <h2 className="h4 fw-bold text-dark">Locais de Atendimento em Campinas</h2>
              <p className="text-muted small">Estrutura hospitalar e ambulatorial de referência no Centro de Campinas</p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-md-5">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <span className="badge bg-primary bg-opacity-10 text-primary mb-2">Consultório</span>
                  <h3 className="h6 fw-bold text-dark mb-2">Instituto Orthesen</h3>
                  <p className="small text-muted mb-2">
                    <i className="bi bi-geo-alt text-danger me-1"></i> Av. Andrade Neves, 707 – 5º Andar, Centro, Campinas – SP
                  </p>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Consultas médicas, avaliação diagnóstica detalhada, exame físico e suporte de agendamento presencial ou por convênio Amil.
                  </p>
                </div>
              </div>

              <div className="col-md-5">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <span className="badge bg-success bg-opacity-10 text-success mb-2">Centro Hospitalar</span>
                  <h3 className="h6 fw-bold text-dark mb-2">Hospital Vera Cruz</h3>
                  <p className="small text-muted mb-2">
                    <i className="bi bi-geo-alt text-danger me-1"></i> Av. Andrade Neves, 402, Centro, Campinas – SP
                  </p>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Infraestrutura hospitalar completa para procedimentos intervencionistas guiados por imagem com sedação e segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="py-5 bg-white border-top">
          <div className="container" style={{ maxWidth: '850px' }}>
            <div className="text-center mb-4">
              <h2 className="h4 fw-bold text-dark">Perguntas Frequentes sobre Convênios e Atendimento</h2>
              <p className="text-muted small">Informações transparentes sobre a consulta</p>
            </div>

            <div className="accordion accordion-flush" id="faqConvenios">
              <div className="accordion-item border-bottom mb-2">
                <h3 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Como funciona o atendimento pelo convênio Amil?
                  </button>
                </h3>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#faqConvenios">
                  <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                    O atendimento ambulatorial para pacientes Amil é realizado no Instituto Orthesen em Campinas. Para procedimentos intervencionistas ou cirúrgicos no Hospital Vera Cruz, a elegibilidade depende da categoria do plano e da autorização prévia da operadora.
                  </div>
                </div>
              </div>

              <div className="accordion-item border-bottom mb-2">
                <h3 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    O Dr. Otto Beckedorff atende Unimed?
                  </button>
                </h3>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqConvenios">
                  <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                    Não. O Dr. Otto não faz parte da rede credenciada da Unimed. Pacientes que possuem Unimed e desejam ser avaliados podem agendar na modalidade particular, recebendo nota fiscal com dados completos para eventual pedido de reembolso junto à operadora.
                  </div>
                </div>
              </div>

              <div className="accordion-item border-bottom mb-2">
                <h3 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Como funciona o reembolso para Bradesco, SulAmérica, Omint e outros planos?
                  </button>
                </h3>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqConvenios">
                  <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                    A consulta é realizada de forma particular e nossa equipe fornece nota fiscal detalhada com o relatório médico necessário para que você dê entrada no aplicativo do seu convênio e solicite o reembolso previsto no seu contrato.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. MINIMALIST ADS FOOTER */}
      <footer className="py-4 bg-white border-top text-center text-muted small mt-auto">
        <div className="container">
          <p className="mb-1 text-dark fw-bold">Dr. Otto Beckedorff • Médico Ortopedista e Traumatologista</p>
          <p className="mb-2">CRM-SP 226325 | RQE 139078 • Campinas / SP</p>
          <p className="mb-2 text-muted" style={{ fontSize: '0.78rem' }}>
            As informações deste site têm caráter exclusivamente informativo e educativo, não substituindo a consulta médica presencial.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-2">
            <Link href="/privacidade" className="text-secondary text-decoration-none">
              Política de Privacidade
            </Link>
            <span>•</span>
            <a href="#topo" className="text-secondary text-decoration-none">
              Voltar ao Início
            </a>
          </div>
        </div>
      </footer>

      {/* 8. MOBILE STICKY CTA BAR (Discreet WhatsApp direct action) */}
      <MobileStickyBar campaignType="campinas_convenios" />
    </div>
  );
}
