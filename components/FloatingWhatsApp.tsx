import { MessageCircle } from "lucide-react";
import { SITE } from "@/constants/data";

/**
 * Botão flutuante do WhatsApp — fixo e disponível em toda a navegação
 * (montado no layout raiz). Abre a conversa direto na API do WhatsApp.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gt-black sm:h-16 sm:w-16"
    >
      {/* Anel pulsante (animate-pulse) atrás do botão */}
      <span
        aria-hidden
        className="absolute inset-0 animate-pulse rounded-full bg-green-500/40 motion-reduce:animate-none"
      />
      <MessageCircle
        className="relative h-7 w-7 sm:h-8 sm:w-8"
        strokeWidth={2}
        aria-hidden
      />
    </a>
  );
}
