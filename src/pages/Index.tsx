import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import MetalworkCarousel from '@/components/MetalworkCarousel';

const Index = () => {
  return (
    <div className="min-h-screen px-4">
      <HeroSection />
      <div className="max-w-[1400px] mx-auto space-y-24">
        <MetalworkCarousel />
        <FeaturedWork />
        <Testimonials />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;