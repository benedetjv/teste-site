import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WhatsAppPreQualifyCard from '@/components/WhatsAppPreQualifyCard';
import MobileStickyBar from '@/components/MobileStickyBar';

export const metadata = {
  title: 'Dr. Otto Beckedorff • Médico Ortopedista com Foco em Coluna e Dor em Campinas',
  description: 'Médico Ortopedista (CRM-SP 226325 | RQE 139078). Diagnóstico e tratamento de dores na coluna, hérnia de disco e articulações. Consultas no Instituto Orthesen e procedimentos no Vera Cruz.',
  keywords: [
    'Ortopedista em Campinas',
    'Ortopedista Coluna Campinas',
    'Dor na coluna Campinas',
    'Tratamento Hérnia de Disco Campinas',
    'Infiltração de Coluna Campinas Vera Cruz'
  ],
  alternates: {
    canonical: 'https://drotto.com.br/ortopedista-campinas',
  },
  robots: 'noindex, follow'
};

const campinasFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Quais convênios são atendidos pelo Dr. Otto Beckedorff em Campinas?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'O Dr. Otto Beckedorff atende pela operadora Amil em consultas ambulatoriais no Instituto Orthesen (Campinas). Procedimentos no Hospital Vera Cruz dependem da categoria do plano e autorização prévia. Para convênios como Bradesco Saúde, SulAmérica, Omint, Porto Seguro e Caixa, o atendimento de consulta é particular com fornecimento de documentação completa para reembolso médico. Não atendemos Unimed.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Como funciona a avaliação de dores na coluna e hérnia de disco em Campinas?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A avaliação inclui exame clínico minucioso e análise detalhada de exames de imagem (como ressonância magnética e radiografias). O plano de tratamento é individualizado, podendo envolver reabilitação direcionada ou procedimentos minimamente invasivos guiados por imagem para controle da dor.'
      }
    },
    {
      '@type': 'Question',
      'name': 'O que são procedimentos minimamente invasivos da coluna?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'São intervenções realizadas em centro cirúrgico com anestesia local e sedação leve, como bloqueios foraminais/facetários e radiofrequência (rizotomia), guiados por radioscopia ou ultrassom em tempo real, visando o alívio das dores decorrentes de hérnia de disco, estenose e artrose vertebral.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Onde são realizadas as consultas e os procedimentos em Campinas?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'As consultas ambulatoriais acontecem no Instituto Orthesen, localizado na Av. Andrade Neves, 707, 5º Andar (Centro de Campinas). Procedimentos hospitalares e intervencionistas são realizados no Hospital Vera Cruz (Av. Andrade Neves, 402).'
      }
    }
  ]
};

