"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { usePointerFine } from "@/lib/hooks";

/** Elementos sobre os quais o cursor entra no estado "hover" (anel cresce). */
const INTERACTIVE =
  'a, button, [role="slider"], [role="tab"], [role="button"], label, input, select, textarea, summary, [data-cursor="target"]';

/** Elementos onde o cursor vira um "↔" (arrastar horizontal — o slider). */
const RESIZE = '[role="slider"], [data-cursor="resize"]';

/**
 * Cursor customizado: um ponto terracota que cola no mouse e um anel que o
 * segue com leve atraso, crescendo e ganhando cor sobre elementos interativos
 * — reforçando o clima "de alto nível" sem competir com a assinatura (o slider
 * de comparação).
 *
 * Só entra em ação em dispositivos com ponteiro preciso (nada de toque). Para
 * quem pede menos movimento, o cursor ainda aparece, porém **sem atraso nem
 * transições** (segue instantâneo): é um recolorir do ponteiro, não uma
 * animação. O ponto é escrito direto no DOM no `pointermove`; o anel interpola
 * num loop de rAF apenas quando há movimento permitido.
 */
export function CustomCursor() {
  const fine = usePointerFine();
  const reduce = useReducedMotion();
  const enabled = fine; // toque nunca; reduced-motion apenas remove o atraso

  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const arrow = arrowRef.current;
    if (!root || !ring || !dot || !arrow) return;

    const smooth = !reduce;
    document.documentElement.classList.add("cursor-none");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let pressed = false;
    let visible = false;
    let hovering = false;
    let resizing = false;
    let raf = 0;

    const setRing = () => {
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${
        pressed ? 0.82 : 1
      })`;
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      const tight = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      dot.style.transform = tight;
      arrow.style.transform = tight;
      if (!smooth) {
        rx = tx;
        ry = ty;
        setRing();
      }
      if (!visible) {
        visible = true;
        root.style.opacity = "1";
      }
      const target = event.target as Element | null;
      const isHover = !!target?.closest?.(INTERACTIVE);
      if (isHover !== hovering) {
        hovering = isHover;
        root.classList.toggle("is-hover", isHover);
      }
      const isResize = !!target?.closest?.(RESIZE);
      if (isResize !== resizing) {
        resizing = isResize;
        root.classList.toggle("is-resize", isResize);
      }
    };

    const loop = () => {
      rx += (tx - rx) * 0.2;
      ry += (ty - ry) * 0.2;
      setRing();
      raf = requestAnimationFrame(loop);
    };
    if (smooth) raf = requestAnimationFrame(loop);

    const onDown = () => {
      pressed = true;
      root.classList.add("is-down");
      if (!smooth) setRing();
    };
    const onUp = () => {
      pressed = false;
      root.classList.remove("is-down");
      if (!smooth) setRing();
    };
    const onLeave = () => {
      root.style.opacity = "0";
    };
    const onEnter = () => {
      if (visible) root.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, reduce]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="gt-cursor" aria-hidden>
      <div ref={ringRef} className="gt-cursor__ring" />
      <div ref={dotRef} className="gt-cursor__dot" />
      {/* Indicador "↔" — aparece sobre o slider de comparação */}
      <div ref={arrowRef} className="gt-cursor__resize">
        <svg
          width="46"
          height="20"
          viewBox="0 0 46 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 4 2 10l6 6" />
          <path d="M38 4l6 6-6 6" />
          <path d="M2 10h42" />
        </svg>
      </div>
    </div>
  );
}
