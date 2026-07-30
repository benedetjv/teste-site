import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Viscossuplementação com Ácido Hialurônico em Campinas | Dr. Otto",
  description:
    "Tratamento de artrose e condromalácia com Viscossuplementação (Ácido Hialurônico) no joelho e quadril em Campinas. Dr. Otto Beckedorff (CRM 226325SP | RQE 139078).",
  keywords: [
    "viscossuplementação campinas",
    "ácido hialurônico joelho campinas",
    "tratamento artrose campinas",
    "infiltração ácido hialurônico campinas",
    "ortopedista especialista joelho campinas",
    "ortopedista amil campinas"
  ],
  alternates: {
    canonical: "https://drotto.com.br/viscossuplementacao-campinas"
  },
  openGraph: {
    title: "Viscossuplementação em Campinas | Dr. Otto Beckedorff",
    description:
      "Lubrificação articular e alívio da artrose de joelho e quadril com ácido hialurônico de alta tecnologia em Campinas.",
    url: "https://drotto.com.br/viscossuplementacao-campinas",
    siteName: "Dr. Otto Beckedorff",
    locale: "pt_BR",
    type: "website"
  }
};

export default function ViscossuplementacaoCampinasPage() {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=5519997677098&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20Viscossuplementa%C3%A7%C3%A3o%20(Acido%20Hialuronico)%20em%20Campinas.";

  const viscoPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalCondition",
        "@id": "https://drotto.com.br/viscossuplementacao-campinas#condition",
        "name": "Artrose e Condromalácia Patelar",
        "possibleTreatment": [
          { "@type": "MedicalProcedure", "name": "Viscossuplementação com Ácido Hialurônico" },
          { "@type": "MedicalProcedure", "name": "Infiltração Guiada por Ultrassom" }
        ],
        "associatedAnatomy": {
          "@type": "AnatomicalStructure",
          "name": "Articulações (Joelho e Quadril)"
        }
      },
      {
        "@type": "Physician",
        "@id": "https://drotto.com.br/#physician",
        "name": "Dr. Otto Beckedorff",
        "medicalSpecialty": "Orthopedic",
        "identifier": "CRM 226325SP | RQE 139078",
        "knowsAbout": [
          "Viscossuplementação com Ácido Hialurônico",
          "Artrose de Joelho e Quadril",
          "Infiltração de Joelho"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Andrade Neves, 699, 6º andar - Clínica Adora",
          "addressLocality": "Campinas",
          "addressRegion": "SP",
          "postalCode": "13013-161",
          "addressCountry": "BR"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://drotto.com.br/viscossuplementacao-campinas#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é a Viscossuplementação com Ácido Hialurônico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "É um procedimento minimamente invasivo onde injetamos ácido hialurônico diretamente na articulação (como o joelho) para repor o líquido sinovial. Ele atua como um lubrificante e amortecedor, reduzindo o atrito e a dor associada à artrose e condromalácia."
            }
          },
          {
            "@type": "Question",
            "name": "A viscossuplementação pode ser feita em casos de artrose avançada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. Embora seja ideal para artrose leve a moderada, em casos de artrose avançada onde o paciente não deseja realizar a cirurgia de prótese (artroplastia) ou possui contraindicações clínicas para operar, a viscossuplementação é uma excelente ferramenta para alívio da dor e melhora da qualidade de vida."
            }
          },
          {
            "@type": "Question",
            "name": "O procedimento de viscossuplementação dói?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "É um procedimento muito tolerável, realizado em ambiente ambulatorial com anestesia local. A aplicação é rápida e o paciente costuma voltar para casa caminhando normalmente."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(viscoPageSchema) }}
      />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-teal-400 tracking-tight">
            Dr. Otto Beckedorff <span className="text-xs text-slate-400 block font-normal">Ortopedia & Tratamento da Dor (RQE 139078)</span>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all"
          >
            Agendar Consulta
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/50 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <span>Infiltração & Medicina Regenerativa</span>
            <span>•</span>
            <span>Campinas - SP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Viscossuplementação com Ácido Hialurônico em Campinas
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Lubrificação articular avançada para alívio da dor e melhora do movimento na artrose de joelho, quadril e condromalácia patelar.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Agendar Avaliação (WhatsApp)
            </a>
          </div>
        </div>
      </section>

      {/* Explicando a Viscossuplementação & Casos Avançados */}
      <section className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">O que é a Viscossuplementação?</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Na artrose e no desgaste articular, o líquido sinovial (responsável por lubrificar a articulação) perde sua qualidade e viscosidade. A viscossuplementação consiste na infiltração intra-articular de **Ácido Hialurônico de alta tecnologia**, que atua como um "óleo" para as engrenagens articulares.
            </p>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2"><span className="text-teal-400">✓</span> Diminui o atrito entre os ossos</li>
              <li className="flex items-center gap-2"><span className="text-teal-400">✓</span> Reduz a inflamação local</li>
              <li className="flex items-center gap-2"><span className="text-teal-400">✓</span> Estimula a produção do líquido sinovial natural</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-teal-900/50 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-teal-400 mb-3">E em Casos de Artrose Avançada?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Dr. Otto Beckedorff é médico Ortopedista especialista (RQE 139078). A ciência mostra que, embora a indicação ideal seja para artroses leves a moderadas, **a viscossuplementação é uma excelente ferramenta de paliação e qualidade de vida para casos de artrose avançada (Grau IV)**.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              Pacientes que **não desejam passar por uma cirurgia de prótese** (artroplastia) ou que possuem **contraindicações clínicas** para a cirurgia, encontram nas infiltrações guiadas uma alternativa segura para controlar a dor e recuperar a autonomia do dia a dia.
            </p>
          </div>
        </div>
      </section>

      {/* Tabela Comparativa (Adaptada para Articulações) */}
      <section className="py-12 px-4 sm:px-8 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 bg-slate-800/30">
              <h3 className="text-xl font-bold text-white mb-2">Comparativo de Tratamentos para Artrose</h3>
              <p className="text-slate-400 text-sm">Entenda como a viscossuplementação se posiciona frente a outras opções, oferecendo qualidade de vida <strong className="text-teal-400 font-semibold">quando bem indicada</strong>.</p>
            </div>
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-xs font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4">Critério Médico</th>
                  <th scope="col" className="px-6 py-4 border-l border-slate-800">Tratamento Conservador</th>
                  <th scope="col" className="px-6 py-4 border-l border-teal-900/50 bg-teal-950/20 text-teal-300">Viscossuplementação (Infiltração)</th>
                  <th scope="col" className="px-6 py-4 border-l border-slate-800">Cirurgia (Prótese/Artroplastia)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <th scope="row" className="px-6 py-4 font-medium text-white">Indicação Principal</th>
                  <td className="px-6 py-4 border-l border-slate-800">Dores leves, início do desgaste.</td>
                  <td className="px-6 py-4 border-l border-teal-900/30 bg-teal-950/10 text-white font-semibold">Artrose moderada ou casos avançados buscando qualidade de vida sem operar.</td>
                  <td className="px-6 py-4 border-l border-slate-800">Desgaste total (Grau IV) com indicação clínica para operar.</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <th scope="row" className="px-6 py-4 font-medium text-white">Objetivo do Tratamento</th>
                  <td className="px-6 py-4 border-l border-slate-800">Controle da dor superficial e fortalecimento.</td>
                  <td className="px-6 py-4 border-l border-teal-900/30 bg-teal-950/10 text-white font-semibold">Lubrificação articular, proteção condral e alívio prolongado (meses).</td>
                  <td className="px-6 py-4 border-l border-slate-800">Substituição biomecânica da articulação.</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <th scope="row" className="px-6 py-4 font-medium text-white">Recuperação e Internação</th>
                  <td className="px-6 py-4 border-l border-slate-800">Sem internação.</td>
                  <td className="px-6 py-4 border-l border-teal-900/30 bg-teal-950/10 text-white font-semibold">Ambulatorial (Procedimento rápido, alta imediata).</td>
                  <td className="px-6 py-4 border-l border-slate-800">Internação hospitalar + meses de reabilitação restrita.</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <th scope="row" className="px-6 py-4 font-medium text-white">Trauma Biológico</th>
                  <td className="px-6 py-4 border-l border-slate-800">Nenhum.</td>
                  <td className="px-6 py-4 border-l border-teal-900/30 bg-teal-950/10 text-white font-semibold">Mínimo (Apenas punção guiada por ultrassom).</td>
                  <td className="px-6 py-4 border-l border-slate-800">Alto (Remoção óssea e tecidual).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Footer minimalista */}
      <footer className="py-8 px-4 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500 mt-16">
        <p className="mb-2">
          Dr. Otto Beckedorff — Ortopedia e Traumatologia • CRM 226325SP | RQE 139078
        </p>
        <p>
          Clínica Adora: Av. Andrade Neves, 699, 6º andar - Campinas/SP
        </p>
      </footer>
    </main>
  );
}
