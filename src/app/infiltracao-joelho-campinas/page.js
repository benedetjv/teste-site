import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Infiltração no Joelho em Campinas | Dr. Otto Beckedorff - Ortopedista",
  description:
    "Tratamento de dor aguda, bursites, tendinites e artrose no joelho com infiltração guiada por ultrassom em Campinas. Dr. Otto Beckedorff (CRM 226325SP | RQE 139078).",
  keywords: [
    "infiltração no joelho campinas",
    "ortopedista infiltração joelho campinas",
    "tratamento dor no joelho campinas",
    "ácido hialurônico joelho campinas",
    "bursite tendinite joelho campinas",
    "ortopedista especialista joelho campinas"
  ],
  alternates: {
    canonical: "https://drotto.com.br/infiltracao-joelho-campinas"
  },
  openGraph: {
    title: "Infiltração de Joelho em Campinas | Dr. Otto Beckedorff",
    description:
      "Alívio rápido e direto no foco da dor para tendinites, bursites e desgaste articular no joelho em Campinas.",
    url: "https://drotto.com.br/infiltracao-joelho-campinas",
    siteName: "Dr. Otto Beckedorff",
    locale: "pt_BR",
    type: "website"
  }
};

export default function InfiltracaoJoelhoCampinasPage() {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=5519997677098&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20Infiltra%C3%A7%C3%A3o%20no%20Joelho%20em%20Campinas.";

  const infiltracaoPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalCondition",
        "@id": "https://drotto.com.br/infiltracao-joelho-campinas#condition",
        "name": "Dor no Joelho (Tendinite, Bursite, Artrose)",
        "possibleTreatment": [
          { "@type": "MedicalProcedure", "name": "Infiltração Guiada no Joelho" },
          { "@type": "MedicalProcedure", "name": "Viscossuplementação com Ácido Hialurônico" }
        ],
        "associatedAnatomy": {
          "@type": "AnatomicalStructure",
          "name": "Articulação do Joelho"
        }
      },
      {
        "@type": "Physician",
        "@id": "https://drotto.com.br/#physician",
        "name": "Dr. Otto Beckedorff",
        "medicalSpecialty": "Orthopedic",
        "identifier": "CRM 226325SP | RQE 139078",
        "knowsAbout": [
          "Infiltração no Joelho",
          "Viscossuplementação com Ácido Hialurônico",
          "Dor Articular"
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
        "@id": "https://drotto.com.br/infiltracao-joelho-campinas#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Para que serve a infiltração no joelho?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A infiltração é um procedimento médico que permite aplicar medicamentos (como anti-inflamatórios ou ácido hialurônico) diretamente no local exato da inflamação ou desgaste, promovendo um alívio da dor muito mais rápido e eficaz do que comprimidos."
            }
          },
          {
            "@type": "Question",
            "name": "Infiltração no joelho serve para quem não quer operar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! A infiltração é uma excelente opção conservadora/minimamente invasiva. Especialmente em casos de pacientes com artrose que não têm indicação para cirurgia ou que não desejam colocar uma prótese, as infiltrações guiadas oferecem grande controle da dor e devolução da qualidade de vida."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(infiltracaoPageSchema) }}
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
            <span>Infiltração Guiada & Controle da Dor</span>
            <span>•</span>
            <span>Campinas - SP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Infiltração no Joelho em Campinas
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Tratamento de precisão para dores agudas, tendinites, bursites e artrose. Atuando diretamente no foco da inflamação.
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

      {/* Explicando a Infiltração */}
      <section className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Como funciona a Infiltração Guiada?</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              A Infiltração Guiada por Ultrassom permite que o médico veja exatamente onde está ocorrendo o processo inflamatório (em tendões, bursas ou dentro da cápsula articular).
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              Diferente de tomar comprimidos (que circulam pelo corpo todo), a infiltração entrega a medicação (anti-inflamatórios ou ácido hialurônico) na concentração exata e apenas no local onde o seu corpo precisa.
            </p>
          </div>

          <div className="bg-slate-900 border border-teal-900/50 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-teal-400 mb-3">Qualidade de Vida sem Cirurgia</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Dr. Otto Beckedorff é médico Ortopedista especialista (RQE 139078). A infiltração é uma ferramenta médica poderosa não apenas para dores agudas do esporte (tendinites), mas também atua como um <strong>pilar essencial na paliação da dor em pacientes com artrose avançada</strong>.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              Seja por desejo próprio de evitar uma grande cirurgia (prótese de joelho) ou por contraindicações de saúde, a infiltração pode oferecer o alívio necessário para que você caminhe, durma e viva com mais conforto e dignidade.
            </p>
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
