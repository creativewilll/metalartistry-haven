import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Tag, X, Rss } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { useState, useMemo, FormEvent } from 'react';
import { cn } from '../lib/utils';
import { 
  JOURNAL_POSTS, 
  getAllCategories, 
  getAllTags, 
  filterPostsByCategory,
  filterPostsByTag,
  type JournalPost 
} from '../data/journal-posts';
import { BUSINESS_INFO, SITE_IMAGES } from '../data/site-images';

// Subscribe Form Component
function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'newsletter');
      formData.append('email', email);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-anthracite border border-hammered-steel p-8 md:p-12">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="text-brushed-bronze" size={24} />
        <h3 className="text-xl font-display">Subscribe to the Journal</h3>
      </div>
      <p className="text-iron-grey mb-6 leading-relaxed">
        Receive new articles on craft, materials, and architectural metalwork directly to your inbox.
        No spam, just forged insights.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-forge-black border border-hammered-steel px-4 py-3 text-chalk placeholder:text-iron-grey focus:border-brushed-bronze focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-brushed-bronze text-forge-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-chalk transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-4 text-sm text-green-400">Thank you for subscribing! Check your inbox for confirmation.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm text-ember-orange">Something went wrong. Please try again or email us directly.</p>
      )}
    </div>
  );
}

// Generate Blog and ItemList schemas
function generateJournalSchemas(posts: JournalPost[], siteUrl: string) {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Matt Coffey Design Journal',
    description: 'Insights from a master blacksmith on architectural steel, bronze working, patinas, and the philosophy of manual building.',
    url: `${siteUrl}/journal`,
    author: {
      '@type': 'Person',
      name: 'Matt Coffey',
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}${SITE_IMAGES.brand.logo}`,
      },
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/journal/${post.slug}`,
      name: post.title,
      description: post.excerpt,
      image: `${siteUrl}${post.image}`,
    })),
  };

  return [blogSchema, itemListSchema];
}

