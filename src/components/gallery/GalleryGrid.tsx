import { GalleryItem } from '@/data/gallery-items';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
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
              onClick={() => setSelectedImage(item)}
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-fit h-fit">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>{selectedImage?.description}</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="object-contain max-h-[70vh] w-auto mx-auto"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}