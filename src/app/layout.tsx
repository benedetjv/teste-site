import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import SchemaOrganization from '@/components/SchemaOrganization';

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
  metadataBase: new URL("https://drotto.com.br"),
};

export const viewport: Viewport = {
  themeColor: "#2a4156",
  width: "device-width",
  initialScale: 1,
};

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID; // e.g. GTM-XXXXXXX
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18020943185";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager (when GTM Container ID is configured in environment) */}
        {GTM_CONTAINER_ID ? (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'dataLayer','${GTM_CONTAINER_ID}');
            `}
          </Script>
        ) : (
          /* Direct Google tag initialization when GTM is not yet deployed */
          <>
            <Script 
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} 
              strategy="afterInteractive" 
            />
            <Script id="google-ads-tag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={nunito.className} style={{ backgroundColor: '#f8f9fa', position: 'relative' }}>
        {GTM_CONTAINER_ID && (
          <noscript>
            <iframe 
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <SchemaOrganization />
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

        {/* Global Micro-event Delegation (Pushes EXACTLY ONE secondary event per user interaction, NO direct conversion) */}
        <Script id="microevents-listener" strategy="afterInteractive">
          {`
            document.addEventListener('click', function(e) {
              if (e.__handledMicroEvent) return;
              var el = e.target && (e.target.nodeType === 1 ? e.target : e.target.parentElement);
              if (!el || !el.closest) return;

              // 1. WhatsApp click (secondary micro-event)
              var wa = el.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com"], a[href^="whatsapp://"]');
              if (wa) {
                e.__handledMicroEvent = true;
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'click_whatsapp',
                  page_path: window.location.pathname,
                  landing_page: window.location.pathname,
                  cta_location: wa.getAttribute('data-cta-location') || 'general_link',
                  timestamp: new Date().toISOString()
                });
                return;
              }

              // 2. Phone click (secondary micro-event)
              var tel = el.closest('a[href^="tel:"]');
              if (tel) {
                e.__handledMicroEvent = true;
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'click_phone',
                  page_path: window.location.pathname,
                  landing_page: window.location.pathname,
                  cta_location: tel.getAttribute('data-cta-location') || 'header_link',
                  timestamp: new Date().toISOString()
                });
                return;
              }

              // 3. Doctoralia click (secondary micro-event)
              var doc = el.closest('a[href*="doctoralia.com"]');
              if (doc) {
                e.__handledMicroEvent = true;
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'click_doctoralia',
                  page_path: window.location.pathname,
                  landing_page: window.location.pathname,
                  cta_location: doc.getAttribute('data-cta-location') || 'booking_link',
                  timestamp: new Date().toISOString()
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
