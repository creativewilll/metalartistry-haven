import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="relative h-screen -mx-4">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal/60 z-10" />
      <div 
        className="absolute inset-0 bg-[url('/gallery-images/MattCoffeyHero.jpg')] 
        bg-cover bg-center bg-fixed"
      />
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-cream mb-8 animate-fade-in">
            Exceptional Metalwork & Design
          </h1>
          <p className="text-xl md:text-2xl text-silver mb-12 max-w-2xl mx-auto animate-fade-in delay-100">
            Transforming metal into timeless pieces of functional art. Each creation is meticulously crafted to bring your vision to life.
          </p>
          <Link
            to="/discover"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold 
            bg-gradient-to-r from-bronze to-silver hover:from-silver hover:to-bronze
            text-charcoal rounded-md transition-all duration-300 animate-fade-in delay-200"
          >
            Explore Our Work
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};