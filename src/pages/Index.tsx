import { HeroSection } from '@/components/home/HeroSection';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import { AboutSection } from '@/components/home/AboutSection';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import MetalworkCarousel from '@/components/MetalworkCarousel';
import { PageTransition } from "@/components/PageTransition";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Index() {
  return (
    <PageTransition>
      <main className="relative">
        <HeroSection />
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-24 mb-24">
            <MetalworkCarousel />
            <AboutSection />
            <FeaturedProducts />
            <Testimonials />
          </div>
          <InstagramFeed />
          <CTASection />
        </div>
      </main>
    </PageTransition>
  );
}
