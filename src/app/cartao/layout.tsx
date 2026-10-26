import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Otto Beckedorff | Cartão de Visita Digital & Agendamentos",
  description:
    "Facilitador oficial do Dr. Otto Beckedorff: agendamento de consultas via Doctoralia ou WhatsApp, agendamento de RM no Vera Cruz e CDE, rotas com Waze e tratamentos.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Dr. Otto Beckedorff | Cartão de Visita Digital",
    description: "Agendamento rápido de consultas, exames de RM, rotas no Waze e tratamentos.",
    url: "https://drotto.com.br/cartao",
    siteName: "Dr. Otto Beckedorff",
    locale: "pt_BR",
    type: "profile",
    images: [
      {
        url: "/img/foto-otto.jpg",
        width: 800,
        height: 800,
        alt: "Dr. Otto Beckedorff - Cartão de Visita Digital",
      },
    ],
  },
};

export default function CartaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
