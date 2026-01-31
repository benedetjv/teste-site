import Header from "@/components/Header";
import Sobre from "@/components/Sobre";
import Listas from "@/components/Listas";
import Footer from "@/components/Footer";

export const metadata = {
    title: 'Sobre o Dr. Otto Beckedorff | Ortopedia e Dor',
    description: 'Conheça a trajetória, formação e prêmios do Dr. Otto Beckedorff, com foco em tratamento da dor e ortopedia minimamente invasiva.',
};

export default function SobrePage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 pt-5 mt-5">
                <Sobre />
                <Listas />
            </main>
            <Footer />
        </div>
    );
}
