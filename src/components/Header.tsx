"use client";

import Link from "next/link";
import Image from "next/image";
import { siteContent } from "../content";
import { useState, useEffect } from "react";

export default function Header() {
  const { logoText, logoPath, menu } = siteContent.header;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed-top transition-all duration-300 ${isScrolled ? "shadow-sm" : ""}`}
        style={{
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
          transition: "all 0.3s ease",
          zIndex: 1030
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          <div className="container">
            <Link className="navbar-brand" href="/">
              <Image
                src={`/${logoPath}`}
                alt={`Logo ${logoText}`}
                className="logo-img"
                width={250}
                height={60}
                priority
                style={{ width: "auto", height: "50px", objectFit: 'contain' }} // Logo um pouco menor para elegância
              />
            </Link>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-label="Alternar navegação"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav align-items-center gap-3">
                {menu.map((item) => (
                  <li className="nav-item position-relative" key={item.href}>
                    <Link
                      className="nav-link fw-bold text-uppercase small ls-1 nav-link-custom"
                      href={item.href}
                      style={{ color: 'var(--azul-escuro)', letterSpacing: '1px', fontSize: '0.85rem' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                {/* Botão de Agendamento no Header (Opcional - mas fica moderno) */}
                <li className="nav-item ms-lg-3">
                  <a
                    href="https://wa.me/5519999439824"
                    target="_blank"
                    className="btn btn-primary rounded-pill px-4 btn-sm fw-bold shadow-sm"
                    style={{ backgroundColor: 'var(--azul-principal)', borderColor: 'var(--azul-principal)' }}
                  >
                    Agendar <i className="bi bi-whatsapp ms-1"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer para não esconder o conteúdo sob o fixed header */}
      <div style={{ height: '90px' }}></div>

      <style jsx global>{`
        .nav-link-custom {
            position: relative;
            padding-bottom: 2px;
        }
        .nav-link-custom::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0px;
            left: 0;
            background-color: var(--azul-principal);
            transition: width 0.3s ease;
        }
        .nav-link-custom:hover::after {
            width: 100%;
        }
        .nav-link-custom:hover {
            color: var(--azul-principal) !important;
        }
      `}</style>
    </>
  );
}