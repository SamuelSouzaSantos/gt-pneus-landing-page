import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { ReviewMessageBuilder } from "@/components/ReviewMessageBuilder";
import { SITE } from "@/constants/data";

export const metadata: Metadata = {
  title: "Pedir avaliação no Google",
  description:
    "Ferramenta interna para montar o convite de avaliação enviado ao cliente pelo WhatsApp.",
  // Ferramenta de uso interno: não deve ser indexada nem entrar no sitemap.
  robots: { index: false, follow: false },
};

export default function AvaliarPage() {
  return (
    <main className="flex-1 bg-gt-black">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gt-terracota transition-opacity hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar para o site
        </Link>

        <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gt-terracota text-white">
          <Star className="h-7 w-7" aria-hidden />
        </span>

        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          Pedir avaliação no Google
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
          Monte a mensagem do convite em segundos e mande para o cliente logo
          depois de entregar o serviço. Avaliações são o que mais pesa para a{" "}
          {SITE.name} aparecer nas buscas da região.
        </p>

        <div className="mt-10">
          <ReviewMessageBuilder />
        </div>

        <p className="mt-10 text-xs leading-relaxed text-white/40">
          Esta página é de uso interno — não aparece no menu do site nem nas
          buscas do Google.
        </p>
      </div>
    </main>
  );
}
