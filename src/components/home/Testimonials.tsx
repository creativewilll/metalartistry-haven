// Testimonials data with expanded content for continuous scroll
const testimonials = [
  {
    text: "Matt's attention to detail and craftsmanship is absolutely top-notch. The custom railing he crafted for our home? Pure art!",
    author: "Sarah Johnson",
    role: "Homeowner"
  },
  {
    text: "Working with Matt was such a joy. He took our vision and made it even better than we imagined.",
    author: "Michael Chen",
    role: "Interior Designer"
  },
  {
    text: "Matt's work is simply outstanding. His artistic touch has completely transformed our space.",
    author: "Emily Rodriguez",
    role: "Architect"
  },
  {
    text: "The metalwork Matt did for our restaurant? It's a hit with our customers. Stunning craftsmanship!",
    author: "David Thompson",
    role: "Restaurant Owner"
  },
  {
    text: "Matt's blend of form and function is just amazing. His pieces are both beautiful and practical.",
    author: "Lisa Martinez",
    role: "Gallery Curator"
  },
  {
    text: "Matt's work is a perfect mix of traditional craftsmanship and modern design. The gates he made for us are simply masterpieces.",
    author: "Robert Wilson",
    role: "Estate Manager"
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
        <div className="marquee-container mb-8">
          <div className="marquee-content">
            {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
              <div 
                key={index}
                className="testimonial-card group relative hover:z-10"
              >
                <div className="testimonial-content">
                  <p className="text-ash-grey mb-6 italic text-lg">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-molten-silver">{testimonial.author}</p>
                    <p className="text-red-hot">{testimonial.role}</p>
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
                  <p className="text-ash-grey mb-6 italic text-lg">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-molten-silver">{testimonial.author}</p>
                    <p className="text-red-hot">{testimonial.role}</p>
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