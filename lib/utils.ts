import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` combina classes condicionais (clsx) e resolve conflitos de utilitários
 * do Tailwind (tailwind-merge). Padrão de mercado para componentes de UI
 * reutilizáveis — essencial para um design system escalável.
 *
 * @example cn("px-2", isActive && "bg-gt-terracota", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
