import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/constants/data";

interface LogoProps {
  className?: string;
  /** Exibe o wordmark ao lado do símbolo. Desligável para usos compactos. */
  showText?: boolean;
  /** Prioriza o carregamento (use no cabeçalho, acima da dobra). */
  priority?: boolean;
}

/**
 * Marca da GT: o emblema (pneu + engrenagem formando o "G") em branco,
 * acompanhado do wordmark "GT PNEUS & RODAS". O símbolo é um PNG transparente,
 * então assenta bem tanto sobre o vídeo do Hero quanto sobre as seções escuras.
 */
export function Logo({ className, showText = true, priority = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logo-branca.png"
        alt={SITE.name}
        width={988}
        height={969}
        priority={priority}
        className="h-11 w-auto"
      />

      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-wide text-white">
            {SITE.name}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gt-terracota">
            Serviços Automotivos
          </span>
        </span>
      )}
    </div>
  );
}
