"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { usePointerFine } from "@/lib/hooks";

interface MagneticButtonProps extends HTMLMotionProps<"a"> {
  /** Fração do deslocamento do cursor aplicada ao elemento (0–1). */
  strength?: number;
}

/**
 * Link com atração magnética: desliza levemente na direção do cursor enquanto
 * o mouse passa por cima, voltando ao lugar com uma mola suave. Inerte no
 * toque e sob `prefers-reduced-motion`.
 */
export function MagneticButton({
  children,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const enabled = fine && !reduce;
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 15, mass: 0.3 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const onMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((event.clientX - cx) * strength);
    y.set((event.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
      style={enabled ? { x: sx, y: sy } : undefined}
      {...props}
    >
      {children}
    </motion.a>
  );
}
