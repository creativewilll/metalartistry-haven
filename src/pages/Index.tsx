import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with metallic overlay */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal/60 z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564227503787-ad0205f1d0a3?q=80')] 
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

      {/* Featured Work Section */}
      <section className="py-24 bg-gradient-to-b from-charcoal to-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-cream">
            Featured Creations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Railing Design",
                description: "Handcrafted metalwork featuring intricate patterns",
                image: "https://images.unsplash.com/photo-1545086866-1d3cb3d0a400"
              },
              {
                title: "Artistic Door Frame",
                description: "Bespoke entrance solutions with character",
                image: "https://images.unsplash.com/photo-1545086866-1d3cb3d0a400"
              },
              {
                title: "Statement Furniture",
                description: "Unique metal furniture pieces that stand out",
                image: "https://images.unsplash.com/photo-1545086866-1d3cb3d0a400"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg hover-lift"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-cream text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-silver">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-cream">
            Client Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-charcoal to-muted p-8 rounded-lg hover-lift"
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-charcoal">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-cream">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-silver mb-12">
            Let's collaborate to create something extraordinary. Contact us to discuss your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold 
            bg-gradient-to-r from-bronze to-silver hover:from-silver hover:to-bronze
            text-charcoal rounded-md transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;