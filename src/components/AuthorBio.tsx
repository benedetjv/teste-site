
import React from 'react';
import { siteContent } from '@/content';

export default function AuthorBio() {
    const { sobre, contato } = siteContent;
    const whatsappLink = contato.clinicas[1].whatsappLink; // Using Adora/Campinas as default or verify logic

    return (
        <div className="mt-5 pt-4 border-top">
            <div className="d-flex flex-column flex-md-row align-items-center gap-4 p-4 rounded-4" style={{ backgroundColor: '#f8fbfe', border: '1px solid #eef2f6' }}>
                <div className="flex-shrink-0 position-relative">
                    <img
                        src={`/${sobre.image}`}
                        alt="Dr. Otto Beckedorff"
                        className="rounded-circle shadow-sm object-fit-cover"
                        style={{ width: '120px', height: '120px', border: '4px solid white' }}
                    />
                    <div className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <i className="bi bi-patch-check-fill text-primary"></i>
                    </div>
                </div>
                <div className="text-center text-md-start flex-grow-1">
                    <h6 className="text-uppercase fw-bold text-primary small mb-1" style={{ letterSpacing: '1px' }}>Escrito por</h6>
                    <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--azul-escuro)' }}>Dr. Otto Beckedorff</h3>
                    <p className="small text-muted mb-3 fw-medium">{sobre.crmRqe}</p>
                    <p className="mb-0 small text-secondary" style={{ lineHeight: '1.6' }}>{sobre.text1}</p>
                    <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm text-white rounded-pill px-4 py-2 fw-bold shadow-sm transition-all hover-scale" style={{ backgroundColor: 'var(--azul-medio)' }}>
                            <i className="bi bi-whatsapp me-2"></i> Agendar Consulta
                        </a>
                        <a href="https://www.instagram.com/drottobeckedorff/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 fw-bold border-0" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
