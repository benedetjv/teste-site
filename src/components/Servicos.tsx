"use client";

import React from "react";
import { siteContent } from "../content";
import { motion, Variants } from "framer-motion";

// --- Custom Animated Icons for each Service ---

const IconWrapper = ({ children, color = "#7d99b2" }: { children: React.ReactNode, color?: string }) => (
  <div className="mb-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', color }}>
    {children}
  </div>
);

// 1. Avaliação Ortopédica (Checklist Animada)
const IconAvaliacao = () => (
  <IconWrapper>
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2.5" />
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2.5" />
      <motion.path
        d="M9 14l2 2 4-4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
      />
    </svg>
  </IconWrapper>
);

// 2. Infiltrações / Bloqueios (Efeito Líquido / Seringa Sutil)
const IconLiquido = () => (
  <IconWrapper>
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l6 6M10 2l-8 8" opacity="0.3" />
      <path d="M12 4l9 9" />
      <path d="M16 8l-6 6" />
      <motion.circle
        cx="14" cy="14" r="1.5"
        fill="currentColor"
        animate={{ y: [0, 6], opacity: [1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="14" cy="14" r="1"
        fill="currentColor"
        animate={{ y: [0, 8], opacity: [0.8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
    </svg>
  </IconWrapper>
);

// 3. Viscossuplementação (Efeito GEL Denso)
const IconGel = () => (
  <IconWrapper color="#34495e">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-8 4.5-8 11.5a8 8 0 1 0 16 0C20 6.5 12 2 12 2z" strokeWidth="1" />
      <motion.path
        d="M12 8c-2 0-3 1.5-3 3.5s1 3.5 3 3.5 3-1.5 3-3.5S14 8 12 8z"
        fill="rgba(125, 153, 178, 0.2)"
        animate={{
          scale: [1, 1.1, 0.95, 1],
          d: ["M12 8c-2 0-3 1.5-3 3.5s1 3.5 3 3.5 3-1.5 3-3.5S14 8 12 8z",
            "M12 9c-2.5 0-3.5 1.5-3.5 4s1.5 4.5 3.5 4.5 3.5-2 3.5-4.5-1-4-3.5-4z",
            "M12 8c-2 0-3 1.5-3 3.5s1 3.5 3 3.5 3-1.5 3-3.5S14 8 12 8z"]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12" cy="14" r="3"
        fill="currentColor"
        opacity="0.2"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </svg>
  </IconWrapper>
);

// 4. Radiofrequência Ablativa (Calor / Ponto Central)
const IconAblativa = () => (
  <IconWrapper color="#d35400">
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <motion.circle
        cx="12" cy="12" r="2"
        fill="#e67e22"
        animate={{ scale: [1, 3, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="12" cy="12" r="1.5"
        fill="#c0392b"
        animate={{ scale: [1, 4, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
    </svg>
  </IconWrapper>
);

// 5. Radiofrequência Pulsada (Ondas / Pulso)
const IconPulsada = () => (
  <IconWrapper color="#2980b9">
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <motion.circle
        cx="12" cy="12" r="2"
        animate={{ r: [2, 10], opacity: [1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx="12" cy="12" r="2"
        animate={{ r: [2, 10], opacity: [1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
      />
    </svg>
  </IconWrapper>
);

const getIcon = (titulo: string) => {
  const t = titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents for safer matching
  if (t.includes('avaliacao')) return <IconAvaliacao />;
  if (t.includes('viscos')) return <IconGel />;
  if (t.includes('ablativa')) return <IconAblativa />;
  if (t.includes('pulsada')) return <IconPulsada />;
  if (t.includes('infiltr') || t.includes('bloqueio')) return <IconLiquido />;
  return <IconAvaliacao />;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

export default function Servicos() {
  const { items } = siteContent.servicos;

  return (
    <section id="servicos" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container py-4">
        <div className="row g-4 pt-2">
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <motion.div
                className="procedimento-modern-card h-100 p-4 p-md-5 rounded-4 position-relative transition-all d-flex flex-column align-items-center text-center"
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -8 }}
                viewport={{ once: true, margin: "-50px" }}
                variants={itemVariants}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                }}
              >
                {/* Animation Icon Area */}
                <div className="icon-stage mb-2">
                  {getIcon(item.titulo)}
                </div>

                <h4 className="fw-bold mb-3" style={{
                  color: '#2a4156',
                  fontSize: '1.2rem',
                  lineHeight: '1.3'
                }}>
                  {item.titulo}
                </h4>

                <p className="text-muted mb-0 flex-grow-1" style={{
                  lineHeight: '1.7',
                  fontSize: '0.95rem'
                }}>
                  {item.descricao}
                </p>

                {/* Subtle Brand Accent */}
                <div className="accent-pill mt-4" style={{ width: '30px', height: '3px', backgroundColor: '#7d99b2', borderRadius: '10px' }}></div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .procedimento-modern-card:hover {
          border-color: #e0e0e0 !important;
          box-shadow: 0 15px 40px rgba(42, 65, 86, 0.06) !important;
        }
        .icon-stage {
          transition: transform 0.3s ease;
        }
        .procedimento-modern-card:hover .icon-stage {
          transform: scale(1.1);
        }
        .transition-all {
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      `}</style>
    </section>
  );
}