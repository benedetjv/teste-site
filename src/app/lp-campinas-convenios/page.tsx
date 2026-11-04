import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LeadTriageForm from '@/components/LeadTriageForm';

export const metadata = {
  title: 'Ortopedia e Tratamento da Dor em Campinas | Dr. Otto Beckedorff',
  description: 'Atendimento médico focado em dor na coluna, joelho, quadril e ombro. Consultas no Instituto Orthesen (Amil e Particular) e procedimentos no Hospital Vera Cruz.',
  robots: 'noindex, nofollow' // Preservado conforme diretriz de campanhas pagas
};

export default function LPVeraCruzCampinas() {
  return (
    <main className="bg-light min-vh-100">
      
      {/* 1. MINIMALIST ADS NAVBAR (Zero distractive exit links) */}
      <header className="navbar navbar-expand-lg px-3 py-3 bg-white shadow-sm sticky-top border-bottom" style={{ zIndex: 1020 }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <span className="fw-bold fs-5 text-dark">Dr. Otto Beckedorff</span>
            <span className="badge bg-light text-secondary border ms-2 small fw-normal">CRM-SP 226325 • RQE 139078</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="small text-muted d-none d-sm-inline">
              <i className="bi bi-geo-alt-fill text-danger me-1"></i> Campinas: Instituto Orthesen & Vera Cruz
            </span>
            <a
              href="tel:19999439824"
              className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold"
            >
              <i className="bi bi-telephone-fill me-1"></i> (19) 99943-9824
            </a>
          </div>
        </div>
      </header>

      {/* 2. NOTICE BAR: UNIMED CLARIFICATION */}
      <div className="py-2 px-3 text-center small border-bottom" style={{ backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 500 }}>
        <i className="bi bi-info-circle-fill me-1 text-warning"></i>
        <span>
          <strong>Informação importante sobre convênios:</strong> O Dr. Otto Beckedorff <u>não atende Unimed</u>. Para consultas via convênio, atendemos Amil no Instituto Orthesen e emitimos documentação completa para reembolso médico nos demais planos.
        </span>
      </div>

      {/* 3. HERO SECTION WITH EMBEDDED TRIAGE */}
      <section className="py-5 position-relative" style={{ backgroundColor: '#f8fbfe', overflow: 'hidden' }}>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row g-5 align-items-start justify-content-between">
            
            {/* Left Column: Value Proposition & Medical Scope */}
            <div className="col-lg-6 pt-2">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 shadow-sm border border-primary border-opacity-25" style={{ backgroundColor: 'rgba(14, 115, 219, 0.08)' }}>
                <i className="bi bi-hospital text-primary"></i>
                <span className="small fw-bold text-primary">Corpo Clínico Hospital Vera Cruz • Instituto Orthesen</span>
              </div>

              <h1 className="display-5 fw-bold mb-3" style={{ color: 'var(--azul-escuro)', lineHeight: '1.2' }}>
                Avaliação Especializada em <span style={{ color: 'var(--azul-principal)' }}>Coluna & Dor</span> em Campinas.
              </h1>

              <p className="lead text-secondary mb-4" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                Diagnóstico detalhado e medicina intervencionista da dor musculoesquelética. Tratamentos individualizados com foco em devolver sua mobilidade e qualidade de vida.
              </p>

              {/* Conditions List */}
              <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
                <h2 className="h6 fw-bold text-uppercase mb-3" style={{ color: 'var(--azul-escuro)', letterSpacing: '0.5px' }}>
                  <i className="bi bi-check2-square text-primary me-2"></i>Problemas e Dores Avaliados:
                </h2>
                <div className="row g-2 small text-secondary">
                  <div className="col-sm-6 d-flex align-items-center">
                    <i className="bi bi-dot text-primary fs-3"></i> Hérnia de disco e ciatalgia
                  </div>
                  <div className="col-sm-6 d-flex align-items-center">
                    <i className="bi bi-dot text-primary fs-3"></i> Dores na coluna lombar e cervical
                  </div>
                  <div className="col-sm-6 d-flex align-items-center">
                    <i className="bi bi-dot text-primary fs-3"></i> Artrose e dores no joelho
                  </div>
                  <div className="col-sm-6 d-flex align-items-center">
                    <i className="bi bi-dot text-primary fs-3"></i> Dores no quadril e bursite
                  </div>
                  <div className="col-sm-6 d-flex align-items-center">
                    <i className="bi bi-dot text-primary fs-3"></i> Dores no ombro e tendinites
                  </div>
                  <div className="col-sm-6 d-flex align-items-center">
                    <i className="bi bi-dot text-primary fs-3"></i> Bloqueios guiados e infiltrações
                  </div>
                </div>
              </div>

              {/* Coverage Transparency Box */}
              <div className="p-3 rounded-3 border bg-white small text-muted">
                <div className="fw-bold text-dark mb-1 d-flex align-items-center">
                  <i className="bi bi-shield-check text-success me-2 fs-5"></i>
                  Transparência de Atendimento e Cobertura:
                </div>
                <p className="mb-1">
                  • <strong>Amil:</strong> Aceita para consultas ambulatoriais no Instituto Orthesen (Centro de Campinas). Procedimentos hospitalares no Vera Cruz dependem de autorização da operadora.
                </p>
                <p className="mb-1">
                  • <strong>Bradesco, SulAmérica, Omint, Porto Seguro, Caixa:</strong> Atendimento com suporte completo para pedido de Reembolso Médico.
                </p>
                <p className="mb-0 text-danger fw-medium">
                  • <strong>Unimed:</strong> Não atendemos este convênio.
                </p>
              </div>
            </div>

            {/* Right Column: Lead Triage Form (Above the Fold) */}
            <div className="col-lg-6">
              <LeadTriageForm
                campaignType="campinas_convenios"
                title="Triagem de Atendimento em Campinas"
                subtitle="Selecione sua modalidade e informe seus dados para receber orientações da nossa equipe sobre horários e cobertura."
                defaultModality="convenio"
              />
            </div>

          </div>
        </div>

        {/* Background Decor */}
        <div className="position-absolute rounded-circle" style={{ 
          width: '500px', height: '500px', 
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
                  width={340}
                  height={340}
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
                Corpo Clínico de Referência
              </span>
              <h2 className="h2 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>
                Quem conduzirá a sua avaliação?
              </h2>
              <p className="lead text-primary mb-3 fw-medium">
                Abordagem médica moderna, escuta atenta e conduta individualizada.
              </p>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                Sou médico ortopedista com formação e residência médica pelo <strong>Hospital Vera Cruz (Campinas/SP)</strong> e membro titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT). Minha atuação é direcionada ao diagnóstico criterioso e ao tratamento da dor musculoesquelética, com foco em coluna, joelho, quadril e ombro.
              </p>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                Trabalho com foco em medicina baseada em evidências, priorizando abordagens diagnósticas precisas e procedimentos minimamente invasivos (como bloqueios da coluna guiados por imagem, infiltrações articulares e radiofrequência), sempre avaliando cada paciente de forma única antes de considerar procedimentos cirúrgicos convencionais.
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

      {/* 5. LOCATIONS & AMENITIES */}
      <section className="py-5 bg-light border-top">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold text-dark">Locais de Atendimento em Campinas</h2>
            <p className="text-muted small">Estrutura completa com conforto, acessibilidade e tecnologia médica</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-5">
              <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                <span className="badge bg-primary bg-opacity-10 text-primary mb-2">Consultório</span>
                <h3 className="h5 fw-bold text-dark mb-2">Instituto Orthesen</h3>
                <p className="small text-muted mb-3">
                  <i className="bi bi-geo-alt text-danger me-1"></i> Av. Andrade Neves, 707 – 5º Andar, Centro, Campinas – SP
                </p>
                <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                  Consultas ambulatoriais, avaliação diagnóstica detalhada, exame físico e suporte de agendamento presencial ou por convênio Amil.
                </p>
              </div>
            </div>

            <div className="col-md-5">
              <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                <span className="badge bg-success bg-opacity-10 text-success mb-2">Centro Hospitalar</span>
                <h3 className="h5 fw-bold text-dark mb-2">Hospital Vera Cruz</h3>
                <p className="small text-muted mb-3">
                  <i className="bi bi-geo-alt text-danger me-1"></i> Av. Andrade Neves, 402, Centro, Campinas – SP
                </p>
                <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                  Infraestrutura hospitalar de ponta para realização de procedimentos intervencionistas guiados por radioscopia/ultrassom com sedação anestésica e máxima segurança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ (ETHICAL & COMPLIANT) */}
      <section className="py-5 bg-white border-top">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold text-dark">Perguntas Frequentes sobre Convênios e Atendimento</h2>
            <p className="text-muted small">Tire suas dúvidas antes de agendar</p>
          </div>

          <div className="accordion accordion-flush" id="faqAccordion">
            <div className="accordion-item border-bottom mb-2">
              <h3 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Como funciona o atendimento pelo convênio Amil?
                </button>
              </h3>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                  O atendimento ambulatorial para pacientes Amil é realizado no Instituto Orthesen em Campinas. Para procedimentos intervencionistas ou cirúrgicos no Hospital Vera Cruz, a elegibilidade depende da categoria do plano e da autorização prévia emitida pela operadora.
                </div>
              </div>
            </div>

            <div className="accordion-item border-bottom mb-2">
              <h3 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  O Dr. Otto Beckedorff atende Unimed?
                </button>
              </h3>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                  Não. O Dr. Otto não faz parte da rede credenciada da Unimed. Pacientes que possuem Unimed e desejam ser avaliados podem agendar na modalidade particular, recebendo nota fiscal com dados completos para eventual pedido de reembolso junto à operadora.
                </div>
              </div>
            </div>

            <div className="accordion-item border-bottom mb-2">
              <h3 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Como funciona o reembolso médico para Bradesco, SulAmérica, Omint e outros?
                </button>
              </h3>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                  A consulta é realizada de forma particular e nossa equipe fornece nota fiscal detalhada com o relatório médico necessário para que você dê entrada no aplicativo do seu convênio e solicite o reembolso previsto no seu contrato.
                </div>
              </div>
            </div>

            <div className="accordion-item border-bottom mb-2">
              <h3 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Os procedimentos minimamente invasivos garantem que não precisarei de cirurgia?
                </button>
              </h3>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                  A medicina não permite promessas de resultados garantidos. Os procedimentos minimamente invasivos (bloqueios, radiofrequência e infiltrações) são opções terapêuticas consolidadas pela literatura para o alívio da dor e reabilitação, sendo sempre indicados após criteriosa avaliação clínica e análise de exames de imagem.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MINIMALIST ADS FOOTER */}
      <footer className="py-4 bg-white border-top text-center text-muted small">
        <div className="container">
          <p className="mb-1 text-dark fw-bold">Dr. Otto Beckedorff • Médico Ortopedista e Traumatologista</p>
          <p className="mb-2">CRM-SP 226325 | RQE 139078 • Campinas / SP</p>
          <p className="mb-2 text-muted" style={{ fontSize: '0.78rem' }}>
            As informações deste site têm caráter exclusivamente informativo e educativo, não substituindo a consulta médica presencial.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-2">
            <Link href="/privacidade" className="text-secondary text-decoration-none hover-primary">
              Política de Privacidade
            </Link>
            <span>•</span>
            <a href="#triagem-form" className="text-secondary text-decoration-none hover-primary">
              Voltar à Triagem
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
