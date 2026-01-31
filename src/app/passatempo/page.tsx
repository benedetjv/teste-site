
import React from 'react';
import WordSearchGame from '@/components/WordSearchGame';

export const metadata = {
    title: 'Passatempo | Dr. Otto Beckedorff',
    description: 'Relaxe um pouco enquanto aguarda seu atendimento.',
    robots: {
        index: false, // Não indexar no Google (página oculta de sala de espera)
        follow: true,
    },
};

export default function PassatempoPage() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="text-center mb-4">
                        <span className="badge bg-light text-primary border border-primary rounded-pill mb-2">Sala de Espera Interativa</span>
                        <h1 className="h3 fw-bold text-dark">Relaxe sua mente 🧠</h1>
                        <p className="text-muted small">Enquanto cuidamos de tudo para sua consulta, que tal um desafio rápido?</p>
                    </div>

                    <WordSearchGame />

                    <div className="mt-5 text-center border-top pt-4">
                        <p className="small text-muted mb-2">Gostou do desafio?</p>
                        <a href="/blog" className="btn btn-outline-primary btn-sm rounded-pill">
                            Ler curiosidades no Blog
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
