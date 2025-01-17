export const InstagramFeed = () => {
  return (
    <section className="w-full py-12 bg-black">
      <div className="container">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Follow Our Journey</h2>
          <p className="mt-4 text-gray-400">Stay updated with our latest creations on Instagram</p>
        </div>
        <div className="flex justify-center max-w-3xl mx-auto bg-zinc-900 rounded-lg p-4">
          <div className="w-full aspect-square [&_iframe]:invert [&_iframe]:hue-rotate-180">
            <div className="w-full h-full invert hue-rotate-180">
              <iframe
                src="https://www.instagram.com/mattcoffeydesign/embed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
              />
            </div>
          </div>
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
      <script async src="//www.instagram.com/embed.js"></script>
    </section>
  )
}
