import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem } from "@/data/gallery-items";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DetailView } from './DetailView';

// Add keyframe animation for infinite scroll (upward for outer columns)
const scrollAnimation = `
  @keyframes infiniteScroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
`;

// Add keyframe animation for infinite scroll (downward for middle column)
// It starts offset so that the top of the list is visible and then scrolls downward.
const scrollAnimationDown = `
  @keyframes infiniteScrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }
`;

// Append both animations to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = scrollAnimation + scrollAnimationDown;
  document.head.appendChild(style);
}

/**
 * GalleryGrid Component
 */
export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set<string>());
  // Manage pause state per column:
  const [pausedColumns, setPausedColumns] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });
  // Set scroll speed to a halfway value (approximately 1.25)
  const [scrollSpeed] = useState(1.25);

  // Preload images
  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    
    const primaryImages = items.map(item => item.images[0].url);
    primaryImages.forEach(url => {
      const img = new Image();
      img.onload = () => {
        if (mounted) {
          loadedCount++;
          setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(url);
            if (loadedCount >= primaryImages.length * 0.5) {
              setIsLoading(false);
            }
            return newSet;
          });
        }
      };
      img.src = url;
    });

    return () => { mounted = false; };
  }, [items]);

  // Prepare duplicated items for infinite scroll
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = [[], [], []];

    // Distribute items across columns
    items.forEach((item, index) => {
      const colIndex = index % 3;
      cols[colIndex].push(item);
    });

    // DO NOT reverse the order for the middle column.
    // Duplicate each column (appending a contiguous copy for seamless scrolling)
    return cols.map(column => [...column, ...column]);
  }, [items]);

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
            <div className="text-zinc-400 text-sm">Loading gallery...</div>
            <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-zinc-600 to-stone-600"
                initial={{ width: "0%" }}
                animate={{ width: `${(loadedImages.size / items.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Main gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-[100px] px-[100px]">
          {columns.map((column, columnIndex) => (
            <div 
              key={columnIndex} 
              className="relative overflow-hidden h-full"
              onMouseEnter={() => setPausedColumns(prev => ({ ...prev, [columnIndex]: true }))}
              onMouseLeave={() => setPausedColumns(prev => ({ ...prev, [columnIndex]: false }))}
            >
              <div
                className="flex flex-col items-center space-y-[100px]"
                style={{
                  // Use the new downward animation for the middle column
                  animation: columnIndex === 1
                    ? `infiniteScrollDown ${40 / scrollSpeed}s linear infinite`
                    : `infiniteScroll ${40 / scrollSpeed}s linear infinite`,
                  animationPlayState: pausedColumns[columnIndex] ? 'paused' : 'running',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
              >
                {column.map((item, itemIndex) => (
                  <motion.div
                    key={`${item.id}-${itemIndex}`}
                    className="w-full flex justify-center"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
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
                        animate={{ opacity: loadedImages.has(item.images[0].url) ? 1 : 0 }}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <DetailView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};