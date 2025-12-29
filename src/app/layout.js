import { Nunito_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";

const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Dr. Otto Beckedorff – Ortopedia & Tratamento da Dor",
  description: "Ortopedista especialista em diagnóstico e tratamento da dor na coluna, joelho, quadril e ombro, com foco em procedimentos minimamente invasivos.",
  keywords: "ortopedista dor, tratamento da dor, dor na coluna, radiofrequência, campinas, jacutinga",
  openGraph: {
    title: "Dr. Otto Beckedorff – Ortopedia & Tratamento da Dor",
    description: "Ortopedista especialista em diagnóstico e tratamento da dor musculoesquelética.",
    type: "website",
    url: "https://drotto.com.br",
    locale: "pt_BR",
  },
  alternates: {
    canonical: "https://drotto.com.br",
  },
};

export const viewport = {
  themeColor: "#2a4156",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
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
              "description": "Ortopedista especialista em diagnóstico e tratamento da dor na coluna, joelho, quadril e ombro.",
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
      <body className={nunito.className}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
