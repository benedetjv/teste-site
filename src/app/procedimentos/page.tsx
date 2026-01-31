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
                    <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#7d99b2', letterSpacing: '3px', fontSize: '0.85rem' }}>Especialidades</h5>
                    <h1 className="display-4 fw-bold mb-4" style={{ color: '#2a4156' }}>
                        Tratamentos e Procedimentos
                    </h1>

                    <p className="lead text-muted mx-auto mb-5" style={{
                        maxWidth: '850px',
                        fontSize: '1.2rem',
                        fontWeight: '300',
                        lineHeight: '1.8'
                    }}>
                        Tecnologia e precisão no diagnóstico e tratamento da dor.<br className="d-none d-md-block" />
                        Técnicas minimamente invasivas focadas em devolver sua qualidade de vida.
                    </p>
                </div>
                <Servicos />
            </main>
            <Footer />
        </div>
    );
}
