"use client";

import React from "react";
import { siteContent } from "../content";
import { motion, Variants } from "framer-motion";

interface ServiceIconProps {
  svgPath: string;
}

// Componente para renderizar o ícone SVG (seguro com dangerouslySetInnerHTML)
function ServiceIcon({ svgPath }: ServiceIconProps) {
  return (
    <svg
      className="servico-icon-custom"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Utilizamos dangerouslySetInnerHTML para renderizar o código SVG puro
      dangerouslySetInnerHTML={{ __html: svgPath }}
    />
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -5,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 }
  }
};

export default function Servicos() {
  const { titulo, items } = siteContent.servicos;

  return (
    <section id="servicos" className="section-light">


      <div className="servicos-grid">
        <div className="servicos-grid-inner">
          <div className="row g-0">
            {items.map((item, index) => (
              <div className="col-md-4 servico-card" key={index}>
                <motion.div
                  className="servico-card-inner"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                  style={{ height: '100%' }} // Garante altura completa para o hover effect ficar bonito
                >
                  <motion.div
                    className="icon-wrapper"
                    variants={{
                      hover: { scale: 1.1, color: "#39586d" } // Efeito scale no ícone
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ServiceIcon svgPath={item.iconSvgPath} />
                  </motion.div>
                  <h3 className="servico-titulo">{item.titulo}</h3>
                  <p className="servico-descricao">{item.descricao}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}