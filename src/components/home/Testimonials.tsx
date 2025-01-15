const testimonials = [
  {
    text: "Matt's attention to detail and craftsmanship is unparalleled. The custom railing he created for our home is truly a work of art.",
    author: "Sarah Johnson",
    role: "Homeowner"
  },
  {
    text: "Working with Matt was an incredible experience. His ability to translate our vision into reality exceeded our expectations.",
    author: "Michael Chen",
    role: "Interior Designer"
  },
  {
    text: "The quality of Matt's work is exceptional. His artistic approach to metalwork has transformed our space completely.",
    author: "Emily Rodriguez",
    role: "Architect"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 metallic-gradient">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-cream">
          Client Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-[#2F3640] via-[#403E43] to-[#8B3A2D] p-8 rounded-lg hover-lift"
            >
              <p className="text-silver mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-cream">{testimonial.author}</p>
                <p className="text-bronze">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};