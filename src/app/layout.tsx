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
const GOOGLE_ADS_CONVERSION_LABEL = "NOStCM78h4ocENGKh5FD";
const GOOGLE_ADS_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Direct WhatsApp High-Reliability Core Engine (Always Available from Millisecond Zero) */}
        <Script id="direct-whatsapp-core" strategy="beforeInteractive">
          {`
            (function() {
              window.GOOGLE_ADS_ID = 'AW-18020943185';
              window.GOOGLE_ADS_CONVERSION_LABEL = 'NOStCM78h4ocENGKh5FD';
              window.GOOGLE_ADS_SEND_TO = 'AW-18020943185/NOStCM78h4ocENGKh5FD';

              window.__handleDirectWhatsAppClick = function(e, targetEl) {
                if (e) {
                  if (e.preventDefault) e.preventDefault();
                  if (e.stopPropagation) e.stopPropagation();
                }
                if (window.__WHATSAPP_CLICK_BUSY__) return false;
                window.__WHATSAPP_CLICK_BUSY__ = true;

                // 1. Generate token with 96-bit entropy: C-XXXX-XXXX-XXXX
                var CHARSET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
                var chars = '';
                if (window.crypto && window.crypto.getRandomValues) {
                  var b = new Uint8Array(12);
                  window.crypto.getRandomValues(b);
                  for (var i = 0; i < 12; i++) chars += CHARSET[b[i] % CHARSET.length];
                } else {
                  for (var j = 0; j < 12; j++) chars += CHARSET[Math.floor(Math.random() * CHARSET.length)];
                }
                var refCode = 'C-' + chars.slice(0, 4) + '-' + chars.slice(4, 8) + '-' + chars.slice(8, 12);
                try { sessionStorage.setItem('drotto_ref_code', refCode); } catch(ex) {}

                // 2. Parse UTMs & Click IDs from URL or sessionStorage
                var params = new URLSearchParams(window.location.search);
                var gclid = params.get('gclid') || '';
                var gbraid = params.get('gbraid') || '';
                var wbraid = params.get('wbraid') || '';
                var utm_source = params.get('utm_source') || '';
                var utm_medium = params.get('utm_medium') || '';
                var utm_campaign = params.get('utm_campaign') || '';
                var utm_content = params.get('utm_content') || '';
                var utm_term = params.get('utm_term') || '';

                // Check stored values if not in query
                if (!gclid) try { gclid = sessionStorage.getItem('drotto_gclid') || ''; } catch(ex) {}
                if (!utm_source) try { utm_source = sessionStorage.getItem('drotto_utm_source') || ''; } catch(ex) {}
                if (!utm_medium) try { utm_medium = sessionStorage.getItem('drotto_utm_medium') || ''; } catch(ex) {}
                if (!utm_campaign) try { utm_campaign = sessionStorage.getItem('drotto_utm_campaign') || ''; } catch(ex) {}

                // 3. Dispatch DataLayer event exactly as specified
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'click_whatsapp',
                  lead_reference: refCode,
                  landing_page: window.location.pathname,
                  gclid_present: Boolean(gclid)
                });

                // 4. Dispatch Google Ads conversion event with exact conversion label: AW-18020943185/NOStCM78h4ocENGKh5FD
                if (typeof window.gtag === 'function') {
                  try {
                    window.gtag('event', 'click_whatsapp', {
                      send_to: 'AW-18020943185/NOStCM78h4ocENGKh5FD',
                      lead_reference: refCode,
                      landing_page: window.location.pathname,
                      gclid_present: Boolean(gclid)
                    });
                    window.gtag('event', 'conversion', {
                      send_to: 'AW-18020943185/NOStCM78h4ocENGKh5FD',
                      lead_reference: refCode
                    });
                  } catch(gtagErr) {}
                }

                // 5. WhatsApp message
                var textMsg = "Olá! Gostaria de solicitar uma consulta em Campinas com o Dr. Otto Beckedorff.\\n\\n[Ref: " + refCode + "]";
                var waUrl = "https://wa.me/5519999439824?text=" + encodeURIComponent(textMsg);

                // 6. Persist to DB in background
                var isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                var payload = JSON.stringify({
                  ref_code: refCode,
                  page_path: window.location.pathname,
                  landing_page: window.location.pathname,
                  utm_source: utm_source,
                  utm_medium: utm_medium,
                  utm_campaign: utm_campaign,
                  utm_content: utm_content,
                  utm_term: utm_term,
                  gclid: gclid,
                  gbraid: gbraid,
                  wbraid: wbraid,
                  device_type: isMobileUA ? 'mobile' : 'desktop',
                  event_name: 'click_whatsapp'
                });

                if (navigator.sendBeacon) {
                  navigator.sendBeacon('/api/session/click', new Blob([payload], { type: 'application/json' }));
                } else {
                  try {
                    fetch('/api/session/click', { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true });
                  } catch(ex2) {}
                }

                // 7. Update UI to Contingency Screen with "Abrir WhatsApp agora"
                var container = document.getElementById('prequal-card-content');
                if (container) {
                  container.innerHTML = '<div id="contingency-screen" class="py-2 text-center" style="animation: fadeInSlide 0.25s ease-out;">' +
                    '<div class="alert alert-success py-3 px-3 rounded-4 mb-3 shadow-sm border-0 bg-success bg-opacity-10 text-success">' +
                      '<i class="bi bi-check-circle-fill fs-3 d-block mb-2 text-success"></i>' +
                      '<div class="fw-bold mb-1" style="font-size:1.05rem">Conectando ao WhatsApp...</div>' +
                      '<p class="small mb-2 text-dark opacity-75" style="font-size:0.85rem">Se a conversa não abriu automaticamente, toque no botão abaixo:</p>' +
                      '<a id="contingency-whatsapp-btn" data-cta-location="prequal_card_success_whatsapp" href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-success btn-lg w-100 rounded-pill py-3 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2" style="background-color:#25D366;border:none;font-size:1.05rem;min-height:52px;color:#fff;text-decoration:none;">' +
                        '<i class="bi bi-whatsapp fs-5"></i> Abrir WhatsApp agora' +
                      '</a>' +
                    '</div>' +
                    '<div class="text-muted small" style="font-size:0.78rem">Código de atendimento gerado: <strong class="text-dark font-monospace">' + refCode + '</strong></div>' +
                  '</div>';
                }

                // 8. Open WhatsApp in new window/app while preserving contingency screen
                var opened = false;
                try {
                  var w = window.open(waUrl, '_blank');
                  if (w && !w.closed) opened = true;
                } catch(ex) {}

                if (!opened) {
                  setTimeout(function() {
                    try { window.location.href = waUrl; } catch(navErr) {}
                  }, 600);
                }

                return false;
              };
            })();
          `}
        </Script>

        {/* Hydration Error Monitor & Diagnostic Listener */}
        <Script id="hydration-monitor" strategy="beforeInteractive">
          {`
            (function() {
              window.__HYDRATION_ERRORS__ = [];
              window.addEventListener('error', function(event) {
                var msg = (event && event.message) ? String(event.message) : '';
                if (msg.indexOf('Hydration') !== -1 || msg.indexOf('hydrat') !== -1 || msg.indexOf('Minified React error') !== -1) {
                  console.error('[Hydration Monitor] Captured error:', msg);
                  window.__HYDRATION_ERRORS__.push({
                    type: 'error',
                    message: msg,
                    time: new Date().toISOString()
                  });
                  var fb = document.getElementById('prequal-emergency-fallback');
                  if (fb) fb.style.display = 'block';
                }
              });
              window.addEventListener('unhandledrejection', function(event) {
                var reason = event && event.reason ? String(event.reason.message || event.reason) : '';
                if (reason.indexOf('Hydration') !== -1 || reason.indexOf('hydrat') !== -1 || reason.indexOf('chunk') !== -1) {
                  console.error('[Hydration Monitor] Captured rejection:', reason);
                  window.__HYDRATION_ERRORS__.push({
                    type: 'unhandledrejection',
                    message: reason,
                    time: new Date().toISOString()
                  });
                  var fb = document.getElementById('prequal-emergency-fallback');
                  if (fb) fb.style.display = 'block';
                }
              });
            })();
          `}
        </Script>

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

              // 0. Primary Direct WhatsApp CTA
              var directBtn = el.closest('#whatsapp-direct-btn, [data-direct-whatsapp="true"]');
              if (directBtn) {
                e.__handledMicroEvent = true;
                if (window.__handleDirectWhatsAppClick) {
                  return window.__handleDirectWhatsAppClick(e, directBtn);
                }
              }

              // 1. WhatsApp click (secondary micro-event)
              var wa = el.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com"], a[href^="whatsapp://"]');
              if (wa) {
                e.__handledMicroEvent = true;
                var waPayload = {
                  event: 'click_whatsapp',
                  page_path: window.location.pathname,
                  landing_page: window.location.pathname,
                  cta_location: wa.getAttribute('data-cta-location') || 'general_link',
                  timestamp: new Date().toISOString()
                };
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(waPayload);
                if (typeof window.gtag === 'function') {
                  try {
                    window.gtag('event', 'click_whatsapp', {
                      ...waPayload,
                      send_to: 'AW-18020943185/NOStCM78h4ocENGKh5FD'
                    });
                    window.gtag('event', 'conversion', {
                      send_to: 'AW-18020943185/NOStCM78h4ocENGKh5FD'
                    });
                  } catch (e) {}
                }
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
