import {
  Flame,
  Hammer,
  Gauge,
  Disc3,
  Search,
  ClipboardCheck,
  Wrench,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Tipos                                    */
/* -------------------------------------------------------------------------- */

/**
 * Nível do serviço. Modelado como union type para permitir, no futuro SaaS,
 * regras de negócio por tier (preço, disponibilidade por unidade, planos, etc.).
 */
export type ServiceTier = "premium" | "essential";

/**
 * Conteúdo da página dedicada de cada serviço (`/servicos/[slug]`).
 *
 * Cada serviço ganha sua própria página porque o Google ranqueia **páginas**,
 * não sites: uma home sozinha não compete bem por "solda de alumínio São
 * Sebastião" e "desempeno de rodas São Sebastião" ao mesmo tempo.
 */
export interface ServicePage {
  /** H1 da página — combina o termo de busca com a cidade. */
  heading: string;
  /** Meta description (~150–160 caracteres). */
  metaDescription: string;
  /** Parágrafos de abertura, em linguagem de cliente. */
  intro: string[];
  /** O que está incluso / por que importa. */
  highlights: string[];
}

export interface Service {
  /** Identificador estável — usar como chave de banco/rota no futuro. */
  id: string;
  /** Slug amigável para URLs (ex.: /servicos/solda-de-aluminio). */
  slug: string;
  title: string;
  description: string;
  /** Ícone Lucide como componente — renderizado pela UI. */
  icon: LucideIcon;
  tier: ServiceTier;
  /** Conteúdo da landing dedicada do serviço. */
  page: ServicePage;
  /** Destaque na home / vitrine. */
  featured?: boolean;
}

export interface ProcessStep {
  id: string;
  /** Ordem de exibição (1-based). */
  order: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*                          Serviços Premium (destaque)                       */
/* -------------------------------------------------------------------------- */

export const PREMIUM_SERVICES: Service[] = [
  {
    id: "srv-reforma-rodas",
    slug: "reforma-de-rodas",
    title: "Reforma de Rodas",
    description:
      "Reforma completa de rodas de liga leve e aço: recuperação de trincas, empenos e acabamento. Sua roda volta com resistência e visual de nova.",
    icon: Wrench,
    tier: "premium",
    featured: true,
    page: {
      heading: "Reforma de Rodas em São Sebastião - DF",
      metaDescription:
        "Reforma de rodas de liga leve e aço em São Sebastião - DF. Recuperamos trincas, empenos e acabamento, devolvendo resistência e visual de nova.",
      intro: [
        "Roda raspada no meio-fio, trincada ou com o acabamento castigado pelo tempo não precisa virar sucata. A reforma devolve a integridade estrutural e a aparência da peça — por uma fração do preço de uma roda nova.",
        "Trabalhamos com rodas de liga leve e aço, de carros de passeio a utilitários. Toda peça passa por avaliação técnica antes do serviço: se a roda não tiver condição segura de recuperação, a gente fala isso na hora, sem enrolação.",
      ],
      highlights: [
        "Recuperação de trincas com solda de alumínio (TIG)",
        "Correção de empenos e desempeno de precisão",
        "Reparo de bordas danificadas por meio-fio e buraco",
        "Acabamento e pintura para devolver o visual de nova",
        "Avaliação honesta: recusamos o que não é seguro recuperar",
      ],
    },
  },
  {
    id: "srv-solda-aluminio",
    slug: "solda-de-aluminio",
    title: "Solda de Alumínio",
    description:
      "Especialista em solda de alumínio com solda TIG de alta precisão. Trabalho de ponta para devolver segurança e integridade estrutural às suas rodas.",
    icon: Flame,
    tier: "premium",
    featured: true,
    page: {
      heading: "Solda de Alumínio em São Sebastião - DF",
      metaDescription:
        "Solda de alumínio com processo TIG em São Sebastião - DF. Reparo de trincas e furos em rodas e peças, com precisão estrutural e décadas de experiência.",
      intro: [
        "Alumínio não perdoa improviso: exige preparo da superfície, controle de temperatura e o processo certo. Por isso trabalhamos com solda TIG, que entrega o cordão limpo e a penetração necessária para a peça voltar a aguentar esforço de verdade.",
        "Não é só estética — é segurança. Uma trinca mal resolvida volta a abrir sob carga. Nosso foco é devolver a integridade estrutural da peça, com décadas de experiência em alumínio.",
      ],
      highlights: [
        "Processo TIG, o indicado para alumínio",
        "Reparo de trincas, furos e quebras",
        "Limpeza e preparo da área antes da solda",
        "Foco em resistência estrutural, não só na aparência",
        "Também soldamos outras peças de alumínio, além de rodas",
      ],
    },
  },
];

/* -------------------------------------------------------------------------- */
/*                        Serviços Essenciais (do dia a dia)                  */
/* -------------------------------------------------------------------------- */

export const ESSENTIAL_SERVICES: Service[] = [
  {
    id: "srv-desempeno",
    slug: "desempeno-de-rodas",
    title: "Desempeno de Rodas",
    description:
      "Correção de rodas empenadas que causam trepidação e desgaste irregular dos pneus, restaurando o rodar original do veículo.",
    icon: Hammer,
    tier: "essential",
    page: {
      heading: "Desempeno de Rodas em São Sebastião - DF",
      metaDescription:
        "Desempeno de rodas em São Sebastião - DF. Corrigimos rodas empenadas que causam trepidação no volante e desgaste irregular dos pneus.",
      intro: [
        "Volante trepidando a partir de certa velocidade, pneu gastando mais de um lado ou um barulho diferente no rodar: na maioria das vezes é roda empenada — herança de buraco, meio-fio ou lombada pega mais forte.",
        "No desempeno, a roda volta ao plano original em equipamento próprio. A vibração some e o desgaste prematuro do pneu e da suspensão para de acontecer.",
      ],
      highlights: [
        "Diagnóstico do empeno antes de qualquer serviço",
        "Correção de empenos no aro e na borda",
        "Fim da trepidação no volante",
        "Menos desgaste irregular de pneus e suspensão",
        "Serviço ágil, para você voltar logo à estrada",
      ],
    },
  },
  {
    id: "srv-balanceamento",
    slug: "balanceamento",
    title: "Balanceamento",
    description:
      "Balanceamento que elimina vibrações no volante e prolonga a vida útil de pneus e suspensão.",
    icon: Gauge,
    tier: "essential",
    page: {
      heading: "Balanceamento de Rodas em São Sebastião - DF",
      metaDescription:
        "Balanceamento de rodas em São Sebastião - DF. Elimina a vibração no volante e prolonga a vida útil dos pneus e da suspensão. Fale conosco no WhatsApp.",
      intro: [
        "Pequenas diferenças de peso ao longo da roda viram vibração em velocidade. E vibração significa pneu gastando torto, direção desconfortável e suspensão sofrendo à toa.",
        "O balanceamento redistribui esse peso e devolve o rodar liso. É um dos serviços mais baratos da oficina e um dos que mais evitam gasto grande lá na frente.",
      ],
      highlights: [
        "Fim da vibração no volante e no assoalho",
        "Desgaste uniforme dos pneus",
        "Menos esforço na suspensão e nos rolamentos",
        "Recomendado a cada troca ou rodízio de pneus",
        "Combina com o desempeno quando a roda está empenada",
      ],
    },
  },
  {
    id: "srv-borracharia",
    slug: "borracharia",
    title: "Borracharia",
    description:
      "Troca, reparo e montagem de pneus com equipamento moderno e atendimento ágil para você não perder tempo.",
    icon: Disc3,
    tier: "essential",
    page: {
      heading: "Borracharia em São Sebastião - DF",
      metaDescription:
        "Borracharia em São Sebastião - DF: troca, reparo e montagem de pneus com equipamento moderno e atendimento ágil, sem marcar a sua roda.",
      intro: [
        "O básico, bem feito. Troca, reparo e montagem de pneus com equipamento que respeita a roda — detalhe que faz toda a diferença em liga leve, onde uma montagem descuidada deixa marca para sempre.",
        "Furou, precisa trocar ou quer só conferir a calibragem? Passa aqui que a gente resolve rápido.",
      ],
      highlights: [
        "Troca e montagem de pneus",
        "Reparo de furos, quando o pneu permite com segurança",
        "Montagem cuidadosa, sem marcar a roda",
        "Calibragem e conferência",
        "Atendimento ágil, sem fila desnecessária",
      ],
    },
  },
];

/** Lista completa — útil para páginas de catálogo e futuras queries. */
export const ALL_SERVICES: Service[] = [
  ...PREMIUM_SERVICES,
  ...ESSENTIAL_SERVICES,
];

/* -------------------------------------------------------------------------- */
/*                            Processo de atendimento                         */
/* -------------------------------------------------------------------------- */

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "step-diagnostico",
    order: 1,
    title: "Diagnóstico",
    description:
      "Avaliamos a roda ou peça e identificamos com precisão o que precisa ser feito.",
    icon: Search,
  },
  {
    id: "step-orcamento",
    order: 2,
    title: "Orçamento",
    description:
      "Apresentamos um orçamento transparente, sem surpresas e com prazo definido.",
    icon: ClipboardCheck,
  },
  {
    id: "step-execucao",
    order: 3,
    title: "Execução",
    description:
      "Nossa equipe realiza o serviço com técnica especializada e equipamentos de ponta.",
    icon: Wrench,
  },
  {
    id: "step-entrega",
    order: 4,
    title: "Entrega com Garantia",
    description: "Você recebe a peça com qualidade GT.",
    icon: ShieldCheck,
  },
];

