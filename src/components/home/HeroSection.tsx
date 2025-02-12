import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <div className="relative h-screen -mx-4">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal/60 z-10" />
      <div 
        className="absolute inset-0 bg-[url('/gallery-images/MattCoffeyHero.jpeg')] 
        bg-cover bg-center bg-fixed"
      />
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-400 to-orange-600 animate-ember-pulse relative z-10 py-2">
                Matt Coffey Design
              </h1>
              <div 
                className="absolute inset-x-0 mx-auto w-full max-w-xs bg-red-600 opacity-50 blur-lg animate-pulse z-0"
                aria-hidden="true"
              />
              <div 
                className="absolute inset-x-0 mx-auto w-full max-w-xs bg-heading-shine bg-[length:400%_100%] animate-shine opacity-70 z-0"
                style={{
                  backgroundSize: '200% 100%',
                  mixBlendMode: 'overlay'
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              to="/discover"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold 
              relative bg-[linear-gradient(135deg,#18181b_0%,#27272a_70%,#f59e0b_85%,#fbbf24_100%)]
              hover:bg-amber-500 hover:bg-none
              text-white rounded-lg transition-all duration-300
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              border border-bronze/20 hover:border-amber-400
              group hover:animate-nod overflow-hidden"
            >
              Explore my Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold 
              relative bg-[linear-gradient(135deg,#18181b_0%,#27272a_70%,#f59e0b_85%,#fbbf24_100%)]
              hover:bg-amber-500 hover:bg-none
              text-white rounded-lg transition-all duration-300
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              border border-bronze/20 hover:border-amber-400
              group hover:animate-nod overflow-hidden"
            >
              Contact me!
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/galleries"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold 
              relative bg-[linear-gradient(135deg,#18181b_0%,#27272a_70%,#f59e0b_85%,#fbbf24_100%)]
              hover:bg-amber-500 hover:bg-none
              text-white rounded-lg transition-all duration-300
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              border border-bronze/20 hover:border-amber-400
              group hover:animate-nod overflow-hidden"
            >
              Specialties
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};