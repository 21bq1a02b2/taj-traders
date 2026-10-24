import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import SidebarFilter from '../components/SidebarFilter';
import ProductCard from '../components/ProductCard';
import {
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { fetchProducts } from '../api';
import { seedProducts as fallbackProducts } from '../fallbackProducts';

export default function ProductsPage({
  onAddToCart,
  onOpenQuickView,
  searchTerm: globalSearch,
  setSearchTerm: setGlobalSearch,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const productsTopRef = useRef(null);

  // Read URL query params
  const categoryParam = searchParams.get('category') || 'All';
  const sortParam = searchParams.get('sort') || 'newest';
  const searchParam = searchParams.get('search') || globalSearch || '';
  const wholesaleParam = searchParams.get('wholesale') === '1';
  const pageParam = parseInt(searchParams.get('page'), 10) || 1;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wholesaleOnly, setWholesaleOnly] = useState(wholesaleParam);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [itemsPerPage, setItemsPerPage] = useState(12); // 12 items/page gives 6 full pages with 72 products

  // Sync URL params into local state
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchTerm(globalSearch || '');
  }, [globalSearch]);

  useEffect(() => {
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [pageParam]);

  // Fetch all products once with limit 500, with instant fallback
  useEffect(() => {
    setLoading(true);
    fetchProducts({ limit: 500 })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch((err) => {
        console.warn('API call failed, serving fallback products:', err.message);
        setProducts(fallbackProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  // Update query params helper
  const updateURL = (newCategory, newPage) => {
    const newParams = new URLSearchParams(searchParams);
    if (newCategory) {
      if (newCategory === 'All') {
        newParams.delete('category');
      } else {
        newParams.set('category', newCategory);
      }
    }
    if (newPage) {
      if (newPage === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', newPage.toString());
      }
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    newParams.delete('page');
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
    setCurrentPage(1);
    setSearchParams({});
    if (setGlobalSearch) setGlobalSearch('');
  };

  // Change page with smooth scroll
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    updateURL(null, newPage);
    if (productsTopRef.current) {
      productsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Client-side filtering & sorting
  let filtered = [...products];

  if (selectedCategory && selectedCategory !== 'All') {
    filtered = filtered.filter(
      (p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
    );
  }
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        (p.name || '').toLowerCase().includes(term) ||
        (p.brand || '').toLowerCase().includes(term) ||
        (p.category || '').toLowerCase().includes(term) ||
        (p.subcategory || '').toLowerCase().includes(term)
    );
  }
  if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  if (inStockOnly) filtered = filtered.filter((p) => (p.stock > 0 || p.inStock));
  if (wholesaleOnly) filtered = filtered.filter((p) => p.wholesaleTierPrice);

  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else if (sortBy === 'popular') filtered.sort((a, b) => (b.discount || b.discountPercentage || 0) - (a.discount || a.discountPercentage || 0));

  // Compute pagination values
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;

  // Auto-correct page if out of bounds after filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('page');
      setSearchParams(newParams);
    }
  }, [totalPages, currentPage, searchParams, setSearchParams]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filtered.length);
  const currentProducts = filtered.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first, last, and window around current page
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex-1 bg-white">
      {/* Hero Banner matching sreegopitraders.com/products */}
      <HeroBanner
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      <div ref={productsTopRef} className="container-page py-8 sm:py-10">
        {/* Mobile Filter Collapsible */}
        <div className="mb-6 lg:hidden">
          <details className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-slate-900">
              <SlidersHorizontal className="h-4 w-4 text-brand-700" />
              <span>Filters &amp; Sorting</span>
            </summary>
            <div className="mt-4">
              <SidebarFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                sortBy={sortBy}
                onSelectSort={(s) => { setSortBy(s); setCurrentPage(1); }}
                minPrice={minPrice}
                setMinPrice={(p) => { setMinPrice(p); setCurrentPage(1); }}
                maxPrice={maxPrice}
                setMaxPrice={(p) => { setMaxPrice(p); setCurrentPage(1); }}
                inStockOnly={inStockOnly}
                setInStockOnly={(v) => { setInStockOnly(v); setCurrentPage(1); }}
                wholesaleOnly={wholesaleOnly}
                setWholesaleOnly={(v) => { setWholesaleOnly(v); setCurrentPage(1); }}
                onClearAll={handleClearAll}
              />
            </div>
          </details>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filter */}
          <div className="hidden w-64 shrink-0 lg:block">
            <SidebarFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              sortBy={sortBy}
              onSelectSort={(s) => { setSortBy(s); setCurrentPage(1); }}
              minPrice={minPrice}
              setMinPrice={(p) => { setMinPrice(p); setCurrentPage(1); }}
              maxPrice={maxPrice}
              setMaxPrice={(p) => { setMaxPrice(p); setCurrentPage(1); }}
              inStockOnly={inStockOnly}
              setInStockOnly={(v) => { setInStockOnly(v); setCurrentPage(1); }}
              wholesaleOnly={wholesaleOnly}
              setWholesaleOnly={(v) => { setWholesaleOnly(v); setCurrentPage(1); }}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Top Toolbar: Showing count + Items Per Page Selector */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Showing{' '}
                  <span className="font-bold text-slate-900">
                    {filtered.length === 0 ? 0 : startIndex + 1}
                  </span>
                  –
                  <span className="font-bold text-slate-900">{endIndex}</span> of{' '}
                  <span className="font-bold text-slate-900">{filtered.length}</span> products
                  {totalPages > 1 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                      Page {currentPage} of {totalPages}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:border-brand-600 focus:outline-none"
                  >
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                    <option value={24}>24</option>
                  </select>
                </div>

                {(selectedCategory !== 'All' ||
                  searchTerm ||
                  minPrice ||
                  maxPrice ||
                  wholesaleOnly ||
                  inStockOnly) && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-2"
                  >
                    Reset all
                  </button>
                )}
              </div>
            </div>

            {/* Grid or Loader */}
            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-24 text-slate-400">
                <Loader2 className="h-9 w-9 animate-spin text-brand-700" />
                <p className="text-sm font-semibold text-slate-700">Loading Taj Traders products...</p>
                <p className="text-xs text-slate-400">Accessing salon wholesale inventory</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="mx-auto my-8 max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Products Found</h3>
                <p className="text-xs text-slate-500">
                  We couldn't find any products matching your selected filters or search terms.
                </p>
                <button
                  onClick={handleClearAll}
                  className="rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-800 active:scale-95"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* 4-column responsive grid matching sreegopitraders.com */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      onAddToCart={(p) => onAddToCart(p, 1)}
                      onOpenQuickView={onOpenQuickView}
                    />
                  ))}
                </div>

                {/* ================= PAGINATION CONTROLS ================= */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
                    {/* Left: summary info */}
                    <p className="text-xs text-slate-500">
                      Showing{' '}
                      <span className="font-semibold text-slate-800">{startIndex + 1}</span> to{' '}
                      <span className="font-semibold text-slate-800">{endIndex}</span> of{' '}
                      <span className="font-semibold text-slate-800">{filtered.length}</span> products
                    </p>

                    {/* Middle: Pagination Buttons (Previous, Numbers, Next) */}
                    <div className="flex items-center gap-1.5">
                      {/* First Page Button */}
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        title="First Page"
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-medium transition-colors ${
                          currentPage === 1
                            ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700'
                        }`}
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </button>

                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-xs font-medium transition-colors ${
                          currentPage === 1
                            ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700'
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </button>

                      {/* Numbered Page Buttons */}
                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((pageNum, idx) =>
                          pageNum === '...' ? (
                            <span
                              key={`ellipsis-${idx}`}
                              className="inline-flex h-9 w-8 items-center justify-center text-xs text-slate-400"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={`page-${pageNum}`}
                              onClick={() => handlePageChange(pageNum)}
                              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-xs font-semibold transition-all ${
                                currentPage === pageNum
                                  ? 'bg-brand-700 text-white shadow-sm ring-2 ring-brand-700/20'
                                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700'
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        )}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-xs font-medium transition-colors ${
                          currentPage === totalPages
                            ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700'
                        }`}
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {/* Last Page Button */}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        title="Last Page"
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-medium transition-colors ${
                          currentPage === totalPages
                            ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700'
                        }`}
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Right: quick jump hint */}
                    <div className="hidden text-xs text-slate-400 lg:block">
                      Showing {itemsPerPage} items / page
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
