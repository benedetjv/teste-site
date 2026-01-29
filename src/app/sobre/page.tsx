import Header from "@/components/Header";
import Sobre from "@/components/Sobre";
import Listas from "@/components/Listas";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre o Dr. Otto Beckedorff | Ortopedista & Tratamento da Dor",
    description: "Conheça a trajetória, formação e especializações do Dr. Otto Beckedorff, focado no tratamento da dor e ortopedia regenerativa.",
};

export default function SobrePage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Sobre />
                <Listas />
            </main>
            <Footer />
        </div>
    );
}
