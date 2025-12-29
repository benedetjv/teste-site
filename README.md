# Dr. Otto Beckedorff - Website Oficial

Este projeto é o website profissional do Dr. Otto Beckedorff, especialista em Ortopedia e Tratamento da Dor. O site foi modernizado e migrado para **Next.js 14** para garantir máxima performance, SEO (otimização para buscas) e experiência mobile.

## 🚀 Tecnologias Utilizadas

-   **Next.js 14 (App Router)**: Framework React para renderização no servidor (SSR), essencial para indexação no Google.
-   **React**: Biblioteca para construção das interfaces.
-   **Bootstrap 5**: Framework de estilização (CSS) para layout responsivo.
-   **Bootstrap Icons**: Ícones vetoriais leves.
-   **Google Fonts**: Fontes otimizadas (Nunito Sans) carregadas via `next/font`.

## 📂 Estrutura do Projeto

A estrutura foi organizada seguindo os padrões modernos do Next.js:

```
/src
  /app                 # App Router (Páginas e Layout)
    layout.js          # "Casca" do site: Metadados, Fontes, CSS Global e Analytics
    page.js            # Página inicial (Home) que monta os componentes
    globals.css        # Estilos globais e customizações do Bootstrap

  /components          # Componentes Reutilizáveis
    Header.jsx         # Cabeçalho e Menu
    Hero.jsx           # Seção principal com imagem otimizada
    Sobre.jsx          # Seção "Sobre"
    ...                # Outras seções (Serviços, Contato, etc.)
    BootstrapClient.js # Integração do JS do Bootstrap com o Next.js

  content.js           # Arquivo central de textos e dados do site
```

## ✨ Melhorias Implementadas

1.  **Migração para Next.js**: Mudança de Vite (Client-Side) para Next.js (Server-Side) para que o Google consiga ler todo o conteúdo do site instantaneamente.
2.  **SEO Avançado**:
    -   `sitemap.xml` e `robots.txt` configurados.
    -   **Dados Estruturados (JSON-LD)**: Marcação específica para Médicos/Clínicas, ajudando o Google a exibir endereços e especialidades nos resultados.
    -   Metadados dinâmicos (Título, Descrição, OpenGraph).
3.  **Performance**:
    -   Uso do componente `<Image />` do Next.js para converter imagens para **WebP** automaticamente.
    -   Carregamento de fontes otimizado.
4.  **Mobile**:
    -   Ajuste de `themeColor` para integração com a barra do navegador no celular.
    -   Correção de bugs de layout responsivo.

## 🛠️ Como Rodar Localmente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/benedetjv/teste-site.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:3000`.

## ☁️ Deploy (Vercel)

Este projeto está configurado para deploy automático na **Vercel**.
-   Basta fazer um push para a branch `main`.
-   A Vercel detecta automaticamente o framework Next.js.
