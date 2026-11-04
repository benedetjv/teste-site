'use client';

import React, { useState, useEffect } from 'react';
import { getStoredUtms, initUtmCapture } from '@/lib/tracking';

interface WhatsAppDirectButtonProps {
  className?: string;
  style?: React.CSSProperties;
  location?: string;
  campaignType?: string;
  children?: React.ReactNode;
}

export default function WhatsAppDirectButton({
  className = 'btn btn-success btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center text-center',
  style = { backgroundColor: '#25D366', border: 'none', fontSize: '1.05rem' },
  location = 'hero_primary_whatsapp',
  campaignType = 'campinas',
  children
}: WhatsAppDirectButtonProps) {
  const [refCode, setRefCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('drotto_ref_code') || '';
      } catch {
        return '';
      }
    }
    return '';
  });

  useEffect(() => {
    initUtmCapture();
    if (!refCode) {
      const utms = getStoredUtms();
      fetch('/api/session/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_path: window.location.pathname,
          landing_page: window.location.pathname,
          ...utms
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ref_code) {
          try {
            sessionStorage.setItem('drotto_ref_code', data.ref_code);
          } catch {}
          setRefCode(data.ref_code);
        }
      })
      .catch(() => {});
    }
  }, [refCode]);

  const refSuffix = refCode ? ` [Ref: ${refCode}]` : '';
  const messageText = `Olá! Vim pelo Google e gostaria de solicitar uma consulta em Campinas.${refSuffix}`;
  const whatsappUrl = `https://wa.me/5519999439824?text=${encodeURIComponent(messageText)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-location={location}
      data-campaign-type={campaignType}
      className={className}
      style={style}
    >
      {children || (
        <>
          <i className="bi bi-whatsapp fs-5 me-2"></i> Solicitar Consulta pelo WhatsApp
        </>
      )}
    </a>
  );
}
