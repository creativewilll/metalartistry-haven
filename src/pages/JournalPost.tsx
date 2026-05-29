import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, User, BookOpen } from 'lucide-react';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { ComparisonTable } from '../components/seo/ComparisonTable';
import { getPostBySlug, getRelatedPosts, getAdjacentPosts, JOURNAL_POSTS, type JournalPost } from '../data/journal-posts';
import { BUSINESS_INFO, SITE_IMAGES } from '../data/site-images';
import { useState, FormEvent } from 'react';

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

// BlogPosting JSON-LD Schema Generator
function generateBlogPostingSchema(post: JournalPost, canonicalUrl: string) {
  const siteUrl = BUSINESS_INFO.url;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': post.articleType || 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: `${siteUrl}${post.image}`,
    datePublished: post.dateTime,
    dateModified: post.updatedDateTime || post.dateTime,
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#matt-coffey`,
      name: post.author,
      url: siteUrl,
      jobTitle: 'Master Blacksmith',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#business`,
      name: BUSINESS_INFO.name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}${SITE_IMAGES.brand.logo}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteUrl}/journal`,
      name: 'Matt Coffey Design Journal',
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTimeMinutes}M`,
    inLanguage: 'en-US',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="true"]', 'article h2:first-of-type', 'article p:first-of-type'],
    },
  };

  if (post.aboutEntities?.length) {
    schema.about = post.aboutEntities.map(e => ({
      '@type': 'Thing',
      name: e.name,
      ...(e.sameAs ? { sameAs: e.sameAs } : {}),
    }));
  }

  if (post.tldr) {
    schema.abstract = post.tldr;
  }

  return schema;
}

export function JournalPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <SiteHead title="Article Not Found" />
        <div className="pt-24 bg-forge-black min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display mb-4">Article Not Found</h1>
            <p className="text-iron-grey mb-8">The journal entry you're looking for doesn't exist.</p>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-brushed-bronze hover:text-chalk transition-colors"
            >
              <ArrowLeft size={20} /> Return to Journal
            </Link>
          </div>
        </div>
      </>
    );
  }

  const siteUrl = (import.meta as any).env?.VITE_SITE_URL || BUSINESS_INFO.url;
  const canonicalUrl = `${siteUrl}/journal/${post.slug}`;
  const blogSchema = generateBlogPostingSchema(post, canonicalUrl);
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const { prev, next } = getAdjacentPosts(post.slug);

  // Parse markdown-like content into sections
  const contentSections = post.content.split('\n\n').filter(Boolean);

  return (
    <>
      {post.tldr && (
        <QuickAnswer text={post.tldr} id={`quick-answer-${post.slug}`} />
      )}

      <SiteHead
        title={post.title}
        description={post.metaDescription}
        schema={blogSchema}
        image={`${siteUrl}${post.image}`}
        keywords={[...post.tags, post.category, 'metalwork', 'blacksmithing', 'craft']}
        preloadImage={post.image}
        speakableSelectors={['[data-speakable="true"]', 'article h2:first-of-type', 'article p:first-of-type']}
      />

      <article className="pt-24 bg-forge-black min-h-screen">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forge-black/60 via-forge-black/80 to-forge-black" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Link */}
              <button
                onClick={() => navigate('/journal')}
                className="inline-flex items-center gap-2 text-iron-grey hover:text-chalk transition-colors mb-8 text-sm"
              >
                <ArrowLeft size={16} /> Back to Journal
              </button>

              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-brushed-bronze text-forge-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  {post.category}
                </span>
                {post.updatedDate && (
                  <span className="bg-ember-orange/20 text-ember-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    Updated
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg md:text-xl text-iron-grey leading-relaxed mb-8 max-w-3xl">
                {post.excerpt}
              </p>

              {/* Author & Date Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-iron-grey">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-brushed-bronze" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-brushed-bronze" />
                  <time dateTime={post.dateTime}>{post.date}</time>
                  {post.updatedDate && (
                    <span className="text-iron-grey/60">
                      (Updated: <time dateTime={post.updatedDateTime}>{post.updatedDate}</time>)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-brushed-bronze" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {contentSections.map((section, index) => {
              if (section.startsWith('## ')) {
                const headingText = section.replace('## ', '');
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-display mt-16 mb-6 text-chalk">
                    {headingText}
                  </h2>
                );
              }
              return (
                <p key={index} className="text-iron-grey leading-relaxed mb-6">
                  {section}
                </p>
              );
            })}

            {post.comparisonTable && (
              <ComparisonTable
                id={post.comparisonTable.id}
                title={post.comparisonTable.title}
                description={post.comparisonTable.description}
                optionALabel={post.comparisonTable.optionALabel}
                optionBLabel={post.comparisonTable.optionBLabel}
                rows={post.comparisonTable.rows}
              />
            )}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-hammered-steel"
          >
            <div className="flex items-center gap-3 mb-4">
              <Tag size={16} className="text-brushed-bronze" />
              <span className="text-sm font-mono uppercase tracking-widest text-iron-grey">Tagged</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/journal?tag=${tag}`}
                  className="text-xs uppercase tracking-wider px-3 py-1 bg-anthracite border border-hammered-steel text-iron-grey hover:text-chalk hover:border-brushed-bronze transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Prev/Next Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {next ? (
              <Link
                to={`/journal/${next.slug}`}
                className="group p-6 bg-anthracite border border-hammered-steel hover:border-brushed-bronze transition-colors"
              >
                <div className="flex items-center gap-2 text-iron-grey text-xs uppercase tracking-widest mb-2">
                  <ArrowLeft size={14} /> Previous
                </div>
                <h3 className="font-display text-lg group-hover:text-brushed-bronze transition-colors">
                  {next.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            {prev ? (
              <Link
                to={`/journal/${prev.slug}`}
                className="group p-6 bg-anthracite border border-hammered-steel hover:border-brushed-bronze transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-2 text-iron-grey text-xs uppercase tracking-widest mb-2">
                  Next <ArrowRight size={14} />
                </div>
                <h3 className="font-display text-lg group-hover:text-brushed-bronze transition-colors">
                  {prev.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </motion.nav>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-hammered-steel bg-anthracite/30">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <h2 className="text-2xl font-display mb-8">Related Readings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/journal/${relatedPost.slug}`}
                      className="group block"
                    >
                      <div className="aspect-[16/10] overflow-hidden border border-hammered-steel mb-4">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.imageAlt}
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-2 text-xs">
                        <span className="text-brushed-bronze uppercase tracking-wider">{relatedPost.category}</span>
                        <span className="text-iron-grey">{relatedPost.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg group-hover:text-brushed-bronze transition-colors">
                        {relatedPost.title}
                      </h3>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Subscribe CTA */}
        <section className="border-t border-hammered-steel">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <SubscribeForm />
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-hammered-steel bg-anthracite/50">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Ready to Create Something Lasting?
            </h2>
            <p className="text-iron-grey mb-8 max-w-xl mx-auto">
              Let's discuss how traditional metalworking techniques can bring your architectural vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-brushed-bronze text-forge-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-chalk transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
