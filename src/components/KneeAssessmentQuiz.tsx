"use client";

import React, { useState } from 'react';

const KNEE_QUESTIONS = [
    {
        id: 1,
        text: "Como você descreveria sua dor no joelho hoje?",
        options: [
            { text: "Apenas um incômodo após exercícios longos", score: 1 },
            { text: "Dói para subir e descer escadas ou longas caminhadas", score: 2 },
            { text: "Dói para caminhar curtas distâncias ou até em repouso", score: 3 },
            { text: "Dificuldade extrema de dobrar ou esticar o joelho", score: 4 }
        ]
    },
    {
        id: 2,
        text: "Com que frequência você precisa tomar remédios para a dor no joelho?",
        options: [
            { text: "Raramente ou nunca", score: 1 },
            { text: "Algumas vezes por mês", score: 2 },
            { text: "Várias vezes por semana", score: 3 },
            { text: "Todos os dias para conseguir me movimentar", score: 4 }
        ]
    },
    {
        id: 3,
        text: "O quanto a dor limita suas atividades do dia a dia?",
        options: [
            { text: "Não limita, apenas incomoda", score: 1 },
            { text: "Evito certas atividades ou esportes de impacto", score: 2 },
            { text: "Tenho dificuldade para tarefas básicas (limpar casa, dirigir)", score: 3 },
            { text: "Não consigo fazer minhas atividades sem ajuda ou sofrimento", score: 4 }
        ]
    }
];

const KNEE_RESULTS = [
    {
        min: 3,
        max: 5,
        title: "Fase Inicial / Prevenção",
        desc: "Seu joelho apresenta sinais de sobrecarga ou desgaste precoce. Este é o momento ideal para a viscossuplementação, que ajudará a lubrificar a articulação e proteger sua cartilagem, evitando que o problema evolua.",
        icon: "bi-shield-check"
    },
    {
        min: 6,
        max: 9,
        title: "Fase Moderada / Alívio",
        desc: "O desgaste já está interferindo na sua qualidade de vida. A viscossuplementação de alta densidade é uma excelente aliada aqui para reduzir o atrito, aliviar a dor e recuperar sua mobilidade de forma rápida.",
        icon: "bi-activity"
    },
    {
        min: 10,
        max: 12,
        title: "Necessidade de Avaliação de Precisão",
        desc: "A limitação atual é importante e exige uma análise detalhada. É fundamental realizar um exame físico e de imagem para o Dr. Otto avaliar se a viscossuplementação ainda é viável no seu caso ou se técnicas complementares de precisão são necessárias.",
        icon: "bi-exclamation-octagon-fill"
    }
];

export default function KneeAssessmentQuiz() {
    const [currentStep, setCurrentStep] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleOption = (score: number) => {
        const nextScore = totalScore + score;
        setTotalScore(nextScore);

        if (currentStep < KNEE_QUESTIONS.length) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResult(true);
        }
    };

    const reset = () => {
        setCurrentStep(1);
        setTotalScore(0);
        setShowResult(false);
    };

    const currentQuestion = KNEE_QUESTIONS.find(q => q.id === currentStep);
    const result = KNEE_RESULTS.find(r => totalScore >= r.min && totalScore <= r.max);

    return (
        <div className="card shadow-sm border-0 my-5 overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="bg-primary text-white p-4">
                <h4 className="mb-0 fw-bold">Teste de Saúde do Joelho</h4>
                <p className="mb-0 small opacity-75">Avalie o nível de limitação da sua articulação</p>
            </div>

            <div className="card-body p-4 p-md-5 bg-white">
                {!showResult ? (
                    <div className="animate__animated animate__fadeIn">
                        <h5 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>
                            {currentQuestion?.text}
                        </h5>
                        <div className="row g-3">
                            {currentQuestion?.options.map((opt, i) => (
                                <div key={i} className="col-12">
                                    <button
                                        onClick={() => handleOption(opt.score)}
                                        className="btn btn-outline-primary w-100 text-start p-3 fw-medium transition-all"
                                        style={{ borderRadius: '12px' }}
                                    >
                                        {opt.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <span className="badge rounded-pill bg-light text-primary border">Pergunta {currentStep} de 3</span>
                        </div>
                    </div>
                ) : (
                    <div className="animate__animated animate__zoomIn text-center">
                        <div className="display-4 text-primary mb-3">
                            <i className={`bi ${result?.icon}`}></i>
                        </div>
                        <h3 className="fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>{result?.title}</h3>
                        <p className="lead text-secondary mb-4">{result?.desc}</p>

                        <div className="d-grid gap-2 d-md-block">
                            <button onClick={reset} className="btn btn-light me-md-2 px-4 rounded-pill">Refazer Teste</button>
                            <a href="https://wa.me/5519999439824" className="btn btn-primary px-4 rounded-pill shadow">Falar com Dr. Otto sobre meu joelho</a>
                        </div>

                        <p className="mt-4 small text-muted italic">
                            *Este teste é uma ferramenta de triagem informativa e não substitui o diagnóstico médico presencial.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
