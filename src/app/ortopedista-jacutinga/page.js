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
    title: "Ortopedista em Jacutinga - MG | Dr. Otto Beckedorff",
    description: "Tratamento especializado da Dor e Ortopedia em Jacutinga - MG. Consultório na Av. Minas Gerais. Agende sua consulta.",
    openGraph: {
        title: "Ortopedista em Jacutinga - MG | Dr. Otto Beckedorff",
        description: "Referência em Ortopedia e Tratamento da Dor em Jacutinga - MG.",
        url: "https://drotto.com.br/ortopedista-jacutinga",
    },
    alternates: {
        canonical: "https://drotto.com.br/ortopedista-jacutinga",
    },
};

export default function PageJacutinga() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main id="topo">
                {/* Título Personalizado para Jacutinga */}
                <Hero customTitle="Ortopedia e Tratamento da Dor em Jacutinga - MG" />
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
