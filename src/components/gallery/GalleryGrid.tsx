import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DetailView } from "./DetailView";
import { GalleryItem } from "@/src/data/gallery-items";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/* =========================
   LazyImage — pure <img> with IntersectionObserver, no framer-motion overhead
   ========================= */
const LazyImage = memo(({
  src,
  alt,
  width,
  height,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading="lazy"
    decoding="async"
    className={className}
    onClick={onClick}
    style={{ pointerEvents: "auto" }}
  />
));
LazyImage.displayName = "LazyImage";

/* =========================
   GalleryCard — pure div, no motion wrappers
   ========================= */
const GalleryCard = memo(({
  item,
  cardWidth,
  imageHeight,
  onImageClick,
}: {
  item: GalleryItem;
  cardWidth: number;
  imageHeight: number;
  onImageClick: (item: GalleryItem) => void;
}) => (
  <div className="w-full flex justify-center">
    <div
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
      style={{ width: `${cardWidth}px` }}
      onClick={() => onImageClick(item)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onImageClick(item); } }}
    >
      <div style={{ position: "relative", width: "100%", paddingTop: "66.67%" }}>
        <LazyImage
          src={item.images[0].url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
          width={cardWidth}
          height={imageHeight}
        />
      </div>
      <div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl"
        style={{ pointerEvents: "none" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-2xl"
        style={{ pointerEvents: "none" }}
      >
        <h3 className="text-white text-sm font-light leading-tight">{item.title}</h3>
        {item.childImages && (
          <div className="text-white/70 text-xs mt-1">
            +{item.childImages.length} more images
          </div>
        )}
      </div>
    </div>
  </div>
));
GalleryCard.displayName = "GalleryCard";

/* =========================
   GalleryGrid Component
   ========================= */
const cardSpacing = {
  horizontal: 24,
  vertical: 80,
};
const cardWidth = 400;
const imageHeight = Math.round(cardWidth * 0.667);

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

const getNumColumns = (device: "mobile" | "tablet" | "desktop") =>
  device === "desktop" ? 3 : 2;

const getScrollSpeed = (device: "mobile" | "tablet" | "desktop") =>
  device === "desktop" ? 1.5 : 1;

interface GalleryGridProps {
  items: GalleryItem[];
  initialSelectedItem?: GalleryItem | null;
  categoryFilter?: string;
}

export const GalleryGrid = ({ items, initialSelectedItem, categoryFilter }: GalleryGridProps) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(initialSelectedItem || null);
  const [deviceType, setDeviceType] = useState(getDeviceType());
  const [numColumns, setNumColumns] = useState(getNumColumns(getDeviceType()));
  const [scrollSpeed, setScrollSpeed] = useState(getScrollSpeed(getDeviceType()));
  const [pausedColumns, setPausedColumns] = useState<Record<number, boolean>>({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Single reduced-motion check at grid level
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleResize = useCallback(() => {
    const device = getDeviceType();
    setDeviceType(device);
    setNumColumns(getNumColumns(device));
    setScrollSpeed(getScrollSpeed(device));
    setPausedColumns({});
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (initialSelectedItem) setSelectedItem(initialSelectedItem);
  }, [initialSelectedItem]);

  const handleItemClick = useCallback((item: GalleryItem) => {
    setSelectedItem(item);
    const slug = generateSlug(item.title);
    const params = new URLSearchParams(searchParams).toString();
    navigate(params ? `/discover/${slug}?${params}` : `/discover/${slug}`, { replace: true });
  }, [navigate, searchParams]);

  const handleCloseDetail = useCallback(() => {
    setSelectedItem(null);
    const params = new URLSearchParams(searchParams).toString();
    navigate(params ? `/discover?${params}` : "/discover", { replace: true });
  }, [navigate, searchParams]);

  // Build duplicated columns for seamless CSS infinite scroll
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array.from({ length: numColumns }, () => []);
    items.forEach((item, i) => cols[i % numColumns].push(item));
    return cols.map((col) => [...col, ...col]);
  }, [items, numColumns]);

  const backgroundStyle: React.CSSProperties = useMemo(() => ({
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
    animation: prefersReducedMotion ? "none" : "gradientFlow 40s cubic-bezier(0.4, 0, 0.2, 1) infinite",
  }), [prefersReducedMotion]);

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
          {columns.map((column, colIndex) => {
            const isReverse = deviceType === "desktop" && colIndex === 1;
            return (
              <div
                key={colIndex}
                className="relative overflow-hidden h-full"
                style={{ contain: "layout style paint" }}
                onMouseEnter={() => setPausedColumns((p) => ({ ...p, [colIndex]: true }))}
                onMouseLeave={() => setPausedColumns((p) => ({ ...p, [colIndex]: false }))}
              >
                <div
                  className="flex flex-col items-center absolute top-0 left-0 right-0"
                  style={{
                    minHeight: "100vh",
                    gap: `${cardSpacing.vertical}px`,
                    animation: prefersReducedMotion
                      ? "none"
                      : isReverse
                        ? `infiniteScrollDown ${60 / scrollSpeed}s linear infinite`
                        : `infiniteScroll ${60 / scrollSpeed}s linear infinite`,
                    animationPlayState: pausedColumns[colIndex] ? "paused" : "running",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    transform: "translate3d(0, 0, 0)",
                    contentVisibility: "auto",
                  } as React.CSSProperties}
                >
                  {column.map((item, index) => (
                    <GalleryCard
                      key={`${item.id}-${index}`}
                      item={item}
                      cardWidth={cardWidth}
                      imageHeight={imageHeight}
                      onImageClick={handleItemClick}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} — Gallery detail view`}
            onClick={(e) => { if (e.target === e.currentTarget) handleCloseDetail(); }}
          >
            <DetailView
              item={selectedItem}
              onClose={handleCloseDetail}
              allItems={items}
              onNavigate={handleItemClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
