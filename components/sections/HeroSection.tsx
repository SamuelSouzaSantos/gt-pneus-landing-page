"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EASE_OUT, fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Seção Hero da landing page.
 *
 * Vídeo de fundo em loop (torno/solda) cobrindo toda a área com `object-cover`,
 * sob um overlay escuro que garante a legibilidade do texto. No carregamento,
 * o conteúdo entra em cascata (badge → título → parágrafo → CTA) via variantes
 * compartilhadas, e um indicador de "role para baixo" pulsa na base.
 */
export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-gt-black"
    >
      {/* ----------------------------------------------------------------- */}
      {/* Background em vídeo                                                */}
      {/* ----------------------------------------------------------------- */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/poster-hero.jpg"
        aria-hidden
      >
        <source src="/videos/video-solda.mp4" type="video/mp4" />
      </video>

      {/* Overlay escuro para contraste do texto */}
      <div className="absolute inset-0 z-0 bg-black/60" aria-hidden />

      {/* ----------------------------------------------------------------- */}
      {/* Ilustração — pilha de pneus/roda (desktop). A máscara radial funde */}
      {/* o fundo escuro da foto com o Hero, sem borda dura.                 */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1.1, ease: EASE_OUT }}
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-[52%] items-center justify-center lg:flex"
        aria-hidden
      >
        <div className="relative flex h-[82%] w-full items-center justify-center">
          {/* Halo suave para destacar os pneus escuros sobre o vídeo */}
          <div className="absolute inset-0 [background:radial-gradient(closest-side,rgba(255,255,255,0.10),transparent_70%)]" />
          <Image
            src="/images/rodas-hero.png"
            alt=""
            fill
            sizes="52vw"
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* Conteúdo                                                          */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota"
          >
            Serviços Automotivos
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            Não troque sua roda.{" "}
            <span className="text-gt-terracota">
              Nós a trazemos de volta à vida.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg text-white/80"
          >
            Especialista em{" "}
            <strong className="font-semibold text-white">
              solda de alumínio
            </strong>{" "}
            e{" "}
            <strong className="font-semibold text-white">
              reforma de rodas
            </strong>
            . Trabalho de ponta, entregando qualidade e segurança ao que
            parecia perdido.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a href="#contato">
              <Button size="lg" className="bg-gt-terracota text-white">
                Solicitar Orçamento
              </Button>
            </a>
            <a href="#servicos">
              <Button size="lg" variant="outline">
                Ver Especialidades
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
