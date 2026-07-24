import type { Config } from "tailwindcss";

/**
 * GT PNEUS & RODAS — Tema "Premium Automotive" (visual escuro + terracota).
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
    },
  },
  plugins: [],
};

export default config;
