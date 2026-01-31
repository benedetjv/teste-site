
import React from 'react';
import PainCensus from '@/components/PainCensus';

export const metadata = {
    title: 'Censo Nacional da Dor Crônica | Dr. Otto Beckedorff',
    description: 'Participe da nossa pesquisa e ajude a mapear o tratamento da dor.',
    robots: {
        index: false, // Página oculta/interna
        follow: true,
    },
};

export default function PainCensusPage() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="text-center mb-5">
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill mb-3 px-3 py-2">
                            <i className="bi bi-graph-up-arrow me-2"></i>
                            Pesquisa Clínica 2026
                        </span>
                        <h1 className="h2 fw-bold" style={{ color: 'var(--azul-escuro)' }}>Censo da Dor Crônica</h1>
                        <p className="text-muted">Participe anonimamente e ajude a mapear estatísticas sobre a dor na nossa região.</p>
                    </div>

                    <div className="bg-light rounded-4 p-4 shadow-sm border">
                        <PainCensus />
                    </div>

                    <div className="mt-5 text-center">
                        <p className="small text-muted fst-italic">
                            *Seus dados são utilizados apenas para fins estatísticos e para melhorar a qualidade do atendimento.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
