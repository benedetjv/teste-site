import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Tratamento de Hérnia de Disco em Campinas | Dr. Otto Beckedorff - Ortopedista",
  description:
    "Tratamento conservador e procedimentos minimamente invasivos (bloqueios, infiltrações e radiofrequência) para hérnia de disco em Campinas com o Dr. Otto Beckedorff (CRM 226325SP | RQE 139078).",
  keywords: [
    "hérnia de disco campinas",
    "tratamento hérnia de disco campinas",
    "ortopedista hérnia de disco campinas",
    "bloqueio de coluna campinas",
    "infiltração de coluna campinas",
    "dor ciática campinas",
    "hérnia L4 L5 L5 S1 campinas",
    "ortopedista amil campinas",
    "ortopedista bradesco campinas",
    "ortopedista omint campinas"
  ],
  alternates: {
    canonical: "https://drotto.com.br/hernia-de-disco-campinas"
  },
  openGraph: {
    title: "Tratamento de Hérnia de Disco em Campinas | Dr. Otto Beckedorff",
    description:
      "Alívio da dor na coluna e tratamento da hérnia de disco sem cirurgia aberta em Campinas. Atendimento na Clínica Adora e Hospital Vera Cruz.",
    url: "https://drotto.com.br/hernia-de-disco-campinas",
    siteName: "Dr. Otto Beckedorff",
    locale: "pt_BR",
    type: "website"
  }
};

