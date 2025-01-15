import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import MetalworkCarousel from '@/components/MetalworkCarousel';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MetalworkCarousel />
      <FeaturedWork />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Index;