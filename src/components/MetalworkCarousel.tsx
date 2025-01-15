import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const metalworkImages = [
  {
    url: "https://images.unsplash.com/photo-1545086866-1d3cb3d0a400",
    alt: "Custom Railing Design",
    title: "Custom Railing Design"
  },
  {
    url: "https://images.unsplash.com/photo-1545086866-1d3cb3d0a400",
    alt: "Artistic Door Frame",
    title: "Artistic Door Frame"
  },
  {
    url: "https://images.unsplash.com/photo-1545086866-1d3cb3d0a400",
    alt: "Statement Furniture",
    title: "Statement Furniture"
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