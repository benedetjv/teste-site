"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnatomyType = 'spine' | 'knee' | 'shoulder';

interface AnatomyConfig {
    label: string;
    nerveLabel: string;
    targetTop: number;
    targetLeft: number;
    image: string;
    bgIcon: string;
    description: string;
}

const INITIAL_CONFIGS: Record<AnatomyType, AnatomyConfig> = {
    spine: {
        label: 'Coluna (Facetas)',
        nerveLabel: 'RAMO MEDIAL',
        targetTop: 42.5,
        targetLeft: 58.5,
        image: '/img/spine-nerve-anatomy.png',
        bgIcon: 'bi-back',
        description: 'Denervação do ramo medial para tratar a síndrome facetária.'
    },
    knee: {
        label: 'Joelho (Geniculados)',
        nerveLabel: 'NERVO GENICULADO',
        targetTop: 32.1,
        targetLeft: 65.2,
        image: '/img/knee-nerve-anatomy.png',
        bgIcon: 'bi-record-circle',
        description: 'Bloqueio dos nervos geniculados para alívio de dor em osteoartrite.'
    },
    shoulder: {
        label: 'Ombro (Supraescapular)',
        nerveLabel: 'N. SUPRAESCAPULAR',
        targetTop: 25.4,
        targetLeft: 72.1,
        image: '/img/shoulder-nerve-anatomy.png',
        bgIcon: 'bi-person-arms-up',
        description: 'Tratamento do nervo supraescapular em capsulites e dores crônicas.'
    }
};

