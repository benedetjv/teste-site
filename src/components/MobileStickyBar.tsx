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
    <aside
      aria-label="Atendimento rápido no WhatsApp"
      className="position-fixed"
      style={{
        bottom: '22px',
        right: '18px',
        zIndex: 1050
      }}
    >
      <a
        href="#pre-qualificacao"
        onClick={handleClick}
        data-cta-location="mobile_sticky_bar"
        data-campaign-type={campaignType}
        className="btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center text-white text-decoration-none"
        style={{
          width: '58px',
          height: '58px',
          backgroundColor: '#25D366',
          border: '2px solid #ffffff',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer'
        }}
        aria-label="Solicitar Consulta no WhatsApp"
        title="Falar no WhatsApp com a equipe"
      >
        <i className="bi bi-whatsapp" style={{ fontSize: '1.9rem', lineHeight: 1 }}></i>
      </a>
    </aside>
  );
}
