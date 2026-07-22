import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SITE } from "@/constants/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** URL canônica de produção — base para OG, canonical e sitemap. */
const SITE_URL = "https://gtpneuserodas.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Solda de Alumínio e Reforma de Rodas em São Sebastião - DF`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Especialista em solda de alumínio (TIG) e reforma de rodas em São Sebastião - DF. Desempeno, balanceamento e borracharia com garantia. Orçamento pelo WhatsApp.",
  keywords: [
    "solda de alumínio",
    "reforma de rodas",
    "desempeno de rodas",
    "balanceamento",
    "borracharia São Sebastião",
    "conserto de rodas DF",
    "rodas São Sebastião",
    SITE.name,
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} — Solda de Alumínio e Reforma de Rodas`,
    description: SITE.tagline,
    images: [
      {
        url: "/images/foto-loja.jpg",
        width: 1200,
        height: 630,
        alt: `Fachada da ${SITE.name} em ${SITE.address.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Rodas, Pneus e Recuperação Automotiva`,
    description: SITE.tagline,
    images: ["/images/foto-loja.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "automotive",
};

/**
 * Dados estruturados (Schema.org) do negócio local. É isso que permite ao
 * Google exibir endereço, telefone, horário e mapa direto no resultado de
 * busca (rich result) — essencial para SEO local de loja física.
 */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${SITE_URL}/#business`,
  name: SITE.name,
  url: SITE_URL,
  image: `${SITE_URL}/images/foto-loja.jpg`,
  telephone: `+${SITE.whatsappNumber}`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line,
    addressLocality: "São Sebastião",
    addressRegion: "DF",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -15.8984338,
    longitude: -47.7828539,
  },
  hasMap: SITE.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  areaServed: { "@type": "City", name: "São Sebastião - DF" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <FloatingWhatsApp />
          <CustomCursor />
        </SmoothScrollProvider>

        <script
          type="application/ld+json"
          // Conteúdo estático e confiável (constantes do próprio site).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
