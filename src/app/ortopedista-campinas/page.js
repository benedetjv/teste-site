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
            "name": "O Dr. Otto Beckedorff atende o plano Amil em Campinas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim! O Dr. Otto Beckedorff realiza procedimentos intervencionistas e cirúrgicos no Hospital Vera Cruz com cobertura para planos Amil elegíveis, além de oferecer orientação para reembolso médico de consultas na Clínica Adora em Campinas."
            }
        },
        {
            "@type": "Question",
            "name": "Como tratar Hérnia de Disco sem cirurgia aberta em Campinas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Através da Medicina Intervencionista da Dor, utilizando procedimentos minimamente invasivos como Bloqueios Foraminais guiados por imagem, Infiltrações e Rizotomia por Radiofrequência, que aliviam a inflamação do nervo e devolvem a mobilidade sem necessidade de corte cirúrgico tradicional."
            }
        },
        {
            "@type": "Question",
            "name": "Onde fica a clínica de atendimento em Campinas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O atendimento ocorre na Clínica Adora, localizada na Av. Andrade Neves, 699 – 6º Andar – Centro, Campinas – SP. Os procedimentos hospitalares avançados são conduzidos no Hospital Vera Cruz."
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
