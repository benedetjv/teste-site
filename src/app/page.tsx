import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Doctoralia from "@/components/Doctoralia";
import ServicesTeaser from "@/components/ServicesTeaser";
import AboutTeaser from "@/components/AboutTeaser";
import Localizacao from "@/components/Localizacao";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import PatientJourney from "@/components/PatientJourney";
import StatsBar from "@/components/StatsBar";
import Testimonials from "@/components/Testimonials";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100 overflow-hidden">
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main id="topo">
        {/* HERO (Sem Reveal para carregar instantâneo) */}
        <Hero />

        {/* ONDA DE TRANSIÇÃO SUAVE */}
        <div style={{ marginTop: '-60px', position: 'relative', zIndex: 2 }}>
          <WaveDivider position="bottom" fill="#ffffff" />
        </div>

        <Reveal>
          {/* AGENDAMENTO / DOCTORALIA */}
          <Doctoralia />
        </Reveal>

        <Reveal delay={0.1}>
          {/* ESTATÍSTICAS DE AUTORIDADE */}
          <StatsBar />
        </Reveal>

        <Reveal>
          {/* PROCEDIMENTOS (TEASER) */}
          <ServicesTeaser />
        </Reveal>

        <Reveal>
          {/* JORNADA DO PACIENTE */}
          <PatientJourney />
        </Reveal>



        <Reveal>
          {/* DEPOIMENTOS */}
          <Testimonials />
        </Reveal>

        <Reveal>
          {/* BLOG */}
          <Blog />
        </Reveal>

        <Reveal>
          {/* LOCALIZAÇÃO */}
          <Localizacao />
        </Reveal>
      </main>


      {/* FOOTER */}
      <Footer />
    </div>
  );
}
