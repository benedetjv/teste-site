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
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: svgPath }}
    />
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function Servicos() {
  const { items } = siteContent.servicos;

  return (
    <section id="servicos" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="row g-0 border-top border-start" style={{ borderColor: '#eee' }}>
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6 border-end border-bottom" key={index} style={{ borderColor: '#eee' }}>
              <motion.div
                className="p-5 h-100 hover-subtle transition-all"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
              >
                <div className="mb-4 d-inline-block p-3 rounded-circle" style={{ backgroundColor: '#fcfdfe', color: '#7d99b2' }}>
                  <ServiceIcon svgPath={item.iconSvgPath} />
                </div>

                <h4 className="fw-bold mb-3" style={{ color: '#2a4156', fontSize: '1.15rem', letterSpacing: '-0.2px' }}>
                  {item.titulo}
                </h4>

                <p className="text-muted mb-0" style={{ lineHeight: '1.8', fontSize: '0.9rem', fontWeight: '400' }}>
                  {item.descricao}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .servico-icon-premium {
          width: 36px;
          height: 36px;
        }
        .hover-subtle {
          background-color: transparent;
          transition: background-color 0.4s ease, transform 0.4s ease;
        }
        .hover-subtle:hover {
          background-color: #fafafa;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}