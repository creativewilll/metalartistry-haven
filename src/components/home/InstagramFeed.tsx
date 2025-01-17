import { useEffect } from 'react';

export const InstagramFeed = () => {
  useEffect(() => {
    // Ensure Instagram embed script is loaded and initialized
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="w-full py-12 bg-black">
      <div className="container">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Follow Our Journey</h2>
          <p className="mt-4 text-gray-400">Stay updated with our latest creations on Instagram</p>
        </div>
        <div className="flex justify-center max-w-3xl mx-auto bg-zinc-900 rounded-lg p-4">
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/mattcoffeydesign/"
            data-instgrm-version="14"
            style={{ 
              background: '#FFF',
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
        <div className="mt-8 text-center">
          <a 
            href="https://www.instagram.com/mattcoffeydesign/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
          >
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};