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

        {/* ESTATÍSTICAS DE AUTORIDADE */}
        <StatsBar />

        {/* PROCEDIMENTOS (TEASER) */}
        <ServicesTeaser />

        {/* JORNADA DO PACIENTE */}
        <PatientJourney />

        {/* SOBRE MIM (TEASER) */}
        <AboutTeaser />

        {/* DEPOIMENTOS */}
        <Testimonials />

        {/* BLOG */}
        <Blog />

        {/* LOCALIZAÇÃO (IMPORTANTE NA HOME) */}
        <Localizacao />
      </main>


      {/* FOOTER */}
      <Footer />
    </div>
  );
}
