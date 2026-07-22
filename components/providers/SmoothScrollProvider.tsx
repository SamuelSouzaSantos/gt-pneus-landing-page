"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";

/**
 * Envelopa toda a aplicação com dois comportamentos globais:
 *
 * 1. **Scroll amanteigado (Lenis)** — interpola a rolagem nativa para um
 *    movimento aveludado e também suaviza os saltos de âncora (#servicos…).
 * 2. **MotionConfig `reducedMotion="user"`** — piso de qualidade: respeita
 *    `prefers-reduced-motion` desligando transform/layout em toda a árvore
 *    framer-motion sem precisar tratar caso a caso.
 *
 * Quem pede menos movimento recebe rolagem nativa (sem Lenis). Como o Lenis
 * em modo `root` não injeta nenhum elemento no DOM, alternar entre os dois
 * ramos não gera mismatch de hidratação.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  if (reduceMotion) return content;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Links de âncora (#servicos, #processo…) rolam suave via Lenis, parando
        // logo abaixo da navbar fixa (80px) em vez de por baixo dela.
        anchors: { offset: -80 },
      }}
    >
      {content}
    </ReactLenis>
  );
}
