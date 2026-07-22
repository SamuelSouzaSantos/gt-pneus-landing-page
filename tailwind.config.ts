import type { Config } from "tailwindcss";

/**
 * GT Pneus e Rodas — Tema "Premium Automotive" (visual escuro + terracota).
 *
 * A paleta é intencionalmente enxuta e semântica para escalar com facilidade
 * quando o projeto evoluir para um SaaS (dashboards, painéis administrativos,
 * temas por tenant, etc.). Novas cores devem ser adicionadas aqui como tokens.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gt-terracota": "#9b392a",
        "gt-black": "#111111",
        "gt-dark-gray": "#1a1a1a",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gt-radial":
          "radial-gradient(circle at 50% 0%, rgba(155,57,42,0.15), transparent 60%)",
      },
      keyframes: {
        // Rodinha do mouse descendo em loop (indicador de "role para baixo").
        "scroll-wheel": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "20%": { opacity: "1" },
          "70%": { transform: "translateY(10px)", opacity: "1" },
          "100%": { transform: "translateY(12px)", opacity: "0" },
        },
        // Respiro sutil do conjunto do mouse.
        "scroll-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(5px)" },
        },
      },
      animation: {
        "scroll-wheel": "scroll-wheel 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "scroll-bob": "scroll-bob 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
