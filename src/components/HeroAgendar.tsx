import React from "react";
import { siteContent } from "../content";

export default function Header() {
  const { logoText, menu } = siteContent.header;

  return (
    <header className="navbar navbar-expand-lg navbar-dark py-3">
      <div className="container">
        <a className="navbar-brand titulo-destaque" href="#home">
          {logoText}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <nav className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto">
            {menu.map((item) => (
              <li className="nav-item" key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
