import React from 'react';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  RotateCcw,
  Tag,
  ShieldCheck,
  Package,
  Layers,
  Star,
  User,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import CategoryFilterBar from './CategoryFilterBar';
import ProductCard from './ProductCard';

export default function UserDashboard({
  currentUser,
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  selectedBrand,
  setSelectedBrand,
  priceMax,
  setPriceMax,
  wholesaleOnly,
  setWholesaleOnly,
  uniqueBrands,
  showMobileFilters,
  setShowMobileFilters,
  onResetFilters,
  cartCount,
  wishlistCount,
  wishlist,
  onAddToCart,
  onOpenQuickView,
  onToggleWishlist,
  onOpenCart,
  loading,
}) {
  return (
    <div className="space-y-6">
      {/* 1. Customer Welcome Dashboard Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Customer Portal & Shopping Dashboard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Welcome back,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">
                {currentUser?.name || 'Valued Customer'}
              </span>
              ! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore Taj Traders' professional beauty catalog. Add products to your cart, enjoy automatic tiered wholesale discounts for parlour orders, and checkout seamlessly.
            </p>
          </div>

          {/* Quick Customer Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto shrink-0">
            <div
              onClick={onOpenCart}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center cursor-pointer transition-all active:scale-95"
            >
              <div className="flex items-center justify-center gap-1.5 text-rose-300 mb-1">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-bold">My Cart</span>
              </div>
              <p className="text-xl font-black text-white">{cartCount}</p>
              <p className="text-[10px] text-slate-400">items ready</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-pink-300 mb-1">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-bold">Wishlist</span>
              </div>
              <p className="text-xl font-black text-white">{wishlistCount}</p>
              <p className="text-[10px] text-slate-400">saved items</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-300 mb-1">
                <Tag className="w-4 h-4" />
                <span className="text-xs font-bold">Wholesale</span>
              </div>
              <p className="text-xl font-black text-emerald-300">Up to 40%</p>
              <p className="text-[10px] text-slate-400">tiered slabs</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold">Account</span>
              </div>
              <p className="text-sm font-extrabold text-amber-300 truncate">
                {currentUser?.role === 'admin' ? 'Admin' : 'Verified'}
              </p>
              <p className="text-[10px] text-slate-400">salon partner</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROMINENT CENTRAL SEARCH BAR ("and below searchbar add") */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
          <input
            type="text"
            placeholder="Search products by name, brand, active ingredients (e.g. Vitamin C, Keratin, Clippers, Facial Kits)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-11 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 rounded-2xl text-sm font-semibold border border-slate-200 focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills directly under Search Bar */}
        <CategoryFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          totalProductsCount={products.length}
        />
      </div>

      {/* 3. Filter Toolbar & Sorting */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 font-bold rounded-lg"
          >
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>

          {/* Brand Filter */}
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium outline-none focus:border-rose-400"
            >
              <option value="All">All Brands</option>
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Wholesale Filter Toggle */}
          <label className="hidden sm:flex items-center gap-2 cursor-pointer select-none bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg text-rose-900 font-bold">
            <input
              type="checkbox"
              checked={wholesaleOnly}
              onChange={(e) => setWholesaleOnly(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Wholesale Slabs Available</span>
          </label>

          {/* Price Max Slider */}
          <div className="hidden lg:flex items-center gap-2 text-slate-500 font-medium">
            <span>Under: ₹{priceMax}</span>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-24 accent-rose-600 cursor-pointer"
            />
          </div>

          {(selectedCategory !== 'All' ||
            selectedBrand !== 'All' ||
            searchTerm ||
            wholesaleOnly ||
            priceMax < 5000) && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-bold outline-none focus:border-rose-400"
          >
            <option value="featured">Featured & Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name_asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Collapse */}
      {showMobileFilters && (
        <div className="md:hidden bg-white p-4 rounded-2xl border border-slate-200 space-y-3 text-xs animate-in slide-in-from-top duration-200">
          <div>
            <label className="font-bold block mb-1">Filter by Brand:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="All">All Brands</option>
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold block mb-1">Max Price: ₹{priceMax}</label>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <label className="flex items-center gap-2 font-bold text-rose-700">
            <input
              type="checkbox"
              checked={wholesaleOnly}
              onChange={(e) => setWholesaleOnly(e.target.checked)}
              className="rounded text-rose-600"
            />
            Wholesale Tier Discounted Only
          </label>
        </div>
      )}

      {/* 4. Products Grid: View and Buy */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            {selectedCategory === 'All' ? 'All Beauty Products' : selectedCategory}{' '}
            <span className="text-xs font-normal text-slate-500">
              ({products.length} items available to buy)
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3 text-slate-400">
            <div className="w-8 h-8 border-3 border-rose-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold">Loading Taj Traders catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Matching Products Found</h3>
            <p className="text-xs text-slate-500">
              We couldn't find any cosmetics matching your search or filters.
            </p>
            <button
              onClick={onResetFilters}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={(p) => onAddToCart(p, 1)}
                onOpenQuickView={(p) => onOpenQuickView(p)}
                isWishlisted={wishlist.includes(product._id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
