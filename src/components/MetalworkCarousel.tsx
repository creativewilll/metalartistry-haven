import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const metalworkImages = [
  {
    url: "/lovable-uploads/ad1b3a45-0faa-4742-8769-0d02c28c6a54.png",
    alt: "Modern Interior Railing Design",
    title: "Contemporary Railing Systems"
  },
  {
    url: "/lovable-uploads/d1102b5c-e6da-45d5-a885-f4b50db7dd56.png",
    alt: "Custom Wall Display Unit",
    title: "Custom Metal Furniture"
  },
  {
    url: "/lovable-uploads/242a25c8-6306-408c-9f53-6405f69320cb.png",
    alt: "Architectural Fireplace Design",
    title: "Architectural Elements"
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