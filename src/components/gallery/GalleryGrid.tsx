import { GalleryItem } from '@/data/gallery-items';
import { useEffect, useState } from 'react';

interface GalleryGridProps {
  items: GalleryItem[];
}

interface ImageDimensions {
  width: number;
  height: number;
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [imageDimensions, setImageDimensions] = useState<Record<number, ImageDimensions>>({});

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 [column-fill:_balance] box-border">
        {items.map((item) => {
          const dimensions = imageDimensions[item.id];
          const isVertical = dimensions ? dimensions.height > dimensions.width : false;
          
          return (
            <div
              key={item.id}
              className={`relative mb-8 break-inside-avoid group hover-lift`}
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
    </div>
  );
}