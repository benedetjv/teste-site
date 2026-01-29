import Header from "@/components/Header";
import Contato from "@/components/Contato";
import Localizacao from "@/components/Localizacao";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contato e Localização | Dr. Otto Beckedorff",
    description: "Agende sua consulta com o Dr. Otto Beckedorff em Campinas ou Jacutinga. Veja endereços, telefones e links para WhatsApp.",
};

export default function ContatoPage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <div className="pt-5 mt-4">
                    <Contato />
                    <Localizacao />
                </div>
            </main>
            <Footer />
        </div>
    );
}
