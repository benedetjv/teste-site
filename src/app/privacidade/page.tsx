import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacidade e Sigilo Médico | Dr. Otto Beckedorff',
  description: 'Informações sobre a privacidade, proteção de dados e o sigilo no atendimento médico.',
  robots: 'noindex, nofollow'
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: '750px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          <Link href="/" className="btn btn-sm btn-outline-secondary rounded-pill mb-4">
            <i className="bi bi-arrow-left me-1"></i> Voltar ao Início
          </Link>

          <h1 className="h4 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>
            Privacidade e Sigilo Médico
          </h1>

          <p className="text-secondary small mb-3" style={{ lineHeight: '1.8' }}>
            Este site tem finalidade exclusivamente informativa e de facilitação do contato entre pacientes e o consultório do <strong>Dr. Otto Beckedorff (CRM-SP 226325 | RQE 139078)</strong>.
          </p>

          <p className="text-secondary small mb-3" style={{ lineHeight: '1.8' }}>
            Os dados de contato fornecidos pelo paciente através dos canais de agendamento e WhatsApp são utilizados única e exclusivamente para viabilizar o retorno da equipe de atendimento, o esclarecimento de dúvidas e o agendamento de consultas médicas.
          </p>

          <p className="text-secondary small mb-3" style={{ lineHeight: '1.8' }}>
            Em estrito cumprimento à Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018) e ao Código de Ética Médica do Conselho Federal de Medicina (CFM), todas as comunicações e informações de saúde são resguardadas por sigilo profissional, não sendo comercializadas, cedidas ou compartilhadas com terceiros.
          </p>

          <p className="text-secondary small mb-0" style={{ lineHeight: '1.8' }}>
            Para qualquer esclarecimento sobre o atendimento ou privacidade, entre em contato diretamente com a equipe do consultório pelo WhatsApp oficial.
          </p>
        </div>
      </div>
    </main>
  );
}
