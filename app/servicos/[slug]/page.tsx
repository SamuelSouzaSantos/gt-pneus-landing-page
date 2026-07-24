import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/sections/Footer";
import { ALL_SERVICES, SITE } from "@/constants/data";

const SITE_URL = "https://gtpneuserodas.com.br";

/** Slugs desconhecidos devolvem 404 em vez de tentar renderizar. */
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ALL_SERVICES.map((service) => ({ slug: service.slug }));
}

const findService = (slug: string) =>
  ALL_SERVICES.find((service) => service.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  const url = `/servicos/${service.slug}`;
  return {
    // O layout raiz aplica o template "%s | GT PNEUS & RODAS".
    title: service.page.heading,
    description: service.page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: SITE.name,
      title: `${service.page.heading} | ${SITE.name}`,
      description: service.page.metaDescription,
      images: [{ url: "/images/foto-loja.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = ALL_SERVICES.filter((item) => item.slug !== service.slug);
  const url = `${SITE_URL}/servicos/${service.slug}`;

  /* Schema do serviço, amarrado ao negócio local declarado no layout raiz. */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.page.metaDescription,
    url,
    serviceType: service.title,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "City", name: "São Sebastião - DF" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Serviços",
        item: `${SITE_URL}/servicos`,
      },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <>
      <main className="flex-1 bg-gt-black">
        <article className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          {/* Trilha de navegação */}
          <nav aria-label="Trilha de navegação" className="mb-8 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Início
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/servicos"
                  className="transition-colors hover:text-white"
                >
                  Serviços
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white/80">{service.title}</li>
            </ol>
          </nav>

          <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gt-terracota text-white">
            <Icon className="h-7 w-7" aria-hidden />
          </span>

          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {service.page.heading}
          </h1>

          <div className="mt-6 space-y-4">
            {service.page.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-white/75">
                {paragraph}
              </p>
            ))}
          </div>

          {/* O que está incluso */}
          <h2 className="mt-12 text-2xl font-extrabold">
            O que está incluso
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.page.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-gt-dark-gray p-4"
              >
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-gt-terracota"
                  aria-hidden
                />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>

          {/* Chamada para ação */}
          <section className="mt-12 rounded-3xl bg-gt-terracota p-8 sm:p-10">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Peça seu orçamento agora
            </h2>
            <p className="mt-3 max-w-xl text-white/85">
              Mande uma foto da peça pelo WhatsApp que avaliamos e te
              respondemos com o orçamento. Atendemos em {SITE.address.city}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-gt-terracota transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gt-terracota"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Falar no WhatsApp
              </a>
              <a
                href={`tel:+${SITE.whatsappNumber}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {SITE.phoneDisplay}
              </a>
            </div>
          </section>

          {/* Dúvidas específicas deste serviço (+ schema FAQPage) */}
          <FaqSection
            items={service.page.faq}
            contained={false}
            className="mt-16"
          />

          {/* Outros serviços — linkagem interna */}
          <h2 className="mt-16 text-2xl font-extrabold">Outros serviços</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((item) => {
              const RelatedIcon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={`/servicos/${item.slug}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-gt-dark-gray p-5 transition-colors hover:border-gt-terracota/50"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gt-terracota/15 text-gt-terracota">
                      <RelatedIcon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="flex items-center gap-1.5 font-bold text-white">
                        {item.title}
                        <ArrowRight
                          className="h-4 w-4 text-gt-terracota transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/60">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-gt-terracota transition-opacity hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para a página inicial
          </Link>
        </article>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
