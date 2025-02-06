import { useEffect } from 'react';

// Add type declaration for Instagram embed script
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

export const InstagramFeed = () => {
  useEffect(() => {
    // Ensure Instagram embed script is loaded and initialized
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="relative w-full pb-12 pt-24 bg-gradient-to-b from-charcoal to-zinc-900">
      {/* Metallic overlay with reduced opacity */}
      <div className="absolute inset-0 bg-[url('/metal-texture.jpg')] mix-blend-overlay opacity-5 z-0" />
      
      <div className="container relative mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Explore My Instagram
          </h2>
          <p className="text-xl text-white/90 mt-4 font-medium">
            Take a look at some projects I've built for people just like you!
          </p>
        </div>

        <div className="flex justify-center relative z-10">
          {/* Instagram Feed - Centered */}
          <div className="flex justify-center w-full max-w-[540px] relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-bronze/20 via-silver/20 to-bronze/20 
              rounded-xl blur-md opacity-50"></div>
            <blockquote 
              className="instagram-media relative" 
              data-instgrm-permalink="https://www.instagram.com/mattcoffeydesign/"
              data-instgrm-version="14"
              style={{ 
                background: 'transparent',
                border: 0,
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: 0,
                width: 'calc(100% - 2px)'
              }}
            >
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
