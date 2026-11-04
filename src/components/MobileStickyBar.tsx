'use client';

import React from 'react';

interface MobileStickyBarProps {
  campaignType?: string;
  refCode?: string;
}

export default function MobileStickyBar({ campaignType = 'campinas' }: MobileStickyBarProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = document.getElementById('pre-qualificacao');
    if (card) {
      e.preventDefault();
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const nameInput = document.getElementById('prequal-name') as HTMLInputElement;
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 350);
      }
    }
  };

  return (
    <div
      className="d-block d-md-none position-fixed bottom-0 start-0 w-100 p-2 shadow-lg border-top"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 1040,
        paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))'
      }}
    >
      <div className="container-fluid px-2">
        <a
          href="#pre-qualificacao"
          onClick={handleClick}
          data-cta-location="mobile_sticky_bar"
          data-campaign-type={campaignType}
          className="btn btn-success w-100 py-2 fw-bold rounded-pill d-flex align-items-center justify-content-center shadow-sm"
          style={{ backgroundColor: '#25D366', border: 'none', fontSize: '0.95rem' }}
        >
          <i className="bi bi-whatsapp fs-5 me-2"></i> Solicitar Consulta no WhatsApp
        </a>
      </div>
    </div>
  );
}
