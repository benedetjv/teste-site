"use client";

import React from "react";
import { siteContent } from "../content";
import { motion, Variants } from "framer-motion";

interface ServiceIconProps {
  svgPath: string;
}

function ServiceIcon({ svgPath }: ServiceIconProps) {
  return (
    <svg
      className="servico-icon-elegant"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: svgPath }}
    />
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.610, 0.355, 1.000]
    }
  })
};

export default function Servicos() {
  const { items } = siteContent.servicos;

  return (
    <section id="servicos" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="row g-4 pt-4">
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <motion.div
                className="h-100 p-4 p-md-5 rounded-4 border-0 position-relative hover-elegant-card transition-all"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={itemVariants}
                style={{ backgroundColor: '#fff', border: '1px solid #f2f2f2' }}
              >
                {/* Accent Detail */}
                <div className="accent-line position-absolute start-0 top-0 bottom-0" style={{ width: '4px', backgroundColor: '#7d99b2', borderRadius: '4px 0 0 4px', opacity: 0, transition: 'opacity 0.3s ease' }}></div>

                <div className="mb-4 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', color: '#7d99b2', transition: 'transform 0.3s ease' }}>
                  <ServiceIcon svgPath={item.iconSvgPath} />
                </div>

                <h4 className="fw-bold mb-3" style={{ color: '#2a4156', fontSize: '1.25rem', lineHeight: '1.3' }}>
                  {item.titulo}
                </h4>

                <p className="text-muted mb-0" style={{ lineHeight: '1.8', fontSize: '1rem', fontWeight: '300' }}>
                  {item.descricao}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .servico-icon-elegant {
          width: 44px;
          height: 44px;
        }
        .hover-elegant-card {
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          cursor: default;
        }
        .hover-elegant-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          border-color: #eee !important;
        }
        .hover-elegant-card:hover .accent-line {
          opacity: 1 !important;
        }
        .hover-elegant-card:hover svg {
          transform: scale(1.1);
        }
        .transition-all {
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      `}</style>
    </section>
  );
}