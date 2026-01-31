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
        initials: "J",
        name: "Juliana",
        text: "Super atualizado e atencioso. Resolveu todos meus problemas! Excelente atendimento, esclareceu minhas dúvidas e conseguiu eliminar minha dor.",
        rating: 5
    },
    {
        initials: "DG",
        name: "Douglas Godoy",
        text: "Extremamente pontual e atencioso no atendimento com explicações bem detalhadas. Me tranquilizou e passou uma confiança de competência.",
        rating: 5
    },
    {
        initials: "B",
        name: "Beatriz",
        text: "Ótimo atendimento e explicação, se preocupa com o paciente. Fico feliz em ter encontrado um médico que traz clareza para o caso.",
        rating: 5
    },
    {
        initials: "GG",
        name: "Giovane Garcia",
        text: "Recomendo demais o Dr. Otto! Ótimo atendimento e tratamento muito eficaz. Fiquei muito feliz com o resultado.",
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
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 340; // Card width (320) + gap (appx)
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-5 bg-white border-top">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
                        <div className="d-inline-flex align-items-center gap-2 mb-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" style={{ height: '30px' }} />
                        </div>
                        <h2 className="fw-bold mb-1">O que dizem sobre nós</h2>
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2">
                            <span className="display-6 fw-bold text-dark">5.0</span>
                            <div className="text-warning small">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </div>
                        </div>
                        <p className="text-muted small">Baseado em avaliações reais de pacientes.</p>

                        <a href="https://g.page/r/CQ3gfOvMQ6SEEAI/review" target="_blank" className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm mt-2">
                            Avaliar no Google <i className="bi bi-arrow-right ms-2"></i>
                        </a>
                    </div>

                    <div className="col-lg-8">
                        {/* Navigation Buttons (Visible on desktop) */}
                        <div className="d-none d-lg-flex justify-content-end gap-2 mb-2">
                            <button onClick={() => scroll('left')} className="btn btn-outline-secondary rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button onClick={() => scroll('right')} className="btn btn-primary rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>

                        {/* Scroll Horizontal Container */}
                        <div
                            ref={scrollRef}
                            className="d-flex flex-nowrap overflow-auto pb-4 gap-3 px-2 scrollbar-hide"
                            style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
                        >
                            {testimonials.map((t, index) => (
                                <div key={index} className="flex-shrink-0" style={{ width: '320px', scrollSnapAlign: 'start' }}>
                                    <div className="card h-100 border shadow-sm bg-white rounded-4 p-3 position-relative hover-shadow transition-all">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            {/* Foto/Avatar estilo Google */}
                                            <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                                style={{ width: '45px', height: '45px', backgroundColor: ['#AB47BC', '#EF5350', '#42A5F5', '#66BB6A', '#FFCA28'][index % 5], fontSize: '1.1rem' }}>
                                                {t.initials.charAt(0)}
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{t.name}</h6>
                                                <div className="text-warning x-small" style={{ fontSize: '0.75rem' }}>
                                                    <i className="bi bi-star-fill me-1"></i>
                                                    <i className="bi bi-star-fill me-1"></i>
                                                    <i className="bi bi-star-fill me-1"></i>
                                                    <i className="bi bi-star-fill me-1"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                </div>
                                            </div>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="ms-auto opacity-50" style={{ width: '20px' }} alt="G" />
                                        </div>

                                        <p className="card-text text-secondary mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            "{t.text}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .x-small { font-size: 11px; }
                .hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; transform: translateY(-2px); }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </section>
    );
}