export function Journal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(searchParams.get('tag'));

  const categories = getAllCategories();
  const allTags = getAllTags();
  const siteUrl = (import.meta as any).env?.VITE_SITE_URL || BUSINESS_INFO.url;

  // Get featured post (first post)
  const featuredPost = JOURNAL_POSTS[0];
  
  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = filterPostsByCategory(activeCategory);
    if (activeTag) {
      posts = posts.filter(post => post.tags.includes(activeTag));
    }
    return posts.filter(post => post.slug !== featuredPost.slug);
  }, [activeCategory, activeTag, featuredPost.slug]);

  // Update URL when tag changes
  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    if (tag) {
      setSearchParams({ tag });
    } else {
      setSearchParams({});
    }
  };

  const schemas = generateJournalSchemas(JOURNAL_POSTS, siteUrl);

  return (
    <>
      <QuickAnswer text="The Matt Coffey Design Journal covers metalworking techniques, material science, and craft philosophy — including deep comparisons of powder coating vs patina finishes, hot-rolled vs cold-rolled steel, and traditional joinery methods like forge welding and hot riveting, written by a master blacksmith with 25+ years of experience." />

      <SiteHead 
        title="Journal | Thoughts on Craft & Architecture"
        description="Insights from a master blacksmith on architectural steel, bronze working, patinas, and the philosophy of manual building."
        schema={schemas}
        image={`${siteUrl}${SITE_IMAGES.journal.featured}`}
        keywords={['blacksmithing', 'metalwork', 'architectural steel', 'custom fabrication', 'Northern Michigan']}
      />

      <div className="pt-24 bg-forge-black min-h-screen">
        {/* Header */}
        <section className="py-24 border-b border-hammered-steel relative overflow-hidden">
          <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-brushed-bronze" size={24} />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-brushed-bronze">The Forgemaster's Log</span>
                <a 
                  href="/rss.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-widest text-iron-grey hover:text-brushed-bronze transition-colors"
                  aria-label="Subscribe to RSS feed"
                >
                  <Rss size={14} /> RSS
                </a>
              </div>
              <h1 className="text-5xl md:text-7xl font-display mb-6">Journal.</h1>
              <p className="text-lg text-iron-grey max-w-2xl leading-relaxed">
                Reflections on the craft. Exploring metallurgy, architectural history, design case studies, and the philosophy of building things that outlive us.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {activeCategory === 'All' && !activeTag && (
          <section className="py-12 md:py-24 max-w-7xl mx-auto px-6">
            <h2 className="sr-only">Featured Article</h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Link 
                to={`/journal/${featuredPost.slug}`}
                className="group relative bg-anthracite border border-brushed-bronze/10 grid grid-cols-1 lg:grid-cols-2 overflow-hidden hover:border-brushed-bronze/30 transition-colors block"
              >
                {/* Updated Ribbon */}
                {featuredPost.updatedDate && (
                  <div className="absolute top-4 right-4 z-20 bg-ember-orange text-forge-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    Updated
                  </div>
                )}
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.imageAlt}
                    className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-anthracite via-anthracite/20 to-transparent" />
                </div>
                
                <div className="p-8 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-brushed-bronze text-forge-black text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-iron-grey uppercase tracking-widest font-mono">
                      <Clock size={12} /> {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-display mb-6 leading-tight group-hover:text-brushed-bronze transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-iron-grey max-w-md leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-[10px] text-iron-grey uppercase tracking-widest font-mono mb-6">
                    <time dateTime={featuredPost.dateTime}>{featuredPost.date}</time>
                    {featuredPost.updatedDate && (
                      <span className="text-ember-orange">(Updated: <time dateTime={featuredPost.updatedDateTime}>{featuredPost.updatedDate}</time>)</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-px bg-brushed-bronze/50 group-hover:bg-brushed-bronze group-hover:w-16 transition-all" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-chalk group-hover:text-brushed-bronze transition-colors">
                      Read Article
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Categories & Feed */}
        <section className="pb-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-hammered-steel pb-6 gap-6">
            <h2 className="text-2xl font-display text-chalk">Recent Volumes</h2>
            
            <div className="flex flex-wrap gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    activeCategory === category 
                      ? "text-brushed-bronze" 
                      : "text-iron-grey hover:text-chalk"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[10px] uppercase tracking-widest text-iron-grey mr-2">Filter by topic:</span>
            {activeTag && (
              <button
                onClick={() => handleTagClick(null)}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-3 py-1 bg-brushed-bronze text-forge-black hover:bg-chalk transition-colors"
              >
                {activeTag} <X size={12} />
              </button>
            )}
            {allTags
              .filter(tag => tag !== activeTag)
              .slice(0, activeTag ? 8 : 10)
              .map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="text-[10px] uppercase tracking-wider px-3 py-1 bg-anthracite border border-hammered-steel text-iron-grey hover:text-chalk hover:border-brushed-bronze transition-colors"
                >
                  {tag}
                </button>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredPosts.map((post, i) => (
              <motion.article 
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link 
                  to={`/journal/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-5 gap-6 items-start"
                >
                  {/* Updated Ribbon for Cards */}
                  <div className="md:col-span-2 relative">
                    {post.updatedDate && (
                      <div className="absolute top-2 left-2 z-10 bg-ember-orange text-forge-black text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                        Updated
                      </div>
                    )}
                    <div className="aspect-[4/3] w-full overflow-hidden border border-hammered-steel">
                      <img 
                        src={post.image} 
                        alt={post.imageAlt}
                        className="w-full h-full object-cover grayscale opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Tag size={12} className="text-brushed-bronze" />
                      <span className="text-[9px] uppercase tracking-widest font-mono text-brushed-bronze">
                        {post.category}
                      </span>
                      {/* Reading Time Pill */}
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest font-mono bg-anthracite border border-hammered-steel px-2 py-0.5 text-iron-grey">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                    
                    {/* Date with datetime attribute */}
                    <div className="text-[9px] uppercase tracking-widest font-mono text-iron-grey mb-3">
                      <time dateTime={post.dateTime}>{post.date}</time>
                      {post.updatedDate && (
                        <span className="text-ember-orange ml-2">(<time dateTime={post.updatedDateTime}>Updated</time>)</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-display mb-3 group-hover:text-ember-orange transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-iron-grey leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-wider text-iron-grey/60">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-auto text-[10px] font-bold uppercase tracking-widest text-iron-grey group-hover:text-chalk transition-colors">
                      Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-24 border border-hammered-steel bg-anthracite">
              <p className="text-iron-grey font-mono uppercase tracking-widest text-sm mb-4">
                No transmissions found in this category.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  handleTagClick(null);
                }}
                className="text-brushed-bronze hover:text-chalk transition-colors text-sm"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Subscribe Form */}
          <div className="mt-16">
            <SubscribeForm />
          </div>
        </section>
      </div>
    </>
  );
}
