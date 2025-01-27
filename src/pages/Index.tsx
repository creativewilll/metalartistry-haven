import { HeroSection } from '@/components/home/HeroSection';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { AboutSection } from '@/components/home/AboutSection';
import MetalworkCarousel from '@/components/MetalworkCarousel';

const Index = () => {
  return (
    <div className="min-h-screen px-4">
      <HeroSection />
      <div className="max-w-[1400px] mx-auto">
        <div className="space-y-24 mb-24">
          <MetalworkCarousel />
          <AboutSection />
          <Testimonials />
        </div>
        <InstagramFeed />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
