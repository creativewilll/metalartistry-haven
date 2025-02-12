import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categoryShowcases } from "@/data/gallery-items";

const MetalworkCarousel = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    // Create the same URL-friendly ID as in Galleries.tsx
    const sectionId = category.toLowerCase().replace(/[, ]/g, '-');
    navigate(`/discover#${sectionId}`);
  };

  return (
    <div className="container mx-auto px-4 my-8">
      {/* Main heading with metallic effect */}
      <h2 className="text-4xl font-bold text-center mb-8 font-cinzel bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(255,255,255,0.1)]">
        Visit my Gallery
      </h2>
      <div className="max-w-[900px] mx-auto">
        <Carousel>
          <CarouselContent>
            {categoryShowcases.map((showcase, index) => (
              <CarouselItem key={index}>
                <div 
                  className="cursor-pointer"
                  onClick={() => handleCategoryClick(showcase.category)}
                >
                  <div className="relative w-full h-[400px] rounded-lg">
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      <img
                        src={showcase.url}
                        alt={showcase.alt}
                        className="w-full h-full object-cover"
                      />
                      {/* Enhanced gradient overlay for better text visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className="absolute bottom-8 left-8 right-8">
                          {/* Category title with metallic gradient */}
                          <h3 className="text-4xl font-bold font-cinzel mb-3 bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                            {showcase.category}
                          </h3>
                          {/* Description with enhanced visibility */}
                          <p className="text-xl text-gray-100 mt-2 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            {showcase.description}
                          </p>
                        </div>
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
    </div>
  );
};

export default MetalworkCarousel;