import Header from "@/components/Header";
import Servicos from "@/components/Servicos";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Procedimentos e Tratamentos | Dr. Otto Beckedorff",
    description: "Conheça os procedimentos minimamente invasivos realizados pelo Dr. Otto Beckedorff: Radiofrequência, Infiltrações, Viscossuplementação e mais.",
};

export default function ProcedimentosPage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <div className="pt-5 mt-4">
                    <Servicos />
                </div>
            </main>
            <Footer />
        </div>
    );
}
