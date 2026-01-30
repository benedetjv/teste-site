import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dr. Otto Beckedorff – Ortopedia & Tratamento da Dor",
  description: "Ortopedista com foco em diagnóstico e tratamento da dor na coluna, joelho, quadril e ombro, e procedimentos minimamente invasivos.",
  keywords: "ortopedista dor, tratamento da dor, dor na coluna, radiofrequência, campinas, jacutinga",
  openGraph: {
    title: "Dr. Otto Beckedorff – Ortopedia & Tratamento da Dor",
    description: "Ortopedista com foco em diagnóstico e tratamento da dor musculoesquelética.",
    type: "website",
    url: "https://drotto.com.br",
    locale: "pt_BR",
    images: [
      {
        url: '/img/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Otto Beckedorff',
      }
    ],
  },
  icons: {
    icon: '/img/favicon.png',
    shortcut: '/img/favicon.png',
    apple: '/img/favicon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/img/favicon.png',
    },
  },
  alternates: {
    canonical: "https://drotto.com.br",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a4156",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Otto Beckedorff",
              "image": "https://drotto.com.br/img/foto-otto.jpg",
              "@id": "https://drotto.com.br/",
              "url": "https://drotto.com.br",
              "telephone": "+5519999439824",
              "description": "Ortopedista com foco em diagnóstico e tratamento da dor na coluna, joelho, quadril e ombro.",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Av. Andrade Neves, 699 – 6º Andar – Centro",
                  "addressLocality": "Campinas",
                  "addressRegion": "SP",
                  "postalCode": "13013-161",
                  "addressCountry": "BR"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Av. Minas Gerais, 981",
                  "addressLocality": "Jacutinga",
                  "addressRegion": "MG",
                  "postalCode": "37590-000",
                  "addressCountry": "BR"
                }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -22.90655,
                "longitude": -47.0626
              },
              "sameAs": [
                "https://www.instagram.com/drottobeckedorff/",
                "https://www.doctoralia.com.br/otto-beckedorff/ortopedista-traumatologista/campinas"
              ]
            })
          }}
        />
      </head>
      <body className={nunito.className} style={{ backgroundColor: '#f8f9fa', position: 'relative' }}>
        {/* Fundo Premium Sutil */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'radial-gradient(circle at 15% 15%, rgba(42, 65, 86, 0.04) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(46, 139, 87, 0.04) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