/* -------------------------------------------------------------------------- */
/*                             Navegação / marca                              */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

/** Número de WhatsApp em formato internacional (E.164, sem símbolos). */
const WHATSAPP_NUMBER = "5561992806373";

/** Nome comercial da marca — fonte única para UI, metadados e JSON-LD. */
const BRAND_NAME = "GT PNEUS & RODAS";

export interface BusinessHour {
  /** Dias a que a faixa se aplica (ex.: "Seg – Sex"). */
  days: string;
  /** Horário legível (ex.: "08:00 – 18:00") ou "Fechado". */
  hours: string;
}

export const SITE = {
  name: BRAND_NAME,
  shortName: "GT",
  tagline:
    "Especialista em solda de alumínio e reformas de rodas. Trabalho de ponta, entregando qualidade.",
  phoneDisplay: "(61) 99280-6373",
  whatsappNumber: WHATSAPP_NUMBER,
  /** Link direto para a API do WhatsApp (funciona em web e mobile). */
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Gostaria de um orçamento na ${BRAND_NAME}.`
  )}`,
  /** Localização da loja no Google Maps. */
  mapsUrl: "https://maps.app.goo.gl/Jt4Vak4oKpSgCTt59",
  address: {
    line: "Quadra 204, Conjunto 02, Lote 11 - Residencial Oeste",
    city: "São Sebastião - DF",
  },
  hours: [
    { days: "Segunda a Sexta", hours: "08:00 – 18:00" },
    { days: "Sábado, Domingo e Feriados", hours: "Fechado" },
  ] satisfies BusinessHour[],
} as const;

