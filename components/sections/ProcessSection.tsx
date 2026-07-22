"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { PROCESS_STEPS } from "@/constants/data";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Seção "Nosso Processo": vídeo demonstrativo à esquerda (desktop) e grid com
 * os 4 passos à direita.
 *
 * Scrolltelling leve: conforme a seção sobe, os passos "acendem"
 * sequencialmente (borda terracota + opacidade cheia), indicando progresso;
 * os que ainda não chegaram ficam apagados. O número de passos acesos é
 * derivado do progresso de rolagem — sem re-render por frame, só quando muda.
 */
export function ProcessSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [litCount, setLitCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 85%", "end 45%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const total = PROCESS_STEPS.length;
    const next = Math.min(total, Math.max(0, Math.round(p * total)));
    setLitCount((prev) => (prev === next ? prev : next));
  });

  return (
    <section id="processo" className="bg-gt-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota">
            Nosso Processo
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Precisão em cada etapa
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Do diagnóstico à entrega com garantia, um método transparente e
            técnico para você acompanhar de perto.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* ----------------------------------------------------------- */}
          {/* Coluna esquerda — vídeo do desempeno (fixa/sticky no scroll) */}
          {/* ----------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <figure className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              <video
                className="aspect-video w-full rounded-2xl bg-gt-dark-gray object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/poster-desempeno.jpg"
                aria-label="Demonstração da força do desempeno de rodas"
              >
                <source src="/videos/video-marreta.mp4" type="video/mp4" />
              </video>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-lg font-semibold text-white">
                Assista à força do desempeno
              </figcaption>
            </figure>
          </motion.div>

          {/* ----------------------------------------------------------- */}
          {/* Coluna direita — grid de 4 passos que acendem no scroll     */}
          {/* ----------------------------------------------------------- */}
          <motion.div
            ref={stepsRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1"
          >
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLit = index < litCount;
              return (
                <article
                  key={step.id}
                  aria-current={isLit ? "step" : undefined}
                  className={cn(
                    "rounded-2xl border bg-gt-dark-gray p-6 transition-[border-color,box-shadow] duration-500 ease-out",
                    isLit
                      ? "border-gt-terracota/60 shadow-[0_18px_45px_-28px_rgba(155,57,42,0.85)]"
                      : "border-white/10"
                  )}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-xl transition-colors duration-500",
                        isLit
                          ? "bg-gt-terracota text-white"
                          : "bg-white/10 text-white/60"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={cn(
                        "text-4xl font-black transition-colors duration-500",
                        isLit ? "text-gt-terracota/50" : "text-white/15"
                      )}
                    >
                      {String(step.order).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "text-lg font-bold transition-colors duration-500",
                      isLit ? "text-white" : "text-white/85"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed transition-colors duration-500",
                      isLit ? "text-white/80" : "text-white/65"
                    )}
                  >
                    {step.description}
                  </p>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
