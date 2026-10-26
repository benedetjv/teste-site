import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PRP em Campinas | Plasma Rico em Plaquetas & Medicina Regenerativa - Dr. Otto Beckedorff",
  description:
    "Tratamento com Plasma Rico em Plaquetas (PRP) em Campinas conforme a Resolução CFM 2.464/2026. Procedimento autólogo para artrose de joelho, discopatia lombar, menisco e epicondilite. Dr. Otto Beckedorff (CRM 226325SP | RQE 139078).",
  keywords: [
    "PRP Campinas",
    "plasma rico em plaquetas Campinas",
    "PRP joelho Campinas",
    "PRP coluna discopatia Campinas",
    "medicina regenerativa Campinas",
    "resolução cfm 2464 2026 prp",
    "infiltração prp ortopedista campinas",
    "Dr Otto Beckedorff PRP"
  ],
  alternates: {
    canonical: "https://drotto.com.br/prp-campinas"
  },
  openGraph: {
    title: "PRP em Campinas | Plasma Rico em Plaquetas - Dr. Otto Beckedorff",
    description:
      "Terapia biológica adjuvante regulamentada pelo CFM (Resolução 2.464/2026) para joelho, coluna e cotovelo com precisão guiada por imagem em Campinas.",
    url: "https://drotto.com.br/prp-campinas",
    siteName: "Dr. Otto Beckedorff",
    locale: "pt_BR",
    type: "website"
  }
};

