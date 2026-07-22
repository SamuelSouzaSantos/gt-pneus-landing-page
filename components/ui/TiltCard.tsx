"use client";

import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { usePointerFine } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Inclinação máxima em graus para cada eixo. */
  max?: number;
}

/**
 * Envelope que dá um leve tilt 3D ao seguir o cursor, com uma sutil elevação
 * no hover — deixa os cards de especialidade "táteis". Desliga em toque e sob
 * `prefers-reduced-motion`, renderizando o mesmo `<div>` sem transform (sem
 * remontar os filhos).
 */
export function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const enabled = fine && !reduce;
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.4 };
  const sx = useSpring(rotateX, springConfig);
  const sy = useSpring(rotateY, springConfig);

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
      whileHover={enabled ? { scale: 1.02 } : undefined}
      style={
        enabled
          ? {
              rotateX: sx,
              rotateY: sy,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      className={cn(enabled && "will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
