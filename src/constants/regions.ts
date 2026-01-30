export type View = 'front' | 'back';

export interface Region {
    id: string;
    label: string;
    icon: string;
    slug: string;
    view: View;
    top: string;
    left: string;
    description?: string;
}

export const INITIAL_REGIONS: Region[] = [
    // FRONT VIEW
    { id: 'head-front', label: 'Cabeça / Enxaqueca', icon: 'bi-brain', slug: '/blog/dor-cervical-e-enxaqueca', view: 'front', top: '22.3%', left: '50%', description: 'Cefaléias cervicogênicas e enxaquecas crônicas.' },
    { id: 'neck-front', label: 'Pescoço / Cervical', icon: 'bi-person-vcard', slug: '/blog/dor-cervical-e-enxaqueca', view: 'front', top: '27.4%', left: '50%', description: 'Cervicalgia e irradiação para os braços.' },
    { id: 'shoulder-left', label: 'Ombro Esquerdo', icon: 'bi-universal-access', slug: '/blog/hernia-disco-x-protusao', view: 'front', top: '30.0%', left: '60%', description: 'Dores que irradiam para o braço esquerdo.' },
    { id: 'shoulder-right', label: 'Ombro Direito', icon: 'bi-universal-access', slug: '/blog/hernia-disco-x-protusao', view: 'front', top: '30.0%', left: '40%', description: 'Dores que irradiam para o braço direito.' },
    { id: 'elbow-left', label: 'Cotovelo Esquerdo', icon: 'bi-record-circle-fill', slug: '/blog/dor-na-coluna-quando-preocupar', view: 'front', top: '40.0%', left: '63.7%', description: 'Epicondilites e dores no cotovelo esquerdo.' },
    { id: 'elbow-right', label: 'Cotovelo Direito', icon: 'bi-record-circle-fill', slug: '/blog/dor-na-coluna-quando-preocupar', view: 'front', top: '40.0%', left: '36.3%', description: 'Epicondilites e dores no cotovelo direito.' },
    { id: 'wrist-left', label: 'Punho Esquerdo', icon: 'bi-hand-index', slug: '/blog/ergonomia-home-office', view: 'front', top: '46.3%', left: '66.8%', description: 'Túnel do carpo e tendinites (lado esquerdo).' },
    { id: 'wrist-right', label: 'Punho Direito', icon: 'bi-hand-index', slug: '/blog/ergonomia-home-office', view: 'front', top: '46.3%', left: '33.2%', description: 'Túnel do carpo e tendinites (lado direito).' },
    { id: 'hand-left', label: 'Mão/Dedos (E)', icon: 'bi-hand-index-thumb', slug: '/blog/ergonomia-home-office', view: 'front', top: '51.7%', left: '69.7%', description: 'Artrite e dores nas articulações dos dedos (E).' },
    { id: 'hand-right', label: 'Mão/Dedos (D)', icon: 'bi-hand-index-thumb', slug: '/blog/ergonomia-home-office', view: 'front', top: '51.7%', left: '30.3%', description: 'Artrite e dores nas articulações dos dedos (D).' },
    { id: 'chest', label: 'Tórax / Costelas', icon: 'bi-heart-pulse', slug: '/blog/dor-na-coluna-quando-preocupar', view: 'front', top: '33.8%', left: '50%', description: 'Dores intercostais e torácicas.' },
    { id: 'abdomen', label: 'Abdômen / Core', icon: 'bi-shield-check', slug: '/blog/ergonomia-home-office', view: 'front', top: '41.8%', left: '50%', description: 'Estabilidade central e suporte da coluna.' },
    { id: 'hip-left', label: 'Quadril Esquerdo', icon: 'bi-gender-ambiguous', slug: '/blog/artrose-no-quadril-sintomas-e-cuidados', view: 'front', top: '49.0%', left: '57.0%', description: 'Impacto fêmoro-acetabular e artrose no quadril esquerdo.' },
    { id: 'hip-right', label: 'Quadril Direito', icon: 'bi-gender-ambiguous', slug: '/blog/artrose-no-quadril-sintomas-e-cuidados', view: 'front', top: '49.0%', left: '43.0%', description: 'Impacto fêmoro-acetabular e artrose no quadril direito.' },
    { id: 'knee-left', label: 'Joelho Esquerdo', icon: 'bi-record-circle', slug: '/blog/viscossuplementacao-vale-a-pena', view: 'front', top: '64.2%', left: '54.6%', description: 'Desgaste e lesões no joelho esquerdo.' },
    { id: 'knee-right', label: 'Joelho Direito', icon: 'bi-record-circle', slug: '/blog/viscossuplementacao-vale-a-pena', view: 'front', top: '64.2%', left: '45.4%', description: 'Desgaste e lesões no joelho direito.' },
    { id: 'ankle-left', label: 'Tornozelo Esquerdo', icon: 'bi-record-circle', slug: '/blog/dor-costas-cronica-faq', view: 'front', top: '77.1%', left: '55.7%', description: 'Dores articulares e entorses no tornozelo esquerdo.' },
    { id: 'ankle-right', label: 'Tornozelo Direito', icon: 'bi-record-circle', slug: '/blog/dor-costas-cronica-faq', view: 'front', top: '77.1%', left: '44.3%', description: 'Dores articulares e entorses no tornozelo direito.' },
    { id: 'foot-left', label: 'Pé Esquerdo', icon: 'bi-footprint', slug: '/blog/dor-costas-cronica-faq', view: 'front', top: '81.5%', left: '56.3%', description: 'Fascite plantar e dores no pé esquerdo.' },
    { id: 'foot-right', label: 'Pé Direito', icon: 'bi-footprint', slug: '/blog/dor-costas-cronica-faq', view: 'front', top: '81.5%', left: '43.7%', description: 'Fascite plantar e dores no pé direito.' },

    // BACK VIEW
    { id: 'occipital-back', label: 'Base do Crânio', icon: 'bi-brain', slug: '/blog/dor-cervical-e-enxaqueca', view: 'back', top: '22.1%', left: '50%', description: 'Neuralgia occipital e dores na base da nuca.' },
    { id: 'cervical-back', label: 'Coluna Cervical', icon: 'bi-body-text', slug: '/blog/dor-cervical-e-enxaqueca', view: 'back', top: '26.9%', left: '50%', description: 'Hérnias cervicais e bloqueios facetários.' },
    { id: 'thoracic-back', label: 'Coluna Torácica', icon: 'bi-reception-3', slug: '/blog/dor-na-coluna-quando-preocupar', view: 'back', top: '34.6%', left: '50%', description: 'Dorsalgias e pontos gatilho interescapulares.' },
    { id: 'lumbar-back', label: 'Coluna Lombar', icon: 'bi-back', slug: '/blog/hernia-l4-l5-s1', view: 'back', top: '43.8%', left: '50%', description: 'Epicentro de hérnias e estenose de canal.' },
    { id: 'sciatica-left', label: 'Nervo Ciático (E)', icon: 'bi-lightning-charge', slug: '/blog/dor-ciatica-alivio-rapido', view: 'back', top: '58.5%', left: '42.1%', description: 'Irradiação ciática para a perna esquerda.' },
    { id: 'sciatica-right', label: 'Nervo Ciático (D)', icon: 'bi-lightning-charge', slug: '/blog/dor-ciatica-alivio-rapido', view: 'back', top: '58.5%', left: '57.9%', description: 'Irradiação ciática para a perna direita.' },
    { id: 'glute-left', label: 'Glúteo Esquerdo', icon: 'bi-person-arms-up', slug: '/blog/piriforme-vs-hernia', view: 'back', top: '51.5%', left: '43.2%', description: 'Dor profunda no glúteo esquerdo.' },
    { id: 'glute-right', label: 'Glúteo Direito', icon: 'bi-person-arms-up', slug: '/blog/piriforme-vs-hernia', view: 'back', top: '51.5%', left: '56.8%', description: 'Dor profunda no glúteo direito.' },
    { id: 'calf-left', label: 'Panturrilha Esquerda', icon: 'bi-align-bottom', slug: '/blog/estenose-canal-lombar', view: 'back', top: '68.9%', left: '44.1%', description: 'Dores e cansaço na panturrilha esquerda.' },
    { id: 'calf-right', label: 'Panturrilha Direita', icon: 'bi-align-bottom', slug: '/blog/estenose-canal-lombar', view: 'back', top: '68.9%', left: '55.9%', description: 'Dores e cansaço na panturrilha direita.' },
];
