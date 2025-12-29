import React from "react";
import { siteContent } from "../content";

export default function Blog() {
  const { titulo, texto } = siteContent.blog;
  return (
    <section id="blog" className="section-light">
      <div className="container text-center">
        <h2 className="section-title">{titulo}</h2>
        <p>{texto}</p>
      </div>
    </section>
  );
}