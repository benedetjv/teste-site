export interface MenuItem {
  label: string;
  href: string;
}

export interface HeaderContent {
  logoText: string;
  logoPath: string;
  menu: MenuItem[];
}

export interface HeroContent {
  title: string;
  crmRqe: string;
  text1: string;
  text2: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;
}

export interface DoctoraliaContent {
  label: string;
  url: string;
  doctor: string;
}

export interface ServicoItem {
  titulo: string;
  descricao: string;
  iconSvgPath: string;
}

export interface ServicosContent {
  titulo: string;
  items: ServicoItem[];
}

export interface SobreContent {
  titulo: string;
  crmRqe: string;
  text1: string;
  text2: string;
  image: string;
}

export interface ListaContent {
  titulo: string;
  iconClass: string;
  items: string[];
}

export interface ListasContent {
  doencas: ListaContent;
  publicacoes: ListaContent;
  premios: ListaContent;
}

export interface ClinicaContato {
  nome: string;
  endereco: string;
  telefone: string;
  whatsappLink: string;
}

export interface ContatoContent {
  titulo: string;
  clinicas: ClinicaContato[];
}

export interface ClinicaLocalizacao {
  nome: string;
  enderecoCompleto: string;
  mapIframeSrc: string;
  wazeUrl: string;
}

export interface LocalizacaoContent {
  titulo: string;
  clinicas: ClinicaLocalizacao[];
  instagramUrl: string;
}

export interface BlogContent {
  titulo: string;
  texto: string;
}

export interface FooterContent {
  texto: string;
}

export interface SiteContent {
  header: HeaderContent;
  hero: HeroContent;
  doctoralia: DoctoraliaContent;
  servicos: ServicosContent;
  sobre: SobreContent;
  listas: ListasContent;
  contato: ContatoContent;
  localizacao: LocalizacaoContent;
  blog: BlogContent;
  footer: FooterContent;
}
