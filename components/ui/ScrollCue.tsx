/**
 * Indicador de "role para baixo". No desktop, um mouse estilizado com a
 * rodinha descendo; no mobile — onde um mouse não faz sentido — um duplo
 * chevron apontando para baixo (gesto de deslizar). O conjunto tem um respiro
 * sutil. Animações em CSS, desligadas apenas sob `prefers-reduced-motion`.
 */
export function ScrollCue({ href = "#processo" }: { href?: string }) {
  return (
    <a
      href={href}
      aria-label="Rolar para a próxima seção"
      className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 rounded-full text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-gt-black"
    >
      <span className="flex flex-col items-center gap-2.5 animate-scroll-bob motion-reduce:animate-none">
        {/* Desktop: mouse com rodinha */}
        <span className="hidden h-12 w-7 justify-center rounded-full border-2 border-white/80 bg-black/25 pt-2 shadow-lg shadow-black/30 backdrop-blur-sm transition-colors group-hover:border-white sm:flex">
          <span className="h-2.5 w-1 rounded-full bg-gt-terracota animate-scroll-wheel motion-reduce:animate-none" />
        </span>

        {/* Mobile: duplo chevron (deslizar para baixo) */}
        <span className="flex text-white [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.6))] sm:hidden">
          <svg
            width="28"
            height="18"
            viewBox="0 0 28 18"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 3l10 8 10-8" />
            <path d="M4 8l10 8 10-8" opacity="0.5" />
          </svg>
        </span>

        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
          Role
        </span>
      </span>
    </a>
  );
}
