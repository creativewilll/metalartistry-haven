import { Link } from 'react-router-dom';

const featuredItems = [
  {
    title: "Modern Entrance Design",
    description: "Contemporary metalwork and architectural elements",
    image: "/lovable-uploads/74fe97ab-a99d-4952-b804-b8dd7a0dbf06.png",
    aspectRatio: "aspect-[4/3]"
  },
  {
    title: "Custom Metal Screen",
    description: "Innovative architectural metalwork solutions",
    image: "/lovable-uploads/3567461c-c855-40ab-8361-bc89b0489c6b.png",
    aspectRatio: "aspect-[3/4]"
  },
  {
    title: "Architectural Elements",
    description: "Custom metalwork integrated with architecture",
    image: "/lovable-uploads/fe9eba2e-74c4-4bca-9c1b-ab3393597b7b.png",
    aspectRatio: "aspect-[16/9]"
  },
  {
    title: "Industrial Railing System",
    description: "Modern railing installation in progress",
    image: "/lovable-uploads/2a6b9b35-41fc-4a8e-bb23-ec8613201563.png",
    aspectRatio: "aspect-square"
  },
  {
    title: "Installation Process",
    description: "Behind the scenes of our metalwork installation",
    image: "/lovable-uploads/35a46b27-2830-45ff-9fc7-d6023162a84d.png",
    aspectRatio: "aspect-[3/2]"
  }
];

export const FeaturedWork = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-charcoal to-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-cream">
          Featured Creations
        </h2>
        <div className="columns-1 md:columns-3 lg:columns-4 gap-0 space-y-0">
          {featuredItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative break-inside-avoid"
            >
              <div className={`relative ${item.aspectRatio}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
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