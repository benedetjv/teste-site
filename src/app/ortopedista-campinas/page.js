import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Doctoralia from "@/components/Doctoralia";
import Servicos from "@/components/Servicos";
import Sobre from "@/components/Sobre";
import Listas from "@/components/Listas";
import Contato from "@/components/Contato";
import Localizacao from "@/components/Localizacao";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Ortopedista em Campinas - Dor na Coluna & Hérnia de Disco | Dr. Otto Beckedorff",
    description: "Ortopedista especialista em Tratamento da Dor na Coluna e Hérnia de Disco em Campinas (Clínica Adora / Vera Cruz). Atendimento particular, convênio Amil e reembolso facilitado.",
    keywords: [
        "Ortopedista em Campinas",
        "Ortopedista Campinas Amil",
        "Dor na coluna Campinas",
        "Tratamento Hérnia de Disco Campinas",
        "Médico especialista em dor na coluna",
        "Dr Otto Beckedorff Campinas",
        "Infiltração de Coluna Campinas Vera Cruz"
    ],
    openGraph: {
        title: "Ortopedista em Campinas - Dor na Coluna & Hérnia de Disco | Dr. Otto Beckedorff",
        description: "Médico Ortopedista em Campinas especialista em dor na coluna, hérnia de disco e procedimentos minimamente invasivos.",
        url: "https://drotto.com.br/ortopedista-campinas",
    },
    alternates: {
        canonical: "https://drotto.com.br/ortopedista-campinas",
    },
};

const campinasFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "O Dr. Otto Beckedorff atende os planos Amil, Bradesco e Omint em Campinas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim! O Dr. Otto Beckedorff é médico Ortopedista especialista (RQE 139078). O atendimento contempla a rede Amil na Clínica Adora, além de procedimentos no Hospital Vera Cruz e suporte completo para solicitação de Reembolso Médico em planos como Bradesco Saúde, Omint, SulAmérica, Porto Seguro e Care Plus."
            }
        },
        {
            "@type": "Question",
            "name": "Como funciona a Viscossuplementação com Ácido Hialurônico em Campinas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O Dr. Otto Beckedorff é médico Ortopedista especialista (RQE 139078), realizando a viscossuplementação através da infiltração articular de ácido hialurônico para lubrificar as articulações, proteger a cartilagem e reduzir o atrito na artrose de joelho, quadril e condromalácia patelar."
            }
        },
        {
            "@type": "Question",
            "name": "Como tratar a Hérnia de Disco e Dor Ciática sem cirurgia aberta em Campinas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O Dr. Otto Beckedorff é médico Ortopedista especialista (RQE 139078), atuando com procedimentos minimamente invasivos como Bloqueios da Coluna guiados por imagem, Infiltrações Facetárias e Radiofrequência (Rizotomia), que eliminam a inflamação do nervo e devolvem o movimento sem necessidade de corte cirúrgico tradicional."
            }
        },
        {
            "@type": "Question",
            "name": "Qual a indicação de Bloqueios e Infiltrações de Coluna guiados por imagem?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Os bloqueios e infiltrações são indicados para o alívio rápido de dores intensas na coluna cervical e lombar, dor ciática e bursites/tendinites. Realizados com anestesia local e sedação leve, aplicam medicação exatamente no foco da dor sob visão de ultrassom ou rx em tempo real."
            }
        },
        {
            "@type": "Question",
            "name": "Onde fica a clínica de atendimento do Dr. Otto Beckedorff em Campinas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O atendimento de consulta ocorre na Clínica Adora - Instituto da Dor, localizada na Avenida Andrade Neves, 699, 6º Andar (Centro), Campinas – SP. Procedimentos hospitalares são realizados no Hospital Vera Cruz."
            }
        }
    ]
};

export default function PageCampinas() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(campinasFaqSchema) }}
            />
            <Header />
            <main id="topo">
                {/* Título Personalizado para Campinas */}
                <Hero customTitle="Ortopedia, Hérnia de Disco e Tratamento da Dor em Campinas" />
                <Doctoralia />
                <Servicos />
                <Sobre />
                <Listas />
                <Contato />
                <Localizacao />
                <Blog />
            </main>
            <Footer />
        </div>
    );
}
