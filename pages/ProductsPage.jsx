import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import SidebarFilter from '../components/SidebarFilter';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import { fetchProducts } from '../api';

export default function ProductsPage({ onAddToCart, onOpenQuickView, searchTerm: globalSearch, setSearchTerm: setGlobalSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'All';
  const sortParam = searchParams.get('sort') || 'newest';
  const searchParam = searchParams.get('search') || globalSearch || '';
  const wholesaleParam = searchParams.get('wholesale') === '1';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wholesaleOnly, setWholesaleOnly] = useState(wholesaleParam);

  // Sync URL params into local state
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchTerm(globalSearch || '');
  }, [globalSearch]);

  // Fetch all products once
  useEffect(() => {
    setLoading(true);
    fetchProducts({})
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleClearAll = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSortBy('newest');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setWholesaleOnly(false);
    setSearchParams({});
    if (setGlobalSearch) setGlobalSearch('');
  };

  // Client-side filtering & sorting
  let filtered = [...products];

  if (selectedCategory && selectedCategory !== 'All') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.brand || '').toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }
  if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  if (inStockOnly) filtered = filtered.filter((p) => p.stock > 0 || p.inStock);
  if (wholesaleOnly) filtered = filtered.filter((p) => p.wholesaleTierPrice);

  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else if (sortBy === 'popular') filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));

  return (
    <div className="flex-1 bg-white">
      <HeroBanner
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      <div className="container-page py-8 sm:py-10">
        {/* Mobile Filter */}
        <div className="mb-6 lg:hidden">
          <details className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-slate-900">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters &amp; Sorting</span>
            </summary>
            <div className="mt-4">
              <SidebarFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                sortBy={sortBy}
                onSelectSort={setSortBy}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                wholesaleOnly={wholesaleOnly}
                setWholesaleOnly={setWholesaleOnly}
                onClearAll={handleClearAll}
              />
            </div>
          </details>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden w-64 shrink-0 lg:block">
            <SidebarFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              sortBy={sortBy}
              onSelectSort={setSortBy}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              wholesaleOnly={wholesaleOnly}
              setWholesaleOnly={setWholesaleOnly}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Showing{' '}
                <span className="font-semibold text-slate-800">{filtered.length}</span>{' '}
                of{' '}
                <span className="font-semibold text-slate-800">{products.length}</span> products
              </p>
              {(selectedCategory !== 'All' || searchTerm || minPrice || maxPrice || wholesaleOnly || inStockOnly) && (
                <button
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-800"
                >
                  Clear all
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-brand-700" />
                <p className="text-sm font-semibold">Loading Taj Traders products...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3 max-w-lg mx-auto my-8">
                <div className="w-16 h-16 bg-brand-50 text-brand-700 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Products Found</h3>
                <p className="text-xs text-slate-500">No products matched your filters.</p>
                <button
                  onClick={handleClearAll}
                  className="px-5 py-2 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                    onAddToCart={(p) => onAddToCart(p, 1)}
                    onOpenQuickView={onOpenQuickView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
