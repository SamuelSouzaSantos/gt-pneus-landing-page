import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProcessSection />
      <ServicesSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
