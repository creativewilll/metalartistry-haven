import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { GLOSSARY_TERMS_ALPHABETICAL, GLOSSARY_LETTERS, getTermBySlug } from '../data/glossary-terms';
import { BUSINESS_INFO } from '../data/site-images';

export function Glossary() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://mattcoffeydesign.com';

  // Build DefinedTermSet schema for all terms
  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Metalworking Glossary",
    "description": "Essential metalworking terminology explained by a master blacksmith with 25 years of experience in Northern Michigan.",
    "author": {
      "@type": "Person",
      "name": BUSINESS_INFO.founder.name,
      "jobTitle": BUSINESS_INFO.founder.jobTitle,
      "url": BUSINESS_INFO.founder.id
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "hasDefinedTerm": GLOSSARY_TERMS_ALPHABETICAL.map(term => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "description": term.definition,
      "termCode": term.slug,
      ...(term.sameAs && { "sameAs": term.sameAs })
    }))
  };

  // Build FAQPage schema where each term becomes a Q&A
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": GLOSSARY_TERMS_ALPHABETICAL.map(term => ({
      "@type": "Question",
      "name": `What is ${term.term}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": term.definition
      }
    }))
  };

  // Combine schemas
  const schema = [definedTermSetSchema, faqSchema];

  return (
    <>
      <SiteHead
        title="Metalworking Glossary"
        description="Master metalworking terminology explained by a Traverse City blacksmith. Definitions for forging, patina, scrollwork, riveting, steel types, and traditional joinery techniques used in architectural metalwork."
        keywords={[
          "metalworking glossary",
          "blacksmithing terms",
          "forging definition",
          "patina meaning",
          "scrollwork metal",
          "hot riveting",
          "steel types explained",
          "TIG welding GTAW",
          "mortise and tenon metal",
          "architectural metalwork terms",
          "custom metal fabrication glossary"
        ]}
        schema={schema}
        speakableSelectors={['[data-speakable="true"]', '#glossary-terms']}
        significantLinks={GLOSSARY_TERMS_ALPHABETICAL.map(t => `${siteUrl}/glossary#${t.slug}`)}
      />

      <QuickAnswer
        id="quick-answer"
        text="This glossary defines 25 essential metalworking terms used in blacksmithing and architectural metal fabrication, including forging, patina, scrollwork, riveting, and various steel types, explained by a master blacksmith with 25 years of experience."
      />

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-16 border-b border-brushed-bronze/20 bg-forge-black relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-brushed-bronze/20 rounded-sm mb-8">
            <BookOpen size={16} className="text-brushed-bronze" />
            <span className="text-xs font-mono uppercase tracking-widest text-iron-grey">Reference Guide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display mb-6">Metalworking Glossary</h1>
          <p className="text-xl text-iron-grey max-w-2xl mx-auto leading-relaxed">
            The language of the forge, defined by 25 years at the anvil. From traditional joinery to modern welding processes—the terminology you need to understand architectural metalwork.
          </p>
        </div>
      </section>

      {/* A-Z Jump Navigation */}
      <nav className="sticky top-20 z-40 bg-forge-black/95 backdrop-blur-sm border-y border-brushed-bronze/10" aria-label="Alphabetical glossary navigation">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-iron-grey mr-4 shrink-0">Jump to:</span>
            {GLOSSARY_LETTERS.map(letter => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="w-8 h-8 flex items-center justify-center text-sm font-mono text-chalk hover:text-brushed-bronze hover:bg-anthracite rounded-sm transition-colors shrink-0"
                aria-label={`Jump to terms starting with ${letter}`}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Glossary Terms */}
      <section
        id="glossary-terms"
        className="py-16 md:py-24 bg-anthracite"
        data-speakable="true"
        aria-label="Metalworking terms and definitions"
      >
        <div className="max-w-4xl mx-auto px-6">
          <dl className="space-y-12">
            {GLOSSARY_TERMS_ALPHABETICAL.map((term, index) => {
              // Check if this is the first term of a new letter section
              const prevTerm = index > 0 ? GLOSSARY_TERMS_ALPHABETICAL[index - 1] : null;
              const currentLetter = term.term.charAt(0).toUpperCase();
              const prevLetter = prevTerm ? prevTerm.term.charAt(0).toUpperCase() : null;
              const isNewSection = !prevTerm || currentLetter !== prevLetter;

              return (
                <div key={term.slug}>
                  {isNewSection && (
                    <div
                      id={`section-${currentLetter}`}
                      className="flex items-center gap-4 mb-8 pt-4 border-t border-brushed-bronze/20"
                    >
                      <span className="text-4xl font-display text-brushed-bronze/30">{currentLetter}</span>
                      <div className="flex-1 h-px bg-brushed-bronze/20" />
                    </div>
                  )}

                  <div
                    id={term.slug}
                    className="scroll-mt-32"
                  >
                    <dt className="mb-3">
                      <h2 className="text-2xl md:text-3xl font-display text-chalk flex items-center gap-3">
                        {term.term}
                        {term.sameAs && (
                          <a
                            href={term.sameAs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-iron-grey hover:text-brushed-bronze transition-colors"
                            aria-label={`Learn more about ${term.term} on Wikipedia`}
                          >
                            [Wiki]
                          </a>
                        )}
                      </h2>
                    </dt>

                    <dd className="ml-0">
                      <p className="text-chalk/80 leading-relaxed mb-4">
                        {term.definition}
                      </p>

                      {term.relatedTerms.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-iron-grey">Related:</span>
                          {term.relatedTerms.map(relatedSlug => {
                            const relatedTerm = getTermBySlug(relatedSlug);
                            if (!relatedTerm) return null;
                            return (
                              <a
                                key={relatedSlug}
                                href={`#${relatedSlug}`}
                                className="text-sm text-brushed-bronze hover:text-ember-orange transition-colors underline underline-offset-2"
                              >
                                {relatedTerm.term}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <section className="py-24 bg-hammered-steel border-y border-brushed-bronze/20 relative overflow-hidden" aria-label="Start a custom project">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6 text-balance">
            Ready to Apply These Techniques?
          </h2>
          <p className="text-iron-grey mb-10 max-w-2xl mx-auto">
            Every term in this glossary represents a capability I bring to your project. From hot-forged scrollwork to precision TIG welding, let's discuss how traditional metalworking can transform your architectural vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex h-14 items-center justify-center rounded-sm border border-brushed-bronze px-8 text-base font-medium text-brushed-bronze transition-all hover:bg-brushed-bronze hover:text-forge-black"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-14 items-center justify-center rounded-sm bg-brushed-bronze px-8 text-base font-medium text-forge-black transition-all hover:bg-ember-orange hover:shadow-[0_4px_24px_-4px_rgba(226,106,31,0.5)] group"
            >
              Contact the Forge
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
