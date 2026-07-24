import Image from "next/image";
import { MapPin, Clock, Phone, MessageCircle, Star } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/constants/data";

/**
 * Rodapé / seção de contato.
 * O bloco do mapa já está estruturado para receber o iframe do Google Maps —
 * basta descomentar e colar o embed quando disponível.
 */
export function Footer() {
  return (
    <footer id="contato" className="border-t border-white/10 bg-gt-dark-gray">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Banner da fachada da loja */}
        <div className="relative mb-14 h-56 w-full overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-72">
          <Image
            src="/images/foto-loja.jpg"
            alt={`Fachada da loja ${SITE.name} em ${SITE.address.city}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-gt-dark-gray via-gt-dark-gray/30 to-transparent"
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.3em] text-gt-terracota">
              Nossa Loja
            </p>
            <p className="text-xl font-bold text-white sm:text-2xl">
              Referência em {SITE.address.city}
            </p>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* ---------------- Coluna de informações ---------------- */}
          <div className="space-y-8">
            <Logo />

            <p className="max-w-md text-white/70">{SITE.tagline}</p>

            {/* Endereço — clicável, abre a localização no Google Maps */}
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3"
              aria-label={`Abrir a localização da ${SITE.name} no Google Maps`}
            >
              <MapPin
                className="mt-1 h-5 w-5 shrink-0 text-gt-terracota"
                aria-hidden
              />
              <address className="not-italic text-white/80 transition-colors group-hover:text-white">
                {SITE.address.line}
                <br />
                {SITE.address.city}
              </address>
            </a>

            {/* Contato */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`tel:+${SITE.whatsappNumber}`}
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 text-gt-terracota" aria-hidden />
                {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <MessageCircle className="h-5 w-5 text-green-500" aria-hidden />
                WhatsApp
              </a>
              {/* Só aparece depois que o link do Perfil da Empresa for configurado. */}
              {SITE.googleReviewUrl && (
                <a
                  href={SITE.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                >
                  <Star className="h-5 w-5 text-gt-terracota" aria-hidden />
                  Avalie-nos no Google
                </a>
              )}
            </div>

            {/* Horários */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                <Clock className="h-4 w-4 text-gt-terracota" aria-hidden />
                Horário de Funcionamento
              </h3>
              <ul className="space-y-2">
                {SITE.hours.map((slot) => (
                  <li
                    key={slot.days}
                    className="flex items-center justify-between gap-4 border-b border-white/5 pb-2 text-sm sm:max-w-xs"
                  >
                    <span className="text-white/70">{slot.days}</span>
                    <span className="font-semibold text-white">
                      {slot.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------------- Coluna do mapa ---------------- */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
              Localização fácil em São Sebastião - DF
            </h3>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gt-black ring-1 ring-white/10">
              <iframe
                title={`Localização ${SITE.name} no Google Maps`}
                /* O `q` é o termo de busca do Google Maps e precisa casar com
                   o nome REGISTRADO no Perfil da Empresa (hoje "Gt Pneus E
                   Rodas") — por isso não acompanha o nome comercial exibido
                   no site. Se o perfil for renomeado, atualizar aqui. */
                src="https://www.google.com/maps?q=GT%20Pneus%20e%20Rodas%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20DF&z=17&hl=pt-BR&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gt-terracota transition-opacity hover:opacity-80"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Abrir rota no Google Maps
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos
            reservados.
          </p>
          <p>São Sebastião · Distrito Federal</p>
        </div>
      </div>
    </footer>
  );
}
