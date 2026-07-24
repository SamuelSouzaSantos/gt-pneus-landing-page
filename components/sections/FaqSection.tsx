import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/constants/data";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Envolve o conteúdo no container centralizado (desligue se já houver um). */
  contained?: boolean;
  className?: string;
}

/**
 * Bloco de dúvidas frequentes + dados estruturados `FAQPage`.
 *
 * Usa `<details>/<summary>` nativos de propósito: acessível por teclado sem
 * nenhum JavaScript, com as respostas sempre presentes no HTML (o rastreador
 * lê mesmo com o item fechado). A abertura ganha um fade discreto via CSS,
 * desligado sob `prefers-reduced-motion`.
 *
 * O schema publicado reflete **exatamente** os itens visíveis nesta página —
 * é por isso que cada página monta sua própria lista, em vez de repetir um
 * FAQ global.
 */
export function FaqSection({
  items,
  eyebrow,
  title = "Dúvidas frequentes",
  subtitle,
  contained = true,
  className,
}: FaqSectionProps) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const content = (
    <>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>
      )}

      <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-gt-dark-gray">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-white transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gt-terracota [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-gt-terracota transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden
              />
            </summary>
            <div className="faq-answer px-5 pb-5 leading-relaxed text-white/70">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </>
  );

  return (
    <section className={cn(className)}>
      {contained ? (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">{content}</div>
      ) : (
        content
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
