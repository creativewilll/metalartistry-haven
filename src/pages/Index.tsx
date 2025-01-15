import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedWork />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Index;