<div align="center">

# 🔧 GT Pneus e Rodas — Landing Page de Alta Conversão

**Onde a maioria desiste, nós recuperamos.**

Landing page premium para uma oficina especializada em **solda de alumínio (TIG)** e **reforma de rodas** em São Sebastião - DF. Visual dark com destaque terracota, animações de *scrolltelling* e uma experiência sensorial pensada para **converter visitantes em orçamentos**.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-111111?style=for-the-badge)

</div>

---

## 🎯 O Problema e a Solução

Serviços de **solda de alumínio** e **reforma de rodas** são um trabalho artesanal, técnico e braçal — e, historicamente, pouco valorizado no digital. O cliente que rasgou uma roda de liga leve costuma achar que só resta **trocar** (caro) e não sabe que dá para **recuperar** com segurança.

O desafio de negócio era duplo:

| Dor | Como a landing resolve |
|-----|------------------------|
| Trabalho manual sem **autoridade digital** | Vídeos reais (solda/desempeno) + galeria **Antes/Depois** interativa que prova o resultado |
| Cliente não sabe que **dá para recuperar** | Copy direta ("Não troque sua roda. Nós a trazemos de volta à vida") e separação clara de serviços |
| Baixa **conversão** e contato difícil | CTA de WhatsApp fixo, foco em orçamento e **SEO local** para ser achado na região |

O resultado é uma vitrine que transforma um serviço braçal em uma **marca premium e confiável** — e é facilmente encontrada por quem busca *"reforma de rodas São Sebastião"*.

---

## 🚀 Features Principais

- 📱 **Design 100% responsivo** — mobile-first, do celular ao desktop.
- 🎞️ **Scrolltelling (Framer Motion)** — na seção *Processo*, os passos (01→04) "acendem" em sequência conforme você rola, com o vídeo **fixo (sticky)** ao lado.
- 🧈 **Smooth scroll aveludado (Lenis)** — rolagem interpolada e âncoras suaves, com *fallback* nativo para `prefers-reduced-motion`.
- 🎬 **Entrada triunfal do Hero** — título, texto e CTA revelam em cascata (*stagger*) + indicador de scroll (mouse no desktop, chevron no mobile).
- 🧲 **Micro-interações premium** — *tilt 3D* nos cards de especialidade, botões com efeito **magnético** e **cursor customizado** que reage aos elementos.
- 🖼️ **Galeria Antes/Depois** — **slider de comparação** arrastável (a roda destruída vira a roda nova no mesmo frame) + *lightbox* acessível com navegação por teclado.
- 💎 **Serviços Essenciais vs. Premium** — hierarquia visual que separa o dia a dia (desempeno, balanceamento, borracharia) das especialidades de alto valor (solda de alumínio, reforma de rodas).
- 🔎 **SEO Local** — `metadata` completo, **JSON-LD `AutoRepair`** (endereço, telefone, horário, geo), `robots.txt` e `sitemap.xml`.
- ♿ **Acessível por padrão** — contraste WCAG AA, foco gerenciado no *lightbox*, navegação por teclado e respeito a *reduced motion*.
- ⚡ **Performático** — animações via `transform`/`opacity` (GPU), imagens otimizadas (**−92%**) e servidas via `next/image`.

---

## 🛠️ Tech Stack

