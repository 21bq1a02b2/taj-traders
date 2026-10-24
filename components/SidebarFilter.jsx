import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'Hair Care',
  'Hair Color & Treatment',
  'Makeup',
  'Salon Furniture',
  'Skin Care',
  'Waxing',
  'Professional Equipment',
  'Barber Supplies',
];

export default function SidebarFilter({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly,
  wholesaleOnly,
  setWholesaleOnly,
  onClearAll,
}) {
  const [localMin, setLocalMin] = useState(minPrice || '');
  const [localMax, setLocalMax] = useState(maxPrice || '');

  const handleApplyPrice = (e) => {
    e.preventDefault();
    setMinPrice(localMin ? Number(localMin) : '');
    setMaxPrice(localMax ? Number(localMax) : '');
  };

  return (
    <div className="sticky top-32 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <form onSubmit={handleApplyPrice} className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
          <button
            type="button"
            onClick={() => {
              setLocalMin('');
              setLocalMax('');
              onClearAll();
            }}
            className="ml-auto text-xs font-medium text-slate-400 hover:text-slate-600"
          >
            Clear all
          </button>
        </div>

        {/* Sort by */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="sort">
            Sort by
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className="input-base mt-1"
          >
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory === 'All' ? '' : selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value || 'All')}
            className="input-base mt-1"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">Price range (₹)</legend>
          <div className="flex items-center gap-2">
            <input
              className="input-base"
              type="number"
              min="0"
              placeholder="120"
              aria-label="Minimum price"
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
            />
            <span className="text-slate-400">–</span>
            <input
              className="input-base"
              type="number"
              min="0"
              placeholder="68500"
              aria-label="Maximum price"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-2 text-xs font-medium text-brand-700 hover:text-brand-800"
          >
            Apply price range
          </button>
        </fieldset>

        {/* Availability Checkboxes */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">Availability</legend>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
              />
              In stock only
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 select-none">
              <input
                type="checkbox"
                checked={wholesaleOnly}
                onChange={(e) => setWholesaleOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
              />
              Wholesale pricing available
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
