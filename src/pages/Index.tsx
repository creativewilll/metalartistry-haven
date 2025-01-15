import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-charcoal/60 z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545086866-1d3cb3d0a400?ixlib=rb-4.0.3')] 
          bg-cover bg-center"
        />
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-cream mb-6">
              Exceptional Metalwork & Design
            </h1>
            <p className="text-xl md:text-2xl text-silver mb-8 max-w-2xl mx-auto">
              Crafting unique, high-end metalwork pieces that transform spaces into works of art.
            </p>
            <Link
              to="/discover"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold metallic-gradient 
              text-cream rounded-md hover:opacity-90 transition-opacity"
            >
              Explore Our Work
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Work Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="hover-lift">
                <div className="bg-muted rounded-lg overflow-hidden">
                  <div className="h-64 bg-[url('https://images.unsplash.com/photo-1545086866-1d3cb3d0a400?ixlib=rb-4.0.3')] bg-cover bg-center" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Custom Railing Design</h3>
                    <p className="text-muted-foreground">
                      Handcrafted metalwork featuring intricate patterns and superior craftsmanship.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  "Matt's attention to detail and craftsmanship is unparalleled. The custom railing he created for our home is truly a work of art."
                </p>
                <p className="font-semibold">- Sarah Johnson</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;