import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem } from "@/data/gallery-items";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ImageGalleryProps {
  images: { url: string; alt: string; }[];
  initialIndex?: number;
  title: string;
  description: string;
}

const ImageGallery = ({ images, initialIndex = 0, title, description }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <DialogTitle className="text-xl font-semibold mb-2">{title}</DialogTitle>
      <DialogDescription className="text-muted-foreground mb-4">{description}</DialogDescription>
      <div className="relative aspect-video">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="object-cover w-full h-full rounded-lg"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

interface GalleryGridProps {
  items: GalleryItem[];
}

export const GalleryGrid = ({ items }: GalleryGridProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div className="group cursor-pointer relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <ImageGallery 
                images={[
                  { url: item.image, alt: item.title },
                  ...(item.childImages || []).map(img => ({ url: img, alt: item.title }))
                ]} 
                initialIndex={0}
                title={item.title}
                description={item.description}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};