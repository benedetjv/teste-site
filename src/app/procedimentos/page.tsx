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
                    <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#7d99b2', letterSpacing: '4px', fontSize: '0.8rem', opacity: 0.8 }}>Especialidades</h5>
                    <h1 className="mb-4 display-3" style={{
                        fontFamily: '"Safira March", serif',
                        color: '#2a4156',
                        fontWeight: 'normal'
                    }}>Tratamentos e Procedimentos</h1>

                    <div className="mx-auto mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#7d99b2', opacity: 0.5 }}></div>

                    <p className="lead text-muted mx-auto mb-5" style={{
                        maxWidth: '900px',
                        fontSize: '1.25rem',
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
