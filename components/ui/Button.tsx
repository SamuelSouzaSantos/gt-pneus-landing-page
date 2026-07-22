import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-gt-terracota text-white hover:bg-gt-terracota/90 shadow-lg shadow-gt-terracota/20",
  outline:
    "border border-white/20 text-white hover:border-gt-terracota hover:text-gt-terracota bg-transparent",
  ghost: "text-white/80 hover:text-white hover:bg-white/5",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Botão base do design system. Tipado e com variantes — pronto para reuso
 * em toda a aplicação (landing page hoje, dashboards do SaaS amanhã).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
          "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-gt-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-gt-black",
          "disabled:pointer-events-none disabled:opacity-50",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
