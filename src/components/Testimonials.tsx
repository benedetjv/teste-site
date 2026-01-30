"use client";

import React from 'react';

const testimonials = [
    {
        initials: "MS",
        name: "M.S.",
        text: "Obtive 100% de melhora em meu caso. Passei com diversos especialistas do estado de São Paulo e ninguém soube realizar o tratamento correto. Muito bom viver sem dores.",
        rating: 5
    },
    {
        initials: "R",
        name: "Rafael",
        text: "Indicou precisamente um procedimento que eu precisava realizar e desde então não tenho mais dor. Primeira consulta realizei on-line e procedimento num consultório totalmente preparado.",
        rating: 5
    },
    {
        initials: "WY",
        name: "W.Y.",
        text: "O Dr. Otto não se limitou a ouvir meus sintomas de forma superficial; ele dedicou tempo para entender o contexto completo da minha saúde. Uma experiência verdadeiramente excepcional.",
        rating: 5
    },
    {
        initials: "A",
        name: "Ana",
        text: "Extremamente simpático, explica tudo com paciência e clareza, e transmite muita confiança. Um exemplo de profissional humano e competente!",
        rating: 5
    },
    {
        initials: "FH",
        name: "Felipe H.S.",
        text: "Dr. me atendeu super bem e me explicou detalhadamente todos os aspectos das dores da minhas costas. Deu tudo certo!",
        rating: 5
    },
    {
        initials: "L",
        name: "Luan",
        text: "Sai do consultório aliviado em ver que estava em boas mãos. Ótimo profissional, com muita propriedade e conhecimento.",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-5 bg-white">
            <div className="container">
                <div className="text-center mb-5">
                    <h6 className="text-primary fw-bold text-uppercase">Depoimentos Reais</h6>
                    <h2 className="fw-bold text-dark mb-3">O que os pacientes dizem</h2>
                    <p className="text-muted">Histórias de quem recuperou a qualidade de vida.</p>
                </div>

                {/* Scroll Horizontal Container */}
                <div className="d-flex flex-nowrap overflow-auto pb-4 gap-4 px-2 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
                    {testimonials.map((t, index) => (
                        <div key={index} className="flex-shrink-0" style={{ width: '300px', scrollSnapAlign: 'center' }}>
                            <div className="card h-100 border-0 shadow-sm bg-light rounded-4 p-4 position-relative">
                                {/* Aspas Gigantes */}
                                <div className="position-absolute top-0 start-0 ms-3 mt-n2 display-1 text-primary opacity-25" style={{ fontFamily: 'serif', lineHeight: 0.5 }}>“</div>

                                <div className="mb-3 text-warning">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <i key={i} className="bi bi-star-fill small me-1"></i>
                                    ))}
                                </div>

                                <p className="card-text text-secondary mb-4 fst-italic" style={{ fontSize: '0.95rem' }}>
                                    "{t.text}"
                                </p>

                                <div className="mt-auto d-flex align-items-center gap-3">
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark small">{t.name}</h6>
                                        <span className="text-success x-small fw-bold"><i className="bi bi-patch-check-fill me-1"></i>Paciente Verificado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-3 d-md-none">
                    <small className="text-muted"><i className="bi bi-arrow-right-short"></i> Deslize para ver mais</small>
                </div>

                <div className="text-center mt-5">
                    <a href="https://www.doctoralia.com.br/otto-beckedorff/ortopedista-traumatologista/campinas" target="_blank" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
                        Ver todas as avaliações no Doctoralia <i className="bi bi-box-arrow-up-right ms-2"></i>
                    </a>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
