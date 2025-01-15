import { Link } from 'react-router-dom';

const featuredItems = [
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
];

export const FeaturedWork = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-charcoal to-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-cream">
          Featured Creations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
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
  );
};