"use client";

import { useMemo, useState } from "react";
import { Check, Copy, MessageCircle, RotateCcw, Star } from "lucide-react";
import { ALL_SERVICES, SITE } from "@/constants/data";
import { cn } from "@/lib/utils";

/**
 * Normaliza o telefone digitado para o formato aceito pelo `wa.me`
 * (só dígitos, com DDI). Aceita "(61) 99280-6373", "61992806373" ou já com o
 * 55 na frente. Devolve `null` quando não dá para montar um número válido.
 */
function toWhatsAppNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return null;
}

function buildMessage(name: string, service: string, reviewUrl: string) {
  const greeting = name.trim() ? `Olá, ${name.trim()}!` : "Olá!";
  const job = service ? ` Seu serviço de ${service.toLowerCase()} ficou pronto.` : "";
  return (
    `${greeting} Aqui é da ${SITE.name}.${job}\n\n` +
    `Se você gostou do resultado, avaliar a gente no Google leva menos de 1 minuto ` +
    `e ajuda demais uma oficina pequena a ser encontrada por mais gente:\n` +
    `${reviewUrl || "[configure o link de avaliação]"}\n\n` +
    `Obrigado pela confiança! 🔧`
  );
}

export function ReviewMessageBuilder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [custom, setCustom] = useState<string | null>(null);
  const [copied, setCopied] = useState<"msg" | "link" | null>(null);

  const reviewUrl = SITE.googleReviewUrl;
  const configured = reviewUrl.length > 0;

  const generated = useMemo(
    () => buildMessage(name, service, reviewUrl),
    [name, service, reviewUrl]
  );
  const message = custom ?? generated;

  const waNumber = toWhatsAppNumber(phone);
  const waHref = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
    : null;

  async function copy(text: string, which: "msg" | "link") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-gt-dark-gray px-4 py-3 text-white placeholder:text-white/40 focus:border-gt-terracota focus:outline-none focus:ring-1 focus:ring-gt-terracota";

  return (
    <div className="space-y-8">
      {!configured && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm leading-relaxed text-amber-100">
          <strong className="font-bold">Falta configurar o link.</strong> Pegue
          o link curto em <em>Perfil da Empresa no Google → Pedir avaliações</em>{" "}
          e cole em <code className="rounded bg-black/40 px-1.5 py-0.5">googleReviewUrl</code>{" "}
          no arquivo <code className="rounded bg-black/40 px-1.5 py-0.5">constants/data.ts</code>.
          A mensagem abaixo já funciona, mas sai sem o link.
        </div>
      )}

      {/* Formulário */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white/80">
            Nome do cliente
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Carlos"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white/80">
            WhatsApp do cliente{" "}
            <span className="font-normal text-white/40">(opcional)</span>
          </span>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(61) 99999-9999"
            className={fieldClass}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-white/80">
            Serviço realizado{" "}
            <span className="font-normal text-white/40">(opcional)</span>
          </span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={fieldClass}
          >
            <option value="">Não mencionar o serviço</option>
            {ALL_SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Mensagem */}
      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-white/80">
            Mensagem (pode editar)
          </span>
          {custom !== null && (
            <button
              type="button"
              onClick={() => setCustom(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gt-terracota transition-opacity hover:opacity-80"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Restaurar padrão
            </button>
          )}
        </div>
        <textarea
          value={message}
          onChange={(e) => setCustom(e.target.value)}
          rows={8}
          className={cn(fieldClass, "resize-y font-mono text-sm leading-relaxed")}
        />
      </div>

      {/* Ações */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => copy(message, "msg")}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-gt-terracota px-6 font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-gt-black"
        >
          {copied === "msg" ? (
            <Check className="h-5 w-5" aria-hidden />
          ) : (
            <Copy className="h-5 w-5" aria-hidden />
          )}
          {copied === "msg" ? "Copiado!" : "Copiar mensagem"}
        </button>

        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-green-500 px-6 font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gt-black"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Abrir conversa no WhatsApp
          </a>
        ) : (
          <span className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm text-white/40">
            Informe o WhatsApp para abrir a conversa
          </span>
        )}

        {configured && (
          <button
            type="button"
            onClick={() => copy(reviewUrl, "link")}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {copied === "link" ? (
              <Check className="h-5 w-5" aria-hidden />
            ) : (
              <Star className="h-5 w-5" aria-hidden />
            )}
            {copied === "link" ? "Copiado!" : "Copiar só o link"}
          </button>
        )}
      </div>

      {/* Como usar */}
      <div className="rounded-2xl border border-white/10 bg-gt-dark-gray p-6">
        <h2 className="text-lg font-bold text-white">Como usar no dia a dia</h2>
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
          <li>
            <strong className="text-white">1.</strong> Termine o serviço e tire
            a foto da peça pronta.
          </li>
          <li>
            <strong className="text-white">2.</strong> Mande a foto para o
            cliente no WhatsApp — a foto tem que ir primeiro, é ela que gera o
            &ldquo;uau&rdquo;.
          </li>
          <li>
            <strong className="text-white">3.</strong> Preencha o nome aqui,
            clique em <em>Copiar mensagem</em> e cole logo abaixo da foto.
          </li>
        </ol>
        <p className="mt-4 text-xs leading-relaxed text-white/50">
          O WhatsApp não permite anexar imagem por link — por isso a foto vai
          manualmente e só o texto é gerado aqui. Peça a avaliação no mesmo dia:
          é quando a satisfação está no pico.
        </p>
      </div>
    </div>
  );
}
