import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Doctoralia from "./components/Doctoralia";
import Servicos from "./components/Servicos";
import Sobre from "./components/Sobre";
import Listas from "./components/Listas";
import Contato from "./components/Contato";
import Localizacao from "./components/Localizacao";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main id="topo">
        {/* HERO */}
        <Hero />
        
        {/* AGENDAMENTO / DOCTORALIA */}
        <Doctoralia />

        {/* COMO POSSO TE AJUDAR (GRID) */}
        <Servicos />

        {/* SOBRE MIM */}
        <Sobre />
        
        {/* DOENÇAS / PUBLICAÇÕES / PRÊMIOS (Ícones + listas) */}
        <Listas />

        {/* CONTATO (LIMPO E ORGANIZADO) */}
        <Contato />

        {/* LOCALIZAÇÃO (duas clínicas) */}
        <Localizacao />

        {/* BLOG */}
        <Blog />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;