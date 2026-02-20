"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_REGIONS, Region, View } from '@/constants/regions';

interface BodySelectorAssessmentProps {
    onSelectionChange?: (selected: Region[]) => void;
    hideFormInSelector?: boolean;
}

export default function BodySelectorAssessment({
    onSelectionChange,
    hideFormInSelector = false,
}: BodySelectorAssessmentProps) {
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
        let x = info.point.x - containerRect.left;
        let y = info.point.y - containerRect.top;
        x = Math.max(0, Math.min(x, containerRect.width));
        y = Math.max(0, Math.min(y, containerRect.height));
        const leftPercent = ((x / containerRect.width) * 100).toFixed(1) + '%';
        const topPercent = ((y / containerRect.height) * 100).toFixed(1) + '%';
        setRegions(prev => prev.map(r => r.id === id ? { ...r, top: topPercent, left: leftPercent } : r));
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedLabels = regions.filter(r => selectedIds.includes(r.id)).map(r => r.label).join(', ');
        const message = `Olá Dr. Otto! Meu nome é ${formData.name}. Gostaria de uma avaliação sobre dores que sinto em: ${selectedLabels}.`;
        window.open(`https://wa.me/5519999439824?text=${encodeURIComponent(message)}`, '_blank');
        setShowForm(false);
    };

    return (
        <div className="py-4 bg-white rounded-4 shadow-sm border overflow-hidden">
            <div className="container-fluid">
                <div className="row g-4 justify-content-center">
                    {/* Main Image View */}
                    <div className="col-lg-8 col-md-10 d-flex flex-column align-items-center position-relative">

                        {/* Rótulos de Orientação */}
                        <div className="position-absolute top-50 start-0 translate-middle-y d-none d-sm-block ms-4 opacity-25" style={{ zIndex: 5 }}>
                            <span className="text-uppercase fw-bold vertical-text small" style={{ letterSpacing: '3px', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                                {view === 'front' ? 'Lado Direito' : 'Lado Esquerdo'}
                            </span>
                        </div>
                        <div className="position-absolute top-50 end-0 translate-middle-y d-none d-sm-block me-4 opacity-25" style={{ zIndex: 5 }}>
                            <span className="text-uppercase fw-bold vertical-text small" style={{ letterSpacing: '3px', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                                {view === 'front' ? 'Lado Esquerdo' : 'Lado Direito'}
                            </span>
                        </div>

                        <div className="d-flex gap-2 mb-4 bg-light p-1 rounded-pill">
                            <button onClick={() => setView('front')} className={`btn btn-sm rounded-pill px-4 py-2 fw-bold transition-all border-0 ${view === 'front' ? 'bg-primary text-white shadow' : 'text-muted'}`}>Frente</button>
                            <button onClick={() => setView('back')} className={`btn btn-sm rounded-pill px-4 py-2 fw-bold transition-all border-0 ${view === 'back' ? 'bg-primary text-white shadow' : 'text-muted'}`}>Costas</button>
                        </div>

                        <div ref={containerRef} className="position-relative cursor-crosshair" style={{ width: '100%', maxWidth: '450px', height: '600px' }} onClick={handleImageClick}>
                            <img src={view === 'front' ? '/img/human-body-front-v2.png' : '/img/human-body-back-v2.png'} alt="Mapa" className="w-100 h-100 object-fit-contain" style={{ mixBlendMode: 'multiply', opacity: 0.8 }} />
                            {currentRegions.map(region => (
                                <motion.div
                                    key={region.id}
                                    drag={isEditMode}
                                    dragConstraints={containerRef}
                                    dragMomentum={false}
                                    dragElastic={0}
                                    onDragEnd={(e, info) => handleDragEnd(region.id, info)}
                                    onClick={(e) => { e.stopPropagation(); toggleRegion(region.id); }}
                                    className={`position-absolute rounded-circle border-2 cursor-pointer transition-all ${selectedIds.includes(region.id) ? 'bg-primary border-white shadow-lg pulse-dot' : 'bg-white border-primary border-opacity-30'
                                        }`}
                                    style={{
                                        top: region.top,
                                        left: region.left,
                                        width: '22px',
                                        height: '22px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: selectedIds.includes(region.id) ? 100 : 10
                                    }}
                                >
                                    {isEditMode && (
                                        <div className="position-absolute top-100 start-50 translate-middle-x mt-1 badge bg-dark text-white" style={{ fontSize: '8px' }}>{region.label}</div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Compact Sidebar for Assessment Modal/Form */}
                    <div className="col-lg-4">
                        <div className="p-3 bg-light rounded-4 h-100 border">
                            <h6 className="fw-bold mb-3 small text-muted text-uppercase">Áreas Sugeridas</h6>
                            <div className="d-flex flex-wrap gap-1 mb-4">
                                {currentRegions.slice(0, 10).map(r => (
                                    <button key={r.id} onClick={() => toggleRegion(r.id)} className={`btn btn-sm rounded-pill px-2 py-1 ${selectedIds.includes(r.id) ? 'btn-primary' : 'btn-outline-secondary opacity-50'}`} style={{ fontSize: '10px' }}>{r.label}</button>
                                ))}
                            </div>

                            {selectedIds.length > 0 && (
                                <div className="mt-4">
                                    <h6 className="fw-bold mb-2 small">Selecionadas:</h6>
                                    <div className="d-flex flex-wrap gap-1">
                                        {selectedIds.map(id => (
                                            <span key={id} className="badge bg-white text-dark border rounded-pill px-2 py-1 shadow-sm small">
                                                {regions.find(reg => reg.id === id)?.label}
                                                <i className="bi bi-x ms-1 cursor-pointer" onClick={() => toggleRegion(id)}></i>
                                            </span>
                                        ))}
                                    </div>
                                    {!hideFormInSelector && (
                                        <button onClick={() => setShowForm(true)} className="btn btn-primary w-100 mt-4 rounded-pill fw-bold py-3 shadow-lg transform-hover">
                                            SOLICITAR AVALIAÇÃO
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 10000, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-4 p-4 shadow-lg w-100" style={{ maxWidth: '400px' }}>
                            <h4 className="fw-bold mb-4">Seus dados</h4>
                            <form onSubmit={handleWhatsAppSubmit}>
                                <div className="mb-3"><input type="text" required placeholder="Seu Nome" className="form-control rounded-pill" onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                                <div className="mb-4"><input type="tel" required placeholder="Seu WhatsApp" className="form-control rounded-pill" onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-light rounded-pill flex-grow-1" onClick={() => setShowForm(false)}>Sair</button>
                                    <button type="submit" className="btn btn-primary rounded-pill flex-grow-1 fw-bold">Enviar</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .pulse-dot { animation: pulse 2s infinite; }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(125, 153, 178, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(125, 153, 178, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(125, 153, 178, 0); }
                }
                .cursor-crosshair { cursor: crosshair; }
                .transform-hover:hover { transform: translateY(-3px); }
            `}</style>
        </div>
    );
}