export default function RadiofrequencySimulator() {
    const [anatomy, setAnatomy] = useState<AnatomyType>('spine');
    const [step, setStep] = useState(0);
    const [temp, setTemp] = useState(0);
    const [time, setTime] = useState(90);
    const [active, setActive] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [configs, setConfigs] = useState(INITIAL_CONFIGS);

    // Testing states
    const [sensoryActive, setSensoryActive] = useState(false);
    const [motorActive, setMotorActive] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [stimVoltage, setStimVoltage] = useState(0);

    // Position state
    const [pos, setPos] = useState({ top: 60, left: 80 });
    const containerRef = useRef<HTMLDivElement>(null);

    const config = configs[anatomy];

    // Distance calculation
    const distance = Math.sqrt(Math.pow(pos.left - config.targetLeft, 2) + Math.pow(pos.top - config.targetTop, 2));
    const isPositionCorrect = distance < 8; // Slightly more generous

    // Ablation logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (active) {
            if (temp < 80) {
                interval = setInterval(() => {
                    setTemp(prev => Math.min(prev + 2, 80));
                }, 50);
            } else {
                interval = setInterval(() => {
                    setTime(prev => {
                        if (prev <= 0) {
                            setActive(false);
                            setStep(4);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 100);
            }
        }
        return () => clearInterval(interval);
    }, [active, temp]);

    // Stimulus Voltage Effect
    useEffect(() => {
        let stimInterval: NodeJS.Timeout;
        if (sensoryActive || motorActive) {
            setStimVoltage(0);
            stimInterval = setInterval(() => {
                setStimVoltage(prev => {
                    const limit = motorActive ? 1.0 : 0.5;
                    if (prev >= limit) return limit;
                    return Number((prev + 0.1).toFixed(1));
                });
            }, 100);
        } else {
            setStimVoltage(0);
        }
        return () => clearInterval(stimInterval);
    }, [sensoryActive, motorActive]);

    const handleImageClick = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const leftPercent = Number(((x / rect.width) * 100).toFixed(1));
        const topPercent = Number(((y / rect.height) * 100).toFixed(1));

        if (isEditMode) {
            setConfigs(prev => ({
                ...prev,
                [anatomy]: { ...prev[anatomy], targetLeft: leftPercent, targetTop: topPercent }
            }));
            console.log(`Nova Posição ${anatomy}: top: ${topPercent}, left: ${leftPercent}`);
        } else if (step === 2 && !active) {
            setPos({ left: leftPercent, top: topPercent });
            setSensoryActive(false);
            setMotorActive(false);
            setTestCompleted(false);
        }
    };

    const runSensoryTest = () => {
        setSensoryActive(true);
        setMotorActive(false);
        setTimeout(() => {
            setSensoryActive(false);
            setTestCompleted(true);
        }, 2000);
    };

    const runMotorTest = () => {
        setMotorActive(true);
        setSensoryActive(false);
        setTimeout(() => {
            setMotorActive(false);
            setTestCompleted(true);
        }, 2000);
    };

    const reset = () => {
        setStep(0); setTemp(0); setTime(90); setActive(false);
        setSensoryActive(false); setMotorActive(false); setTestCompleted(false);
        setPos({ top: 60, left: 80 });
    };

    return (
        <div className="card shadow-lg rounded-4 overflow-hidden my-5 border-0">
            {/* Cabecalho */}
            <div className="p-4 d-flex justify-content-between align-items-center bg-dark text-white">
                <div>
                    <h5 className="mb-0 fw-bold"><i className="bi bi-cpu me-2 text-info"></i> RF DR. OTTO BECKEDORFF</h5>
                    <span className="small text-muted text-uppercase" style={{ fontSize: '10px' }}>SIMULADOR EDUCACIONAL</span>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={() => setIsEditMode(!isEditMode)}>
                        <i className={`bi ${isEditMode ? 'bi-lock-fill text-danger' : 'bi-gear-fill'}`}></i>
                    </button>
                    {step > 0 && <button className="btn btn-sm btn-light rounded-pill px-3 fw-bold" onClick={reset}>VOLTAR</button>}
                </div>
            </div>

            <div className="row g-0" style={{ background: '#f8f9fa' }}>
                {/* Painel de Controle (Esquerda) */}
                <div className="col-md-5 p-4 border-end" style={{ minHeight: '550px' }}>

                    {/* Tela do Gerador (Fundo Branco Limpo) */}
                    <div className="p-4 rounded-4 shadow-sm border bg-white mb-4">
                        <div className="mb-3 border-bottom pb-2 d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-dark">{step === 0 ? 'STATUS: AGUARDANDO' : config.label.toUpperCase()}</span>
                            {isPositionCorrect && <span className="badge bg-success">ALVO OK</span>}
                        </div>

                        <div className="row g-2 mb-4">
                            <div className="col-4 text-center">
                                <small className="text-muted d-block" style={{ fontSize: '10px' }}>FREQUÊNCIA</small>
                                <div className="fw-bold text-dark">{sensoryActive ? '50Hz' : (motorActive ? '2Hz' : (active ? '480kHz' : '---'))}</div>
                            </div>
                            <div className="col-4 text-center border-start border-end">
                                <small className="text-muted d-block" style={{ fontSize: '10px' }}>VOLTAGEM</small>
                                <div className="fw-bold text-dark">{sensoryActive || motorActive ? `${stimVoltage}V` : '0.0V'}</div>
                            </div>
                            <div className="col-4 text-center">
                                <small className="text-muted d-block" style={{ fontSize: '10px' }}>IMPEDÂNCIA</small>
                                <div className="fw-bold text-dark">{step >= 2 ? (isPositionCorrect ? '340 Ω' : '950 Ω') : '---'}</div>
                            </div>
                        </div>

                        <div className="py-4 text-center rounded-3 bg-light border mb-2">
                            {active ? (
                                <div>
                                    <div className="display-3 fw-bold text-danger mb-0">{temp}°C</div>
                                    <div className="h5 text-dark font-monospace">{time}s RESTANTES</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="h2 fw-bold mb-0" style={{ color: (sensoryActive || motorActive) ? 'var(--azul-medio)' : '#ddd' }}>
                                        {sensoryActive ? 'TESTE SENSITIVO' : (motorActive ? 'TESTE MOTOR' : 'STANDBY')}
                                    </div>
                                    <small className="text-muted text-uppercase">Sistema Pronto</small>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botoes de Acao (Sempre visiveis no Step 2) */}
                    <div className="actions-area">
                        {step === 1 && (
                            <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow" onClick={() => setStep(2)}>
                                INICIAR POSICIONAMENTO
                            </button>
                        )}

                        {step === 2 && (
                            <div className="d-flex flex-column gap-3">
                                {!isPositionCorrect ? (
                                    <div className="alert alert-info py-3 text-center border-0 shadow-sm rounded-4">
                                        <i className="bi bi-info-circle me-2"></i>
                                        <b>Clique na área do alvo</b> para guiar o eletrodo.
                                    </div>
                                ) : (
                                    <>
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <button className="btn btn-info w-100 py-3 rounded-pill fw-bold text-white shadow-sm"
                                                    onClick={runSensoryTest} disabled={sensoryActive || motorActive}>
                                                    TESTE SENSITIVO
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-info w-100 py-3 rounded-pill fw-bold text-white shadow-sm"
                                                    onClick={runMotorTest} disabled={sensoryActive || motorActive}>
                                                    TESTE MOTOR
                                                </button>
                                            </div>
                                        </div>

                                        <button className={`btn w-100 py-3 rounded-pill fw-bold shadow-lg text-white ${testCompleted ? 'btn-danger' : 'btn-secondary'}`}
                                            onClick={() => { setActive(true); setStep(3); }}
                                            disabled={!testCompleted || sensoryActive || motorActive}>
                                            <i className="bi bi-fire me-2"></i>
                                            {testCompleted ? 'EXECUTAR ABLAÇÃO TÉRMICA' : 'REALIZE OS TESTES PRIMEIRO'}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="p-3 rounded-4 bg-danger bg-opacity-10 border border-danger text-center">
                                <div className="text-danger fw-bold mb-2">ABLAÇÃO EM CURSO...</div>
                                <div className="progress" style={{ height: '12px', borderRadius: '6px' }}>
                                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{ width: `${((90 - time) / 90) * 100}%` }}></div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <button className="btn btn-success w-100 py-3 rounded-pill fw-bold shadow border-0" onClick={reset}>
                                PROCEDIMENTO FINALIZADO ✓
                            </button>
                        )}
                    </div>
                </div>

                {/* Imagem Anatomica (Direita) */}
                <div className="col-md-7 position-relative overflow-hidden"
                    style={{ minHeight: '550px', cursor: 'crosshair', background: '#eee' }}
                    onClick={handleImageClick}
                    ref={containerRef}>

                    {step === 0 ? (
                        <div className="h-100 d-flex flex-column justify-content-center align-items-center p-5 text-center">
                            <h4 className="fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>O que vamos tratar hoje?</h4>
                            <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: '300px' }}>
                                {(Object.entries(configs) as [AnatomyType, AnatomyConfig][]).map(([key, it]) => (
                                    <button key={key} onClick={() => { setAnatomy(key); setStep(1); }} className="btn btn-white border py-3 shadow-sm rounded-4 text-start d-flex align-items-center gap-3">
                                        <div className="bg-info text-white rounded-circle p-2"><i className={`bi ${it.bgIcon}`}></i></div>
                                        <b>{it.label}</b>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-100 h-100">
                            <img src={config.image} alt="Anatomy" className="w-100 h-100 object-fit-cover" style={{ pointerEvents: 'none' }} />

                            {/* Alvo do Nervo */}
                            <div className="position-absolute rounded-circle shadow-sm"
                                style={{
                                    top: `${config.targetTop}%`, left: `${config.targetLeft}%`,
                                    width: '40px', height: '40px', transform: 'translate(-50%, -50%)',
                                    border: '3px dashed var(--azul-claro)', background: 'rgba(63, 193, 201, 0.2)',
                                    pointerEvents: 'none'
                                }} />

                            {/* Eletrodo */}
                            <motion.div className="position-absolute shadow-lg"
                                animate={{ left: `${pos.left}%`, top: `${pos.top}%`, rotate: -45 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                style={{ width: '220px', height: '6px', background: '#444', zIndex: 10, transformOrigin: 'left center', borderRadius: '3px', pointerEvents: 'none' }}>
                                <div className="position-absolute" style={{ left: '-10px', top: '-4px', width: '35px', height: '14px', borderRadius: '7px', background: active ? '#ff4b2b' : ((sensoryActive || motorActive) ? 'var(--azul-claro)' : '#111'), border: '1px solid #fff' }}></div>
                                <div className="position-absolute start-0 top-50 translate-middle rounded-circle bg-info" style={{ width: '12px', height: '12px', border: '2px solid white' }}></div>
                            </motion.div>

                            {/* Overlay de Instrucao */}
                            <div className="position-absolute bottom-0 start-0 end-0 p-4 bg-white bg-opacity-95 border-top">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-info text-white rounded-circle p-3"><i className="bi bi-info-lg"></i></div>
                                    <div className="small">
                                        <b className="d-block text-uppercase text-info">{isEditMode ? 'MODO AJUSTE' : 'INSTRUÇÕES'}</b>
                                        {step === 1 && "Clique no botão 'Iniciar Posicionamento' para começar."}
                                        {step === 2 && !isPositionCorrect && "Posicione a ponta da agulha sobre o nervo alvo para prosseguir."}
                                        {step === 2 && isPositionCorrect && "Posição validada! Execute os testes de segurança no painel lateral."}
                                        {step === 3 && "Ablação ativa. O calor está inativando as fibras nervosas."}
                                        {step === 4 && "Sucesso! O sinal da dor foi interrompido permanentemente."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
