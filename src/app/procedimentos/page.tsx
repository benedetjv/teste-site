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
                <div className="container py-5 text-center mt-4">
                    <span className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(125, 153, 178, 0.1)', color: '#7d99b2', border: '1px solid rgba(125, 153, 178, 0.2)' }}>
                        <i className="bi bi-activity me-2"></i>Medicina Intervencionista
                    </span>
                    <h1 className="fw-bold mb-3 display-5" style={{ color: '#2a4156' }}>Tratamentos e Procedimentos</h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '800px', fontSize: '1.1rem' }}>
                        Utilizamos as técnicas mais avançadas para tratar a dor na origem, buscando sempre a preservação da função e o alívio duradouro, evitando cirurgias desnecessárias.
                    </p>
                </div>
                <Servicos />
            </main>
            <Footer />
        </div>
    );
}
