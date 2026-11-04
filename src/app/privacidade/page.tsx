import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade e Proteção de Dados | Dr. Otto Beckedorff',
  description: 'Conheça como tratamos e protegemos seus dados pessoais de acordo com a LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018).',
  robots: 'noindex, follow'
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          <Link href="/" className="btn btn-sm btn-outline-secondary rounded-pill mb-4">
            <i className="bi bi-arrow-left me-1"></i> Voltar ao Início
          </Link>

          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-3 d-inline-block">
            Conformidade LGPD
          </span>

          <h1 className="h2 fw-bold mb-4" style={{ color: 'var(--azul-escuro)' }}>
            Política de Privacidade e Proteção de Dados Pessoais
          </h1>

          <p className="text-muted small">Última atualização: Novembro de 2026</p>

          <hr className="my-4" />

          <section className="mb-4">
            <h2 className="h5 fw-bold" style={{ color: 'var(--azul-principal)' }}>1. Compromisso com a sua Privacidade</h2>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              O consultório do <strong>Dr. Otto Beckedorff (CRM-SP 226325 | RQE 139078)</strong> preza pela segurança, confidencialidade e transparência no tratamento dos dados pessoais de seus pacientes e visitantes, em integral conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong> e com o <strong>Código de Ética Médica</strong> do Conselho Federal de Medicina (CFM).
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold" style={{ color: 'var(--azul-principal)' }}>2. Quais Dados Coletamos e para Qual Finalidade</h2>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              Coletamos exclusivamente as informações estritamente necessárias para viabilizar o contato inicial, a triagem administrativa de convênios/modalidades e o agendamento de consultas:
            </p>
            <ul className="text-secondary" style={{ lineHeight: '1.8' }}>
              <li><strong>Dados de Identificação e Contato:</strong> Nome completo, número de WhatsApp/telefone celular e cidade/região de atendimento.</li>
              <li><strong>Dados Administrativos de Atendimento:</strong> Modalidade pretendida (particular ou convênio), operadora de saúde e região anatômica geral do motivo do contato (ex: coluna, joelho, ombro, quadril).</li>
              <li><strong>Dados Técnicos de Navegação:</strong> Endereço IP anonimizado, identificadores de campanha (UTMs e Google Ads Click IDs como gclid) para mensuração de eficácia de anúncios e prevenção de fraudes.</li>
            </ul>
            <p className="text-secondary fw-medium" style={{ lineHeight: '1.8' }}>
              <em>Importante: Não solicitamos nem armazenamos relatórios médicos detalhados, laudos ou históricos de saúde na triagem inicial de marketing. Quaisquer dados clínicos sensíveis são coletados apenas e diretamente no ato da consulta médica presencial ou telemedicina regulamentada.</em>
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold" style={{ color: 'var(--azul-principal)' }}>3. Sigilo Profissional e Não Compartilhamento</h2>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              Seus dados de contato são utilizados única e exclusivamente pela equipe médica autorizada para retorno e agendamento. <strong>Não comercializamos, não compartilhamos e não transferimos</strong> seus dados pessoais para empresas terceiras, operadoras de telemarketing ou terceiros não envolvidos diretamente na prestação do atendimento médico.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold" style={{ color: 'var(--azul-principal)' }}>4. Armazenamento Seguro e Retenção</h2>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              Os dados coletados em nossos formulários de triagem são armazenados em ambiente seguro com controle de acesso estrito. Mantemos os registros apenas pelo tempo necessário para cumprir as finalidades de atendimento e obrigações regulatórias.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold" style={{ color: 'var(--azul-principal)' }}>5. Direitos do Titular dos Dados</h2>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              Nos termos do art. 18 da LGPD, você pode a qualquer momento solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a eliminação de dados tratados com seu consentimento, entrando em contato diretamente com nossa equipe pelo e-mail ou canais oficiais de atendimento.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold" style={{ color: 'var(--azul-principal)' }}>6. Contato do Encarregado de Dados (DPO)</h2>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              Para dúvidas sobre esta política ou sobre o tratamento de seus dados pessoais, entre em contato através de:
              <br />
              <strong>Atendimento Dr. Otto Beckedorff:</strong> Av. Andrade Neves, 707 – 5º Andar – Centro, Campinas – SP
              <br />
              <strong>Telefone / WhatsApp Oficial:</strong> (19) 99943-9824
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