export default function PageOrtopedistaCampinas() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light pb-5 pb-md-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campinasFaqSchema) }}
      />

      {/* 1. COMPACT MOBILE-FIRST ADS NAVBAR */}
      <header className="navbar px-3 py-2 bg-white shadow-sm sticky-top border-bottom" style={{ zIndex: 1020 }}>
        <div className="container d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-column text-start">
            <span className="fw-bold text-dark lh-1" style={{ fontSize: '1.05rem' }}>Dr. Otto Beckedorff</span>
            <span className="text-muted" style={{ fontSize: '0.72rem' }}>Ortopedia • CRM-SP 226325 | RQE 139078</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="small text-muted d-none d-lg-inline" style={{ fontSize: '0.8rem' }}>
              <i className="bi bi-geo-alt-fill text-danger me-1"></i> Vera Cruz & Instituto Orthesen (Campinas)
            </span>
            <a
              href="#pre-qualificacao"
              data-cta-location="header_whatsapp"
              className="btn btn-success rounded-pill px-3 py-1 fw-bold shadow-sm d-inline-flex align-items-center"
              style={{ backgroundColor: "#25D366", border: "none", fontSize: '0.85rem' }}
            >
              <i className="bi bi-whatsapp me-1"></i> Agende Agora
            </a>
          </div>
        </div>
      </header>



      <main id="topo">
        {/* 3. HERO SECTION (QUIZ AT TOP ON MOBILE, BALANCED ON DESKTOP) */}
        <section className="py-3 py-lg-5 position-relative" style={{ backgroundColor: '#f8fbfe', overflow: 'hidden' }}>
          <div className="container position-relative" style={{ zIndex: 1 }}>
            
            {/* Mobile Header Banner: Directly above the quiz */}
            <div className="d-block d-lg-none text-center mb-3">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 shadow-sm border border-primary border-opacity-25" style={{ backgroundColor: 'rgba(14, 115, 219, 0.08)' }}>
                <i className="bi bi-award text-primary"></i>
                <span className="small fw-bold text-primary" style={{ fontSize: '0.75rem' }}>Hospital Vera Cruz • Instituto Orthesen</span>
              </div>
              <h1 className="h5 fw-bold mb-1" style={{ color: 'var(--azul-escuro)', lineHeight: '1.3' }}>
                Médico Ortopedista — Foco no Tratamento de Dor em Campinas
              </h1>
              <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                Triagem rápida para agendamento direto no WhatsApp:
              </p>
            </div>

            <div className="row g-4 align-items-start justify-content-between">
              
              {/* Quiz Column: FIRST ON MOBILE (order-1), Right on Desktop (order-lg-2) */}
              <div className="col-lg-6 order-1 order-lg-2 mb-3 mb-lg-0">
                <WhatsAppPreQualifyCard
                  campaignType="campinas_ortopedista_coluna"
                  defaultModality="particular"
                  title="Agendar Consulta pelo WhatsApp"
                  subtitle="Responda rápido para direcionarmos seu contato à equipe médica:"
                />
              </div>

              {/* Left Column: SECOND ON MOBILE (order-2), Left on Desktop (order-lg-1) */}
              <div className="col-lg-6 order-2 order-lg-1 pt-2">
                <div className="d-none d-lg-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 shadow-sm border border-primary border-opacity-25" style={{ backgroundColor: 'rgba(14, 115, 219, 0.08)' }}>
                  <i className="bi bi-award text-primary"></i>
                  <span className="small fw-bold text-primary">Ortopedia & Tratamento da Dor em Campinas</span>
                </div>

                <h1 className="display-6 fw-bold mb-2 d-none d-lg-block" style={{ color: 'var(--azul-escuro)', lineHeight: '1.2' }}>
                  Médico Ortopedista — Foco no Tratamento de Dor na Coluna e Articulações em Campinas
                </h1>

                <p className="text-muted small fw-medium mb-3 d-none d-lg-block">
                  Dr. Otto Beckedorff • Médico Ortopedista e Traumatologista (CRM-SP 226325 | RQE 139078)
                </p>

                <p className="lead text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                  Avaliação aprofundada para dores persistentes na coluna lombar, cervical, ciático, joelhos e articulações. Abordagem moderna e procedimentos de precisão minimamente invasivos.
                </p>

                {/* Quick Trust Badges */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small fw-semibold shadow-sm">
                    <i className="bi bi-hospital text-primary me-1"></i> Procedimentos no Vera Cruz
                  </span>
                  <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small fw-semibold shadow-sm">
                    <i className="bi bi-building text-primary me-1"></i> Instituto Orthesen (Centro)
                  </span>
                  <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small fw-semibold shadow-sm">
                    <i className="bi bi-file-medical text-success me-1"></i> RQE 139078 • CRM-SP 226325
                  </span>
                </div>

                {/* Conditions Grid */}
                <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
                  <h2 className="h6 fw-bold text-uppercase mb-3" style={{ color: 'var(--azul-escuro)', letterSpacing: '0.5px' }}>
                    <i className="bi bi-activity text-primary me-2"></i>Condições Avaliadas no Consultório:
                  </h2>
                  <div className="row g-2 small text-secondary">
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Hérnia de Disco e Lombociatalgia
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Dores na Coluna Lombar e Cervical
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Artrose e Desgaste no Joelho
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Tendinite e Lesão de Manguito (Ombro)
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Bursite e Dores no Quadril
                    </div>
                    <div className="col-sm-6 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Bloqueios e Infiltrações de Precisão
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="position-absolute rounded-circle" style={{ 
            width: '450px', height: '450px', 
            top: '-100px', right: '-100px', 
            background: 'radial-gradient(circle, rgba(14,115,219,0.06) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0 
          }}></div>
        </section>

        {/* 4. CARE PATHWAY: HOW IT WORKS */}
        <section className="py-5 bg-white border-top">
          <div className="container py-4">
            <div className="text-center mb-5">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-2">
                Linha de Cuidado
              </span>
              <h2 className="h2 fw-bold text-dark">Como Funciona a Sua Avaliação Médica</h2>
              <p className="text-muted small">Processo estruturado com foco em diagnóstico preciso e segurança</p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="p-4 bg-light rounded-4 h-100 border text-center text-md-start">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-5 mb-3" style={{ width: '48px', height: '48px' }}>
                    1
                  </div>
                  <h3 className="h5 fw-bold text-dark mb-2">Consulta e Exame Físico</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.7' }}>
                    Escuta atenta do histórico da sua dor, limitações funcionais e realização de testes ortopédicos e neurológicos direcionados.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-4 bg-light rounded-4 h-100 border text-center text-md-start">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-5 mb-3" style={{ width: '48px', height: '48px' }}>
                    2
                  </div>
                  <h3 className="h5 fw-bold text-dark mb-2">Análise Detalhada de Imagens</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.7' }}>
                    Revisão minuciosa dos exames de ressonância magnética, tomografias ou radiografias para correlação precisa entre o laudo e os seus sintomas clínicos.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-4 bg-light rounded-4 h-100 border text-center text-md-start">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-5 mb-3" style={{ width: '48px', height: '48px' }}>
                    3
                  </div>
                  <h3 className="h5 fw-bold text-dark mb-2">Conduta Individualizada</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.7' }}>
                    Planejamento terapêutico que pode contemplar reabilitação, medicações específicas ou procedimentos intervencionistas minimamente invasivos quando indicados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MINIMALLY INVASIVE PROCEDURES OVERVIEW */}
        <section className="py-5 bg-light border-top">
          <div className="container py-3">
            <div className="text-center mb-5">
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold mb-2">
                Medicina Intervencionista da Dor
              </span>
              <h2 className="h2 fw-bold text-dark">Procedimentos Realizados no Hospital Vera Cruz</h2>
              <p className="text-muted small">Técnicas guiadas por imagem para alívio da dor com segurança e rápida recuperação</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <div className="fs-3 text-primary mb-2"><i className="bi bi-shield-plus"></i></div>
                  <h3 className="h6 fw-bold text-dark mb-2">Bloqueios de Coluna</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Infiltrações foraminais e facetárias guiadas por radioscopia para desinflamação do nervo na crise aguda de hérnia de disco e ciatalgia.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <div className="fs-3 text-primary mb-2"><i className="bi bi-lightning-charge"></i></div>
                  <h3 className="h6 fw-bold text-dark mb-2">Radiofrequência (Rizotomia)</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Termolesão ou neuromodulação dos ramos nervosos que conduzem o estímulo da dor facetária na coluna lombar ou cervical crônica.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <div className="fs-3 text-primary mb-2"><i className="bi bi-droplet-half"></i></div>
                  <h3 className="h6 fw-bold text-dark mb-2">Viscossuplementação</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Aplicação de ácido hialurônico para lubrificação e proteção articular em quadros de artrose de joelho e condromalácia patelar.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <div className="fs-3 text-primary mb-2"><i className="bi bi-bandaid"></i></div>
                  <h3 className="h6 fw-bold text-dark mb-2">Infiltrações Guiadas</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Procedimentos guiados por ultrassom de alta resolução para bursites de quadril, tendinites de ombro e pontos miofasciais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CREDENTIALS & DOCTOR BIO */}
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
                <h2 className="h2 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>
                  Dr. Otto Beckedorff
                </h2>
                <p className="lead text-primary mb-3 fw-medium">
                  Médico Ortopedista e Traumatologista com foco no Tratamento da Dor.
                </p>
                <ul className="list-unstyled small text-secondary mb-4" style={{ lineHeight: '2' }}>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> Graduação em Medicina e Residência Médica em Ortopedia e Traumatologia pelo <strong>Hospital Vera Cruz (Campinas/SP)</strong>.</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> Membro Titular da <strong>Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)</strong>.</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> Registro de Qualificação de Especialista: <strong>RQE 139078</strong> | CRM-SP 226325.</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i> Atuação focada em procedimentos intervencionistas guiados por imagem para dor crônica e coluna.</li>
                </ul>
                <div className="p-3 bg-light rounded-3 border small text-muted">
                  <i className="bi bi-info-circle text-primary me-2"></i>
                  Atendimento pautado pela ética médica, escuta criteriosa e compromisso com o esclarecimento de todas as dúvidas do paciente e de seus familiares.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. LOCATIONS */}
        <section className="py-5 bg-light border-top">
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="text-center mb-5">
              <h2 className="h3 fw-bold text-dark">Estrutura de Atendimento em Campinas</h2>
              <p className="text-muted small">Locais de fácil acesso no Centro de Campinas</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-building fs-4 text-primary"></i>
                    <h3 className="h5 fw-bold mb-0 text-dark">Instituto Orthesen</h3>
                  </div>
                  <p className="small text-muted mb-2">Av. Andrade Neves, 707 – 5º Andar, Centro, Campinas – SP</p>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Consultas médicas, anamnese aprofundada, análise de exames e indicação de tratamentos. Atendimento Amil e Particular.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-hospital fs-4 text-success"></i>
                    <h3 className="h5 fw-bold mb-0 text-dark">Hospital Vera Cruz</h3>
                  </div>
                  <p className="small text-muted mb-2">Av. Andrade Neves, 402, Centro, Campinas – SP</p>
                  <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                    Centro cirúrgico e equipe hospitalar de excelência para a realização de bloqueios, radiofrequência e procedimentos intervencionistas com máxima segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-5 bg-white border-top">
          <div className="container" style={{ maxWidth: '850px' }}>
            <div className="text-center mb-5">
              <h2 className="h3 fw-bold text-dark">Dúvidas Frequentes</h2>
              <p className="text-muted small">Esclarecimentos sobre dores na coluna e consultas</p>
            </div>

            <div className="accordion accordion-flush" id="faqCampinas">
              <div className="accordion-item border-bottom mb-2">
                <h3 className="accordion-header" id="headingC1">
                  <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseC1" aria-expanded="false" aria-controls="collapseC1">
                    Como é diagnosticada a causa da dor na coluna?
                  </button>
                </h3>
                <div id="collapseC1" className="accordion-collapse collapse" aria-labelledby="headingC1" data-bs-parent="#faqCampinas">
                  <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                    O diagnóstico começa na consulta com uma anamnese detalhada e exame físico ortopédico e neurológico. Exames de imagem (como ressonância magnética) são analisados minuciosamente para identificar se a dor tem origem discal (hérnia), facetária (artrose das articulações), muscular ou miofascial.
                  </div>
                </div>
              </div>

              <div className="accordion-item border-bottom mb-2">
                <h3 className="accordion-header" id="headingC2">
                  <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseC2" aria-expanded="false" aria-controls="collapseC2">
                    Todo caso de hérnia de disco necessita de cirurgia aberta?
                  </button>
                </h3>
                <div id="collapseC2" className="accordion-collapse collapse" aria-labelledby="headingC2" data-bs-parent="#faqCampinas">
                  <div className="accordion-body small text-secondary" style={{ lineHeight: '1.7' }}>
                    Não. A grande maioria dos casos de hérnia de disco pode ser manejada com abordagens conservadoras e procedimentos minimamente invasivos (como bloqueios foraminais guiados por imagem para controle da fase inflamatória aguda), reservando intervenções cirúrgicas de maior porte para indicações clínicas estritas.
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* 9. FINAL CTA SECTION */}
        <section className="py-5 bg-light border-top text-center">
          <div className="container py-3">
            <h2 className="h3 fw-bold text-dark mb-2">Deseja uma Avaliação da sua Dor em Campinas?</h2>
            <p className="text-secondary small mb-4">Inicie seu pré-atendimento rápido e fale diretamente com nossa equipe no WhatsApp:</p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <a
                href="#pre-qualificacao"
                data-cta-location="final_section_prequal"
                className="btn btn-success btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center text-center"
                style={{ backgroundColor: '#25D366', border: 'none', fontSize: '1.05rem' }}
              >
                <i className="bi bi-whatsapp fs-5 me-2"></i> Solicitar Consulta no WhatsApp
              </a>

            </div>
          </div>
        </section>
      </main>

      {/* 10. MINIMALIST ADS FOOTER */}
      <footer className="py-4 bg-white border-top text-center text-muted small mt-auto">
        <div className="container">
          <p className="mb-1 text-dark fw-bold">Dr. Otto Beckedorff • Médico Ortopedista e Traumatologista</p>
          <p className="mb-2">CRM-SP 226325 | RQE 139078 • Campinas / SP</p>
          <p className="mb-2 text-muted" style={{ fontSize: '0.78rem' }}>
            As informações disponibilizadas neste site têm propósito exclusivamente informativo e de educação em saúde, em estrita observância à Resolução CFM 2.336/2023.
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

      {/* 11. MOBILE STICKY CTA BAR (Discreet WhatsApp direct action) */}
      <MobileStickyBar campaignType="campinas_ortopedista_coluna" />
    </div>
  );
}
