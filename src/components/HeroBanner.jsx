import React from 'react';
import { Search } from 'lucide-react';

const CATEGORIES = [
  { slug: 'all', name: 'All' },
  { slug: 'hair-care', name: 'Hair Care' },
  { slug: 'hair-color-treatment', name: 'Hair Color & Treatment' },
  { slug: 'makeup', name: 'Makeup' },
  { slug: 'salon-furniture', name: 'Salon Furniture' },
  { slug: 'skin-care', name: 'Skin Care' },
  { slug: 'waxing', name: 'Waxing' },
  { slug: 'professional-equipment', name: 'Professional Equipment' },
  { slug: 'barber-supplies', name: 'Barber Supplies' },
];

export default function HeroBanner({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  onSelectCategory,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="border-b border-slate-200 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
      <div className="container-page py-4 sm:py-8">
        <h1 className="mb-0.5 text-xl font-bold text-white sm:text-3xl">All Products</h1>
        <p className="mb-3 text-xs text-brand-200 sm:text-sm">
          Professional salon and parlour supplies at wholesale rates.
        </p>

        {/* Big Search Form */}
        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl overflow-hidden rounded-xl shadow-lg">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:left-4 sm:h-5 sm:w-5" />
            <input
              type="search"
              placeholder="Search products, brands…"
              aria-label="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full border-0 bg-white pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:h-12 sm:pl-11 sm:text-sm"
            />
          </div>

          <select
            value={selectedCategory === 'All' ? '' : selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value || 'All')}
            aria-label="Search within category"
            className="hidden border-0 border-l border-slate-200 bg-white py-0 pl-3 pr-8 text-sm text-slate-600 focus:outline-none focus:ring-0 sm:block"
          >
            <option value="">All Categories</option>
            {CATEGORIES.slice(1).map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="flex w-11 items-center justify-center bg-brand-500 text-white transition-colors hover:bg-brand-400 shrink-0 sm:w-16"
            aria-label="Search"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </form>

        {/* Category Filter Pills - Horizontally scrollable on mobile */}
        <div className="mt-3 -mx-4 px-4 flex gap-1.5 overflow-x-auto no-scrollbar sm:mx-0 sm:px-0 sm:flex-wrap sm:gap-2">
          {CATEGORIES.map((c) => {
            const isSelected =
              (c.name === 'All' && selectedCategory === 'All') ||
              selectedCategory === c.name;

            return (
              <button
                key={c.slug}
                onClick={() => onSelectCategory(c.name)}
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
                  isSelected
                    ? 'bg-white text-brand-800 shadow-sm font-semibold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
