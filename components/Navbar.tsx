"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/constants/data";
import { cn } from "@/lib/utils";

/**
 * Navbar fixa e translúcida. O fundo ganha blur/borda após rolar a página,
 * garantindo legibilidade sobre qualquer seção. Inclui menu mobile acessível.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  /**
   * As âncoras (#servicos…) só existem na home. Fora dela, prefixamos com "/"
   * para voltar à home na seção certa. Mantendo o "#" puro na home, o Lenis
   * segue interceptando o clique e fazendo a rolagem suave.
   */
  const linkHref = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/10 bg-gt-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href={isHome ? "#inicio" : "/"} aria-label={SITE.name}>
          <Logo priority />
        </a>

        {/* Links — desktop (pílulas com fundo leve, deixando claro que são
            clicáveis; o clique rola suave até a seção via Lenis) */}
        <ul className="hidden items-center gap-1.5 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={linkHref(link.href)}
                className="block rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/75 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.14] hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <div className="hidden md:block">
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button size="md">Orçamento</Button>
          </a>
        </div>

        {/* Toggle — mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menu — mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-gt-black/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={linkHref(link.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl bg-white/[0.06] px-4 py-3 text-base font-medium text-white/80 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.14] hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <Button size="md" className="w-full">
                    Orçamento
                  </Button>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
