// Testimonials data with expanded content for continuous scroll
const testimonials = [
  {
    text: "Matt's attention to detail and craftsmanship is absolutely top-notch. The custom railing he crafted for our home? Pure art!",
    author: "Sarah Johnson",
    role: "Homeowner"
  },
  {
    text: "I'm in love with my fireplace! Amazing custom craftsmanship. I had an idea of what I wanted our fireplace to look like and Matt helped us make it come to life! We would 100% order from him again, and we ALWAYS recommend him to friends of ours!",
    author: "Emily Silverstein",
    role: "Homeowner"
  },
  {
    text: "Matt's work is simply outstanding. His artistic touch has completely transformed our space.",
    author: "Jeremy Rodriguez",
    role: "Homeowner"
  },
  {
    text: "Matt supplied and install many very cool accessories to our home. Gates, pergola grills, vineyard, sign, bathroom, mirrors, cabinet handles, and accessories for my wine room.  Matt has a very good sense of design and his quality of fabrication is exceptional!",
    author: "Jim Barnes",
    role: "Architect and Home Builder"
  },
  {
    text: "We reached out to Matt for a custom handrail at our cabin. After our initial meeting we were so impressed with his work that we ended up purchasing a gorgeous chandelier and a set of super stylish handcrafted bar stools as well!",
    author: "Mike and Genie Styles",
    role: "Homeowners"
  },
  {
    text: "Matt's work is a perfect mix of traditional craftsmanship and modern design. The gates he made for us are simply masterpieces, and bring the entire front landscaping together!",
    author: "Robert Wilson",
    role: "Homeowner"
  },
  {
    text: "I have done business with Matt for a long time, and will continue to! The quality and intricacy of his work is simply unmatched, and he continually enables us to sell the best custom furniture on the market!",
    author: "Anonymous",
    role: "High-end Furniture Retailer"
  },
  {
    text: "Got busy yesterday and didn't get the chance to shoot you a quick note concerning how pleased we are with the final product. We're just as happy with the wine rack also and greatly appreciate both your efforts towards making us so...for what most likly will be the rest of our lives in this house. There's just something about good art done well and Matt's pieces are just that! Beautiful, masterfully crafted, and built to last. We're looking forward to our next project with you!",
    author: "John and Carol Sear",
    role: "Homeowners"
  }, 
  {
    text: "Matt has built us some incredible pieces for our gallery and home. Matt is a true artist and it shows in every piece he creates",
    author: "Rob and Gina Evina",
    role: "Owners of Woodland Creek Furniture"
  }
];

export const Testimonials = () => {
  return (
    <section className="pt-16 pb-0 overflow-hidden">
      {/* Top Divider */}
      <div className="w-full flex items-center gap-4 px-8 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent flex-grow" />
        <div className="flex gap-1.5 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent flex-grow" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white font-cinzel">
        Client Testimonials
      </h2>

      {/* Marquee container */}
      <div className="relative">
        {/* First marquee - moving left */}
        <div className="marquee-container mb-4 md:mb-6 lg:mb-8">
          <div className="marquee-content">
            {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
              <div 
                key={index}
                className="testimonial-card group relative hover:z-10"
              >
                <div className="testimonial-content">
                  <p className="text-white mb-6 text-base md:text-lg lg:text-xl font-normal tracking-wide" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-white text-base md:text-lg tracking-wide" style={{ textShadow: '0 0 8px rgba(255,255,255,0.25)' }}>{testimonial.author}</p>
                    <p className="text-red-hot font-semibold tracking-wide">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Decorative Divider */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 h-16 flex items-center">
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                  <div className="absolute top-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                  <div className="absolute bottom-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second marquee - moving right */}
        <div className="marquee-container">
          <div className="marquee-content-reverse">
            {[...testimonials.slice(3), ...testimonials.slice(3)].map((testimonial, index) => (
              <div 
                key={index}
                className="testimonial-card group relative hover:z-10"
              >
                <div className="testimonial-content">
                  <p className="text-white mb-6 italic text-base md:text-lg lg:text-xl font-normal tracking-wide" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-white text-base md:text-lg tracking-wide" style={{ textShadow: '0 0 8px rgba(255,255,255,0.25)' }}>{testimonial.author}</p>
                    <p className="text-red-hot font-semibold tracking-wide">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Decorative Divider */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 h-16 flex items-center">
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                  <div className="absolute top-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                  <div className="absolute bottom-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-full flex items-center gap-4 px-8 mt-12">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent flex-grow" />
        <div className="flex gap-1.5 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent flex-grow" />
      </div>
    </section>
  );
};
