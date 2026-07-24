import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { ALL_SERVICES, PREMIUM_SERVICES, ESSENTIAL_SERVICES, SITE } from "@/constants/data";

export const metadata: Metadata = {
  title: `Serviços em ${SITE.address.city}`,
  description:
    "Reforma de rodas, solda de alumínio, desempeno, balanceamento e borracharia em São Sebastião - DF. Veja todos os serviços da GT PNEUS & RODAS.",
  alternates: { canonical: "/servicos" },
};

function ServiceGrid({ items }: { items: typeof ALL_SERVICES }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((service) => {
        const Icon = service.icon;
        return (
          <li key={service.id}>
            <Link
              href={`/servicos/${service.slug}`}
              className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-gt-dark-gray p-6 transition-colors hover:border-gt-terracota/50"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gt-terracota/15 text-gt-terracota">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <span>
                <span className="flex items-center gap-1.5 text-lg font-bold text-white">
                  {service.title}
                  <ArrowRight
                    className="h-4 w-4 text-gt-terracota transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-white/60">
                  {service.description}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function ServicosPage() {
  return (
    <>
      <main className="flex-1 bg-gt-black">
        <div className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <nav aria-label="Trilha de navegação" className="mb-8 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Início
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white/80">Serviços</li>
            </ol>
          </nav>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota">
            Nossos Serviços
          </p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Serviços em {SITE.address.city}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Da recuperação estrutural de uma roda trincada ao balanceamento do
            dia a dia. Escolha o serviço para ver os detalhes e pedir seu
            orçamento.
          </p>

          <h2 className="mt-14 text-2xl font-extrabold">Especialidades</h2>
          <p className="mb-6 mt-2 text-white/60">
            Onde a maioria desiste, nós recuperamos.
          </p>
          <ServiceGrid items={PREMIUM_SERVICES} />

          <h2 className="mt-14 text-2xl font-extrabold">Serviços essenciais</h2>
          <p className="mb-6 mt-2 text-white/60">
            O dia a dia do seu veículo em boas mãos.
          </p>
          <ServiceGrid items={ESSENTIAL_SERVICES} />

          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-gt-terracota transition-opacity hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para a página inicial
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