/* -------------------------------------------------------------------------- */
/*                                  Galeria                                   */
/* -------------------------------------------------------------------------- */

export type GalleryCategoryId = "rodas" | "cabecotes";

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
}

export type MediaType = "image" | "video";

/** Uma peça de mídia da galeria — foto ou vídeo (autoplay mudo em loop). */
export interface MediaAsset {
  type: MediaType;
  src: string;
  /** Poster (só vídeo): frame otimizado exibido antes do carregamento. */
  poster?: string;
}

export interface GalleryItem {
  id: string;
  category: GalleryCategoryId;
  title: string;
  before: MediaAsset;
  after: MediaAsset;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: "rodas", label: "Rodas" },
  { id: "cabecotes", label: "Peças" },
];

/* Helpers para declarar mídia de forma enxuta. */
const img = (src: string): MediaAsset => ({ type: "image", src });
const vid = (src: string, poster: string): MediaAsset => ({
  type: "video",
  src,
  poster,
});

/**
 * Portfólio "Antes e Depois". Alguns registros têm vídeo em vez de foto
 * (ex.: pares 2, 3 e 4 das rodas) — o card renderiza cada lado conforme o tipo.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-roda-01",
    category: "rodas",
    title: "Reforma de roda 01",
    before: img("/images/roda-antes-1.jpg"),
    after: img("/images/roda-depois-1.jpg"),
  },
  {
    id: "gal-roda-02",
    category: "rodas",
    title: "Reforma de roda 02",
    before: img("/images/roda-antes-2.jpg"),
    after: vid("/videos/roda-depois-2.mp4", "/images/poster-roda-depois-2.jpg"),
  },
  {
    id: "gal-roda-03",
    category: "rodas",
    title: "Reforma de roda 03",
    before: vid("/videos/roda-antes-3.mp4", "/images/poster-roda-antes-3.jpg"),
    after: img("/images/roda-depois-3.jpg"),
  },
  {
    id: "gal-roda-04",
    category: "rodas",
    title: "Reforma de roda 04",
    before: img("/images/roda-antes-4.jpg"),
    after: vid("/videos/roda-depois-4.mp4", "/images/poster-roda-depois-4.jpg"),
  },
  {
    id: "gal-roda-05",
    category: "rodas",
    title: "Reforma de roda 05",
    before: img("/images/roda-antes-5.jpg"),
    after: img("/images/roda-depois-5.jpg"),
  },
  {
    id: "gal-roda-06",
    category: "rodas",
    title: "Reforma de roda 06",
    before: img("/images/roda-antes-6.jpg"),
    after: img("/images/roda-depois-6.jpg"),
  },
  {
    id: "gal-roda-07",
    category: "rodas",
    title: "Reforma de roda 07",
    before: img("/images/roda-antes-7.jpg"),
    after: img("/images/roda-depois-7.jpg"),
  },
  {
    id: "gal-roda-08",
    category: "rodas",
    title: "Reforma de roda 08",
    before: img("/images/roda-antes-8.jpg"),
    after: img("/images/roda-depois-8.jpg"),
  },
  {
    id: "gal-roda-09",
    category: "rodas",
    title: "Reforma de roda 09",
    before: img("/images/roda-antes-9.jpg"),
    after: img("/images/roda-depois-9.jpg"),
  },
  {
    id: "gal-cab-01",
    category: "cabecotes",
    title: "Recuperação de cabeçote",
    before: img("/images/cabecote-antes-1.jpg"),
    after: img("/images/cabecote-depois-1.jpg"),
  },
];
