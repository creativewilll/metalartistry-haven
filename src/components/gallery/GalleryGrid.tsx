import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem } from "@/data/gallery-items";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DetailView } from './DetailView';

// Add keyframe animations
const animations = `
  @keyframes infiniteScroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  @keyframes infiniteScrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }

  @keyframes gradientFlow {
    0% {
      background-position: 0% 0%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

// Append animations to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = animations;
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
  // Dynamic scroll speed based on viewport
  const [scrollSpeed, setScrollSpeed] = useState(() => 
    window.innerWidth < 768 ? 0.75 : 1
  );

  // Update scroll speed on resize
  useEffect(() => {
    const updateScrollSpeed = () => {
      setScrollSpeed(window.innerWidth < 768 ? 0.75 : 0.5);
    };

    window.addEventListener('resize', updateScrollSpeed);
    return () => window.removeEventListener('resize', updateScrollSpeed);
  }, []);

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
    const numColumns = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

    // Distribute items across columns based on screen size
    items.forEach((item, index) => {
      const colIndex = index % numColumns;
      cols[colIndex].push(item);
    });

    // DO NOT reverse the order for the middle column.
    // Duplicate each column (appending a contiguous copy for seamless scrolling)
    return cols.slice(0, numColumns).map(column => [...column, ...column]);
  }, [items]);

  // Add resize listener to update columns when screen size changes
  useEffect(() => {
    const handleResize = () => {
      const numColumns = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      const cols: GalleryItem[][] = [[], [], []];
      
      items.forEach((item, index) => {
        const colIndex = index % numColumns;
        cols[colIndex].push(item);
      });

      setPausedColumns({ 0: false, 1: false, 2: false });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  return (
    <>
      <div className="w-full h-screen overflow-hidden" style={{
        background: `
          radial-gradient(circle at 30% 30%, rgba(176, 196, 222, 0.08), transparent 45%),
          radial-gradient(circle at 70% 70%, rgba(205, 127, 50, 0.08), transparent 45%),
          radial-gradient(circle at 50% 50%, rgba(144, 175, 144, 0.06), transparent 55%),
          linear-gradient(135deg,
            rgba(20, 20, 20, 0.99),
            rgba(176, 196, 222, 0.25),
            rgba(119, 136, 153, 0.2),
            rgba(205, 127, 50, 0.25),
            rgba(144, 175, 144, 0.25),
            rgba(119, 136, 153, 0.2),
            rgba(20, 20, 20, 0.99)
          )
        `,
        backgroundSize: '500% 500%',
        animation: 'gradientFlow 40s cubic-bezier(0.4, 0, 0.2, 1) infinite'
      }}>
        {/* Loading overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "absolute inset-0 z-50 flex items-center justify-center",
            "",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-[100px] px-[100px]">
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
                  ? `infiniteScrollDown ${(40 / scrollSpeed) * 1.3}s linear infinite`
                  : `infiniteScroll ${(40 / scrollSpeed) * 1.3}s linear infinite`,
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
                    style={{
                      transform: `translateX(${itemIndex % 2 === 0 ? '-20px' : '20px'})`
                    }}
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
