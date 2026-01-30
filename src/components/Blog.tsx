"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "../content";

const highlightPosts = [
  {
    slug: "hernia-l4-l5-s1",
    title: "Hérnia L4-L5 e L5-S1: Entenda o laudo",
    excerpt: "Por que estes níveis são os 'vilões' da maioria das dores lombares? Saiba o que significa.",
    category: "Coluna Vertebral",
    image: "/img/blog/l4-l5-s1-hernia.png"
  },
  {
    slug: "dor-ciatica-alivio-rapido",
    title: 'Dor Ciática: Como aliviar rápido?',
    excerpt: "Dicas práticas e posições de alívio para lidar com uma crise aguda em casa.",
    category: "Nervo Ciático",
    image: "/img/blog/sciatica-relief.png"
  },
  {
    slug: "infiltracao-joelho-doi",
    title: 'Infiltração no joelho dói?',
    excerpt: "A verdade sobre o desconforto e como a tecnologia torna o procedimento quase indolor.",
    category: "Joelho",
    image: "/img/blog/knee-injection.png"
  }
];

export default function Blog() {
  const { titulo } = siteContent.blog;

  return (
    <section id="blog-home" className="section-light bg-white py-5">
      <div className="container">

        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center mb-5">
          <span className="text-primary fw-bold text-uppercase small ls-2">Conhecimento que cura</span>
          <h2 className="display-6 fw-bold mt-2 mb-3" style={{ color: 'var(--azul-escuro)' }}>{titulo}</h2>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
            {siteContent.blog.texto}
          </p>
        </div>

        {/* GRID DE DESTAQUES */}
        <div className="row g-4 mb-5">
          {highlightPosts.map((post, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-up overflow-hidden">
                <div className="position-relative" style={{ height: '200px' }}>
                  {/* Usando img tag simples para garantir compatibilidade com paths relativos antigos se next/image falhar */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <span className="badge bg-primary position-absolute top-0 end-0 m-3 rounded-pill shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3 card-title text-dark">
                    <Link href={`/blog/${post.slug}`} className="text-decoration-none text-dark stretched-link">
                      {post.title}
                    </Link>
                  </h5>
                  <p className="text-muted small mb-0">{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CHAMADA PARA O MAPA DE DOR (CTA) */}
        <div className="bg-light p-5 rounded-4 text-center position-relative overflow-hidden border">
          {/* Decoração de fundo */}
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
            style={{ backgroundImage: 'radial-gradient(circle at 10% 10%, #0d6efd 0%, transparent 20%)', pointerEvents: 'none' }}></div>

          <div className="position-relative z-1">
            <i className="bi bi-body-text display-4 text-primary mb-3 d-block"></i>
            <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Onde dói?</h3>
            <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
              Acesse nosso <strong>Mapa de Dor Interativo</strong> criado pelo Dr. Otto e veja os artigos específicos relacionados à sua queixa.
            </p>
            <Link href="/blog#mapa" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm hover-scale">
              Acessar Mapa de Dor <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>

      </div>

      <style jsx>{`
        .hover-up {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-up:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        .hover-scale {
            transition: transform 0.2s;
        }
        .hover-scale:hover {
            transform: scale(1.05);
        }
        .object-fit-cover {
            object-fit: cover;
        }
      `}</style>
    </section>
  );
}