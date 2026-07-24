"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PREMIUM_SERVICES, ESSENTIAL_SERVICES } from "@/constants/data";
import type { Service } from "@/constants/data";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/*                              Cards internos                                */
/* -------------------------------------------------------------------------- */

/** Card grande de especialidade — fundo terracota (destaque premium). */
function PremiumCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.1 }}
      className="h-full"
    >
      <TiltCard className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gt-terracota p-8 shadow-xl shadow-black/20 sm:p-10">
        {/* brilho decorativo */}
        <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <span className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
          <Icon className="h-7 w-7" />
        </span>

        <h3 className="relative text-2xl font-extrabold text-white">
          {service.title}
        </h3>
        <p className="relative mt-3 max-w-md text-white/85">
          {service.description}
        </p>

        <div className="relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <MagneticButton
            href="#contato"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white"
          >
            Solicitar orçamento
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>

          <Link
            href={`/servicos/${service.slug}`}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Ver detalhes
          </Link>
        </div>
      </TiltCard>
    </motion.article>
  );
}

/** Card menor de serviço essencial — fundo dark-gray. */
function EssentialCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
      className="rounded-2xl border border-white/10 bg-gt-dark-gray p-6 transition-colors hover:border-gt-terracota/40"
    >
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gt-terracota/15 text-gt-terracota">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-bold text-white">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        {service.description}
      </p>
      <Link
        href={`/servicos/${service.slug}`}
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gt-terracota transition-opacity hover:opacity-80"
      >
        Ver detalhes
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Seção                                     */
/* -------------------------------------------------------------------------- */

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-gt-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* -------- Nossas Especialidades (premium) -------- */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota">
            Nossas Especialidades
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Onde a maioria desiste, nós recuperamos
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Especialista em solda de alumínio e reforma de rodas, executadas com
            precisão e décadas de experiência.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PREMIUM_SERVICES.map((service, index) => (
            <PremiumCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* -------- Serviços Essenciais -------- */}
        <div className="mb-10 mt-24 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota">
            Serviços Essenciais
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            O dia a dia do seu veículo em boas mãos
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Desempeno, balanceamento e borracharia com agilidade para você
            voltar à estrada com segurança.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ESSENTIAL_SERVICES.map((service, index) => (
            <EssentialCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
