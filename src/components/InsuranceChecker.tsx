'use client';

import React, { useState } from 'react';

const insurances = [
    { id: 'amil', name: 'Amil' },
    { id: 'bradesco', name: 'Bradesco Saúde' },
    { id: 'gama', name: 'GAMA Saúde' },
    { id: 'omint', name: 'Omint' },
    { id: 'porto', name: 'Porto Seguro' },
    { id: 'caixa', name: 'Saúde Caixa' },
    { id: 'sulamerica', name: 'SulAmérica Saúde' },
    { id: 'vivest', name: 'VIVEST' },
    { id: 'petrobras', name: 'Petrobras PAE' },
    { id: 'ash', name: 'ASH (Holambra)' },
    { id: '2care', name: '2Care' },
];

export default function InsuranceChecker() {
    const [step, setStep] = useState(1);
    const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);

    const handleSelectInsurance = (name: string) => {
        setSelectedInsurance(name);
        setStep(2);
    };

    const handleReset = () => {
        setStep(1);
        setSelectedInsurance(null);
    };

    return (
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mt-4">
            
            {/* PROGRESS BAR */}
            <div className="d-flex align-items-center mb-4">
                <div className={`p-2 rounded-circle text-center fw-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: '40px', height: '40px', lineHeight: '24px' }}>1</div>
                <div className="flex-grow-1 mx-2" style={{ height: '4px', backgroundColor: step >= 2 ? 'var(--azul-principal)' : '#e9ecef' }}></div>
                <div className={`p-2 rounded-circle text-center fw-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: '40px', height: '40px', lineHeight: '24px' }}>2</div>
                <div className="flex-grow-1 mx-2" style={{ height: '4px', backgroundColor: step >= 3 ? 'var(--azul-principal)' : '#e9ecef' }}></div>
                <div className={`p-2 rounded-circle text-center fw-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: '40px', height: '40px', lineHeight: '24px' }}>3</div>
            </div>

            {/* STEP 1: SELECT INSURANCE */}
            {step === 1 && (
                <div className="animate__animated animate__fadeIn">
                    <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>Qual é o seu plano de saúde?</h3>
                    <p className="text-muted mb-4">Selecione o seu convênio para iniciarmos o agendamento.</p>
                    
                    <div className="row g-3">
                        {insurances.map((ins) => (
                            <div className="col-6 col-md-4" key={ins.id}>
                                <button 
                                    onClick={() => handleSelectInsurance(ins.name)}
                                    className="btn btn-outline-primary w-100 py-3 fw-bold rounded-3 h-100 d-flex align-items-center justify-content-center"
                                    style={{ transition: 'all 0.2s', borderColor: '#e6e6e6', color: 'var(--azul-escuro)' }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--azul-principal)'; e.currentTarget.style.backgroundColor = '#f4f8fb'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                >
                                    {ins.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 2: VERA CRUZ CHECK */}
            {step === 2 && (
                <div className="animate__animated animate__fadeIn text-center py-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">Convênio selecionado: {selectedInsurance}</span>
                    
                    <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Pergunta importante sobre o nível do seu plano</h3>
                    
                    <div className="bg-light p-4 rounded-3 border mb-4 text-start">
                        <p className="mb-0 text-dark fw-medium" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                            O Dr. Otto Beckedorff presta os atendimentos intervencionistas e procedimentos da Clínica Adora diretamente na estrutura de ponta do <strong>Hospital Vera Cruz</strong> (Campinas).
                        </p>
                        <hr className="my-3"/>
                        <p className="mb-0 text-danger fw-bold">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            A categoria específica do seu plano <em>{selectedInsurance}</em> é aceita no Hospital Vera Cruz?
                        </p>
                    </div>

                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4">
                        <button 
                            onClick={() => setStep(3)}
                            className="btn btn-lg text-white fw-bold px-4 py-3 rounded-pill d-flex align-items-center justify-content-center shadow-sm"
                            style={{ backgroundColor: '#2e7d32', border: 'none' }}
                        >
                            <i className="bi bi-check-circle me-2 fs-5"></i> Sim, atende no Vera Cruz
                        </button>
                        <button 
                            onClick={() => setStep(3)}
                            className="btn btn-lg btn-outline-secondary fw-bold px-4 py-3 rounded-pill d-flex align-items-center justify-content-center"
                        >
                            <i className="bi bi-question-circle me-2 fs-5"></i> Não sei / Preciso de ajuda
                        </button>
                    </div>

                    <button onClick={handleReset} className="btn btn-link text-muted mt-4 text-decoration-none small">
                        <i className="bi bi-arrow-left me-1"></i> Escolher outro plano
                    </button>
                </div>
            )}

            {/* STEP 3: CONVERSION (DOCTORALIA + WHATSAPP) */}
            {step === 3 && (
                <div className="animate__animated animate__fadeIn text-center py-4">
                    <div className="display-4 text-primary mb-3">
                        <i className="bi bi-calendar2-check-fill" style={{ color: 'var(--azul-principal)' }}></i>
                    </div>
                    <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>Excelente! Vamos ao próximo passo.</h3>
                    <p className="text-secondary mb-5">Escolha abaixo como prefere realizar o seu agendamento no nosso centro (Clínica Adora & Vera Cruz).</p>

                    <div className="row justify-content-center g-4">
                        
                        <div className="col-md-6">
                            <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow" style={{ backgroundColor: '#f8fbfe' }}>
                                <div className="card-body p-4 p-lg-5">
                                    <h4 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Agendamento Imediato</h4>
                                    <p className="text-muted small mb-4">Veja a agenda livre em tempo real agora mesmo e garanta o seu horário na Clínica Adora.</p>
                                    <a 
                                        href="https://www.doctoralia.com.br" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-lg w-100 text-white fw-bold rounded-pill"
                                        style={{ backgroundColor: 'var(--azul-principal)' }}
                                    >
                                        <i className="bi bi-calendar-event me-2"></i> Agendar Online
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow" style={{ backgroundColor: '#f0fdf4' }}>
                                <div className="card-body p-4 p-lg-5">
                                    <h4 className="fw-bold text-success mb-3">Assistência Humana</h4>
                                    <p className="text-muted small mb-4">Nossa secretária confirmará a viabilidade do nível do seu plano <em>{selectedInsurance}</em> para o Vera Cruz.</p>
                                    <a 
                                        href={`https://wa.me/5519999439824?text=Ol%C3%A1!%20Vim%20pelo%20Google.%20Tenho%20o%20plano%20${selectedInsurance}%20e%20gostaria%20de%20agendar%20consulta%20para%20dor.`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-lg w-100 text-white fw-bold rounded-pill"
                                        style={{ backgroundColor: '#25D366' }}
                                    >
                                        <i className="bi bi-whatsapp me-2"></i> Falar com a Secretária
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-5">
                        <button onClick={handleReset} className="btn btn-link text-muted text-decoration-none small">
                            <i className="bi bi-arrow-counterclockwise me-1"></i> Reiniciar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
