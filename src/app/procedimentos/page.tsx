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
                <div className="container py-5 text-center mt-5">
                    <h1 className="mb-3 display-4" style={{ fontFamily: '"Safira March", serif', color: '#2a4156' }}>Tratamentos e Procedimentos</h1>
                    <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#7d99b2', marginBottom: '1.5rem' }}></div>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '800px', fontSize: '1.15rem', fontWeight: '300' }}>
                        Utilizamos as técnicas mais avançadas da medicina intervencionista para tratar a dor na origem, buscando sempre a preservação da função e o alívio duradouro.
                    </p>
                </div>
                <div className="bg-white">
                    <Servicos />
                </div>
            </main>
            <Footer />
        </div>
    );
}
