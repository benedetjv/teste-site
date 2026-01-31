"use client";

import React, { useState } from 'react';

const QUESTIONS = [
    {
        id: 1,
        text: "Onde é o foco principal da sua dor?",
        options: [
            { text: "Lombar (fundo das costas)", next: 2 },
            { text: "Pescoço / Braço", next: 2 },
            { text: "Joelho", result: "viscossuplementacao" },
            { text: "Quadril", result: "infiltracao" }
        ]
    },
    {
        id: 2,
        text: "A dor desce para a perna (ciática) ou braço?",
        options: [
            { text: "Sim, como choque ou formigamento", next: 3 },
            { text: "Não, é uma dor local e pesada", result: "radiofrequencia" }
        ]
    },
    {
        id: 3,
        text: "Você já tentou fisioterapia e medicações orais por mais de 2-4 semanas?",
        options: [
            { text: "Sim, e a dor persiste forte", result: "bloqueio" },
            { text: "Ainda não tentei tratamentos", result: "clinico" }
        ]
    }
];

const RESULTS: Record<string, { title: string; desc: string; icon: string }> = {
    viscossuplementacao: {
        title: "Viscossuplementação",
        desc: "Para dores no joelho causadas por artrose ou desgaste, a lubrificação com ácido hialurônico pode ser o caminho ideal.",
        icon: "bi-droplet-fill"
    },
    infiltracao: {
        title: "Infiltração de Quadril",
        desc: "Dores no quadril muitas vezes respondem bem a infiltrações guiadas por ultrassom para reduzir a inflamação local.",
        icon: "bi-activity"
    },
    radiofrequencia: {
        title: "Radiofrequência (Rizotomia)",
        desc: "Dores locais na coluna sem irradiação para as pernas costumam ter origem nas articulações (facetas), sendo a radiofrequência um tratamento duradouro excelente.",
        icon: "bi-lightning-charge-fill"
    },
    bloqueio: {
        title: "Bloqueio Foraminal / Epidural",
        desc: "Dores irradiadas (hérnia de disco/ciática) resistentes a remédios costumam precisar de um bloqueio para 'lavar' a inflamação do nervo.",
        icon: "bi-shield-plus"
    },
    clinico: {
        title: "Tratamento Clínico Inicial",
        desc: "Como sua dor é recente ou ainda não tentou medidas simples, o ideal é iniciar com medicação específica e fisioterapia de qualidade.",
        icon: "bi-bandaid"
    }
};

export default function TreatmentQuiz() {
    const [currentStep, setCurrentStep] = useState(1);
    const [resultKey, setResultKey] = useState<string | null>(null);

    const handleOption = (option: any) => {
        if (option.result) {
            setResultKey(option.result);
        } else {
            setCurrentStep(option.next);
        }
    };

    const reset = () => {
        setCurrentStep(1);
        setResultKey(null);
    };

    const currentQuestion = QUESTIONS.find(q => q.id === currentStep);

    return (
        <div className="card shadow-sm border-0 my-5 overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="bg-primary text-white p-4">
                <h4 className="mb-0 fw-bold">Descubra o Caminho para o Alívio</h4>
                <p className="mb-0 small opacity-75">Responda 3 perguntas rápidas</p>
            </div>

            <div className="card-body p-4 p-md-5 bg-white">
                {!resultKey ? (
                    <div className="animate__animated animate__fadeIn">
                        <h5 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>
                            {currentQuestion?.text}
                        </h5>
                        <div className="row g-3">
                            {currentQuestion?.options.map((opt, i) => (
                                <div key={i} className="col-12">
                                    <button
                                        onClick={() => handleOption(opt)}
                                        className="btn btn-outline-primary w-100 text-start p-3 fw-medium transition-all"
                                        style={{ borderRadius: '12px' }}
                                    >
                                        {opt.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <span className="badge rounded-pill bg-light text-primary border">Passo {currentStep} de 3</span>
                        </div>
                    </div>
                ) : (
                    <div className="animate__animated animate__zoomIn text-center">
                        <div className="display-4 text-primary mb-3">
                            <i className={`bi ${RESULTS[resultKey].icon}`}></i>
                        </div>
                        <h3 className="fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>{RESULTS[resultKey].title}</h3>
                        <p className="lead text-secondary mb-4">{RESULTS[resultKey].desc}</p>

                        <div className="d-grid gap-2 d-md-block">
                            <button onClick={reset} className="btn btn-light me-md-2 px-4 rounded-pill">Refazer Teste</button>
                            <a href="https://wa.me/5519999439824" className="btn btn-primary px-4 rounded-pill shadow">Falar com Dr. Otto</a>
                        </div>

                        <p className="mt-4 small text-muted italic">
                            *Este quiz é apenas informativo e não substitui uma consulta médica.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
