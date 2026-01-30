import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Doctoralia from "@/components/Doctoralia";
import Servicos from "@/components/Servicos";
import Sobre from "@/components/Sobre";
import Listas from "@/components/Listas";
import Contato from "@/components/Contato";
import Localizacao from "@/components/Localizacao";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import PatientJourney from "@/components/PatientJourney";
import StatsBar from "@/components/StatsBar";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main id="topo">
        {/* HERO */}
        <Hero />

        {/* ONDA DE TRANSIÇÃO SUAVE */}
        <div style={{ marginTop: '-60px', position: 'relative', zIndex: 2 }}>
          <WaveDivider position="bottom" fill="#ffffff" />
        </div>

        {/* AGENDAMENTO / DOCTORALIA */}
        <Doctoralia />

        {/* COMO POSSO TE AJUDAR (GRID) */}
        <Servicos />

        {/* JORNADA DO PACIENTE (NOVO) */}
        <PatientJourney />

        {/* SOBRE MIM */}
        <Sobre />

        {/* ESTATÍSTICAS DE AUTORIDADE (NOVO) */}
        <StatsBar />

        {/* DOENÇAS / PUBLICAÇÕES / PRÊMIOS (Ícones + listas) */}
        <Listas />

        {/* DEPOIMENTOS (NOVO) */}
        <Testimonials />

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
