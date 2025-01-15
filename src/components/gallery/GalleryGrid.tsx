import { GalleryItem } from '@/data/gallery-items';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryGridProps {
  items: GalleryItem[];
}

interface ImageDimensions {
  width: number;
  height: number;
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [imageDimensions, setImageDimensions] = useState<Record<number, ImageDimensions>>({});
  const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Preload images to get their dimensions
    items.forEach((item) => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        setImageDimensions(prev => ({
          ...prev,
          [item.id]: {
            width: img.naturalWidth,
            height: img.naturalHeight
          }
        }));
      };
    });
  }, [items]);

  const getColumnClass = () => {
    switch (gridSize) {
      case 'small':
        return 'columns-2 md:columns-3 lg:columns-5';
      case 'large':
        return 'columns-1 md:columns-2 lg:columns-3';
      default:
        return 'columns-1 md:columns-3 lg:columns-4';
    }
  };

  const handleSizeDecrease = () => {
    setGridSize(current => {
      if (current === 'large') return 'medium';
      if (current === 'medium') return 'small';
      return current;
    });
  };

  const handleSizeIncrease = () => {
    setGridSize(current => {
      if (current === 'small') return 'medium';
      if (current === 'medium') return 'large';
      return current;
    });
  };

  const handlePreviousImage = () => {
    if (!selectedImage?.childImages) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedImage.childImages!.length : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedImage?.childImages) return;
    setCurrentImageIndex((prev) => 
      prev === selectedImage.childImages!.length ? 0 : prev + 1
    );
  };

  const getCurrentImage = () => {
    if (!selectedImage) return null;
    if (currentImageIndex === 0) return selectedImage.image;
    return selectedImage.childImages?.[currentImageIndex - 1]?.image;
  };

  const getCurrentDescription = () => {
    if (!selectedImage) return '';
    if (currentImageIndex === 0) return selectedImage.description;
    return selectedImage.childImages?.[currentImageIndex - 1]?.description || '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-end gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSizeDecrease}
          disabled={gridSize === 'small'}
          className="w-10 h-10"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleSizeIncrease}
          disabled={gridSize === 'large'}
          className="w-10 h-10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className={`${getColumnClass()} gap-4 [column-fill:_balance] box-border`}>
        {items.map((item) => {
          const dimensions = imageDimensions[item.id];
          const isVertical = dimensions ? dimensions.height > dimensions.width : false;
          
          return (
            <div
              key={item.id}
              className={`relative mb-4 break-inside-avoid group hover-lift cursor-pointer`}
              onClick={() => {
                setSelectedImage(item);
                setCurrentImageIndex(0);
              }}
            >
              <div className={`relative overflow-hidden rounded-lg ${
                isVertical ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-foreground text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    {item.childImages && item.childImages.length > 0 && (
                      <p className="text-cream/80 text-sm mt-2">
                        +{item.childImages.length} more images
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => {
        setSelectedImage(null);
        setCurrentImageIndex(0);
      }}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-fit h-fit border-2 border-bronze/50 bg-charcoal/95 backdrop-blur-sm shadow-2xl">
          <DialogHeader className="relative pb-4 border-b border-bronze/30">
            <DialogTitle className="text-3xl font-cinzel text-silver tracking-wide bg-gradient-to-r from-bronze/80 to-silver/80 bg-clip-text text-transparent">
              {selectedImage?.title}
            </DialogTitle>
            <DialogDescription className="text-lg text-cream/80 mt-2 font-light">
              {getCurrentDescription()}
            </DialogDescription>
          </DialogHeader>

          {selectedImage && (
            <div className="relative mt-6 overflow-hidden rounded-lg">
              <div className="metallic-gradient absolute inset-0 opacity-90" />
              <img
                src={getCurrentImage() || ''}
                alt={selectedImage.title}
                className="object-contain max-h-[70vh] w-auto mx-auto relative z-10 animate-fadeIn"
              />
              
              {selectedImage.childImages && selectedImage.childImages.length > 0 && (
                <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4 z-20">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePreviousImage}
                    className="rounded-full bg-charcoal/80 hover:bg-charcoal"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-cream/80">
                    {currentImageIndex + 1} / {(selectedImage.childImages?.length || 0) + 1}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextImage}
                    className="rounded-full bg-charcoal/80 hover:bg-charcoal"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}