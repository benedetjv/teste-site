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
      className="servico-icon-premium"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: svgPath }}
    />
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function Servicos() {
  const { items } = siteContent.servicos;

  return (
    <section id="servicos" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <motion.div
                className="bg-white rounded-4 p-4 h-100 shadow-sm border border-light position-relative overflow-hidden hover-card-premium transition-all"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
              >
                {/* Decorative Element */}
                <div className="position-absolute top-0 end-0 p-3 opacity-10">
                  <i className="bi bi-plus-lg display-1 fw-bold" style={{ color: '#7d99b2' }}></i>
                </div>

                <div className="position-relative z-1">
                  <div className="icon-box-premium mb-4 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(125, 153, 178, 0.1)', color: '#7d99b2', borderRadius: '16px' }}>
                    <ServiceIcon svgPath={item.iconSvgPath} />
                  </div>

                  <h4 className="fw-bold mb-3" style={{ color: '#2a4156', letterSpacing: '-0.5px' }}>
                    {item.titulo}
                  </h4>

                  <p className="text-muted small mb-0" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                    {item.descricao}
                  </p>
                </div>

                {/* Bottom Border Accent */}
                <div className="position-absolute bottom-0 start-0 w-100 accent-bar" style={{ height: '4px', backgroundColor: '#7d99b2', transform: 'scaleX(0)', transition: 'transform 0.3s ease', transformOrigin: 'left' }}></div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .servico-icon-premium {
          width: 32px;
          height: 32px;
        }
        .hover-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.08)!important;
          border-color: rgba(125, 153, 178, 0.3)!important;
        }
        .hover-card-premium:hover .accent-bar {
          transform: scaleX(1);
        }
        .transition-all {
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      `}</style>
    </section>
  );
}