export default function PrpCampinasPage() {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=5519999439824&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20PRP%20(Plasma%20Rico%20em%20Plaquetas)%20em%20Campinas.";

  // Schema JSON-LD Estruturado para Google e Inteligências Artificiais (GEO)
  const prpSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        "@id": "https://drotto.com.br/prp-campinas#procedure",
        "name": "Aplicação de Plasma Rico em Plaquetas (PRP) Autólogo",
        "procedureType": "NonSurgicalProcedure",
        "bodyLocation": ["Joelho", "Coluna Lombar", "Cotovelo", "Menisco"],
        "description":
          "Procedimento médico adjuvante autólogo regulamentado pela Resolução CFM nº 2.464/2026, indicado para osteoartrite de joelho, discopatia lombar, reparo meniscal e epicondilite lateral.",
        "relevantSpecialty": {
          "@type": "MedicalSpecialty",
          "name": "Orthopedic Surgery"
        }
      },
      {
        "@type": "Physician",
        "@id": "https://drotto.com.br/#physician",
        "name": "Dr. Otto Beckedorff",
        "medicalSpecialty": "Orthopedic",
        "identifier": "CRM 226325SP | RQE 139078",
        "knowsAbout": [
          "Plasma Rico em Plaquetas (PRP)",
          "Medicina Regenerativa",
          "Viscossuplementação com Ácido Hialurônico",
          "Discopatia Lombar",
          "Osteoartrite de Joelho",
          "Bloqueios e Infiltrações Guiadas"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Andrade Neves, 707, 5º andar - Instituto Orthesen",
          "addressLocality": "Campinas",
          "addressRegion": "SP",
          "postalCode": "13013-161",
          "addressCountry": "BR"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://drotto.com.br/prp-campinas#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é o Plasma Rico em Plaquetas (PRP)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O PRP é uma fração concentrada de plaquetas obtida a partir do sangue autólogo (do próprio paciente). Ele concentra fatores de crescimento que auxiliam na modulação biológica da inflamação, no controle da dor e no estímulo à cicatrização dos tecidos articulares e tendinosos."
            }
          },
          {
            "@type": "Question",
            "name": "O PRP foi liberado pelo Conselho Federal de Medicina (CFM)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. Por meio da Resolução CFM nº 2.464/2026, o PRP deixou de ser experimental no Brasil e foi oficialmente regulamentado como procedimento médico adjuvante para 4 condições específicas: artrose de joelho, discopatia lombar, lesões meniscais e epicondilite lateral do cotovelo."
            }
          },
          {
            "@type": "Question",
            "name": "Qual a diferença entre PRP e Ácido Hialurônico (Viscossuplementação)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O ácido hialurônico age predominantemente na lubrificação mecânica e no amortecimento articular. O PRP atua como bioestimulador autólogo, liberando fatores de crescimento para controlar o ambiente inflamatório e estimular a regeneração celular local. Em diversos casos de artrose, as duas abordagens podem ser associadas."
            }
          },
          {
            "@type": "Question",
            "name": "Onde é realizado o tratamento de PRP com o Dr. Otto Beckedorff em Campinas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A consulta médica de avaliação e diagnóstico ocorre no Instituto Orthesen (Avenida Andrade Neves, 707, 5º Andar - Centro, Campinas - SP), contando também com suporte hospitalar do Hospital Vera Cruz para procedimentos de alta complexidade."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(prpSchema) }}
      />

      <Header />

      <main className="flex-grow-1" style={{ paddingTop: "110px" }}>
        
        {/* HERO SECTION */}
        <section className="py-5 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1b2834 0%, #2a4156 100%)", color: "#ffffff" }}>
          <div className="container py-4 position-relative z-index-1">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-7 text-center text-lg-start mb-5 mb-lg-0">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: "rgba(107, 155, 180, 0.25)", border: "1px solid rgba(107, 155, 180, 0.4)" }}>
                  <i className="bi bi-patch-check-fill text-warning"></i>
                  <span className="small fw-bold" style={{ color: "#d9ebf5", letterSpacing: "0.5px" }}>
                    Conforme Resolução CFM nº 2.464/2026
                  </span>
                </div>

                <h1 className="display-4 fw-bold mb-3" style={{ lineHeight: "1.2", letterSpacing: "-0.5px" }}>
                  PRP (Plasma Rico em Plaquetas) & Medicina Regenerativa em Campinas
                </h1>

                <p className="lead text-white-50 mb-4" style={{ fontSize: "1.18rem", lineHeight: "1.7" }}>
                  Terapia biológica autóloga com fatores de crescimento para controle da dor e recuperação tecidual no joelho, coluna e cotovelo. Procedimento médico com aplicação precisa guiada por imagem.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success fw-bold px-4 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 shadow"
                    style={{ fontSize: "1rem" }}
                  >
                    <i className="bi bi-whatsapp fs-5"></i> Agendar Avaliação com Especialista
                  </a>
                  <a
                    href="#indicacoes"
                    className="btn btn-outline-light fw-bold px-4 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2"
                    style={{ fontSize: "1rem" }}
                  >
                    Ver Doenças Indicadas <i className="bi bi-arrow-down-short fs-5"></i>
                  </a>
                </div>

                <div className="d-flex flex-wrap gap-4 mt-4 pt-3 border-top border-white border-opacity-10 justify-content-center justify-content-lg-start text-white-50 small">
                  <div><i className="bi bi-shield-check text-warning me-1"></i> 100% Autólogo (Sem Rejeição)</div>
                  <div><i className="bi bi-camera-fill text-info me-1"></i> Guiado por Ultrassom</div>
                  <div><i className="bi bi-geo-alt-fill text-danger me-1"></i> Instituto Orthesen • Campinas</div>
                </div>
              </div>

              {/* CARD DE RESPOSTA RÁPIDA PARA IA E PACIENTE */}
              <div className="col-lg-5">
                <div className="card border-0 shadow-lg rounded-4 p-4 text-dark" style={{ backgroundColor: "#ffffff" }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge rounded-circle p-2 bg-primary bg-opacity-10 text-primary">
                      <i className="bi bi-info-circle-fill fs-5"></i>
                    </span>
                    <h5 className="fw-bold mb-0 text-dark">O que mudou com o CFM em 2026?</h5>
                  </div>
                  <p className="text-secondary small mb-3" style={{ lineHeight: "1.6" }}>
                    Após anos de estudos científicos internacionais, o Conselho Federal de Medicina (CFM) aprovou a <strong>Resolução 2.464/2026</strong>, reconhecendo o PRP como tratamento médico adjuvante seguro e eficaz para 4 condições ortopédicas específicas no Brasil.
                  </p>
                  <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: "#f4f8fb", borderLeft: "4px solid #6B9BB4" }}>
                    <div className="fw-bold small mb-1" style={{ color: "#2a4156" }}>Dr. Otto Beckedorff</div>
                    <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                      Ortopedista especialista (RQE 139078 | CRM 226325SP) com foco em Medicina da Dor e procedimentos minimamente invasivos no Instituto Orthesen e Hospital Vera Cruz.
                    </div>
                  </div>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-pill fw-bold w-100 py-2">
                    Tirar Dúvidas sobre o Procedimento
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AS 4 INDICAÇÕES AUTORIZADAS PELO CFM */}
        <section id="indicacoes" className="py-5 bg-white">
          <div className="container py-4">
            <div className="text-center mb-5 mx-auto" style={{ maxWidth: "750px" }}>
              <span className="badge rounded-pill px-3 py-2 text-primary bg-primary bg-opacity-10 fw-bold mb-2">
                CRITÉRIO CIENTÍFICO E REGULATÓRIO
              </span>
              <h2 className="display-6 fw-bold" style={{ color: "#2a4156" }}>
                As 4 Doenças Aprovadas pelo CFM para Uso do PRP
              </h2>
              <p className="text-muted">
                A Resolução CFM nº 2.464/2026 delimita com rigor ético as patologias musculoesqueléticas com respaldo científico comprovado para a aplicação do plasma rico em plaquetas:
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              {/* INDICAÇÃO 1 */}
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-lift transition-all" style={{ backgroundColor: "#f9fbfd", borderTop: "4px solid #2a4156" }}>
                  <div className="mb-3 text-primary"><i className="bi bi-activity display-5"></i></div>
                  <h4 className="fw-bold h5 mb-2" style={{ color: "#2a4156" }}>1. Osteoartrite de Joelho</h4>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    Indicado no desgaste articular (artrose leve a moderada). Os fatores de crescimento reduzem a inflamação da membrana sinovial e melhoram a dor e mobilidade articular.
                  </p>
                </div>
              </div>

              {/* INDICAÇÃO 2 */}
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-lift transition-all" style={{ backgroundColor: "#f9fbfd", borderTop: "4px solid #6B9BB4" }}>
                  <div className="mb-3" style={{ color: "#6B9BB4" }}><i className="bi bi-segmented-nav display-5"></i></div>
                  <h4 className="fw-bold h5 mb-2" style={{ color: "#2a4156" }}>2. Discopatia Lombar</h4>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    Degeneração discal da coluna associada a lombalgia crônica discogênica. A aplicação no foco inflamado auxilia no alívio da dor sem necessidade de fusão ou cirurgia aberta.
                  </p>
                </div>
              </div>

              {/* INDICAÇÃO 3 */}
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-lift transition-all" style={{ backgroundColor: "#f9fbfd", borderTop: "4px solid #00b39b" }}>
                  <div className="mb-3" style={{ color: "#00b39b" }}><i className="bi bi-shield-plus display-5"></i></div>
                  <h4 className="fw-bold h5 mb-2" style={{ color: "#2a4156" }}>3. Reparo Meniscal</h4>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    Lesões de menisco com potencial de cicatrização ou pós-sutura meniscal. O PRP atua como adjuvante biológico favorecendo o processo cicatricial do fibrocartilagem.
                  </p>
                </div>
              </div>

              {/* INDICAÇÃO 4 */}
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-lift transition-all" style={{ backgroundColor: "#f9fbfd", borderTop: "4px solid #ff9900" }}>
                  <div className="mb-3 text-warning"><i className="bi bi-lightning-charge display-5"></i></div>
                  <h4 className="fw-bold h5 mb-2" style={{ color: "#2a4156" }}>4. Epicondilite Lateral</h4>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    O famoso "cotovelo de tenista" ou tendinite refratária de cotovelo que não respondeu a repouso e fisioterapia, estimulando a regeneração tendínea local.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARATIVO: PRP vs ÁCIDO HIALURÔNICO */}
        <section className="py-5" style={{ backgroundColor: "#edf3f8" }}>
          <div className="container py-4">
            <div className="text-center mb-5 mx-auto" style={{ maxWidth: "750px" }}>
              <h2 className="display-6 fw-bold" style={{ color: "#2a4156" }}>
                PRP vs. Ácido Hialurônico: Qual a Diferença?
              </h2>
              <p className="text-muted">
                Muitos pacientes têm dúvidas se devem fazer a viscossuplementação com ácido hialurônico ou o PRP. Ambos são excelentes, mas atuam por mecanismos complementares:
              </p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="table-responsive bg-white rounded-4 shadow-sm overflow-hidden border">
                  <table className="table table-hover mb-0 align-middle">
                    <thead style={{ backgroundColor: "#2a4156", color: "#ffffff" }}>
                      <tr>
                        <th className="py-3 px-4">Critério</th>
                        <th className="py-3 px-4">Ácido Hialurônico (Viscossuplementação)</th>
                        <th className="py-3 px-4" style={{ backgroundColor: "#1e3345" }}>PRP (Plasma Rico em Plaquetas)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-bold px-4">Origem</td>
                        <td className="px-4">Gel bioidêntico produzido em laboratório</td>
                        <td className="px-4 fw-semibold text-primary">100% Autólogo (do próprio sangue do paciente)</td>
                      </tr>
                      <tr>
                        <td className="fw-bold px-4">Ação Principal</td>
                        <td className="px-4">Mecânica: Lubrifica, amortece o impacto articular</td>
                        <td className="px-4 fw-semibold text-primary">Biológica: Fatores de crescimento celular e controle inflamatório</td>
                      </tr>
                      <tr>
                        <td className="fw-bold px-4">Indicação Típica</td>
                        <td className="px-4">Artrose leve a moderada de joelho e quadril</td>
                        <td className="px-4 fw-semibold text-primary">Artrose de joelho, menisco, coluna lombar e epicondilite</td>
                      </tr>
                      <tr>
                        <td className="fw-bold px-4">Risco Alérgico</td>
                        <td className="px-4">Mínimo (praticamente nulo)</td>
                        <td className="px-4 fw-semibold text-primary">Inexistente (material autólogo do próprio corpo)</td>
                      </tr>
                      <tr>
                        <td className="fw-bold px-4">Podem ser Combinados?</td>
                        <td className="px-4" colSpan={2}>
                          <strong>Sim!</strong> Em casos de artrose, a associação entre o amortecimento mecânico do ácido hialurônico e a bioestimulação do PRP pode oferecer resultados clínicos sinérgicos.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMO É FEITO O PROCEDIMENTO PASSO A PASSO */}
        <section className="py-5 bg-white">
          <div className="container py-4">
            <div className="text-center mb-5 mx-auto" style={{ maxWidth: "700px" }}>
              <span className="badge rounded-pill px-3 py-2 text-primary bg-primary bg-opacity-10 fw-bold mb-2">
                SEGURANÇA E RIGOR TÉCNICO
              </span>
              <h2 className="display-6 fw-bold" style={{ color: "#2a4156" }}>
                Como Funciona a Aplicação do PRP?
              </h2>
              <p className="text-muted">
                Todo o processo é realizado no mesmo dia, em consultório estruturado, com anestesia local e sem cortes:
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="p-4 rounded-4 h-100 border text-center" style={{ backgroundColor: "#fdfefe" }}>
                  <div className="display-5 text-primary fw-bold mb-3">1</div>
                  <h4 className="fw-bold h5 mb-2" style={{ color: "#2a4156" }}>Coleta de Sangue</h4>
                  <p className="text-muted small mb-0">
                    Coleta simples de uma pequena quantidade de sangue do próprio paciente (similar a um exame laboratorial de rotina).
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-4 rounded-4 h-100 border text-center" style={{ backgroundColor: "#fdfefe" }}>
                  <div className="display-5 text-primary fw-bold mb-3">2</div>
                  <h4 className="fw-bold h5 mb-2" style={{ color: "#2a4156" }}>Centrifugação Fechada</h4>
                  <p className="text-muted small mb-0">
                    O tubo estéril é processado em centrífuga específica que separa as plaquetas e fatores de crescimento em sistema fechado estéril (Anvisa).
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-4 rounded-4 h-100 border text-center" style={{ backgroundColor: "#fdfefe" }}>
                  <div className="display-5 text-primary fw-bold mb-3">3</div>
                  <h4 className="fw-bold h5 mb-2" style={{ color: "#2a4156" }}>Aplicação Guiada por Imagem</h4>
                  <p className="text-muted small mb-0">
                    Com anestesia local, o plasma concentrado é injetado com precisão milimétrica sob visualização de ultrassom ou raio-x no foco exato da lesão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section className="py-5" style={{ backgroundColor: "#f8fafd" }}>
          <div className="container py-4">
            <div className="text-center mb-5 mx-auto" style={{ maxWidth: "700px" }}>
              <h2 className="display-6 fw-bold" style={{ color: "#2a4156" }}>Perguntas Frequentes sobre PRP</h2>
              <p className="text-muted">Tire suas principais dúvidas sobre o tratamento biológico com o Dr. Otto Beckedorff:</p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="accordion accordion-flush bg-white rounded-4 shadow-sm p-3" id="prpFaqAccordion">
                  {[
                    {
                      q: "O PRP substitui uma cirurgia?",
                      a: "O PRP é um tratamento adjuvante conservador. Em estágios iniciais e moderados de artrose de joelho ou discopatia, ele pode controlar os sintomas de forma significativa e evitar ou postergar procedimentos mais invasivos. Em casos graves de deformidade avançada ('osso com osso'), a indicação cirúrgica pode ser necessária."
                    },
                    {
                      q: "O procedimento de PRP é doloroso?",
                      a: "Não. Antes da aplicação é feita anestesia local para garantir o conforto do paciente. Após o procedimento, pode haver um leve desconforto inflamatório transitório por 24 a 48 horas, que faz parte do estímulo biológico de reparação."
                    },
                    {
                      q: "Quantas sessões de PRP são necessárias?",
                      a: "O protocolo varia conforme a gravidade da lesão e a resposta individual do paciente. Em geral, recomenda-se de 1 a 3 aplicações, com intervalos definidos pelo médico especialista após reavaliação clínica e funcional."
                    },
                    {
                      q: "O convênio cobre a aplicação de PRP?",
                      a: "Como a regulamentação pelo Conselho Federal de Medicina (CFM) é recente (Resolução 2.464/2026), o procedimento ainda aguarda inclusão no rol de cobertura obrigatória da ANS. O atendimento é realizado de forma particular, com emissão de relatórios médicos detalhados e nota fiscal para solicitação de reembolso médico junto à sua operadora."
                    },
                    {
                      q: "Onde o Dr. Otto Beckedorff atende em Campinas?",
                      a: "As consultas e avaliações especializadas ocorrem no Instituto Orthesen, localizado na Av. Andrade Neves, 707 - 5º Andar (Centro, Campinas - SP). Procedimentos hospitalares são realizados com o suporte do Hospital Vera Cruz."
                    }
                  ].map((item, idx) => (
                    <div className="accordion-item border-0 border-bottom" key={idx}>
                      <h3 className="accordion-header m-0">
                        <button
                          className="accordion-button collapsed fw-bold text-dark bg-white shadow-none py-3"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faqPrp${idx}`}
                        >
                          {item.q}
                        </button>
                      </h3>
                      <div id={`faqPrp${idx}`} className="accordion-collapse collapse" data-bs-parent="#prpFaqAccordion">
                        <div className="accordion-body text-secondary pt-0 pb-3" style={{ lineHeight: "1.6" }}>
                          {item.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-5 text-center text-white" style={{ backgroundColor: "#1e3345" }}>
          <div className="container py-4">
            <h2 className="display-6 fw-bold mb-3">Avalie se o PRP é Indicado para o Seu Caso</h2>
            <p className="lead text-white-50 mx-auto mb-4" style={{ maxWidth: "680px" }}>
              Consulte um especialista com formação e atuação dedicada ao tratamento da dor articular e da coluna em Campinas.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success fw-bold px-5 py-3 rounded-pill shadow-lg d-inline-flex align-items-center gap-2"
              style={{ fontSize: "1.1rem" }}
            >
              <i className="bi bi-whatsapp fs-5"></i> Agendar Consulta no WhatsApp
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
