"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'front' | 'back';



import { INITIAL_REGIONS, Region } from '@/constants/regions';

export default function BodySelector({
    onSelectionChange,
    hideFormInSelector = false,
    simplifiedMode = false
}: {
    onSelectionChange?: (selected: Region[]) => void,
    hideFormInSelector?: boolean,
    simplifiedMode?: boolean
}) {
    const [view, setView] = useState<View>('front');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [regions, setRegions] = useState(INITIAL_REGIONS);
    const [activeAdjustId, setActiveAdjustId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const containerRef = useRef<HTMLDivElement>(null);

    const currentRegions = regions.filter(r => r.view === view);

    const toggleRegion = (id: string) => {
        if (isEditMode) {
            setActiveAdjustId(activeAdjustId === id ? null : id);
            return;
        }
        setSelectedIds(prev => {
            const newIds = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
            if (onSelectionChange) {
                onSelectionChange(regions.filter(r => newIds.includes(r.id)));
            }
            return newIds;
        });
    };

    const handleImageClick = (e: React.MouseEvent) => {
        if (!isEditMode || !activeAdjustId || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        const leftPercent = ((x / containerRect.width) * 100).toFixed(1) + '%';
        const topPercent = ((y / containerRect.height) * 100).toFixed(1) + '%';

        setRegions(prev => prev.map(r => r.id === activeAdjustId ? { ...r, top: topPercent, left: leftPercent } : r));
    };

    const handleDragEnd = (id: string, info: any) => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();

        // Calculate position relative to container
        let x = info.point.x - containerRect.left;
        let y = info.point.y - containerRect.top;

        // Clamp values between 0 and container dimensions to prevent disappearing
        x = Math.max(0, Math.min(x, containerRect.width));
        y = Math.max(0, Math.min(y, containerRect.height));

        const leftPercent = ((x / containerRect.width) * 100).toFixed(1) + '%';
        const topPercent = ((y / containerRect.height) * 100).toFixed(1) + '%';

        setRegions(prev => prev.map(r => r.id === id ? { ...r, top: topPercent, left: leftPercent } : r));
        console.log(`Region ${id}: top: "${topPercent}", left: "${leftPercent}"`);
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedLabels = regions.filter(r => selectedIds.includes(r.id)).map(r => r.label).join(', ');
        const message = `Olá Dr. Otto! Meu nome é ${formData.name}. Gostaria de uma avaliação sobre dores que sinto em: ${selectedLabels}.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/5519999439824?text=${encodedMessage}`, '_blank');
        setShowForm(false);
    };

    const lastSelectedRegion = regions.find(r => r.id === selectedIds[selectedIds.length - 1]);

    return (
        <div className="py-5 bg-white rounded-4 shadow-lg border-0 overflow-hidden position-relative" style={{ borderTop: '6px solid var(--azul-medio)' }}>
            <div className="container">
                <div className="row g-4 align-items-start">
                    {/* Left Column: Info & Selected */}
                    <div className="col-lg-4 col-md-12 order-3 order-lg-1">
                        {!simplifiedMode && (
                            <div className="mb-4">
                                <span className="badge mb-2 px-3 py-2 rounded-pill fw-bold" style={{ backgroundColor: 'rgba(57, 88, 109, 0.1)', color: 'var(--azul-medio)', letterSpacing: '0.5px' }}>MAPEAMENTO DE DOR</span>
                                <h2 className="fw-bold mb-3 h4" style={{ color: 'var(--azul-escuro)' }}>Onde você sente dor?</h2>
                                <p className="text-secondary small">Identifique precisamente os pontos de desconforto.</p>
                            </div>
                        )}

                        <div className="d-flex flex-wrap gap-2 mb-4">
                            <div className="p-1 rounded-pill shadow-sm d-flex gap-1" style={{ backgroundColor: 'var(--cinza-fundo)', border: '1px solid #eee' }}>
                                <button
                                    onClick={() => { setView('front'); setSelectedIds([]); }}
                                    className={`btn btn-sm rounded-pill px-3 py-2 fw-bold transition-all border-0 ${view === 'front' ? 'shadow-sm text-white' : 'text-muted'}`}
                                    style={{ backgroundColor: view === 'front' ? 'var(--azul-medio)' : 'transparent' }}
                                >
                                    Frente
                                </button>
                                <button
                                    onClick={() => { setView('back'); setSelectedIds([]); }}
                                    className={`btn btn-sm rounded-pill px-3 py-2 fw-bold transition-all border-0 ${view === 'back' ? 'shadow-sm text-white' : 'text-muted'}`}
                                    style={{ backgroundColor: view === 'back' ? 'var(--azul-medio)' : 'transparent' }}
                                >
                                    Costas
                                </button>
                            </div>
                            <button
                                onClick={() => setIsEditMode(!isEditMode)}
                                className={`btn btn-sm rounded-pill px-3 py-2 fw-bold border transition-all ${isEditMode ? 'btn-danger' : 'btn-outline-secondary opacity-50'}`}
                                style={{ fontSize: '0.8rem' }}
                            >
                                {isEditMode ? 'Finalizar' : 'Ajustar'}
                            </button>
                        </div>

                        <div className="selected-info rounded-4 p-4 shadow-sm mb-4" style={{ backgroundColor: 'var(--cinza-fundo)', borderLeft: '6px solid var(--azul-claro)' }}>
                            {selectedIds.length > 0 ? (
                                <div>
                                    <h6 className="fw-bold mb-3 small" style={{ color: 'var(--azul-escuro)' }}>Selecionados ({selectedIds.length}):</h6>
                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        {selectedIds.map(id => {
                                            const r = regions.find(reg => reg.id === id);
                                            return (
                                                <span key={id} className="badge bg-white shadow-sm px-3 py-2 rounded-pill d-flex align-items-center gap-2 border" style={{ color: 'var(--azul-medio)', borderColor: 'rgba(125, 153, 178, 0.3)', fontSize: '11px' }}>
                                                    <i className={`bi ${r?.icon}`}></i> {r?.label}
                                                    <i className="bi bi-x-circle cursor-pointer opacity-50 hover-opacity-100" onClick={(e) => { e.stopPropagation(); toggleRegion(id); }}></i>
                                                </span>
                                            );
                                        })}
                                    </div>
                                    {!hideFormInSelector && (
                                        <button onClick={() => setShowForm(true)} className="btn w-100 py-3 rounded-pill shadow-sm fw-bold text-white transition-all transform-hover" style={{ backgroundColor: 'var(--azul-escuro)', fontSize: '13px' }}>
                                            <i className="bi bi-whatsapp me-2"></i> SOLICITAR AVALIAÇÃO AGORA
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="text-muted text-center py-4">
                                    <i className="bi bi-hand-index-thumb fs-2 d-block mb-3 opacity-20" style={{ color: 'var(--azul-claro)' }}></i>
                                    <p className="mb-0 small">Clique nos pontos do mapa ou na lista ao lado.</p>
                                </div>
                            )}
                        </div>

                        {lastSelectedRegion && (
                            <div className="card border-0 shadow-sm animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(125, 153, 178, 0.05)' }}>
                                <div className="card-body p-3">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: 'var(--azul-claro)', color: 'white' }}>
                                            <i className={`bi ${lastSelectedRegion.icon} small`}></i>
                                        </div>
                                        <span className="fw-bold small" style={{ color: 'var(--azul-escuro)' }}>{lastSelectedRegion.label}</span>
                                    </div>
                                    {!simplifiedMode && (
                                        <>
                                            <p className="small text-secondary mb-2" style={{ lineHeight: '1.4', fontSize: '12px' }}>{lastSelectedRegion.description}</p>
                                            <Link href={lastSelectedRegion.slug} className="fw-bold text-decoration-none" style={{ color: 'var(--azul-medio)', fontSize: '11px' }}>
                                                Ver tratamentos indicados <i className="bi bi-arrow-right-short"></i>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Middle Column: Interactive Image (PRIORITY) */}
                    <div className="col-lg-5 col-md-7 order-1 order-lg-2 d-flex justify-content-center border-start border-end border-light position-relative">

                        {/* Rótulos de Orientação */}
                        <div className="position-absolute top-50 start-0 translate-middle-y d-none d-sm-block ms-2 opacity-25" style={{ zIndex: 5 }}>
                            <span className="text-uppercase fw-bold vertical-text small" style={{ letterSpacing: '3px', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                                {view === 'front' ? 'Lado Direito' : 'Lado Esquerdo'}
                            </span>
                        </div>
                        <div className="position-absolute top-50 end-0 translate-middle-y d-none d-sm-block me-2 opacity-25" style={{ zIndex: 5 }}>
                            <span className="text-uppercase fw-bold vertical-text small" style={{ letterSpacing: '3px', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                                {view === 'front' ? 'Lado Esquerdo' : 'Lado Direito'}
                            </span>
                        </div>
                        <div
                            ref={containerRef}
                            className="position-relative cursor-crosshair"
                            style={{ width: '100%', maxWidth: '450px', height: '650px' }}
                            onClick={handleImageClick}
                        >
                            <img
                                src={view === 'front' ? '/img/human-body-front-v2.png' : '/img/human-body-back-v2.png'}
                                alt="Mapa da Dor"
                                className="w-100 h-100 object-fit-contain transition-all"
                                style={{
                                    filter: selectedIds.length > 0 ? 'brightness(0.95) saturate(0.8)' : 'none',
                                    mixBlendMode: 'multiply',
                                    opacity: 1,
                                    pointerEvents: 'none' // Let clicks pass through to the container
                                }}
                            />
                            {currentRegions.map(region => (
                                <motion.div
                                    key={region.id}
                                    drag={isEditMode}
                                    dragConstraints={containerRef}
                                    dragMomentum={false}
                                    dragElastic={0}
                                    onDragEnd={(e, info) => handleDragEnd(region.id, info)}
                                    onClick={(e) => { e.stopPropagation(); toggleRegion(region.id); }}
                                    className={`position-absolute rounded-circle border-2 cursor-pointer transition-all ${isEditMode ?
                                        (activeAdjustId === region.id ? 'bg-danger border-white shadow-lg ring-animation' : 'bg-danger border-white shadow opacity-50') :
                                        selectedIds.includes(region.id) ? 'border-white shadow-lg pulse-dot' : 'bg-white border-opacity-70 shadow-sm'
                                        }`}
                                    style={{
                                        top: region.top,
                                        left: region.left,
                                        width: isEditMode ? '24px' : '30px',
                                        height: isEditMode ? '24px' : '30px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: isEditMode ? (activeAdjustId === region.id ? 2000 : 1500) : (selectedIds.includes(region.id) ? 100 : 10),
                                        backgroundColor: isEditMode ? '#dc3545' : (selectedIds.includes(region.id) ? 'var(--azul-medio)' : 'white'),
                                        borderColor: selectedIds.includes(region.id) ? 'white' : 'var(--azul-claro)'
                                    }}
                                >
                                    <div className={`position-absolute top-50 start-50 translate-middle rounded-circle ${selectedIds.includes(region.id) ? 'bg-white shadow-sm' : ''}`} style={{ width: '8px', height: '8px', backgroundColor: selectedIds.includes(region.id) ? 'white' : (isEditMode ? 'white' : 'var(--azul-claro)') }}></div>

                                    {isEditMode && (
                                        <div className="position-absolute top-100 start-50 translate-middle-x mt-1 d-flex flex-column align-items-center" style={{ pointerEvents: 'none', zIndex: 2100 }}>
                                            <div className="badge bg-primary text-white p-1 mb-1 shadow-sm" style={{ fontSize: '9px', whiteSpace: 'nowrap', borderRadius: '4px' }}>
                                                {region.label}
                                            </div>
                                            <div className="badge bg-dark text-white p-1 shadow-sm" style={{ fontSize: '8px', opacity: 0.9, whiteSpace: 'nowrap' }}>
                                                {region.top}, {region.left}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Interactive Region List (MORE COMPACT) */}
                    <div className="col-lg-3 col-md-5 order-2 order-lg-3">
                        <div className="ps-lg-2">
                            <h6 className="fw-bold mb-3 small text-uppercase d-flex align-items-center" style={{ color: 'var(--azul-medio)', letterSpacing: '1px' }}>
                                <i className="bi bi-list-check fs-5 me-2"></i> Lista
                            </h6>
                            <div className="region-list-container custom-scrollbar pe-1" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                <div className="d-flex flex-column gap-1">
                                    {currentRegions.map(region => (
                                        <div
                                            key={region.id}
                                            onClick={() => toggleRegion(region.id)}
                                            className={`p-2 rounded-2 border transition-all cursor-pointer d-flex align-items-center gap-2 ${isEditMode && activeAdjustId === region.id
                                                ? 'border-danger bg-danger bg-opacity-10 shadow-sm'
                                                : selectedIds.includes(region.id)
                                                    ? 'border-primary bg-primary bg-opacity-10 shadow-sm'
                                                    : 'border-light bg-light bg-opacity-50 hover-bg-white'
                                                }`}
                                        >
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className={`fw-bold text-truncate ${isEditMode && activeAdjustId === region.id ? 'text-danger' :
                                                    selectedIds.includes(region.id) ? 'text-primary' : 'text-dark'
                                                    }`} style={{ fontSize: '11px' }}>{region.label}</div>
                                                {isEditMode && (
                                                    <div className="text-muted d-flex justify-content-between align-items-center" style={{ fontSize: '9px', fontFamily: 'monospace' }}>
                                                        <span>{region.top}, {region.left}</span>
                                                        {activeAdjustId === region.id && <span className="badge bg-danger p-1">ATIVO</span>}
                                                    </div>
                                                )}
                                            </div>
                                            {selectedIds.includes(region.id) && !isEditMode && (
                                                <i className="bi bi-check-circle-fill text-primary" style={{ fontSize: '10px' }}></i>
                                            )}
                                            {isEditMode && activeAdjustId === region.id && (
                                                <i className="bi bi-cursor-fill text-danger small"></i>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 9999, background: 'rgba(42, 65, 86, 0.4)', backdropFilter: 'blur(8px)' }}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-4 shadow-2xl p-4 p-md-5 w-100" style={{ maxWidth: '500px' }}>
                            <div className="text-center mb-4">
                                <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ backgroundColor: 'rgba(57, 88, 109, 0.1)', color: 'var(--azul-escuro)' }}>
                                    <i className="bi bi-clipboard2-pulse fs-3"></i>
                                </div>
                                <h4 className="fw-bold mb-2" style={{ color: 'var(--azul-escuro)' }}>Relatório de Saúde</h4>
                                <p className="text-secondary small">Envie seu mapeamento para uma análise de precisão com o Dr. Otto.</p>
                            </div>
                            <form onSubmit={handleWhatsAppSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: 'var(--azul-medio)' }}>NOME COMPLETO</label>
                                    <input type="text" required className="form-control form-control-lg rounded-3 border-2 shadow-none" style={{ borderColor: '#eee' }} placeholder="Ex: Maria Silva" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold" style={{ color: 'var(--azul-medio)' }}>WHATSAPP</label>
                                    <input type="tel" required className="form-control form-control-lg rounded-3 border-2 shadow-none" style={{ borderColor: '#eee' }} placeholder="(00) 00000-0000" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div className="alert border-0 py-2 px-3 mb-4 rounded-3 d-flex align-items-center" style={{ backgroundColor: 'rgba(125, 153, 178, 0.1)', color: 'var(--azul-medio)' }}>
                                    <i className="bi bi-info-circle-fill me-2"></i>
                                    <span className="x-small">Seu mapa inclui {selectedIds.length} regiões afetadas.</span>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="button" onClick={() => setShowForm(false)} className="btn btn-light rounded-pill flex-grow-1 py-3 fw-bold border-0" style={{ color: 'var(--azul-medio)' }}>CANCELAR</button>
                                    <button type="submit" className="btn text-white rounded-pill flex-grow-1 py-3 fw-bold shadow-sm" style={{ backgroundColor: 'var(--azul-escuro)' }}>ENVIAR AGORA</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .pulse-dot { animation: pulse 1.5s infinite; }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(125, 153, 178, 0.5); }
          70% { box-shadow: 0 0 0 15px rgba(125, 153, 178, 0); }
          100% { box-shadow: 0 0 0 0 rgba(125, 153, 178, 0); }
        }
        .ring-animation { animation: ring 1s infinite; }
        @keyframes ring {
          0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }
        .hover-scale:hover { transform: translate(-50%, -50%) scale(1.2) !important; border-color: var(--azul-medio) !important; z-index: 60 !important; }
        .transform-hover:hover { transform: translateY(-3px); filter: brightness(1.1); }
        .x-small { font-size: 11px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--azul-claro); border-radius: 10px; opacity: 0.3; }
        .hover-bg-light:hover { background-color: var(--cinza-fundo) !important; }
        .cursor-crosshair { cursor: crosshair !important; }
      `}</style>
        </div>
    );
}
