import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const metalworkImages = [
  {
    url: "/lovable-uploads/74fe97ab-a99d-4952-b804-b8dd7a0dbf06.png",
    alt: "Modern Entrance Design",
    title: "Contemporary Entrances"
  },
  {
    url: "/lovable-uploads/3567461c-c855-40ab-8361-bc89b0489c6b.png",
    alt: "Custom Metal Screen",
    title: "Architectural Screens"
  },
  {
    url: "/lovable-uploads/fe9eba2e-74c4-4bca-9c1b-ab3393597b7b.png",
    alt: "Custom Metal Trusses",
    title: "Structural Elements"
  },
  {
    url: "/lovable-uploads/2a6b9b35-41fc-4a8e-bb23-ec8613201563.png",
    alt: "Modern Railing System",
    title: "Custom Railings"
  }
];

const MetalworkCarousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <Carousel className="w-full">
        <CarouselContent>
          {metalworkImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative p-1">
                <div className="aspect-[16/9] overflow-hidden rounded-lg">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-semibold text-cream">{image.title}</h3>
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