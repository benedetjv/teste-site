import React from "react";
import { siteContent } from "../content";

// Componente para renderizar uma única coluna de lista
function ListColumn({ data }) {
  return (
    <div className="col-lg-4 col-md-6 lista-coluna bloco-lista">
      <div className="lista-cabecalho text-center">
        <i className={`bi ${data.iconClass} servico-icon`}></i>
        <h3 className="lista-coluna-titulo">{data.titulo}</h3>
      </div>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Listas() {
  const { doencas, publicacoes, premios } = siteContent.listas;

  return (
    <section className="section-light">
      <div className="container">
        <div className="row g-4">
          <ListColumn data={doencas} />
          <ListColumn data={publicacoes} />
          <ListColumn data={premios} />
        </div>
      </div>
    </section>
  );
}