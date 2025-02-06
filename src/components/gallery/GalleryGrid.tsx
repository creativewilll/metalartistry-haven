import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem } from "@/data/gallery-items";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DetailView } from './DetailView';

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
  /** Optional onClose callback */
  onClose?: () => void;
}

/**
 * ImageGallery Component
 * 
 * A modal gallery component that displays images with navigation controls
 * and zoom functionality.
 */
const ImageGallery = ({ images, initialIndex = 0, title, description, onClose }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    images.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  }, [images]);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Navigation handlers
  const nextImage = () => {
    setIsZoomed(false);
    setPanPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIsZoomed(false);
    setPanPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle zoom toggle
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setPanPosition({ x: 0, y: 0 });
  };

  // Handle image panning when zoomed
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isZoomed && isPanning) {
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setPanPosition({
          x: (x - 0.5) * 100,
          y: (y - 0.5) * 100
        });
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose?.()}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 bg-zinc-950/95 backdrop-blur-md border-0">
        <div 
          ref={containerRef}
          className="relative flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-800 via-zinc-800 to-stone-800 border-b border-white/10">
            <div>
              <DialogTitle className="text-white/90 font-light text-xl tracking-wide">
                {title}
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-sm mt-0.5 max-w-2xl">
                {description}
              </DialogDescription>
            </div>
          </div>

          {/* Main Image Container */}
          <div 
            className="relative flex-1 bg-gradient-to-b from-zinc-950 to-zinc-900"
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsPanning(true)}
            onMouseUp={() => setIsPanning(false)}
            onMouseLeave={() => setIsPanning(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img
                ref={imageRef}
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                className={cn(
                  "max-w-[85vw] max-h-[70vh] w-auto h-auto object-contain transition-all duration-200",
                  isZoomed ? "cursor-move" : "cursor-zoom-in"
                )}
                style={isZoomed ? {
                  transform: `scale(2) translate(${panPosition.x}px, ${panPosition.y}px)`,
                } : undefined}
                onClick={toggleZoom}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/50 to-transparent">
              {/* Navigation */}
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="p-2 rounded-full bg-zinc-800/80 text-white/90 hover:bg-zinc-700/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="p-2 rounded-full bg-zinc-800/80 text-white/90 hover:bg-zinc-700/80 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
                <div className="text-zinc-400 text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>

              {/* Image Controls */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleZoom}
                  className="p-2 rounded-full bg-zinc-800/80 text-white/90 hover:bg-zinc-700/80 transition-colors"
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-zinc-800/80 text-white/90 hover:bg-zinc-700/80 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isFullscreen ? (
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                    ) : (
                      <path d="M15 3h6v6M9 21H3v-6M21 9v6h-6" />
                    )}
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center p-3 space-x-2 overflow-x-auto bg-gradient-to-r from-slate-900 via-zinc-900 to-stone-900 border-t border-white/10">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "relative flex-shrink-0 w-16 h-16 rounded overflow-hidden",
                    currentIndex === index ? "ring-2 ring-white/50" : "opacity-50 hover:opacity-100"
                  )}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

/**
 * GalleryGrid Component
 * 
 * A responsive vertical scrolling gallery layout for displaying gallery items.
 * Features smooth animations, hover effects, and a modal view for detailed inspection.
 * Implements image preloading and optimized animations for smooth performance.
 */
export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set<string>());

  const columns = useMemo(() => {
    const cols: GalleryItem[][] = [[], [], []];
    items.forEach((item, index) => {
      cols[index % 3].push(item);
    });
    return cols.map(col => [...col, ...col, ...col]);
  }, [items]);

  // Preload images and track loading progress
  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    
    // Start with just the first image from each item
    const primaryImages = items.map(item => item.images[0].url);
    
    // Load primary images first
    primaryImages.forEach(url => {
      const img = new Image();
      img.onload = () => {
        if (mounted) {
          loadedCount++;
          setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(url);
            // When all images are loaded, set loading to false with a slight delay for smooth transition
            if (loadedCount >= primaryImages.length * 0.5) {
              setIsLoading(false);
            }
            return newSet;
          });
        }
      };
      img.src = url;
    });

    // Load remaining images in the background
    setTimeout(() => {
      items.forEach(item => {
        // Skip the first image as it's already loading
        const remainingImages = [...item.images.slice(1), ...(item.childImages || [])];
        remainingImages.forEach(img => {
          const imgLoader = new Image();
          imgLoader.src = img.url;
          imgLoader.onload = () => {
            if (mounted) {
              setLoadedImages(prev => {
                const newSet = new Set(prev);
                newSet.add(img.url);
                return newSet;
              });
            }
          };
        });
      });
    }, 1000);

    return () => {
      mounted = false;
    };
  }, [items]);

  // Combine main images with child images when present
  const getAllImages = (item: GalleryItem) => {
    const allImages = [...item.images];
    if (item.childImages) {
      allImages.push(...item.childImages);
    }
    return allImages;
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-zinc-950">
        {/* Loading overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "absolute inset-0 z-50 flex items-center justify-center",
            "bg-gradient-to-r from-slate-800 via-zinc-800 to-stone-800",
            { "pointer-events-none": !isLoading }
          )}
        >
          <motion.div 
            className="space-y-4 text-center"
            animate={{ opacity: isLoading ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-zinc-400 text-sm">
              Loading gallery...
            </div>
            <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-zinc-600 to-stone-600"
                initial={{ width: "0%" }}
                animate={{ width: `${(loadedImages.size / (items.length)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Main gallery */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 h-full gap-[100px] px-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {columns.map((column, columnIndex) => (
            <div 
              key={columnIndex} 
              className="relative overflow-hidden h-full"
            >
              <motion.div
                className="flex flex-col transform-gpu items-center space-y-[100px]"
                initial={{ 
                  y: columnIndex === 1 ? "0%" : "-100%"
                }}
                animate={{ 
                  y: columnIndex === 1 ? "-200%" : "0%"
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 90,
                    delay: 1,
                    ease: "linear",
                    repeatType: "loop"
                  }
                }}
                style={{
                  willChange: "transform",
                  height: "400%",
                  backfaceVisibility: "hidden",
                  perspective: 1000,
                  translateZ: 0
                }}
              >
                {column.map((item, itemIndex) => (
                  <motion.div
                    key={`${item.id}-${itemIndex}`}
                    className="w-full flex justify-center"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <div className="relative group cursor-pointer w-[300px]">
                      <motion.img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-full h-auto object-cover rounded-lg"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: loadedImages.has(item.images[0].url) ? 1 : 0 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-lg">
                        <div className="text-white/90 text-xs mb-1">2024</div>
                        <h3 className="text-white text-sm font-light leading-tight">{item.title}</h3>
                        {item.childImages && (
                          <div className="text-white/70 text-xs mt-1">
                            +{item.childImages.length} more images
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {selectedItem && (
        <DetailView
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};
