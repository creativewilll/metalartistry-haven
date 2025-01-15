import { useState } from 'react';

const categories = [
  'All',
  'Railings',
  'Windows & Doors',
  'Furniture',
  'Custom Art',
  'Process'
];

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Discover Our Craft
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of handcrafted metalwork, from elegant railings to custom furniture pieces.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category
                    ? 'bg-bronze text-cream'
                    : 'text-silver hover:text-cream'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg hover-lift"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src="https://images.unsplash.com/photo-1545086866-1d3cb3d0a400?ixlib=rb-4.0.3"
                  alt="Gallery item"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-cream text-xl font-semibold">Custom Railing</h3>
                    <p className="text-silver">Hand-forged metalwork with intricate details</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Design', 'Craft', 'Install'].map((step, index) => (
              <div key={step} className="bg-card p-6 rounded-lg">
                <div className="text-bronze text-2xl font-bold mb-4">0{index + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-muted-foreground">
                  {step === 'Design'
                    ? 'We begin with a consultation to understand your vision and create detailed designs.'
                    : step === 'Craft'
                    ? 'Each piece is meticulously handcrafted in our workshop using traditional techniques.'
                    : 'Professional installation ensures your piece is perfectly placed and secured.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discover;