| Camada | Tecnologia | Papel |
|--------|-----------|-------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | SSR/SSG, roteamento, otimização de imagem e metadata |
| **UI Runtime** | [React 19](https://react.dev/) | Server & Client Components |
| **Linguagem** | [TypeScript 5](https://www.typescriptlang.org/) | Tipagem estática ponta a ponta |
| **Estilo** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Design system utilitário + tokens semânticos |
| **Animação** | [Framer Motion 12](https://www.framer.com/motion/) | Stagger, scroll-linked, springs, `AnimatePresence` |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Rolagem interpolada global |
| **Ícones** | [Lucide React](https://lucide.dev/) | Ícones SVG tree-shakeable |
| **Utils** | `clsx` + `tailwind-merge` | Composição segura de classes (`cn()`) |
| **Imagens** | [sharp](https://sharp.pixelplumbing.com/) | Pipeline de otimização de assets |

---

## 🏗️ Arquitetura do Projeto

A estrutura separa **dados**, **UI** e **lógica**, mantendo o máximo de **Server Components** e isolando a interatividade em *Client Components* — pronta para escalar de uma landing page para um futuro **SaaS**.

```
GT Pneus e Rodas/
├── app/                      # App Router (Next.js)
│   ├── layout.tsx            # Layout raiz · metadata SEO · JSON-LD · providers
│   ├── page.tsx              # Composição das seções da home
│   ├── globals.css           # Base Tailwind · estilos do Lenis e do cursor
│   ├── icon.png              # Favicon da marca (gerado da logo)
│   ├── robots.ts             # /robots.txt
│   └── sitemap.ts            # /sitemap.xml
│
├── components/
│   ├── sections/             # Blocos da página (Hero, Process, Services, Gallery, Footer)
│   ├── ui/                   # Peças reutilizáveis do design system
│   │   ├── Button.tsx        # Botão tipado com variantes (base p/ o SaaS)
│   │   ├── CompareSlider.tsx # Slider de comparação Antes/Depois (utilitário)
│   │   ├── TiltCard.tsx      # Wrapper de tilt 3D
│   │   ├── MagneticButton.tsx# Link com atração magnética
│   │   ├── CustomCursor.tsx  # Cursor customizado
│   │   ├── ScrollCue.tsx     # Indicador de "role para baixo"
│   │   └── Logo.tsx          # Marca (símbolo + wordmark)
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  # Lenis + MotionConfig (reduced motion)
│   ├── Navbar.tsx
│   └── FloatingWhatsApp.tsx
│
├── constants/
│   └── data.ts               # 🔑 Fonte única da verdade: serviços, processo,
│                             #    navegação, dados da loja e itens da galeria
├── lib/
│   ├── motion.ts             # Variantes e curvas de animação compartilhadas
│   ├── hooks.ts              # Hooks (ex.: usePointerFine)
│   └── utils.ts              # cn() — merge de classes Tailwind
│
├── public/
│   ├── images/               # Imagens otimizadas (servidas)
│   └── videos/               # Vídeos de fundo (solda, desempeno)
│
└── tailwind.config.ts        # Tokens de cor, keyframes e animações
```

> **Por que escala bem?** Todo o conteúdo vive em `constants/data.ts` com **tipos ricos** (`Service`, `ServiceTier`, `ProcessStep`…). Amanhã, trocar essa constante por uma query de banco/CMS transforma a vitrine em um app multi-tenant sem reescrever a UI.

---

## 💻 Como Rodar Localmente

**Pré-requisitos:** Node.js 18.18+ (recomendado 20+) e npm.

```bash
# 1. Instale as dependências
npm install

# 2. Rode o servidor de desenvolvimento
npm run dev
```

Abra **[http://localhost:3000](http://localhost:3000)** no navegador. 🎉

### Scripts disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (com HMR) |
| `npm run build` | Build de produção otimizado |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | Análise estática com ESLint |

### ⚙️ Configuração

Este projeto **não exige variáveis de ambiente** para rodar. Todo o conteúdo editável (telefone/WhatsApp, endereço, horários, serviços, galeria) está centralizado em:

```
constants/data.ts
```

Para publicar, ajuste também o domínio em `app/layout.tsx`, `app/robots.ts` e `app/sitemap.ts` (atualmente `https://gtpneuserodas.com.br`).

---

## ♿ Acessibilidade & Performance

- **WCAG AA** — contraste validado (branco sobre terracota ≈ 7:1; textos auxiliares ≥ 4.5:1).
- **Teclado** — *lightbox* com *focus trap*, ESC/setas e retorno de foco ao gatilho.
- **Reduced Motion** — Lenis, tilt, cursor e pulsos respeitam `prefers-reduced-motion`.
- **Imagens** — originais preservados fora do repositório; versões servidas reduzidas em **~92%** e entregues via `next/image` (WebP/AVIF sob demanda).
- **Animações GPU** — apenas `transform`/`opacity`; sem *layout thrashing* durante o scroll.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

1. Faça um *fork* do projeto
2. Crie sua branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha feature'`)
4. Faça o *push* (`git push origin feature/minha-feature`)
5. Abra um *Pull Request*

## 📄 Licença

Distribuído sob a licença **MIT**. Fique à vontade para usar como referência de portfólio.

---

<div align="center">

Feito com ⚙️ e ☕ para a **GT Pneus e Rodas** — São Sebastião · Distrito Federal

</div>
