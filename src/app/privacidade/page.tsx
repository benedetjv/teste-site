import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade e Proteção de Dados | Dr. Otto Beckedorff',
  description: 'Informações transparentes sobre o tratamento de dados pessoais e de navegação de acordo com a LGPD (Lei 13.709/2018).',
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
            Conformidade LGPD (Lei nº 13.709/2018)
          </span>

          <h1 className="h3 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>
            Política de Privacidade e Proteção de Dados Pessoais
          </h1>

          <p className="text-muted small">Versão 1.2 — Vigência: Novembro de 2026</p>
          <div className="alert alert-warning py-2 px-3 small rounded-3 mb-4">
            <i className="bi bi-info-circle me-1"></i> <em>Nota de governança: O conteúdo deste documento foi estruturado para refletir com exatidão a operação técnica deste site e deve ser submetido à revisão periódica por assessoria jurídica especializada em direito médico e proteção de dados.</em>
          </div>

          <hr className="my-4" />

          {/* 1. CONTROLADOR */}
          <section className="mb-4">
            <h2 className="h6 fw-bold text-uppercase" style={{ color: 'var(--azul-principal)' }}>1. Identidade e Contato do Controlador</h2>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              O controlador dos dados pessoais coletados neste site é o médico <strong>Dr. Otto Beckedorff (CRM-SP 226325 | RQE 139078)</strong>, com consultório médico localizado no Instituto Orthesen: Av. Andrade Neves, 707 – 5º Andar, Centro, Campinas – SP, CEP 13013-161.
              <br />
              Canal oficial de atendimento para privacidade e LGPD: <code>drottobeckedorff@gmail.com</code> ou telefone oficial (19) 99943-9824.
            </p>
          </section>

          {/* 2. DADOS COLETADOS E FINALIDADES */}
          <section className="mb-4">
            <h2 className="h6 fw-bold text-uppercase" style={{ color: 'var(--azul-principal)' }}>2. Dados Coletados e Finalidades do Tratamento</h2>
            <div className="table-responsive small">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Categoria</th>
                    <th>Dados Específicos</th>
                    <th>Finalidade Específica</th>
                    <th>Base Legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody className="text-secondary">
                  <tr>
                    <td><strong>Identificação e Contato</strong></td>
                    <td>Nome completo e telefone celular / WhatsApp.</td>
                    <td>Retorno pela equipe da secretária para esclarecimento sobre horários, modalidades de atendimento e agendamento de consulta.</td>
                    <td>Consentimento (Art. 7º, I) e Procedimentos preliminares a contrato (Art. 7º, V).</td>
                  </tr>
                  <tr>
                    <td><strong>Administrativo de Saúde</strong></td>
                    <td>Modalidade pretendida (Amil, particular ou reembolso).</td>
                    <td>Verificação de elegibilidade e rede credenciada no Instituto Orthesen / Hospital Vera Cruz.</td>
                    <td>Procedimentos preliminares a contrato (Art. 7º, V) e Tutela da Saúde (Art. 11, II, &quot;f&quot;).</td>
                  </tr>
                  <tr>
                    <td><strong>Navegação e Publicidade</strong></td>
                    <td>Endereço IP anonimizado, parâmetros de campanha (UTMs) e IDs de clique (GCLID/GBRAID/WBRAID).</td>
                    <td>Prevenção de fraudes, rate limiting do servidor e mensuração técnica da eficácia dos anúncios da campanha de pesquisa.</td>
                    <td>Legítimo interesse do controlador (Art. 7º, IX) e Segurança da informação (Art. 7º, VIII).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="small text-muted" style={{ lineHeight: '1.6' }}>
              <strong>Atenção sobre dados de saúde sensíveis:</strong> Não coletamos diagnósticos detalhados, laudos ou relatórios de exames na triagem inicial de marketing. A avaliação clínica detalhada ocorre exclusivamente no ato da consulta médica presencial ou telemedicina regulamentada, regida pelo Sigilo Médico e pelo Código de Ética Médica.
            </p>
          </section>

          {/* 3. OPERADORES E FORNECEDORES */}
          <section className="mb-4">
            <h2 className="h6 fw-bold text-uppercase" style={{ color: 'var(--azul-principal)' }}>3. Operadores e Fornecedores Envolvidos</h2>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              Para viabilizar a infraestrutura técnica e o atendimento ao paciente, utilizamos operadores terceirizados de tecnologia, estritamente limitados às suas finalidades:
            </p>
            <ul className="text-secondary small" style={{ lineHeight: '1.8' }}>
              <li><strong>Hospedagem e Infraestrutura de Servidores (Vercel Inc. / Provedores Cloud):</strong> Hospedagem da aplicação Next.js e armazenamento criptografado em repouso.</li>
              <li><strong>Plataforma de Mensagens (WhatsApp / Meta Platforms Inc.):</strong> Quando o visitante clica deliberadamente no botão de contato, a conversa ocorre no aplicativo do WhatsApp, sob os termos de privacidade da própria Meta.</li>
              <li><strong>Agendamento Médico Online (Doctoralia / Docplanner Brasil):</strong> Caso o usuário opte pelo agendamento direto na agenda da Doctoralia, os dados são processados pela plataforma sob seus respectivos termos de uso.</li>
              <li><strong>Métricas e Mensuração Anônima (Google LLC):</strong> Google Tag Manager e Google Analytics 4 configurados para capturar exclusivamente identificadores técnicos de campanha, sem envio de nome, telefone ou histórico clínico à plataforma.</li>
            </ul>
          </section>

          {/* 4. TRANSFERÊNCIA INTERNACIONAL */}
          <section className="mb-4">
            <h2 className="h6 fw-bold text-uppercase" style={{ color: 'var(--azul-principal)' }}>4. Transferência Internacional de Dados</h2>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              Determinados prestadores de infraestrutura em nuvem (como Vercel e Google) possuem data centers e servidores localizados nos Estados Unidos ou Europa. Nesses casos, a transferência internacional ocorre em estrito cumprimento do Art. 33 da LGPD, mediante cláusulas contratuais padrão que asseguram níveis adequados de segurança e proteção de dados.
            </p>
          </section>

          {/* 5. RETENÇÃO E EXCLUSÃO */}
          <section className="mb-4">
            <h2 className="h6 fw-bold text-uppercase" style={{ color: 'var(--azul-principal)' }}>5. Período de Retenção dos Dados</h2>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              • <strong>Leads não convertidos em consulta:</strong> Retidos pelo período máximo de <strong>180 dias (6 meses)</strong>, sendo periodicamente descartados de nossos bancos de dados criptografados.
              <br />
              • <strong>Pacientes que realizam consulta:</strong> Os dados passam a integrar o Prontuário Médico, sendo arquivados pelo prazo legal de <strong>20 anos</strong>, em conformidade obrigatória com o Art. 6º da Lei Federal nº 13.787/2018 e resoluções do Conselho Federal de Medicina (CFM).
            </p>
          </section>

          {/* 6. MEDIDAS DE SEGURANÇA */}
          <section className="mb-4">
            <h2 className="h6 fw-bold text-uppercase" style={{ color: 'var(--azul-principal)' }}>6. Medidas de Segurança</h2>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              Adotamos medidas técnicas honestas e proporcionais ao risco: criptografia em trânsito (HTTPS / TLS 1.3), criptografia de dados pessoais em repouso com algoritmo AES-256-GCM, isolamento de rotas administrativas com chave de autenticação estrita, limitação de taxa de requisições (rate limiting) para coibir ataques de força bruta e blindagem contra injeção de fórmulas CSV.
            </p>
          </section>

          {/* 7. DIREITOS DO TITULAR */}
          <section className="mb-4">
            <h2 className="h6 fw-bold text-uppercase" style={{ color: 'var(--azul-principal)' }}>7. Seus Direitos como Titular (Art. 18 da LGPD)</h2>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              Você tem o direito de, a qualquer momento e mediante solicitação expressa:
            </p>
            <ul className="text-secondary small" style={{ lineHeight: '1.8' }}>
              <li>Confirmar a existência de tratamento e acessar seus dados cadastrais;</li>
              <li>Solicitar a correção de dados incompletos ou inexatos;</li>
              <li>Revogar o consentimento fornecido para contato comercial/marketing;</li>
              <li>Solicitar a exclusão ou anonimização de seus dados de triagem pré-consulta.</li>
            </ul>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              Para exercer qualquer desses direitos, envie uma mensagem para <code>drottobeckedorff@gmail.com</code> ou fale com a nossa equipe pelo WhatsApp oficial informando seu nome e telefone cadastrado.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
