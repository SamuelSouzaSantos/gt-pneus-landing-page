import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/sections/Footer";
import { GENERAL_FAQ } from "@/constants/data";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProcessSection />
      <ServicesSection />
      <GallerySection />
      <FaqSection
        items={GENERAL_FAQ}
        eyebrow="Dúvidas Frequentes"
        title="As perguntas que mais recebemos"
        subtitle="Se a sua dúvida não estiver aqui, chama no WhatsApp que a gente responde."
        className="bg-gt-black pb-24 sm:pb-32"
      />
      <Footer />
    </main>
  );
}
