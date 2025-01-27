import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem } from "@/data/gallery-items";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ImageGallery Component Props
 */
interface ImageGalleryProps {
  /** Array of images to display in the gallery */
  images: { url: string; alt: string; }[];
  /** Initial image index to display */
  initialIndex?: number;
  /** Title of the gallery modal */
  title: string;
  /** Description text for the gallery modal */
  description: string;
}

/**
 * ImageGallery Component
 * 
 * A modal gallery component that displays images with navigation controls
 * and zoom functionality.
 */
const ImageGallery = ({ images, initialIndex = 0, title, description }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Navigation handlers
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const toggleZoom = () => setIsZoomed((prev) => !prev);

  return (
    <div className="relative">
      <div className="relative mb-4">
        <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-metal-gradient relative z-10">
          {title}
        </DialogTitle>
        {/* Animated metallic shine effect */}
        <div 
          className="absolute inset-0 bg-heading-shine bg-[length:400%_100%] animate-shine opacity-70"
          style={{
            backgroundSize: '200% 100%',
            mixBlendMode: 'overlay'
          }}
          aria-hidden="true"
        />
        {/* Additional glow effect */}
        <div 
          className="absolute inset-0 blur-lg bg-accent-primary/20 animate-ember-pulse"
          aria-hidden="true"
        />
      </div>
      <DialogDescription className="text-text-body mb-4">{description}</DialogDescription>
      
      {/* Image container */}
      <div className="relative aspect-[4/3] bg-background rounded-lg overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className={cn(
            "w-full h-full object-contain transition-transform duration-300",
            isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={toggleZoom}
        />
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 text-text-primary hover:bg-accent-primary hover:text-background transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 text-text-primary hover:bg-accent-primary hover:text-background transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        {/* Zoom toggle button */}
        <button
          onClick={toggleZoom}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-surface/80 text-text-primary hover:bg-accent-primary hover:text-background transition-colors"
        >
          {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
        </button>
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-surface/80 text-text-body text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * GalleryGrid Component
 * 
 * A responsive masonry grid layout for displaying gallery items.
 * Features smooth animations, hover effects, and a modal view for detailed inspection.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  // State for managing responsive column layout
  const [columnCount, setColumnCount] = useState(3);
  const [columns, setColumns] = useState<GalleryItem[][]>([]);

  // Update columns when items or columnCount changes
  useEffect(() => {
    const newColumns: GalleryItem[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => {
      newColumns[index % columnCount].push(item);
    });
    setColumns(newColumns);
  }, [items, columnCount]);

  // Handle responsive column count based on screen size
  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth < 640) setColumnCount(1);
      else if (window.innerWidth < 1024) setColumnCount(2);
      else setColumnCount(3);
    };

    // Initial column count setup
    updateColumnCount();
    
    // Add resize listener
    window.addEventListener('resize', updateColumnCount);
    
    // Cleanup resize listener
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Empty state message */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-text-body">No items found in this category.</p>
        </div>
      )}

      {/* Masonry grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6">
            {column.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: columnIndex * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    {/* Gallery item card with hover effects */}
                    <div className="group relative overflow-hidden rounded-xl bg-surface border border-accent-secondary/10 hover:border-accent-secondary/30 transition-all duration-300 cursor-pointer">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Hover overlay with zoom icon */}
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-accent-primary" />
                        </div>
                      </div>
                      {/* Item details */}
                      <div className="p-4 relative overflow-hidden">
                        <div className="relative">
                          <h3 className="font-medium text-xl mb-1 bg-clip-text text-transparent bg-metal-gradient transition-all duration-300">
                            {item.title}
                          </h3>
                          {/* Animated shine effect that appears on hover */}
                          <div 
                            className="absolute inset-0 bg-heading-shine bg-[length:200%_100%] opacity-0 group-hover:animate-shine"
                            style={{ mixBlendMode: 'overlay' }}
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-sm text-text-body line-clamp-2 relative z-10">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  {/* Modal view for detailed inspection */}
                  <DialogContent className="max-w-4xl w-full bg-surface border-accent-secondary/20">
                    <ImageGallery
                      images={[
                        { url: item.image, alt: item.title },
                        ...(item.childImages || [])
                      ]}
                      title={item.title}
                      description={item.description}
                    />
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}