import Header from "@/components/Header";
import Servicos from "@/components/Servicos";
import Footer from "@/components/Footer";

export const metadata = {
    title: 'Procedimentos e Tratamentos | Dr. Otto Beckedorff',
    description: 'Conheça os tratamentos modernos para dor: Infiltrações, Bloqueios, Radiofrequência e Medicina Regenerativa.',
};

export default function ProcedimentosPage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 pt-5 mt-5">
                <div className="container py-5 text-center">
                    <h1 className="fw-bold mb-3 display-5">Tratamentos e Procedimentos</h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                        Utilizamos as técnicas mais avançadas da medicina intervencionista para tratar a dor na origem, buscando sempre a preservação da função e o alívio duradouro.
                    </p>
                </div>
                <Servicos />
            </main>
            <Footer />
        </div>
    );
}