export default function HerniaDeDiscoCampinasPage() {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=5519997677098&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20para%20avalia%C3%A7%C3%A3o%20de%20h%C3%A9rnia%20de%20disco%20em%20Campinas.";

  // Schema JSON-LD estruturado para IA e Google (MedicalCondition + Physician + FAQPage)
  const herniaPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalCondition",
        "@id": "https://drotto.com.br/hernia-de-disco-campinas#condition",
        "name": "Hérnia de Disco (Lombar e Cervical)",
        "possibleTreatment": [
          { "@type": "MedicalProcedure", "name": "Tratamento Conservador e Reabilitação" },
          { "@type": "MedicalProcedure", "name": "Bloqueio Analgésico da Coluna" },
          { "@type": "MedicalProcedure", "name": "Infiltração Facetária e Discal Guiada por Imagem" },
          { "@type": "MedicalProcedure", "name": "Radiofrequência Facetária da Coluna" }
        ],
        "associatedAnatomy": {
          "@type": "AnatomicalStructure",
          "name": "Coluna Vertebral (Lombar, Cervical e Nervo Ciático)"
        }
      },
      {
        "@type": "Physician",
        "@id": "https://drotto.com.br/#physician",
        "name": "Dr. Otto Beckedorff",
        "medicalSpecialty": "Orthopedic",
        "identifier": "CRM 226325SP | RQE 139078",
        "duns": "226325SP",
        "knowsAbout": [
          "Tratamento de Hérnia de Disco",
          "Dor na Coluna (Lombalgia e Cervicalgia)",
          "Bloqueio da Coluna",
          "Infiltração de Coluna",
          "Radiofrequência para Dor Crônica"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Andrade Neves, 699, 6º andar - Clínica Adora",
          "addressLocality": "Campinas",
          "addressRegion": "SP",
          "postalCode": "13013-161",
          "addressCountry": "BR"
        },
        "healthPlanNetworkAcceptance": [
          "Amil",
          "Bradesco Saúde",
          "Omint",
          "SulAmérica",
          "Porto Seguro",
          "Care Plus",
          "Atendimento Particular e Reembolso Médico"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://drotto.com.br/hernia-de-disco-campinas#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Toda hérnia de disco precisa de cirurgia aberta?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Não. Mais de 90% dos casos de hérnia de disco (lombar ou cervical) evoluem com excelente recuperação através de tratamento conservador bem direcionado ou procedimentos minimamente invasivos (como bloqueios e infiltrações guiadas), reservando a cirurgia para casos com perda progressiva de força muscular ou falha dos tratamentos clínicos."
            }
          },
          {
            "@type": "Question",
            "name": "Qual a diferença entre protrusão discal e hérnia de disco?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A protrusão discal é uma fase inicial onde o disco intervertebral se abula, mantendo as fibras externas intactas. Na hérnia de disco (extrusão discal), há o rompimento do anel fibroso e o extravasamento do núcleo pulposo, que pode comprimir as raízes nervosas e causar a dor ciática."
            }
          },
          {
            "@type": "Question",
            "name": "Como funcionam o bloqueio e a infiltração de coluna para hérnia de disco?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O bloqueio e a infiltração são procedimentos minimamente invasivos realizados em ambiente ambulatorial sob anestesia local e sedação leve. Guiados por radiografia ou ultrassom em tempo real, aplicam-se medicamentos anti-inflamatórios e anestésicos diretamente no local exato da inflamação do nervo, promovendo alívio rápido da dor e permitindo o retorno à reabilitação."
            }
          },
          {
            "@type": "Question",
            "name": "Quais são os sintomas de hérnia de disco L4-L5 e L5-S1?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As hérnias L4-L5 e L5-S1 são as mais frequentes na coluna lombar. Os sintomas característicos incluem dor intensa nas costas que irradia pelas nádegas, coxas e panturrilhas (dor ciática), sensação de formigamento ou dormência nos pés e fraqueza ao levantar a ponta do pé ou ficar na ponta dos pés."
            }
          },
          {
            "@type": "Question",
            "name": "O Dr. Otto Beckedorff aceita planos como Amil, Bradesco e Omint em Campinas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O atendimento na Clínica Adora em Campinas contempla plano Amil, além de fornecer toda a documentação médica detalhada (relatórios e recibos) para solicitação de Reembolso Médico em planos como Bradesco Saúde, Omint, SulAmérica, Porto Seguro e Care Plus."
            }
          },
          {
            "@type": "Question",
            "name": "Onde fica o consultório de atendimento para hérnia de disco em Campinas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Dr. Otto Beckedorff atende na Clínica Adora - Instituto da Dor de Campinas, localizada na Avenida Andrade Neves, 699, 6º andar (próximo à região central e hospitais de referência como o Vera Cruz), Campinas - SP."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Script do Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(herniaPageSchema) }}
      />

      {/* Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-teal-400 tracking-tight">
            Dr. Otto Beckedorff <span className="text-xs text-slate-400 block font-normal">Ortopedia & Traumatologia • CRM 226325SP | RQE 139078</span>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-emerald-900/30"
          >
            Agendar Consulta
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/50 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <span>Ortopedia & Manejo da Dor</span>
            <span>•</span>
            <span>Campinas - SP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Tratamento de Hérnia de Disco em Campinas
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Diagnóstico especializado, tratamento conservador e procedimentos minimamente invasivos para o alívio da dor na coluna cervical e lombar.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Agendar Avaliação via WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
            <span>✓ Atendimento Clínica Adora (Andrade Neves)</span>
            <span>✓ Suporte Hospital Vera Cruz</span>
            <span>✓ Amil & Reembolso Médio</span>
          </div>
        </div>
      </section>

      {/* Perfil Médico & Ética CFM */}
      <section className="py-12 px-4 sm:px-8 border-t border-slate-900 bg-slate-900/40">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-teal-500/30 shadow-2xl bg-slate-800 relative">
              <img
                src="/images/dr-otto-beckedorff.jpg"
                alt="Dr. Otto Beckedorff - Ortopedista"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <span className="text-teal-400 font-semibold text-sm tracking-wide uppercase block mb-1">
              Corpo Clínico • Campinas
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Dr. Otto Beckedorff
            </h2>
            <p className="text-slate-400 text-sm font-mono mb-4">
              Médico Ortopedista & Traumatologista • CRM 226325SP | RQE 139078
            </p>
            <p className="text-slate-300 text-base leading-relaxed mb-4">
              Dr. Otto Beckedorff é médico Ortopedista especialista (RQE 139078), com residência e aperfeiçoamento pelo Hospital Vera Cruz de Campinas e atuação dedicada ao tratamento de doenças da coluna vertebral, dor ciática e hérnia de disco.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                <strong className="text-teal-300 block mb-1">Especialidade Médica:</strong>
                Ortopedia e Traumatologia (RQE 139078)
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                <strong className="text-teal-300 block mb-1">Foco de Atuação:</strong>
                Procedimentos Minimamente Invasivos da Coluna & Tratamento da Dor
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entendendo a Hérnia de Disco */}
      <section className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Entendendo a Hérnia de Disco (Lombar e Cervical)
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            A coluna vertebral é composta por vértebras separadas por discos fibrocartilaginosos. Quando ocorrem fissuras no anel externo desse disco, o conteúdo interno pode herniar e comprimir nervos vizinhos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-teal-400 mb-3">Sintomas Frequentes da Hérnia Lombar</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Dor Ciática:</strong> Dor intensa que irradia das costas para a nádega, coxa, panturrilha ou pé.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Formigamento ou Parestesia:</strong> Sensação de agulhadas ou perda de sensibilidade nas pernas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Fraqueza Muscular:</strong> Dificuldade para erguer o pé ou caminhar longas distâncias.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Piora ao Sentar:</strong> Dor agravada pela posição sentada ou ao tossir/espirrar.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-teal-400 mb-3">Sintomas Frequentes da Hérnia Cervical</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Cervicalgia Irradiada:</strong> Dor no pescoço que desce para os ombros, escápula e braços.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Formigamento nas Mãos:</strong> Dormência nos dedos da mão ou perda de sensibilidade tátil.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Perda de Força nos Braços:</strong> Dificuldade para segurar objetos ou realizar movimentos finos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Rigidez Cervical:</strong> Limitação para girar ou inclinar a cabeça.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Opções de Tratamento */}
      <section className="py-16 px-4 sm:px-8 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider block mb-2">
              Opções Terapêuticas em Campinas
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Como Tratamos a Hérnia de Disco?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-300 font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tratamento Conservador</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Combinação estratégica de fármacos modernos para controle inflamatório, fisioterapia especializada, adaptação ergonômica e fortalecimento muscular da estabilização core.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-300 font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Bloqueios e Infiltrações</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Procedimento cirúrgico ambulatorial minimamente invasivo. Aplica-se medicação de alta precisão diretamente na raiz nervosa inflamada sob auxílio de rx/ultrassom em tempo real.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-300 font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Radiofrequência Facetária</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Procedimento guiado por imagem indicado para dores facetárias ou crônicas associadas ao desgaste discal. Promove desativação térmica da dor nervosa com rápida recuperação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Convênios e Reembolso Médico */}
      <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-900/40 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4 text-center sm:text-left">
            Planos de Saúde & Reembolso Médico em Campinas
          </h2>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Realizamos atendimento presencial na Clínica Adora em Campinas com cobertura do plano **Amil**, além de oferecer suporte completo para solicitação de **Reembolso Médico** para os demais convênios de saúde.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold">
              Amil
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold">
              Bradesco Saúde
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold">
              Omint
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold">
              SulAmérica
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold">
              Porto Seguro
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold">
              Care Plus
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold col-span-2">
              Suporte a Reembolso Médico
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Seção Estendida de Alta Autoridade */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider block mb-2">
            Perguntas Frequentes dos Pacientes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Dúvidas sobre Hérnia de Disco em Campinas
          </h2>
        </div>

        <div className="space-y-4">
          <details className="group bg-slate-900 p-5 rounded-xl border border-slate-800 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer text-white font-semibold text-base">
              <span>Toda hérnia de disco precisa de cirurgia aberta?</span>
              <span className="text-teal-400 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Não. Mais de 90% dos pacientes apresentam excelente recuperação através de tratamentos conservadores (fisioterapia especializada e medicações) ou procedimentos minimamente invasivos como bloqueios e infiltrações guiadas. A cirurgia é reservada para casos raros com déficit motor grave ou falha nos métodos não cirúrgicos.
            </p>
          </details>

          <details className="group bg-slate-900 p-5 rounded-xl border border-slate-800 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer text-white font-semibold text-base">
              <span>Qual a diferença entre protrusão discal e hérnia de disco?</span>
              <span className="text-teal-400 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              A protrusão discal ocorre quando o disco intervertebral abula para fora do seu limite, porém mantendo as fibras externas do anel fibroso intactas. Na hérnia de disco (extrusão), o anel se rompe e o material interno extravasa, entrando em contato direto com a raiz nervosa e desencadeando a dor ciática.
            </p>
          </details>

          <details className="group bg-slate-900 p-5 rounded-xl border border-slate-800 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer text-white font-semibold text-base">
              <span>Como funcionam os bloqueios e infiltrações de coluna?</span>
              <span className="text-teal-400 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              São procedimentos ambulatoriais minimamente invasivos realizados sob anestesia local e sedação leve. Com o auxílio de equipamentos de imagem (Raio-X ou Ultrassom) em tempo real, medicamentos anti-inflamatórios de ação prolongada são injetados diretamente na fonte exata do problema, cortando o ciclo de dor e inflamação.
            </p>
          </details>

          <details className="group bg-slate-900 p-5 rounded-xl border border-slate-800 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer text-white font-semibold text-base">
              <span>Quais são os sintomas de hérnia L4-L5 e L5-S1?</span>
              <span className="text-teal-400 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Sendo as vértebras mais sobrecarregadas da coluna lombar, a hérnia L4-L5 costuma causar dor que irradia pela lateral da perna até o dorso do pé e dedão. Já a hérnia L5-S1 irradia pela parte posterior da coxa e panturrilha até o calcanhar ou sola do pé, acompanhada de formigamento.
            </p>
          </details>

          <details className="group bg-slate-900 p-5 rounded-xl border border-slate-800 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer text-white font-semibold text-base">
              <span>O Dr. Otto Beckedorff atende Amil, Bradesco e Omint em Campinas?</span>
              <span className="text-teal-400 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Sim! O atendimento na Clínica Adora em Campinas contempla o convênio Amil. Além disso, disponibilizamos todos os relatórios médicos, laudos e recibos necessários para que pacientes de convênios como Bradesco Saúde, Omint, SulAmérica, Porto Seguro e Care Plus solicitem o Reembolso Médico integral ou parcial.
            </p>
          </details>

          <details className="group bg-slate-900 p-5 rounded-xl border border-slate-800 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer text-white font-semibold text-base">
              <span>Onde é realizado o atendimento em Campinas?</span>
              <span className="text-teal-400 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              O consultório fica localizado na Clínica Adora - Instituto da Dor, na Avenida Andrade Neves, 699, 6º andar, Campinas - SP (próximo à região central e com fácil acesso aos principais hospitais de Campinas, como o Hospital Vera Cruz).
            </p>
          </details>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-t from-slate-900 to-slate-950 text-center border-t border-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Agende sua Avaliação da Coluna em Campinas
          </h2>
          <p className="text-slate-300 text-base mb-8">
            Entre em contato com nossa equipe via WhatsApp para tirar dúvidas sobre convênios, horários de atendimento ou agendar sua consulta presencial.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="py-8 px-4 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500">
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
