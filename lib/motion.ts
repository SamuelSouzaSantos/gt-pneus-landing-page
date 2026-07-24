import type { Variants } from "framer-motion";

/**
 * Vocabulário de movimento compartilhado da GT PNEUS & RODAS.
 *
 * A identidade é uma oficina que "traz a roda de volta à vida": o movimento
 * evoca precisão e restauração — entradas que sobem com firmeza (nada de
 * quicar) e um brilho terracota que acende como uma solda. Centralizar as
 * curvas e variantes aqui mantém a cadência consistente em toda a página.
 */

/** Curva easeOutExpo suave — sensação "cara", desacelera com elegância. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Curva simétrica para transições de estado (troca de abas, etc.). */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/**
 * Container que orquestra a entrada dos filhos em cascata.
 * Combine com `fadeUp` nos filhos e dispare via `whileInView="show"`.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

/** Item que revela subindo — par natural de `staggerContainer`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};
