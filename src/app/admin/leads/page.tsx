import { notFound } from 'next/navigation';

/**
 * Painel Administrativo Web Desativado (Zero Web Attack Surface)
 * Por conformidade rigorosa com a LGPD e segurança médica, a gestão de leads e 
 * exportação de conversões Google Ads é executada exclusivamente de forma offline
 * via scripts locais protegidos (scripts/reconcile_and_export_google_ads.js).
 */
export default function AdminLeadsPage() {
  notFound();
}
