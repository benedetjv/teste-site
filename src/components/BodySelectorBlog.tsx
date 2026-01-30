"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { INITIAL_REGIONS, Region, View } from '@/constants/regions';

interface BodySelectorBlogProps {
    onFilterChange?: (selectedIds: string[]) => void;
}

export default function BodySelectorBlog({ onFilterChange }: BodySelectorBlogProps) {
    const [view, setView] = useState<View>('front');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [regions, setRegions] = useState(INITIAL_REGIONS);
    const [activeAdjustId, setActiveAdjustId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentRegions = regions.filter(r => r.view === view);

    const toggleRegion = (id: string) => {
        if (isEditMode) {
            setActiveAdjustId(activeAdjustId === id ? null : id);
            return;
        }

        setSelectedIds(prev => {
            const isSelected = prev.includes(id);
            const next = isSelected ? prev.filter(i => i !== id) : [...prev, id];
            if (onFilterChange) onFilterChange(next);
            return next;
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
        let x = info.point.x - containerRect.left;
        let y = info.point.y - containerRect.top;
        x = Math.max(0, Math.min(x, containerRect.width));
        y = Math.max(0, Math.min(y, containerRect.height));
        const leftPercent = ((x / containerRect.width) * 100).toFixed(1) + '%';
        const topPercent = ((y / containerRect.height) * 100).toFixed(1) + '%';
        setRegions(prev => prev.map(r => r.id === id ? { ...r, top: topPercent, left: leftPercent } : r));
    };

    return (
        <div className="py-5 bg-white rounded-4 shadow-lg border-0 overflow-hidden position-relative" style={{ borderTop: '6px solid var(--azul-medio)' }}>
            <div className="container">
                <div className="row g-4 align-items-center">
                    {/* Left Column: Fixed Headers as requested */}
                    <div className="col-lg-4 col-md-12 text-center text-lg-start">
                        <div className="mb-4">
                            <span className="badge mb-2 px-3 py-2 rounded-pill fw-bold" style={{ backgroundColor: 'rgba(57, 88, 109, 0.1)', color: 'var(--azul-medio)', letterSpacing: '0.5px' }}>MAPEAMENTO DE DOR</span>
                            <h2 className="fw-bold mb-3 h3" style={{ color: 'var(--azul-escuro)' }}>Onde você sente dor?</h2>
                            <p className="text-secondary">Identifique os pontos no mapa para filtrar artigos específicos sobre o seu caso.</p>
                        </div>

                        <div className="d-flex justify-content-center justify-content-lg-start gap-2 mb-4">
                            <div className="p-1 rounded-pill shadow-sm d-flex gap-1" style={{ backgroundColor: 'var(--cinza-fundo)', border: '1px solid #eee' }}>
                                <button onClick={() => setView('front')} className={`btn btn-sm rounded-pill px-4 py-2 fw-bold transition-all border-0 ${view === 'front' ? 'shadow-sm text-white' : 'text-muted'}`} style={{ backgroundColor: view === 'front' ? 'var(--azul-medio)' : 'transparent' }}>Frente</button>
                                <button onClick={() => setView('back')} className={`btn btn-sm rounded-pill px-4 py-2 fw-bold transition-all border-0 ${view === 'back' ? 'shadow-sm text-white' : 'text-muted'}`} style={{ backgroundColor: view === 'back' ? 'var(--azul-medio)' : 'transparent' }}>Costas</button>
                            </div>
                            <button onClick={() => setIsEditMode(!isEditMode)} className={`btn btn-sm rounded-pill px-3 py-2 fw-bold border transition-all ${isEditMode ? 'btn-danger' : 'btn-outline-secondary opacity-30'}`}>
                                <i className={`bi ${isEditMode ? 'bi-check-lg' : 'bi-gear'}`}></i>
                            </button>
                        </div>

                        {selectedIds.length > 0 && (
                            <div className="alert alert-primary border-0 rounded-4 py-3 px-4 shadow-sm animate__animated animate__fadeIn">
                                <h6 className="fw-bold mb-2 small"><i className="bi bi-funnel-fill me-2"></i>Filtrando por:</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {selectedIds.map(id => (
                                        <span key={id} className="badge bg-white text-primary border rounded-pill px-2 py-1 small fw-normal">
                                            {regions.find(r => r.id === id)?.label}
                                        </span>
                                    ))}
                                </div>
                                <button onClick={() => { setSelectedIds([]); if (onFilterChange) onFilterChange([]); }} className="btn btn-link btn-sm text-decoration-none p-0 mt-2 text-primary fw-bold" style={{ fontSize: '11px' }}>Limpar Filtros</button>
                            </div>
                        )}
                    </div>

                    {/* Middle Column: Interactive Image */}
                    <div className="col-lg-5 col-md-7 d-flex justify-content-center border-start border-end border-light position-relative">
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
                        <div ref={containerRef} className="position-relative cursor-crosshair" style={{ width: '100%', maxWidth: '450px', height: '600px' }} onClick={handleImageClick}>
                            <img src={view === 'front' ? '/img/human-body-front-v2.png' : '/img/human-body-back-v2.png'} alt="Mapa da Dor" className="w-100 h-100 object-fit-contain" style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }} />
                            {currentRegions.map(region => (
                                <motion.div
                                    key={region.id}
                                    drag={isEditMode}
                                    dragConstraints={containerRef}
                                    dragMomentum={false}
                                    dragElastic={0}
                                    onDragEnd={(e, info) => handleDragEnd(region.id, info)}
                                    onClick={(e) => { e.stopPropagation(); toggleRegion(region.id); }}
                                    className={`position-absolute rounded-circle border-2 cursor-pointer transition-all ${isEditMode ? (activeAdjustId === region.id ? 'bg-danger border-white shadow-lg pulse-edit' : 'bg-danger border-white shadow opacity-50') :
                                        selectedIds.includes(region.id) ? 'border-white shadow-lg pulse-dot' : 'bg-white border-opacity-70 shadow-sm'
                                        }`}
                                    style={{
                                        top: region.top,
                                        left: region.left,
                                        width: isEditMode ? '18px' : '22px',
                                        height: isEditMode ? '18px' : '22px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: isEditMode ? 2000 : (selectedIds.includes(region.id) ? 100 : 10),
                                        backgroundColor: isEditMode ? '#dc3545' : (selectedIds.includes(region.id) ? 'var(--azul-medio)' : 'white'),
                                        borderColor: selectedIds.includes(region.id) ? 'white' : 'var(--azul-claro)'
                                    }}
                                >
                                    {isEditMode && (
                                        <div className="position-absolute top-100 start-50 translate-middle-x mt-1 d-flex flex-column align-items-center" style={{ pointerEvents: 'none', zIndex: 2100 }}>
                                            <div className="badge bg-dark text-white p-1" style={{ fontSize: '8px' }}>{region.top}, {region.left}</div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Mini List */}
                    <div className="col-lg-3 col-md-5">
                        <h6 className="fw-bold mb-3 small text-uppercase text-muted" style={{ letterSpacing: '1px' }}>Lista de Áreas</h6>
                        <div className="custom-scrollbar overflow-auto pe-2" style={{ maxHeight: '500px' }}>
                            <div className="d-flex flex-column gap-1">
                                {currentRegions.map(region => (
                                    <div key={region.id} onClick={() => toggleRegion(region.id)} className={`p-2 rounded-3 border transition-all cursor-pointer d-flex align-items-center gap-2 ${selectedIds.includes(region.id) ? 'border-primary bg-primary bg-opacity-10' : 'border-light bg-light bg-opacity-30 hover-bg-white'}`}>
                                        <div className={`fw-bold flex-grow-1 ${selectedIds.includes(region.id) ? 'text-primary' : 'text-dark'}`} style={{ fontSize: '11px' }}>{region.label}</div>
                                        {selectedIds.includes(region.id) && <i className="bi bi-check-circle-fill text-primary" style={{ fontSize: '12px' }}></i>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .pulse-dot { animation: pulse 1.5s infinite; }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(125, 153, 178, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(125, 153, 178, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(125, 153, 178, 0); }
                }
                .pulse-edit { animation: pulse-red 1s infinite; }
                @keyframes pulse-red {
                    0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--azul-claro); border-radius: 10px; }
                .cursor-crosshair { cursor: crosshair; }
            `}</style>
        </div>
    );
}
