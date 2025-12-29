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
    title: "Ortopedista em Campinas | Dr. Otto Beckedorff - Especialista em Dor",
    description: "Clínica de Ortopedia e Tratamento da Dor em Campinas (Centro e Região). Especialista em coluna, joelho e procedimentos minimamente invasivos.",
    openGraph: {
        title: "Ortopedista em Campinas | Dr. Otto Beckedorff",
        description: "Referência em Ortopedia e Tratamento da Dor em Campinas.",
        url: "https://drotto.com.br/ortopedista-campinas",
    },
    alternates: {
        canonical: "https://drotto.com.br/ortopedista-campinas",
    },
};

export default function PageCampinas() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main id="topo">
                {/* Título Personalizado para Campinas */}
                <Hero customTitle="Ortopedia Especializada e Tratamento da Dor em Campinas" />
                <Doctoralia />
                <Servicos />
                <Sobre />
                <Listas />
                <Contato />
                {/* Futuramente podemos filtrar a localização aqui se desejado */}
                <Localizacao />
                <Blog />
            </main>
            <Footer />
        </div>
    );
}
