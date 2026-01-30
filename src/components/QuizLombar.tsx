"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizLombar() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const questions = [
        {
            question: "A dor na sua coluna desce para alguma das pernas?",
            options: [
                { label: "Sim, desce até o pé ou panturrilha", value: "radicular" },
                { label: "Não, fica apenas nas costas/glúteo", value: "lombar" },
            ],
        },
        {
            question: "Você sente algum formigamento, choque ou perda de força na perna?",
            options: [
                { label: "Sim, sinto a perna fraca ou dormente", value: "neurologico" },
                { label: "Não, apenas dor", value: "dor_pura" },
            ],
        },
        {
            question: "Há quanto tempo você convive com essa dor?",
            options: [
                { label: "Menos de 6 semanas (Aguda)", value: "aguda" },
                { label: "Mais de 3 meses (Crônica)", value: "cronica" },
            ],
        },
    ];

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        // Lógica simples de triagem
        const [q1, q2, q3] = finalAnswers;

        // Perda de força = Prioridade
        if (q2 === "neurologico") {
            setResult("atenção");
            return;
        }

        // Dor crônica com irradiação = Candidato a Intervenção
        if (q3 === "cronica") {
            setResult("intervencao");
            return;
        }

        // Dor aguda ou localizada = Conservador
        setResult("conservador");
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
        setResult(null);
    };

    return (
        <div className="card border-0 shadow-sm bg-light overflow-hidden my-4 rounded-4" style={{ borderLeft: '5px solid var(--azul-principal)' }}>
            <div className="card-body p-4 p-md-5">

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 className="fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>
                                <i className="bi bi-clipboard-pulse me-2"></i>
                                Avaliação Rápida de Hérnia
                            </h4>
                            <div className="progress mb-4" style={{ height: "6px" }}>
                                <div
                                    className="progress-bar bg-primary"
                                    role="progressbar"
                                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>

                            <h5 className="mb-4 fw-bold">{questions[step].question}</h5>

                            <div className="d-grid gap-3">
                                {questions[step].options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="btn btn-outline-dark text-start p-3 rounded-3 hover-shadow border-2 fw-medium"
                                        style={{ transition: 'all 0.2s' }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-center"
                        >
                            {result === "atenção" && (
                                <>
                                    <div className="mb-3 text-danger display-4"><i className="bi bi-exclamation-triangle-fill"></i></div>
                                    <h3 className="fw-bold text-danger mb-3">Sinal de Alerta</h3>
                                    <p className="lead mb-4">
                                        A presença de perda de força ou dormência pode indicar uma compressão nervosa significativa. <br />
                                        <strong>Recomendação:</strong> Você deve passar por avaliação médica especializada o quanto antes para prevenir danos neurológicos.
                                    </p>
                                </>
                            )}

                            {result === "intervencao" && (
                                <>
                                    <div className="mb-3 text-primary display-4"><i className="bi bi-check-circle-fill"></i></div>
                                    <h3 className="fw-bold text-primary mb-3">Possível Candidato a Tratamento</h3>
                                    <p className="lead mb-4">
                                        Para dores que persistem por mais de 3 meses, especialmente com irradiação, os tratamentos conservadores isolados podem ser insuficientes. <br />
                                        <strong>Recomendação:</strong> Procedimentos como Bloqueios ou Radiofrequência podem ser indicados para o seu caso.
                                    </p>
                                </>
                            )}

                            {result === "conservador" && (
                                <>
                                    <div className="mb-3 text-success display-4"><i className="bi bi-bandaid-fill"></i></div>
                                    <h3 className="fw-bold text-success mb-3">Provável Tratamento Conservador</h3>
                                    <p className="lead mb-4">
                                        Muitas dores agudas ou puramente lombares respondem bem a fisioterapia e medicação correta num primeiro momento. <br />
                                        <strong>Recomendação:</strong> Mantenha-se ativo e evite o repouso absoluto. Se a dor persistir, agende uma avaliação.
                                    </p>
                                </>
                            )}

                            <a
                                href="https://wa.me/5519999439824?text=Olá, fiz o teste da hérnia no site e gostaria de agendar uma consulta."
                                target="_blank"
                                className="btn btn-success btn-lg rounded-pill px-5 fw-bold shadow-sm mb-3 hover-scale"
                            >
                                <i className="bi bi-whatsapp me-2"></i> Agendar Avaliação
                            </a>
                            <div>
                                <button onClick={resetQuiz} className="btn btn-link text-muted small mt-2">Refazer Teste</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <style jsx>{`
        .hover-shadow:hover { 
            box-shadow: 0 5px 15px rgba(0,0,0,0.08); 
            background-color: #fff;
            border-color: var(--azul-medio);
            color: var(--azul-medio);
        }
        .hover-scale:hover {
            transform: scale(1.05);
        }
      `}</style>
        </div>
    );
}
