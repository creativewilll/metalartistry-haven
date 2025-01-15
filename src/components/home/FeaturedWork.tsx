import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from 'react';

type ProjectImage = {
  url: string;
  alt: string;
};

type FeaturedItem = {
  title: string;
  description: string;
  mainImage: string;
  childImages: ProjectImage[];
};

const featuredItems: FeaturedItem[] = [
  {
    title: "Modern Entrance Design",
    description: "Contemporary metalwork and architectural elements",
    mainImage: "/lovable-uploads/74fe97ab-a99d-4952-b804-b8dd7a0dbf06.png",
    childImages: [
      {
        url: "/lovable-uploads/3567461c-c855-40ab-8361-bc89b0489c6b.png",
        alt: "Detail view of entrance design"
      },
      {
        url: "/lovable-uploads/fe9eba2e-74c4-4bca-9c1b-ab3393597b7b.png",
        alt: "Side view of entrance"
      }
    ]
  },
  {
    title: "Custom Metal Screen",
    description: "Innovative architectural metalwork solutions",
    mainImage: "/lovable-uploads/3567461c-c855-40ab-8361-bc89b0489c6b.png",
    childImages: [
      {
        url: "/lovable-uploads/2a6b9b35-41fc-4a8e-bb23-ec8613201563.png",
        alt: "Close-up of metal screen pattern"
      },
      {
        url: "/lovable-uploads/35a46b27-2830-45ff-9fc7-d6023162a84d.png",
        alt: "Installation process"
      }
    ]
  },
  {
    title: "Architectural Elements",
    description: "Custom metalwork integrated with architecture",
    mainImage: "/lovable-uploads/fe9eba2e-74c4-4bca-9c1b-ab3393597b7b.png",
    childImages: [
      {
        url: "/lovable-uploads/ad1b3a45-0faa-4742-8769-0d02c28c6a54.png",
        alt: "Detail of architectural elements"
      },
      {
        url: "/lovable-uploads/d1102b5c-e6da-45d5-a885-f4b50db7dd56.png",
        alt: "Integration with building structure"
      }
    ]
  }
];

const ImageGallery = ({ images, initialIndex = 0 }: { images: ProjectImage[], initialIndex: number }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}
    </div>
  );
};

export const FeaturedWork = () => {
  return (
    <section className="py-16">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cream">
          Featured Creations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="group relative overflow-hidden rounded-lg hover-lift cursor-pointer">
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={item.mainImage}
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
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <ImageGallery 
                  images={[{ url: item.mainImage, alt: item.title }, ...item.childImages]} 
                  initialIndex={0}
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};