import { useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { GalleryGrid } from '@/src/components/gallery/GalleryGrid';
import { galleryItems, GalleryItem } from '@/src/data/gallery-items';
import { SiteHead } from '@/src/components/layout/SiteHead';
import { SITE_IMAGES, BUSINESS_INFO } from '@/src/data/site-images';

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Find item by slug
const findItemBySlug = (slug: string): GalleryItem | undefined => {
  return galleryItems.find(item => generateSlug(item.title) === slug);
};

// Generate ImageGallery schema for top 12 items
const generateImageGallerySchema = (items: GalleryItem[]) => {
  const topItems = items.slice(0, 12);
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Matt Coffey Design Gallery",
    "description": "168+ commissioned metalwork pieces by master blacksmith Matt Coffey in Northern Michigan.",
    "url": "https://mattcoffeydesign.com/discover",
    "image": topItems.map(item => ({
      "@type": "ImageObject",
      "contentUrl": `https://mattcoffeydesign.com${item.images[0].url}`,
      "name": item.title,
      "description": item.description
    })),
    "creator": {
      "@type": "Person",
      "name": BUSINESS_INFO.name
    }
  };
};

/**
 * Discover Page
 *
 * Full-viewport infinite-scroll gallery wall. Three columns (two on mobile/tablet);
 * the middle desktop column scrolls upward while the outer two scroll downward.
 * Hover any column to pause it. Click any tile to open the detail modal.
 *
 * Features:
 * - SEO: SiteHead with ImageGallery schema
 * - Category filtering via query params (?category=Doors%20and%20Windows)
 * - Deep-linking support via slug (/discover/:slug)
 * - Keyboard navigation in detail view
 * - Accessibility: ARIA labels, reduced motion support
 *
 * Rendered without the global Nav/Footer chrome (suppressed in SiteLayout) so the
 * wall is fully immersive. A floating Home pill is the only nav affordance.
 */
export function Discover() {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Get category filter from query params
  const categoryFilter = searchParams.get('category');

  // Filter items by category if specified
  const items = useMemo(() => {
    if (categoryFilter) {
      return galleryItems.filter(item => item.category === categoryFilter);
    }
    return galleryItems;
  }, [categoryFilter]);

  // Find initial selected item from slug
  const initialSelectedItem = useMemo(() => {
    if (slug) {
      return findItemBySlug(slug);
    }
    return null;
  }, [slug]);

  // Handle initial slug-based selection
  useEffect(() => {
    if (slug && !initialSelectedItem) {
      // Invalid slug, redirect to /discover
      navigate('/discover', { replace: true });
    }
  }, [slug, initialSelectedItem, navigate]);

  // Generate schema for SEO
  const imageGallerySchema = useMemo(() => generateImageGallerySchema(galleryItems), []);

  return (
    <>
      <SiteHead
        title="Discover"
        description="Explore 168+ commissioned metalwork pieces by master blacksmith Matt Coffey. Custom railings, gates, furniture, and architectural art from Traverse City, Michigan."
        schema={imageGallerySchema}
        image={`https://mattcoffeydesign.com${SITE_IMAGES.brand.og}`}
        preloadImage={items[0]?.images[0]?.url}
        speakableSelectors={['[data-speakable="true"]']}
      />

      {/* SR-only content for crawlers */}
      <h1 className="sr-only">Matt Coffey Design Gallery — 168+ Custom Metalwork Pieces</h1>
      <div className="sr-only" data-speakable="true">
        <p>Browse the complete portfolio of master blacksmith Matt Coffey, featuring over 168 commissioned metalwork pieces across eight categories: custom railings, gates, furniture, commercial installations, architectural art, doors, signage, and structural supports. All work is hand-forged in Traverse City, Michigan.</p>
        <h2>Gallery Categories</h2>
        <ul>
          <li>Railings, Fences, and Gates — hand-forged spiral staircases, balcony guards, driveway gates, and perimeter fencing</li>
          <li>Custom Furniture — dining tables, shelving, console bases, and bar seating in forged steel and bronze</li>
          <li>Commercial Installations — brewery builds, restaurant interiors, and retail metalwork</li>
          <li>Art and Decor — sculptures, wall art, and decorative focal points</li>
          <li>Doors and Windows — steel casements, pivot entries, and barn doors</li>
          <li>Indoor Installations — fireplaces, range hoods, shelving, and kitchen builds</li>
        </ul>
      </div>

      {/* Centered Background Logo */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
        <img
          src={SITE_IMAGES.brand.logo}
          alt="Matt Coffey Design"
          className="w-48 h-auto opacity-30 brightness-[2] contrast-[1.2]"
          width={192}
          height={192}
          loading="eager"
        />
      </div>

      {/* Floating Home Button */}
      <motion.div
        className="fixed top-8 left-6 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 pl-3 pr-4 py-2 text-[11px] uppercase tracking-[0.18em] text-brushed-bronze border border-brushed-bronze/60 bg-forge-black/80 backdrop-blur hover:bg-brushed-bronze hover:text-forge-black transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Gallery Wall */}
      <div className="relative w-screen min-h-screen overflow-visible">
        <GalleryGrid
          items={items}
          initialSelectedItem={initialSelectedItem}
          categoryFilter={categoryFilter || undefined}
        />
      </div>
    </>
  );
}

export default Discover;
