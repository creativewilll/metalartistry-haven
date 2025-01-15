import { useState } from 'react';

const categories = [
  'All',
  'Railings',
  'Windows & Doors',
  'Furniture',
  'Custom Art',
  'Process'
];

// Gallery items with proper categorization and images
const galleryItems = [
  {
    id: 1,
    category: 'Railings',
    title: 'Custom Spiral Railing',
    description: 'Hand-forged spiral staircase railing with intricate scrollwork',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3'
  },
  {
    id: 2,
    category: 'Windows & Doors',
    title: 'Ornate Door Frame',
    description: 'Custom metalwork door frame with detailed patterns',
    image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?ixlib=rb-4.0.3'
  },
  {
    id: 3,
    category: 'Furniture',
    title: 'Metal Coffee Table',
    description: 'Industrial-style coffee table with custom base',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3'
  },
  {
    id: 4,
    category: 'Custom Art',
    title: 'Metal Wall Sculpture',
    description: 'Abstract wall piece with mixed metal finishes',
    image: 'https://images.unsplash.com/photo-1544867885-2333f61544ad?ixlib=rb-4.0.3'
  },
  {
    id: 5,
    category: 'Process',
    title: 'Workshop Process',
    description: 'Behind the scenes of our metalworking process',
    image: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?ixlib=rb-4.0.3'
  },
  {
    id: 6,
    category: 'Railings',
    title: 'Modern Balcony Railing',
    description: 'Contemporary design with clean lines',
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3'
  },
  {
    id: 7,
    category: 'Furniture',
    title: 'Dining Table Base',
    description: 'Custom metal base for glass top dining table',
    image: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-4.0.3'
  },
  {
    id: 8,
    category: 'Custom Art',
    title: 'Garden Sculpture',
    description: 'Large-scale outdoor metal artwork',
    image: 'https://images.unsplash.com/photo-1561059488-916d69792237?ixlib=rb-4.0.3'
  },
  {
    id: 9,
    category: 'Process',
    title: 'Metalworking Tools',
    description: 'Essential tools of the trade',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3'
  }
];

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

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
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
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
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg hover-lift"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-foreground text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
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
                <div className="text-accent text-2xl font-bold mb-4">0{index + 1}</div>
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