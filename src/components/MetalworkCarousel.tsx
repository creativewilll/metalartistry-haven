import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categories } from "@/data/gallery-items";

const categoryShowcases = [
  {
    category: 'Railings',
    url: "/lovable-uploads/2a6b9b35-41fc-4a8e-bb23-ec8613201563.png",
    alt: "Custom Railings Showcase",
    description: "Explore our custom railing designs"
  },
  {
    category: 'Windows & Doors',
    url: "/lovable-uploads/74fe97ab-a99d-4952-b804-b8dd7a0dbf06.png",
    alt: "Windows and Doors Showcase",
    description: "Discover our door and window solutions"
  },
  {
    category: 'Furniture',
    url: "/lovable-uploads/db5c7ec4-d9a0-4719-862b-c61cfeb077e9.png",
    alt: "Custom Furniture Showcase",
    description: "View our custom furniture pieces"
  },
  {
    category: 'Custom Art',
    url: "/lovable-uploads/3567461c-c855-40ab-8361-bc89b0489c6b.png",
    alt: "Custom Art Showcase",
    description: "Browse our artistic metalwork"
  },
  {
    category: 'Process',
    url: "/lovable-uploads/35a46b27-2830-45ff-9fc7-d6023162a84d.png",
    alt: "Process Showcase",
    description: "See how we bring ideas to life"
  }
];

const MetalworkCarousel = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/discover?category=${category}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Explore Our Collections</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {categoryShowcases.map((showcase, index) => (
            <CarouselItem key={index}>
              <div 
                className="relative p-1 cursor-pointer group"
                onClick={() => handleCategoryClick(showcase.category)}
              >
                <div className="aspect-[16/9] overflow-hidden rounded-lg">
                  <img
                    src={showcase.url}
                    alt={showcase.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-semibold text-cream">{showcase.category}</h3>
                      <p className="text-sm text-cream/80">{showcase.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default MetalworkCarousel;