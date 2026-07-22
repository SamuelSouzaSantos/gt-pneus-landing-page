"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategoryId,
  type GalleryItem,
  type MediaAsset,
} from "@/constants/data";
import { CompareSlider } from "@/components/ui/CompareSlider";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Renderiza uma peça de mídia (foto ou vídeo mudo em loop) preenchendo o
 * quadro do slider. Sem rótulos nem bordas — quem cuida disso é o
 * `CompareSlider`. `pointer-events-none` (herdado do slider) garante que o
 * arrasto vá para a linha divisória, não para a mídia.
 */
function mediaLayer(
  media: MediaAsset,
  alt: string,
  sizes: string,
  fit: "cover" | "contain"
): ReactNode {
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  if (media.type === "image") {
    return (
      <Image
        src={media.src}
        alt={alt}
        fill
        draggable={false}
        className={objectFit}
        sizes={sizes}
      />
    );
  }

  return (
    <video
      className={cn("absolute inset-0 h-full w-full", objectFit)}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={media.poster}
      aria-label={alt}
    >
      <source src={media.src} type="video/mp4" />
    </video>
  );
}

const CARD_SIZES = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px";
const LIGHTBOX_SIZES = "(max-width: 1024px) 92vw, 900px";

/**
 * Card da galeria: um slider de comparação "Antes/Depois" que o visitante
 * arrasta ali mesmo na grade. O botão de ampliar abre o lightbox — seu
 * `onPointerDown` interrompe a propagação para não iniciar um arrasto.
 */
function GalleryCard({
  item,
  onExpand,
}: {
  item: GalleryItem;
  onExpand: () => void;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-gt-black p-3 transition-colors hover:border-gt-terracota/40">
      <div className="relative">
        <CompareSlider
          className="aspect-[4/3] w-full rounded-xl ring-1 ring-white/10"
          before={mediaLayer(item.before, `${item.title} — antes`, CARD_SIZES, "cover")}
          after={mediaLayer(item.after, `${item.title} — depois`, CARD_SIZES, "cover")}
          ariaLabel={`Comparar antes e depois — ${item.title}`}
        />
        <button
          type="button"
          onClick={onExpand}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label={`Ampliar ${item.title}`}
          className="absolute bottom-2 right-2 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-terracota"
        >
          <Maximize2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </figure>
  );
}

/**
 * Lightbox em tela cheia com o slider de comparação ampliado. Navega entre os
 * itens da aba atual com as setas ou ← / →, fecha com X, ESC ou clique fora.
 * Bloqueia a rolagem da página (nativa e Lenis) enquanto aberto.
 */
function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const lenis = useLenis();
  const item = items[activeIndex];
  const dialogRef = useRef<HTMLDivElement>(null);

  // Índice atual acessível ao listener sem re-assiná-lo a cada navegação.
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Abrir/fechar: trava a rolagem (nativa + Lenis) e gerencia o foco — move
  // para dentro do diálogo ao abrir e devolve ao gatilho ao fechar.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      lenis?.start();
      previouslyFocused?.focus();
    };
  }, [lenis]);

  // Teclado: ESC fecha, ←/→ navegam e o Tab fica preso dentro do diálogo.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        onNavigate((activeIndexRef.current + 1) % items.length);
        return;
      }
      if (event.key === "ArrowLeft") {
        onNavigate((activeIndexRef.current - 1 + items.length) % items.length);
        return;
      }
      if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [role="slider"], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        } else if (!dialogRef.current?.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              onNavigate((activeIndex - 1 + items.length) % items.length)
            }
            aria-label="Item anterior"
            className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => onNavigate((activeIndex + 1) % items.length)}
            aria-label="Próximo item"
            className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </>
      )}

      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <CompareSlider
          className="aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 sm:aspect-video"
          before={mediaLayer(item.before, `${item.title} — antes`, LIGHTBOX_SIZES, "contain")}
          after={mediaLayer(item.after, `${item.title} — depois`, LIGHTBOX_SIZES, "contain")}
          ariaLabel={`Comparar antes e depois — ${item.title}`}
        />
      </motion.div>
    </motion.div>
  );
}

export function GallerySection() {
  const [active, setActive] = useState<GalleryCategoryId>("rodas");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const items = GALLERY_ITEMS.filter((item) => item.category === active);

  // Identidade estável — evita re-assinar os efeitos do lightbox a cada render.
  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  function changeCategory(id: GalleryCategoryId) {
    setSelectedIndex(null);
    setActive(id);
  }

  return (
    <section id="galeria" className="bg-gt-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota">
            Antes & Depois
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Arraste e veja a transformação
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Puxe a linha divisória para ver a roda destruída voltar à vida — o
            antes e o depois no mesmo quadro.
          </p>
        </div>

        {/* Tabs / Abas */}
        <div
          role="tablist"
          aria-label="Categorias da galeria"
          className="mb-8 inline-flex rounded-full border border-white/10 bg-gt-dark-gray p-1"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const isActive = active === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => changeCategory(category.id)}
                className={cn(
                  "relative rounded-full px-6 py-2 text-sm font-semibold transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-tab-pill"
                    className="absolute inset-0 rounded-full bg-gt-terracota"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid de itens — a troca de aba anima com AnimatePresence (mode wait):
            o conteúdo antigo sai antes de o novo entrar, sem corte seco. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                onExpand={() => setSelectedIndex(index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <GalleryLightbox
            key="gallery-lightbox"
            items={items}
            activeIndex={selectedIndex}
            onClose={closeLightbox}
            onNavigate={setSelectedIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
