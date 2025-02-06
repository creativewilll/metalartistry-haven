import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <div className="absolute -inset-1 bg-gradient-to-r from-bronze via-silver to-bronze 
              rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 
              group-hover:duration-200 animate-gradient-xy"></div>
            <Link
              to="/contact"
              className="relative inline-flex items-center px-8 py-4 text-lg md:text-xl font-semibold 
                bg-[linear-gradient(135deg,#18181b_0%,#27272a_70%,#f59e0b_85%,#fbbf24_100%)]
                hover:bg-amber-500 hover:bg-none
                text-white rounded-lg transition-all duration-700
                transform hover:-translate-y-1 group/button
                border border-bronze/20 hover:border-amber-400
                shadow-lg hover:shadow-2xl hover:shadow-amber-500/50
                after:absolute after:inset-0 after:rounded-lg
                after:transition-all after:ease-in
                after:[background:theme(colors.amber.500/0)]
                hover:after:animate-intensify-glow
                overflow-hidden
                [&_*]:z-10 [&_*]:relative"
            >
              <span className="flex items-center transition-colors duration-700">
                <Sparkles className="w-5 h-5 mr-3 animate-pulse text-white 
                  group-hover/button:text-amber-100 group-hover/button:animate-spark" />
                Start Your Project
                <ArrowRight className="ml-3 group-hover/button:translate-x-1 transition-transform
                  group-hover/button:text-amber-100" />
              </span>
            </Link>
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
