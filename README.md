# Dr. Otto Beckedorff - Website Oficial

Este é o website profissional do **Dr. Otto Beckedorff**, médico ortopedista especialista em Tratamento da Dor. O projeto foi desenvolvido com tecnologias modernas para garantir alta performance, acessibilidade e otimização para motores de busca (SEO).

## 🚀 Tecnologias

O projeto utiliza a stack mais recente do ecossistema React:

-   **[Next.js 15/16](https://nextjs.org/)** (App Router): Renderização no servidor (SSR) e otimização estática.
-   **[React 19](https://react.dev/)**: Biblioteca core para construção da interface.
-   **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e manutenibilidade.
-   **[Bootstrap 5](https://getbootstrap.com/)**: Framework CSS para layout responsivo e ágil.
-   **[Bootstrap Icons](https://icons.getbootstrap.com/)**: Biblioteca de ícones vetoriais.
-   **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para animações fluidas e interações.
-   **[Resend](https://resend.com/)**: API para envio de emails transacionais (Formulário de Contato).

## ✨ Principais Funcionalidades

-   **Gestão de Conteúdo Centralizada**: Todo o conteúdo textual e dados estruturados do site (menus, serviços, textos, contatos) estão centralizados no arquivo `src/content.ts`, facilitando atualizações sem mexer no código dos componentes.
-   **Blog Integrado**: Seção de blog dedicada para artigos e novidades (`/blog`).
-   **SEO Otimizado**: Configuração de metadados dinâmicos, `sitemap.xml` e `robots.txt` para melhor indexação e compartilhamento social.
-   **Design Responsivo**: Layout totalmente adaptado para dispositivos móveis, tablets e desktops.
-   **Páginas Informativas**:
    -   **Home**: Apresentação principal e destaques.
    -   **Sobre**: Perfil profissional e currículo.
    -   **Procedimentos**: Detalhamento dos tratamentos oferecidos com ícones ilustrativos.
    -   **Localização**: Integração com Google Maps e Waze para as clínicas de atendimento.
    -   **Contato**: Informações diretas e formulário.

## 📂 Estrutura do Projeto

```
/src
  /app                 # Next.js App Router (Páginas e Layouts)
  /components          # Componentes React Reutilizáveis
  /content.ts          # Arquivo Fonte da Verdade para Conteúdos
  /css                 # Estilos Globais e Customizações
  /types               # Definições de Tipos TypeScript
```

## 🛠️ Como Rodar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/benedetjv/teste-site.git
    cd teste-site
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto com as chaves necessárias (ex: `RESEND_API_KEY`) se for testar o envio de emails.

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse o projeto:**
    Abra `http://localhost:3000` no seu navegador.

## 📦 Build e Deploy

O projeto está otimizado para deploy na **Vercel**.

Para gerar a versão de produção localmente:
```bash
npm run build
npm start
```
