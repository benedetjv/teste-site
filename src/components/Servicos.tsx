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
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <motion.path
        d="M9 12l2 2 4-4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  </IconWrapper>
);

// 2. Infiltrações / Bloqueios (Efeito Líquido / Drop)
const IconLiquido = ({ isGel = false }: { isGel?: boolean }) => (
  <IconWrapper color={isGel ? "#39586d" : "#7d99b2"}>
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 3a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" />
      <motion.circle
        cx="12" cy="11" r="2"
        fill="currentColor"
        animate={isGel ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : { y: [0, 5, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: isGel ? 3 : 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {isGel && (
        <motion.path
          d="M8 11c0 2 1.5 3 4 3s4-1 4-3"
          animate={{ d: ["M8 11c0 2 1.5 3 4 3s4-1 4-3", "M8 12c0 3 1.5 4 4 4s4-1 4-3", "M8 11c0 2 1.5 3 4 3s4-1 4-3"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}
    </svg>
  </IconWrapper>
);

// 3. Radiofrequência Ablativa (Ponto de calor / Queimando)
const IconAblativa = () => (
  <IconWrapper color="#e67e22">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <motion.circle
        cx="12" cy="12" r="2"
        fill="#e74c3c"
        animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0.2, 0.8], filter: ["blur(0px)", "blur(4px)", "blur(0px)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M12 8v-2M12 18v-2M8 12h-2M18 12h-2"
        animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  </IconWrapper>
);

// 4. Radiofrequência Pulsada (Efeito Pulso)
const IconPulsada = () => (
  <IconWrapper color="#2980b9">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h4l2 6 4-12 2 6h8" />
      <motion.circle
        cx="12" cy="12" r="1"
        strokeWidth="1"
        animate={{ r: [1, 20], opacity: [1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx="12" cy="12" r="1"
        strokeWidth="1"
        animate={{ r: [1, 20], opacity: [1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />
    </svg>
  </IconWrapper>
);

const getIcon = (titulo: string) => {
  const t = titulo.toLowerCase();
  if (t.includes('avaliação') || t.includes('avaliacao')) return <IconAvaliacao />;
  if (t.includes('viscossuplementação') || t.includes('viscossuplementacao')) return <IconLiquido isGel={true} />;
  if (t.includes('ablativa')) return <IconAblativa />;
  if (t.includes('pulsada')) return <IconPulsada />;
  if (t.includes('infiltração') || t.includes('bloqueio') || t.includes('infiltracao')) return <IconLiquido />;
  return <IconAvaliacao />;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  })
};

export default function Servicos() {
  const { items } = siteContent.servicos;

  return (
    <section id="servicos" className="py-5" style={{ backgroundColor: '#fcfcfc' }}>
      <div className="container py-4">
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <motion.div
                className="card-procedimento h-100 p-4 p-md-5 rounded-4 position-relative transition-all"
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -10 }}
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                }}
              >
                {/* Micro-Animation Icon Container */}
                <div className="d-flex justify-content-center mb-2">
                  {getIcon(item.titulo)}
                </div>

                <h4 className="text-center mb-3" style={{
                  fontFamily: '"Safira March", serif',
                  color: '#2a4156',
                  fontSize: '1.35rem',
                  lineHeight: '1.2'
                }}>
                  {item.titulo}
                </h4>

                <p className="text-muted text-center mb-0" style={{
                  lineHeight: '1.7',
                  fontSize: '0.95rem',
                  fontWeight: '400'
                }}>
                  {item.descricao}
                </p>

                {/* Subtle Decorative Hover Effect */}
                <div className="hover-accent" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .card-procedimento {
          overflow: hidden;
          z-index: 1;
        }
        .card-procedimento:hover {
          border-color: #7d99b2 !important;
          box-shadow: 0 20px 50px rgba(42, 65, 86, 0.08) !important;
        }
        .hover-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #7d99b2;
          transform: scaleX(0);
          transition: transform 0.4s ease;
          transform-origin: left;
        }
        .card-procedimento:hover .hover-accent {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
}