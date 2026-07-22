"use client";

import {
  useCallback,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompareSliderProps {
  /** Camada base (revelada à direita da linha). Deve preencher o container. */
  after: ReactNode;
  /** Camada sobreposta (revelada à esquerda da linha). Deve preencher. */
  before: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  /** Posição inicial da divisória, 0–100. */
  initial?: number;
  className?: string;
  ariaLabel?: string;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Slider de comparação "Antes / Depois". O usuário arrasta a linha divisória
 * (ou usa as setas do teclado) para transformar, no mesmo frame, a roda
 * destruída na roda recuperada.
 *
 * Utilitário genérico: recebe `before`/`after` como conteúdo que preenche o
 * quadro (imagem, vídeo, o que for). O visual é atualizado por escrita direta
 * no DOM (refs) — não passa por estado/re-render nem por motion values —, o
 * que garante resposta imediata e correta inclusive sob `prefers-reduced-
 * motion` (quando o framer suprime updates dirigidos por valor). No arrasto a
 * divisória cola no cursor; no teclado ela desliza com uma transição CSS
 * suave (desligada quando o usuário pede menos movimento).
 */
export function CompareSlider({
  after,
  before,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  initial = 50,
  className,
  ariaLabel = "Comparação antes e depois — arraste para revelar",
}: CompareSliderProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const posRef = useRef(initial);
  const dragging = useRef(false);

  const initialClip = `inset(0 ${100 - initial}% 0 0)`;

  /** Posiciona a divisória. `smooth` liga a transição CSS (uso no teclado). */
  const apply = useCallback(
    (pct: number, smooth: boolean) => {
      const p = clamp(pct);
      posRef.current = p;
      const transition =
        smooth && !reduce
          ? `clip-path 0.35s ${EASE}, left 0.35s ${EASE}`
          : "none";
      const clip = `inset(0 ${100 - p}% 0 0)`;

      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.transition = transition;
        overlay.style.clipPath = clip;
        overlay.style.setProperty("-webkit-clip-path", clip);
      }
      const divider = dividerRef.current;
      if (divider) {
        divider.style.transition = transition;
        divider.style.left = `${p}%`;
      }
      handleRef.current?.setAttribute("aria-valuenow", String(Math.round(p)));
    },
    [reduce]
  );

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      apply(((clientX - rect.left) / rect.width) * 100, false);
    },
    [apply]
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(event.clientX);
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 10 : 4;
    const targets: Record<string, number> = {
      ArrowLeft: posRef.current - step,
      ArrowRight: posRef.current + step,
      Home: 0,
      End: 100,
    };
    if (event.key in targets) {
      event.preventDefault();
      apply(targets[event.key], true);
    }
  };

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      data-cursor="resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={cn(
        "group relative touch-none select-none overflow-hidden bg-gt-dark-gray",
        "cursor-ew-resize",
        className
      )}
    >
      {/* Base: Depois (revelado à direita) */}
      <div className="pointer-events-none absolute inset-0">{after}</div>

      {/* Sobreposição: Antes (revelado à esquerda, recortado pela divisória) */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: initialClip, WebkitClipPath: initialClip }}
      >
        {before}
      </div>

      {/* Rótulos */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-md bg-gt-terracota/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Divisória + alça */}
      <div
        ref={dividerRef}
        className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)]"
        style={{ left: `${initial}%` }}
      >
        <button
          ref={handleRef}
          type="button"
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={initial}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2",
            "place-items-center rounded-full border border-white/70 bg-black/55 text-white backdrop-blur-md",
            "shadow-lg transition-transform duration-200 group-hover:scale-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          )}
        >
          {/* Duas setas indicando que a alça é arrastável */}
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m14 8 4 4-4 4" />
            <path d="m10 8-4 4 4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
