import { Instagram } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/site-images';
import {
  commissionPosts,
  behindTheScenesPosts,
  type InstagramPost,
} from '../../data/instagram-posts';
import { cn } from '../../lib/utils';

interface ForgeFeedProps {
  variant: 'commissions' | 'behindTheScenes';
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  className?: string;
}

const defaults: Record<ForgeFeedProps['variant'], { eyebrow: string; heading: string; subhead: string }> = {
  commissions: {
    eyebrow: 'From the Anvil — @mattcoffeydesign',
    heading: 'The Forge Feed.',
    subhead: 'Finished commissions straight from the shop floor to your feed.',
  },
  behindTheScenes: {
    eyebrow: 'Behind the Sparks — @mattcoffeydesign',
    heading: 'Inside the Forge.',
    subhead: 'Raw process, real fire, no filters. Follow along as each piece takes shape.',
  },
};

/**
 * Grid cell config — col/row spans create the asymmetric mosaic.
 * Desktop uses a 12-col grid with 4 explicit rows.
 */
const cellLayout: { col: string; row: string }[] = [
  { col: 'md:col-span-5 md:row-span-2', row: '' },         // 0 — large left
  { col: 'md:col-span-4',               row: '' },         // 1 — medium top-center
  { col: 'md:col-span-3',               row: '' },         // 2 — small top-right
  { col: 'md:col-span-4',               row: '' },         // 3 — medium mid-center
  { col: 'md:col-span-3',               row: '' },         // 4 — small mid-right
  { col: 'md:col-span-3',               row: '' },         // 5 — small bottom-left
  { col: 'md:col-span-4',               row: '' },         // 6 — medium bottom-center
  { col: 'md:col-span-5 md:row-span-2', row: 'md:-mt-24' }, // 7 — large right, pull up
];

function ForgeFeedSchema({ posts }: { posts: InstagramPost[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Matt Coffey Design — Instagram Forge Feed',
    url: BUSINESS_INFO.social.instagram,
    associatedMedia: posts.map((p) => ({
      '@type': 'ImageObject',
      contentUrl: `${BUSINESS_INFO.url}${p.image}`,
      name: p.caption,
      description: p.alt,
      creator: {
        '@type': 'Person',
        name: 'Matt Coffey',
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ForgeFeed({
  variant,
  eyebrow,
  heading,
  subhead,
  className,
}: ForgeFeedProps) {
  const d = defaults[variant];
  const posts = variant === 'commissions' ? commissionPosts : behindTheScenesPosts;

  return (
    <section
      id="forge-feed"
      className={cn(
        'py-24 px-6 relative overflow-hidden',
        variant === 'commissions' ? 'bg-forge-black' : 'bg-anthracite',
        className,
      )}
      aria-labelledby="forge-feed-heading"
    >
      {/* Ember glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(rgba(226,106,31,0.08),transparent)] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brushed-bronze block mb-3">
            {eyebrow ?? d.eyebrow}
          </span>
          <h2
            id="forge-feed-heading"
            className="text-3xl md:text-5xl font-display mb-4"
          >
            {heading ?? d.heading}
          </h2>
          <p className="text-iron-grey max-w-xl mx-auto">
            {subhead ?? d.subhead}
          </p>
          <div className="w-12 h-px bg-brushed-bronze mx-auto mt-6" />
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 auto-rows-[minmax(160px,1fr)]">
          {posts.map((post, i) => {
            const layout = cellLayout[i] ?? { col: 'md:col-span-3', row: '' };
            return (
              <a
                key={post.id}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View "${post.caption}" on Instagram — opens in new tab`}
                className={cn(
                  'group relative overflow-hidden border border-hammered-steel transition-[z-index] hover:z-10 focus-visible:z-10',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black',
                  post.aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-square',
                  'md:aspect-auto',
                  layout.col,
                  layout.row,
                )}
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  width={800}
                  height={post.aspect === 'portrait' ? 1000 : 800}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 transition-all duration-500 motion-safe:group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
                />

                {/* Hover overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-forge-black/90 via-forge-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-xs text-chalk font-mono leading-relaxed line-clamp-3">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-brushed-bronze">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest">View</span>
                  </div>
                </div>

                {/* Ember underline on hover */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-ember-orange transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />

                {/* SR-only caption always available */}
                <span className="sr-only">{post.caption}</span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href={BUSINESS_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-brushed-bronze px-8 py-4 text-xs font-bold uppercase tracking-widest text-brushed-bronze transition-all hover:bg-brushed-bronze hover:text-forge-black shadow-[0_0_15px_rgba(140,107,58,0.15)] hover:shadow-[0_0_25px_rgba(140,107,58,0.35)]"
          >
            <Instagram size={18} />
            Follow the Forge
          </a>
        </div>
      </div>

      <ForgeFeedSchema posts={posts} />
    </section>
  );
}
