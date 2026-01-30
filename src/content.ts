import { SiteContent } from "./types";

export const siteContent: SiteContent = {
  header: {
    logoText: "Dr. Otto Beckedorff",
    logoPath: "img/logo-otto-beckedorff.png",
    menu: [
      { label: "Home", href: "/" },
      { label: "Sobre", href: "/sobre" },
      { label: "Procedimentos", href: "/procedimentos" },
      { label: "Localização", href: "/contato#localizacao" },
      { label: "Contato", href: "/contato" },
      { label: "Blog", href: "/blog" },
    ],
  },

  hero: {
    title: "Alívio da Dor com Precisão, Tecnologia e Cuidado Humano",
    crmRqe: "Dr. Otto Beckedorff – Ortopedista & Tratamento da Dor | CRM 226325SP | RQE 139078",
    text1: "Foco em dor clínica e intervencionista. Atendimento especializado em dores na coluna, articulações e lesões musculoesqueléticas.",
    text2: "Evite cirurgias com tratamento preciso. Utiliza procedimentos minimamente invasivos como bloqueios, infiltrações, ácido hialurônico, neuromodulação e radiofrequência.",
    ctaLabel: "Saiba mais",
    ctaLink: "/contato",
    image: "img/foto-otto.jpg"
  },

  doctoralia: {
    label: "Agende agora:",
    url: "https://www.doctoralia.com.br/otto-beckedorff/ortopedista-traumatologista/campinas",
    doctor: "otto-beckedorff",
  },

  servicos: {
    titulo: "Procedimentos",
    items: [
      {
        titulo: "Avaliação Ortopédica com foco em Dor",
        descricao: "Consulta especializada para identificar a origem da dor, com exame físico detalhado e plano terapêutico individualizado.",
        iconSvgPath: "<rect x=\"7\" y=\"3\" width=\"10\" height=\"18\" rx=\"2\"></rect><path d=\"M9 3v2h6V3\"></path><path d=\"M9 12l2 2 4-4\"></path>"
      },
      {
        titulo: "Infiltrações Articulares",
        descricao: "Aplicação de medicamentos diretamente na articulação (joelho, ombro, quadril etc.), indicada em artrose, tendinites e inflamações.",
        iconSvgPath: "<path d=\"M2 21l7-7 3 3 9-9 1-1-3-3-1 1-9 9-3-3L2 21z\"></path>"
      },
      {
        titulo: "Bloqueios Diagnósticos e Terapêuticos",
        descricao: "Procedimentos guiados por imagem para aliviar dores intensas e confirmar a origem da dor, especialmente na coluna.",
        iconSvgPath: "<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M12 2v3\"></path><path d=\"M12 19v3\"></path><path d=\"M2 12h3\"></path><path d=\"M19 12h3\"></path>"
      },
      {
        titulo: "Radiofrequência Ablativa",
        descricao: "Técnica minimamente invasiva que utiliza calor controlado para modular a condução da dor em facetas articulares e outras regiões.",
        iconSvgPath: "<path d=\"M3 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0\"></path>"
      },
      {
        titulo: "Radiofrequência Pulsada",
        descricao: "Neuromodulação que altera a atividade do nervo sem queimá-lo, reduzindo a dor e preservando estrutura e função.",
        iconSvgPath: "<path d=\"M2 12h4l2 6 4-12 2 6h8\"></path>"
      },
      {
        titulo: "Viscossuplementação",
        descricao: "Infiltração com ácido hialurônico para lubrificar a articulação, muito utilizada em artrose de joelho e quadril.",
        iconSvgPath: "<path d=\"M12 2c4 5 6 8 6 11a6 6 0 1 1-12 0c0-3 2-6 6-11z\"></path>"
      },
    ],
  },

  sobre: {
    titulo: "Sobre mim:",
    crmRqe: "Dr. Otto Beckedorff – CRM 226325SP | RQE 139078",
    text1: "Sou ortopedista com formação pelo Hospital Vera Cruz (Campinas/SP) e atuação focada no diagnóstico e tratamento da dor musculoesquelética, especialmente dores na coluna, joelho, quadril e ombro. Atendo pacientes com dores agudas ou crônicas, que muitas vezes convivem com limitações físicas e impacto direto na qualidade de vida.",
    text2: "Utilizo procedimentos minimamente invasivos, como bloqueios, infiltrações, ácido hialurônico, neuromodulação e radiofrequência, para oferecer alívio efetivo da dor — com recuperação rápida e, ajudando muitos pacientes a evitar cirurgias desnecessárias. Minha missão é ajudar meus pacientes a voltarem às suas atividades com mais conforto, movimento e autonomia, sempre com escuta ativa, abordagem moderna e tratamento individualizado.",
    image: "img/otto-em-procedimento.jpg"
  },

  listas: {
    doencas: {
      titulo: "Doenças tratadas",
      iconClass: "bi-clipboard-pulse",
      items: [
        "Dor na coluna",
        "Dor no ombro",
        "Dor na cervical",
        "Artrose de joelho e quadril",
        "Tendinites e bursites",
        "Hérnia de disco lombar",
        "Dor crônica musculoesquelética",
      ]
    },
    publicacoes: {
      titulo: "Publicações",
      iconClass: "bi-file-earmark-text",
      items: [
        "Estudos sobre dor crônica e impacto na qualidade de vida de pacientes brasileiros.",
        "Pesquisas com radiofrequência e bloqueios guiados por imagem em dor lombar.",
        "Trabalhos em epidemiologia e COVID-19 em grandes centros urbanos.",
      ]
    },
    premios: {
      titulo: "Prêmios",
      iconClass: "bi-trophy",
      items: [
        "Prêmios em diversos congressos nacionais.",
        "Young Investigator Awards e reconhecimentos em eventos internacionais.",
        "Coautor em estudos publicados em revistas de alto impacto e citados na imprensa.",
      ]
    }
  },

  contato: {
    titulo: "Contato",
    clinicas: [
      {
        nome: "Clínica Somamed",
        endereco: "Av. Minas Gerais, 981 – Jacutinga, MG",
        telefone: "(35) 3627-0006",
        whatsappLink: "https://wa.me/553536270006"
      },
      {
        nome: "Clínica Adora",
        endereco: "Av. Andrade Neves, 699 – 6º Andar – Centro, Campinas – SP",
        telefone: "(19) 99943-9824",
        whatsappLink: "https://wa.me/5519999439824"
      }
    ]
  },

  localizacao: {
    titulo: "Localizações das Clínicas",
    clinicas: [
      {
        nome: "Clínica Somamed",
        enderecoCompleto: "Av. Minas Gerais, 981 – Jacutinga, MG, 37590-000",
        mapIframeSrc: "https://www.google.com/maps?q=Av.+Minas+Gerais+981+Jacutinga+MG&hl=pt-BR&z=16&output=embed",
        wazeUrl: "https://ul.waze.com/ul?ll=-22.30069090%2C-46.61998987&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
      },
      {
        nome: "Clínica Adora",
        enderecoCompleto: "Av. Andrade Neves, 699 – 6º Andar – Centro, Campinas – SP, 13013-161",
        mapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.251236859197!2d-47.0626!3d-22.90655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8bbdb1b8121%3A0xb482f5937ca4cb84!2sAv.%20Andrade%20Neves%2C%20699%20-%206%C2%BA%20andar%20-%20Centro%2C%20Campinas%20-%20SP%2C%2013013-161!5e0!3m2!1spt-BR!2sbr!4v1731612345678",
        wazeUrl: "https://waze.com/ul/h6gyt8ysqp"
      }
    ],
    instagramUrl: "https://www.instagram.com/drottobeckedorff/"
  },

  blog: {
    titulo: "Blog",
    texto: "Confira nossos artigos e novidades sobre saúde, bem-estar e tratamentos modernos.",
  },

  footer: {
    texto: "© 2025 · Dr. Otto Beckedorff – Ortopedia & Tratamento da Dor. Todos os direitos reservados."
  }
};