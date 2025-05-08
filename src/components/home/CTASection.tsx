import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-charcoal to-zinc-900">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/metal-texture.jpg')] mix-blend-overlay opacity-5 z-0" />
      
      {/* Animated accent lines */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bronze to-transparent animate-pulse opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-silver to-transparent animate-pulse delay-700 opacity-50" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl
            text-white mb-8 relative z-20">
            See Something You Like? Let's Chat!
          </h2>

          {/* Subheading with improved typography */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed
            max-w-2xl mx-auto relative z-20">
            I'm always available to discuss your next project and how I can help you take your idea and transform it into a masterfully-crafted addition to your home or business! 
          </p>

          {/* CTA button with enhanced effects */}
          <div className="relative group z-20">
            <Button asChild>
              <Link to="/contact-form" target="_blank">
                <span className="flex items-center transition-colors duration-700">
                  <Sparkles className="w-5 h-5 mr-3 animate-pulse text-white" />
                  Start Your Project
                  <ArrowRight className="ml-3" />
                </span>
              </Link>
            </Button>
          </div>

        </div>
      </div>

      <style>
        {`
          @keyframes intensify-glow {
            0% {
              background: linear-gradient(135deg, rgb(245 158 11 / 0.1), rgb(245 158 11 / 0.2), rgb(251 191 36 / 0.3));
              box-shadow: 0 0 20px rgb(245 158 11 / 0.2);
            }
            50% {
              background: linear-gradient(135deg, rgb(245 158 11 / 0.2), rgb(245 158 11 / 0.3), rgb(251 191 36 / 0.4));
              box-shadow: 0 0 30px rgb(245 158 11 / 0.3);
            }
            100% {
              background: linear-gradient(135deg, rgb(245 158 11 / 0.3), rgb(245 158 11 / 0.4), rgb(251 191 36 / 0.5));
              box-shadow: 0 0 40px rgb(245 158 11 / 0.4);
            }
          }
          @keyframes spark {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
          }
        `}
      </style>
    </section>
  );
};
