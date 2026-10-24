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
      <div className="container-page py-10 sm:py-12">
        <h1 className="mb-1 text-2xl font-bold text-white sm:text-3xl">All Products</h1>
        <p className="mb-6 text-sm text-brand-200">
          Professional salon and parlour supplies at wholesale rates.
        </p>

        {/* Big Search Form */}
        <form onSubmit={handleSubmit} className="flex max-w-2xl overflow-hidden rounded-xl shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search products, brands, categories…"
              aria-label="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 w-full border-0 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
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
            className="flex w-16 items-center justify-center bg-brand-500 text-white transition-colors hover:bg-brand-400"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Category Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const isSelected =
              (c.name === 'All' && selectedCategory === 'All') ||
              selectedCategory === c.name;

            return (
              <button
                key={c.slug}
                onClick={() => onSelectCategory(c.name)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-white text-brand-800 shadow-sm'
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
