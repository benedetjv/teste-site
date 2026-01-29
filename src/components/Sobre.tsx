import React from "react";
import Image from "next/image";
import { siteContent } from "../content";

export default function Sobre() {
  const { titulo, crmRqe, text1, text2 } = siteContent.sobre;
  const imagePath = "/img/otto-em-procedimento.jpg";

  return (
    <section id="sobre" className="section-light">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <div className="sobre-foto">
              {/* Otimização Image do Next.js (Lazy por padrão) */}
              <Image
                src={imagePath}
                alt="Dr. Otto Beckedorff em procedimento"
                width={600}
                height={400}
                className="img-fluid"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <h2>{titulo}</h2>
            <p><strong>{crmRqe}</strong></p>
            <p>{text1}</p>
            <p>{text2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}