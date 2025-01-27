// FilterBar.tsx - Enhanced filtering component for the gallery
import { useState } from 'react';
import { categories, materials } from '@/data/gallery-items';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';

// Define types for our filters
interface Filters {
  category: string;
  priceRange: [number, number];
  material: string;
  searchQuery: string;
  sortBy: 'newest' | 'price-low' | 'price-high';
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  // Local state for price range slider
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  // Handler for price range changes
  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    onFilterChange({ ...filters, priceRange: value });
  };

  return (
    <div className="border-b border-border bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search input */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search artworks..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onFilterChange({ ...filters, category })}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filters.category === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="mt-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Material</label>
            <Select
              value={filters.material}
              onValueChange={(value) => onFilterChange({ ...filters, material: value })}
            >
              <option value="">All Materials</option>
              {materials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </Select>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: Filters['sortBy']) => 
                onFilterChange({ ...filters, sortBy: value })}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}