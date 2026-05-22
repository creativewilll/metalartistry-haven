import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CircleCheck, 
  HelpCircle,
  ChevronRight,
  Home,
  Grid3X3
} from 'lucide-react';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { ComparisonTable } from '../components/seo/ComparisonTable';
import { 
  getCategoryBySlug, 
  getItemsByCategory,
  getRelatedCategories,
  getCategoryPhotoCount,
} from '../data/categories';
import { galleryItems, GalleryItem } from '../data/gallery-items';
import { BUSINESS_INFO } from '../data/site-images';
import { cn } from '../lib/utils';

// Generate slug from title (same as Discover.tsx)
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Category Detail Page
 *
 * Long-form, AIO/AEO/SEO-optimized landing page for each category.
 * Features full item grid, comprehensive copy, FAQs, comparisons, 
 * and cross-links to related categories.
 */
export function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://mattcoffeydesign.com';

  // Get category data
  const category = useMemo(() => {
    return slug ? getCategoryBySlug(slug) : undefined;
  }, [slug]);

  // Get items in this category
  const categoryItems = useMemo(() => {
    if (!category) return [];
    return getItemsByCategory(galleryItems, category.name);
  }, [category]);

  // Get related categories
  const relatedCategories = useMemo(() => {
    if (!category) return [];
    return getRelatedCategories(category.relatedSlugs);
  }, [category]);

  // If category not found, 404
  if (!category) {
    return <Navigate to="/404" replace />;
  }

  // Build CollectionPage schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.displayName} | Custom Metalwork | Matt Coffey Design`,
    "description": category.whatItIs.slice(0, 160),
    "url": `${siteUrl}/services/${category.slug}`,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.url
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categoryItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "description": item.description,
        "url": `${siteUrl}/discover/${generateSlug(item.title)}`,
        "image": `${siteUrl}${item.images[0].url}`
      }))
    }
  };

  // Build ImageGallery schema for top items
  const imageGallerySchema = categoryItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `${category.displayName} Gallery`,
    "description": `Portfolio of ${category.displayName.toLowerCase()} by Matt Coffey Design`,
    "url": `${siteUrl}/services/${category.slug}`,
    "image": categoryItems.slice(0, 12).map(item => ({
      "@type": "ImageObject",
      "contentUrl": `${siteUrl}${item.images[0].url}`,
      "name": item.title,
      "description": item.description
    }))
  } : null;

  // Build FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": category.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Build BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": `${siteUrl}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.displayName,
        "item": `${siteUrl}/services/${category.slug}`
      }
    ]
  };

  // Combine all schemas
  const allSchemas: Record<string, any>[] = [collectionSchema, faqSchema, breadcrumbSchema];
  if (imageGallerySchema) {
    allSchemas.push(imageGallerySchema);
  }

  // Determine if we should show comparison table
  // Categories with natural comparisons: Doors and Windows, Railings, Furniture
  const showComparison = ['doors-and-windows', 'railings-fences-and-gates', 'custom-furniture'].includes(category.slug);

  return (
    <>
      <QuickAnswer
        id="quick-answer"
        text={`Matt Coffey Design specializes in ${category.displayName.toLowerCase()} using traditional hand-forging techniques. ${category.whatItIs.slice(0, 200)}... Typical pricing: ${category.priceRange}. Browse ${categoryItems.length} portfolio pieces below.`}
      />

      <SiteHead
        title={`${category.displayName} | Custom Metalwork | Traverse City`}
        description={`${category.tagline}. ${category.whatItIs.slice(0, 120)}... Browse ${categoryItems.length} hand-forged pieces with pricing, materials, and typical use cases.`}
        keywords={category.keywords}
        schema={allSchemas}
        image={`${siteUrl}${category.heroImage}`}
        speakableSelectors={['[data-speakable="true"]']}
      />

      {/* Breadcrumb Bar */}
      <nav className="pt-28 pb-4 bg-forge-black border-b border-brushed-bronze/10" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-iron-grey">
            <li>
              <Link to="/" className="hover:text-chalk transition-colors inline-flex items-center gap-1">
                <Home size={14} />
                <span>Home</span>
              </Link>
            </li>
            <li><ChevronRight size={14} /></li>
            <li>
              <Link to="/services" className="hover:text-chalk transition-colors">
                Services
              </Link>
            </li>
            <li><ChevronRight size={14} /></li>
            <li className="text-chalk">{category.displayName}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 pb-24 bg-forge-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] border border-brushed-bronze/20 overflow-hidden">
                <img
                  src={category.heroImage}
                  alt={`${category.displayName} showcase`}
                  width={800}
                  height={600}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Price Badge */}
              <div className="absolute -bottom-6 right-6 bg-brushed-bronze text-forge-black px-6 py-3 font-mono text-sm uppercase tracking-wider">
                {category.priceRange}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-display">
                {category.displayName}
              </h1>
              <p className="text-xl text-brushed-bronze font-medium">
                {category.tagline}
              </p>
              <div className="flex items-center gap-4 text-sm text-iron-grey font-mono uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Grid3X3 size={16} />
                  {getCategoryPhotoCount(galleryItems, category.name)} Photos
                </span>
                <span>|</span>
                <span>Traverse City, Michigan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Section - AIO Content */}
      <section id="about" className="py-24 bg-anthracite relative">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10" data-speakable="true">
          <h2 className="text-3xl md:text-4xl font-display mb-8">
            What is {category.displayName}?
          </h2>
          
          <div className="space-y-6 text-iron-grey leading-relaxed">
            {category.whatItIs.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Why It Matters */}
          <div className="mt-12 space-y-8">
            <h3 className="text-2xl font-display text-chalk">
              Why {category.displayName} Matters
            </h3>
            <div className="space-y-6 text-iron-grey leading-relaxed">
              {category.whyItMatters.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Use Cases Panel */}
      <section id="specs" className="py-24 bg-forge-black border-y border-brushed-bronze/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Materials */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-iron-grey mb-6">
                Materials & Finishes
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.materials.map(mat => (
                  <span 
                    key={mat} 
                    className="px-4 py-2 border border-brushed-bronze/20 text-sm font-mono text-chalk/80 tracking-wide rounded-sm bg-anthracite hover:border-brushed-bronze/40 transition-colors"
                  >
                    {mat}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm text-iron-grey">
                Material selection depends on environment, aesthetic goals, and budget. 
                Outdoor pieces require weather-resistant materials like Cor-Ten or stainless steel. 
                Indoor work offers more flexibility with bronze, copper, and raw steel finishes.
              </p>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-iron-grey mb-6">
                Typical Use Cases
              </h3>
              <ul className="space-y-4">
                {category.useCases.map(uc => (
                  <li key={uc} className="flex items-start gap-3 text-chalk/80">
                    <CircleCheck size={18} className="text-brushed-bronze shrink-0 mt-0.5" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Comparison Table */}
      {showComparison && category.slug === 'doors-and-windows' && (
        <section className="py-16 bg-anthracite">
          <div className="max-w-5xl mx-auto px-6">
            <ComparisonTable
              id="door-comparison"
              title="Steel vs. Wood vs. Aluminum Doors"
              description="Material comparison for architectural entryways and fenestration"
              optionALabel="Steel"
              optionBLabel="Wood/Aluminum"
              rows={[
                { attribute: "Durability", optionA: "Extremely high; 50+ year lifespan", optionB: "Moderate; requires ongoing maintenance" },
                { attribute: "Thermal Performance", optionA: "Excellent with thermal break systems", optionB: "Good (wood) / Poor (aluminum conducts heat)" },
                { attribute: "Sightlines", optionA: "Very narrow (1.5–2 inches)", optionB: "Wider (3–4+ inches required for structure)" },
                { attribute: "Security", optionA: "Maximum; inherent strength", optionB: "Limited; can be forced or decayed" },
                { attribute: "Maintenance", optionA: "Minimal with proper finish", optionB: "Regular refinishing required" },
                { attribute: "Cost", optionA: "Higher initial investment", optionB: "Lower initial, higher lifetime cost" },
              ]}
            />
          </div>
        </section>
      )}

      {showComparison && category.slug === 'railings-fences-and-gates' && (
        <section className="py-16 bg-anthracite">
          <div className="max-w-5xl mx-auto px-6">
            <ComparisonTable
              id="railing-comparison"
              title="Hand-Forged vs. Fabricated Railings"
              description="Understanding the difference between master craftsmanship and commodity fabrication"
              optionALabel="Hand-Forged"
              optionBLabel="Fabricated"
              rows={[
                { attribute: "Joinery", optionA: "Traditional mortise/tenon, riveting", optionB: "Welded joints only" },
                { attribute: "Scrollwork", optionA: "Hand-hammered; organic variation", optionB: "Machine-bent; uniform curves" },
                { attribute: "Longevity", optionA: "100+ years with maintenance", optionB: "10–20 years before failure" },
                { attribute: "Repairability", optionA: "Individual elements replaceable", optionB: "Often requires full replacement" },
                { attribute: "Cost", optionA: "$400–800+ per linear foot", optionB: "$150–300 per linear foot" },
                { attribute: "Value", optionA: "Appreciating asset; heirloom quality", optionB: "Depreciating consumable product" },
              ]}
            />
          </div>
        </section>
      )}

      {showComparison && category.slug === 'custom-furniture' && (
        <section className="py-16 bg-anthracite">
          <div className="max-w-5xl mx-auto px-6">
            <ComparisonTable
              id="furniture-comparison"
              title="Custom Forged vs. Mass-Produced Furniture"
              description="Why hand-forged furniture outlasts factory alternatives"
              optionALabel="Custom Forged"
              optionBLabel="Mass-Produced"
              rows={[
                { attribute: "Materials", optionA: "1/4-inch+ plate; solid joinery", optionB: "Thin tubing; spot welds" },
                { attribute: "Joinery", optionA: "Through-tenons, rivets, full-penetration welds", optionB: "Spot welds; screws; adhesive" },
                { attribute: "Lifespan", optionA: "Generational; 100+ years", optionB: "5–15 years before failure" },
                { attribute: "Customization", optionA: "Any dimension, finish, or material combination", optionB: "Limited to available SKUs" },
                { attribute: "Repairability", optionA: "Repairable indefinitely", optionB: "Designed for disposal" },
                { attribute: "Investment", optionA: "Appreciating asset; family heirloom", optionB: "Depreciating consumable" },
              ]}
            />
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section id="gallery" className="py-24 bg-forge-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display mb-2">
                {category.displayName} Portfolio
              </h2>
              <p className="text-iron-grey">
                {categoryItems.length} hand-forged pieces • Click any piece to view full details
              </p>
            </div>
            <Link 
              to={`/discover?category=${encodeURIComponent(category.name)}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-mono tracking-widest text-brushed-bronze hover:text-ember-orange uppercase transition-colors"
            >
              View in Discover Wall <ArrowRight size={16} />
            </Link>
          </div>

          {categoryItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    to={`/discover/${generateSlug(item.title)}`}
                    className="group block border border-brushed-bronze/20 bg-anthracite overflow-hidden hover:border-brushed-bronze/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze rounded-sm"
                  >
                    {/* Image */}
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={item.images[0].url}
                        alt={item.images[0].alt}
                        width={400}
                        height={400}
                        loading={index < 8 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.childImages && item.childImages.length > 0 && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-forge-black/80 backdrop-blur-sm text-xs font-mono text-chalk">
                          +{item.childImages.length}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-display text-lg group-hover:text-brushed-bronze transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-iron-grey line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-anthracite border border-brushed-bronze/20 rounded-sm">
              <p className="text-iron-grey text-lg">
                Portfolio pieces coming soon to this category.
              </p>
              <Link 
                to="/discover" 
                className="inline-flex items-center gap-2 mt-4 text-brushed-bronze hover:text-ember-orange transition-colors"
              >
                Browse all work <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-anthracite relative">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <HelpCircle size={24} className="text-brushed-bronze" />
            <h2 className="text-3xl md:text-4xl font-display">
              {category.displayName} FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {category.faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group border-l-2 border-brushed-bronze pl-6 py-3 bg-forge-black/50"
              >
                <summary className="cursor-pointer font-medium text-chalk hover:text-brushed-bronze transition-colors list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ArrowRight size={16} className="rotate-90 group-open:rotate-[-90deg] transition-transform" />
                </summary>
                <p className="text-iron-grey leading-relaxed pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <section id="related" className="py-24 bg-forge-black border-y border-brushed-bronze/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-display mb-8">
              Related Categories
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCategories.map(related => (
                <Link
                  key={related.slug}
                  to={`/services/${related.slug}`}
                  className="group flex items-center gap-4 p-4 border border-brushed-bronze/20 hover:border-brushed-bronze/50 bg-anthracite transition-all rounded-sm"
                >
                  <div className="w-20 h-20 shrink-0 overflow-hidden">
                    <img
                      src={related.heroImage}
                      alt={related.displayName}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg group-hover:text-brushed-bronze transition-colors truncate">
                      {related.displayName}
                    </h3>
                    <p className="text-sm text-iron-grey line-clamp-1">
                      {related.tagline}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-brushed-bronze shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section id="closing" className="py-24 bg-hammered-steel border-y border-brushed-bronze/20 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display mb-6 text-balance">
            Ready to start your {category.displayName.toLowerCase()} project?
          </h2>
          <p className="text-iron-grey mb-10">
            Every piece in the gallery above started as a conversation. Bring your dimensions, 
            sketches, or simply an idea of what you need. I'll help engineer the solution 
            and forge it at the anvil in Traverse City.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex h-14 items-center justify-center rounded-sm bg-brushed-bronze px-8 text-base font-medium text-forge-black transition-all hover:bg-ember-orange hover:shadow-[0_4px_24px_-4px_rgba(226,106,31,0.5)]"
            >
              Start a {category.displayName.split(' ')[0]} Commission
            </Link>
            <Link 
              to="/services" 
              className="inline-flex h-14 items-center justify-center rounded-sm border border-brushed-bronze px-8 text-base font-medium text-chalk transition-all hover:bg-brushed-bronze hover:text-forge-black"
            >
              <ArrowLeft size={16} className="mr-2" />
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategoryDetail;
