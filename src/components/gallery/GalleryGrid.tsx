import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DetailView } from "./DetailView";
import { GalleryItem } from "@/data/gallery-items";

/* =========================
   SequentialLazyImage Component
   ========================= */
interface SequentialLazyImageProps {
  src: string;
  alt: string;
  forceLoad: boolean;
  onLoaded: () => void;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SequentialLazyImage = ({
  src,
  alt,
  forceLoad,
  onLoaded,
  className,
  style,
  onClick,
}: SequentialLazyImageProps) => {
  const mergedStyle = { ...style, pointerEvents: "auto" as const };

  return forceLoad ? (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={mergedStyle}
      onLoad={onLoaded}
      onClick={onClick}
      loading="lazy"
    />
  ) : (
    <div className={className} style={mergedStyle} onClick={onClick} />
  );
};

/* =========================
   SequentialColumn Component
   ========================= */
interface SequentialColumnProps {
  items: GalleryItem[];
  cardWidth: number;
  onImageClick: (item: GalleryItem) => void;
  deviceType: "mobile" | "tablet" | "desktop";
  /** If true, iterate the items in reverse order so that images load from the top */
  reverse?: boolean;
  /** If true, force load every image in this column (bypassing lazy loading) */
  forceLoadAll?: boolean;
}

const SequentialColumn = ({
  items,
  cardWidth,
  onImageClick,
  deviceType,
  reverse = false,
  forceLoadAll = false,
}: SequentialColumnProps) => {
  // If reverse is true, create a reversed copy of the items.
  const orderedItems = reverse ? [...items].reverse() : items;

  // For normal mode, track the highest loaded index (starting at 0).
  // For reverse mode, track the lowest loaded index (starting at the last index).
  const [maxLoadedIndex, setMaxLoadedIndex] = useState(0);
  const [minLoadedIndex, setMinLoadedIndex] = useState(orderedItems.length - 1);

  return (
    <>
      {orderedItems.map((item, index) => {
        const forceLoad = forceLoadAll
          ? true
          : !reverse
          ? index <= maxLoadedIndex + 2
          : index >= minLoadedIndex - 2;

        return (
          <motion.div
            key={`${item.id}-${index}`}
            className="w-full flex justify-center"
            layout
            layoutId={`card-${item.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              layout: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              style={{ width: `${cardWidth}px` }}
            >
              {/* 3:2 Aspect Ratio Container */}
              <div style={{ position: "relative", width: "100%", paddingTop: "66.67%" }}>
                <SequentialLazyImage
                  src={item.images[0].url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  forceLoad={forceLoad}
                  onLoaded={() => {
                    if (!reverse) {
                      setMaxLoadedIndex((current) => Math.max(current, index));
                    } else {
                      setMinLoadedIndex((current) => Math.min(current, index));
                    }
                  }}
                  onClick={() => onImageClick(item)}
                />
              </div>
              {/* Overlays with pointerEvents disabled so clicks pass through */}
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl"
                style={{ pointerEvents: "none" }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-2xl"
                style={{ pointerEvents: "none" }}
              >
                <h3 className="text-white text-sm font-light leading-tight">{item.title}</h3>
                {item.childImages && (
                  <div className="text-white/70 text-xs mt-1">
                    +{item.childImages.length} more images
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

/* =========================
   GalleryGrid Component
   ========================= */
const cardSpacing = {
  horizontal: 24, // spacing between columns
  vertical: 80,   // spacing between images in each column
};
const cardWidth = 400; // fixed card width (3:2 aspect ratio implies ~267px height)

const animationsCSS = `
  @keyframes infiniteScroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(0, calc(-50% + 1px), 0); }
  }
  @keyframes infiniteScrollDown {
    0% { transform: translate3d(0, calc(-50% + 1px), 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  @keyframes gradientFlow {
    0% { background-position: 0% 0%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
    100% { background-position: 0% 0%; }
  }
`;
if (typeof document !== "undefined" && !document.getElementById("gallery-grid-animations")) {
  const style = document.createElement("style");
  style.id = "gallery-grid-animations";
  style.textContent = animationsCSS;
  document.head.appendChild(style);
}

const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
};

const getNumColumns = (device: "mobile" | "tablet" | "desktop") => {
  // Mobile and tablet use 2 columns; desktop uses 3.
  return device === "desktop" ? 3 : 2;
};

const getScrollSpeed = (device: "mobile" | "tablet" | "desktop") => {
  return device === "desktop" ? 1.5 : 1;
};

export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(getDeviceType());
  const [numColumns, setNumColumns] = useState<number>(getNumColumns(getDeviceType()));
  const [scrollSpeed, setScrollSpeed] = useState<number>(getScrollSpeed(getDeviceType()));
  // Manage pause state per column
  const [pausedColumns, setPausedColumns] = useState<{ [key: number]: boolean }>({});

  const handleResize = useCallback(() => {
    const device = getDeviceType();
    const columnsCount = getNumColumns(device);
    setDeviceType(device);
    setNumColumns(columnsCount);
    setScrollSpeed(getScrollSpeed(device));
    setPausedColumns(Object.fromEntries(Array.from({ length: columnsCount }, (_, i) => [i, false])));
  }, []);

  useEffect(() => {
    setPausedColumns(Object.fromEntries(Array.from({ length: numColumns }, (_, i) => [i, false])));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, numColumns]);

  // Prepare duplicated columns for seamless infinite scroll.
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array(numColumns)
      .fill(null)
      .map(() => []);
    items.forEach((item, index) => {
      const colIndex = index % numColumns;
      cols[colIndex].push(item);
    });
    // Duplicate each column for seamless scrolling.
    return cols.map((col) => [...col, ...col]);
  }, [items, numColumns]);

  const backgroundStyle = {
    background: `
      radial-gradient(circle at 30% 30%, rgba(176,196,222,0.08), transparent 45%),
      radial-gradient(circle at 70% 70%, rgba(205,127,50,0.08), transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(144,175,144,0.06), transparent 55%),
      linear-gradient(135deg,
        rgba(20,20,20,0.99),
        rgba(176,196,222,0.25),
        rgba(119,136,153,0.2),
        rgba(205,127,50,0.25),
        rgba(144,175,144,0.25),
        rgba(119,136,153,0.2)
      )
    `,
    backgroundSize: "500% 500%",
    animation: "gradientFlow 40s cubic-bezier(0.4, 0, 0.2, 1) infinite",
  };

  // All devices now use vertical scrolling columns.
  return (
    <>
      <div className="w-full h-screen overflow-hidden" style={backgroundStyle}>
        <div
          className="grid h-full"
          style={{
            gridTemplateColumns: deviceType === "desktop" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
            gap: `${cardSpacing.horizontal}px`,
            padding: "16px",
          }}
        >
          <AnimatePresence>
            {columns.map((column, colIndex) => {
              const reverse = deviceType === "desktop" && colIndex === 1;
              return (
                <div
                  key={colIndex}
                  className="relative overflow-hidden h-full"
                  onMouseEnter={() =>
                    setPausedColumns((prev) => ({ ...prev, [colIndex]: true }))
                  }
                  onMouseLeave={() =>
                    setPausedColumns((prev) => ({ ...prev, [colIndex]: false }))
                  }
                >
                  <div
                    className="flex flex-col items-center absolute top-0 left-0 right-0"
                    style={{
                      minHeight: "100vh",
                      transformOrigin: "50% 0%",
                      gap: `${cardSpacing.vertical}px`,
                      animation: (
                        deviceType === "desktop" && colIndex === 1
                          ? `infiniteScrollDown ${60 / scrollSpeed}s linear infinite`
                          : `infiniteScroll ${60 / scrollSpeed}s linear infinite`
                      ),
                      animationPlayState: pausedColumns[colIndex] ? "paused" : "running",
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translate3d(0, 0, 0)",
                    }}
                  >
                    <SequentialColumn
                      items={column}
                      cardWidth={cardWidth}
                      onImageClick={setSelectedItem}
                      deviceType={deviceType}
                      reverse={reverse}
                      forceLoadAll={deviceType === "desktop" && colIndex === 1}
                    />
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <DetailView item={selectedItem} onClose={() => setSelectedItem(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};