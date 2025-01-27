// Import necessary dependencies and types
import { categories, categoryShowcases } from '@/data/gallery-items';
import { cn } from '@/lib/utils';

// Define props interface for type safety and documentation
interface CategoryFilterProps {
  /** Currently selected category */
  activeCategory: string;
  /** Callback function when category changes */
  onCategoryChange: (category: string) => void;
  /** Object containing count of items for each category */
  itemCount?: { [key: string]: number };
}

/**
 * CategoryFilter Component
 * 
 * A responsive filter component that displays available categories with item counts
 * and category descriptions. Features a sticky header with backdrop blur effect
 * and smooth hover animations.
 */
export function CategoryFilter({ 
  activeCategory, 
  onCategoryChange,
  itemCount = {} 
}: CategoryFilterProps) {
  return (
    // Sticky container with backdrop blur effect for better scroll experience
    <div className="border-b border-accent-secondary/20 bg-transparent sticky top-16 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category buttons container with improved responsive layout */}
        <div className="flex flex-wrap gap-5 mb-4">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            const itemCountText = itemCount[category] ? ` (${itemCount[category]})` : '';
            const showcase = categoryShowcases.find(showcase => showcase.category === category);

            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  // Enhanced base button styles with sophisticated metallic accents
                  "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                  "border hover:scale-105 transform",
                  // Improved hover and focus states
                  "focus:outline-none focus:ring-2 focus:ring-amber-500/50",
                  // Hot steel effect for active state with glowing gradients
                  isActive
                    ? "bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white border-transparent" +
                      " shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105" +
                      " animate-pulse-subtle"
                    : "bg-transparent hover:bg-accent-primary/5 text-text-body hover:text-text-primary" +
                      " border-accent-secondary/30 hover:border-amber-500/40"
                )}
              >
                <span className="relative z-10">{category}{itemCountText}</span>
              </button>
            );
          })}
        </div>

        {/* Enhanced category description section with fade-in animation and improved typography */}
        {activeCategory !== 'All' && (
          <div className="mt-6 pt-4 border-t border-accent-secondary/10">
            <div className="text-sm text-muted-foreground animate-fadeIn space-y-2">
              <h3 className="font-medium text-text-primary mb-1">{activeCategory} Collection</h3>
              <p className="leading-relaxed">
                {categoryShowcases.find(showcase => showcase.category === activeCategory)?.description || 
                 "Explore our craftsmanship in this category"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}