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

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Visit my Gallery</h2>
      <div className="max-w-[900px] mx-auto">
        <Carousel>
          <CarouselContent>
            {categoryShowcases.map((showcase, index) => (
              <CarouselItem key={index}>
                <div 
                  className="cursor-pointer"
                  onClick={() => navigate('/discover')}
                >
                  <div className="relative w-full h-[400px] rounded-lg">
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      <img
                        src={showcase.url}
                        alt={showcase.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-3xl font-semibold text-cream font-cinzel">{showcase.category}</h3>
                          <p className="text-lg text-cream/90 mt-2">{showcase.description}</p>
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