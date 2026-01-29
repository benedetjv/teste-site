import React from "react";
import Link from "next/link";
import { siteContent } from "../content";

export default function Blog() {
  const { titulo } = siteContent.blog;
  return (
    <section id="blog" className="section-light">
      <div className="container text-center">
        <h2 className="section-title">{titulo}</h2>
        <p className="mb-4">Confira nossos artigos e novidades sobre saúde da coluna e tratamento da dor.</p>
        <Link href="/blog" className="btn btn-outline-primary rounded-pill px-4">
          Acessar o Blog
        </Link>
      </div>
    </section>
  );
}