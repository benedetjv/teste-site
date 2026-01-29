import React from "react";
import Link from "next/link";
import { siteContent } from "../content";

export default function Blog() {
  const { titulo } = siteContent.blog;
  return (
    <section id="blog-home" className="section-light">
      <div className="container text-center">
        <h2 className="section-title">{titulo}</h2>
        <p className="mb-4">{siteContent.blog.texto}</p>
        <Link href="/blog" className="btn btn-outline-primary rounded-pill px-4">
          Acessar o Blog
        </Link>
      </div>
    </section>
  );
}