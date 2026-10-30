import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Phone,
  MessageCircle,
  Truck,
  Banknote,
  ChevronDown,
  Layers,
  Tag,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Plus,
  LogOut,
  X,
} from 'lucide-react';
import ProductCard from './ProductCard';

export default function StoreLandingPage({
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
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  inStockOnly,
  setInStockOnly,
  wholesaleOnly,
  setWholesaleOnly,
  cartCount,
  onOpenCart,
  onOpenAdminPortal,
  currentUser,
  onLogout,
  onNavigateToLogin,
  onNavigateToRegister,
  onAddToCart,
  onOpenQuickView,
  wishlist,
  onToggleWishlist,
  onDeleteProduct,
  loading,
}) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandSearch, setBrandSearch] = useState('');

  // Local state for sidebar price inputs before applying
  const [tempMin, setTempMin] = useState(priceMin || 120);
  const [tempMax, setTempMax] = useState(priceMax || 68500);

  // Exact brands from reference website
  const ALL_BRANDS = [
    'RICA PROFESSIONAL',
    'SALON PRO SERIES',
    'PRO-GENESIS SALON SOLUTIONS',
    'PROFESSIONAL SERIES',
    'Andis Professional',
    'Architectural Salon Systems',
    'Ayurveda Botanica Series',
    'BaBylissPRO',
    'Barber Pro Series',
    'Cheryl\'s Cosmeceuticals',
    'Generic Professional',
    'Grandeur Salon Equipment',
    'L\'Oréal Professional Line',
    'O3+ Pro Care',
    'Streax Professional',
    'GlowAura Professional',
    'AquaDerm',
    'DermaShield Pro',
    'Bombay Grooming Co.',
    'Wahl Barber Pro',
  ];

  const handleApplyPrice = (e) => {
    e.preventDefault();
    setPriceMin(Number(tempMin));
    setPriceMax(Number(tempMax));
  };

  const filteredBrands = ALL_BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  // Pagination calculations (12 per page)
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. TOP PURPLE BAR (Matches Reference Screenshot) */}
      <div className="bg-[#581c87] text-white text-xs py-2 px-4 border-b border-purple-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left Values */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <ShoppingBag className="w-3.5 h-3.5 text-purple-200" />
              <span>Wholesale & Bulk Orders</span>
            </span>
            <span className="text-purple-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-purple-200" />
              <span>Pan India Delivery</span>
            </span>
            <span className="text-purple-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Banknote className="w-3.5 h-3.5 text-purple-200" />
              <span>Cash on Delivery</span>
            </span>
          </div>

          {/* Right Phone & WhatsApp */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:+918919733026"
              className="flex items-center gap-1 text-purple-100 hover:text-white font-medium"
            >
              <Phone className="w-3 h-3 text-purple-300" />
              <span>+91 89197 33026</span>
            </a>
            <span className="text-purple-300">|</span>
            <a
              href="https://wa.me/918919733026?text=Hello%20Taj%20Traders,%20I%20have%20an%20inquiry%20regarding%20wholesale%20supplies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Search with Dropdown, WhatsApp, Sign In, Cart) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            {/* Logo: Taj Traders with Violet Badge */}
            <div
              onClick={() => {
                onSelectCategory('All');
                setSelectedBrand('All');
                setSearchTerm('');
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6b21a8] text-white flex items-center justify-center font-black text-lg shadow-sm">
                TJ
              </div>
              <div>
                <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 uppercase leading-none">
                  Taj Traders
                </h1>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">
                  SALON & PARLOUR SUPPLIES
                </p>
              </div>
            </div>

            {/* Combined Search Bar with Category Select & Purple Button */}
            <div className="flex-1 max-w-2xl mx-2 hidden md:block">
              <div className="flex items-center border border-slate-300 hover:border-purple-400 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-100 rounded-lg overflow-hidden bg-white transition-all">
                {/* Search icon & input */}
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2.5 text-xs text-slate-800 bg-transparent outline-none font-medium"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-slate-400 hover:text-slate-600 mr-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Dropdown Inside Search Bar */}
                <div className="border-l border-slate-200 px-3 bg-slate-50/50">
                  <select
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer py-2 pr-1"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Solid Purple Search Button */}
                <button
                  onClick={() => {}}
                  className="bg-[#6b21a8] hover:bg-[#581c87] text-white px-5 py-3 transition-colors flex items-center justify-center shrink-0"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Buttons: WhatsApp, Sign In, Cart */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918919733026?text=Hello%20Taj%20Traders"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                <span>WhatsApp</span>
              </a>

              {/* User Account / Sign In */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                  >
                    <User className="w-4 h-4 text-[#6b21a8]" />
                    <span className="max-w-[80px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenAdminPortal();
                          }}
                          className="w-full text-left px-4 py-2 font-bold text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Admin (+ Add Products)</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onNavigateToLogin}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                >
                  <User className="w-4 h-4 text-[#6b21a8]" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition-colors"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-slate-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#6b21a8] text-white text-[10px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
                <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.2 rounded font-mono">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="mt-3 md:hidden">
            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-3 text-xs text-slate-800 outline-none"
              />
              <button
                className="bg-[#6b21a8] text-white p-2.5"
                title="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. SECONDARY NAV BAR (Categories Dropdown, Home, Products, Bulk Orders, etc.) */}
        <div className="border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-semibold text-slate-700 overflow-x-auto">
            <div className="flex items-center gap-1 sm:gap-4 py-2">
              {/* Categories Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-purple-50 text-slate-900 font-bold"
                >
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <button
                      onClick={() => {
                        onSelectCategory('All');
                        setCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50 font-bold text-xs text-slate-800"
                    >
                      All Categories
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          onSelectCategory(c.name);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-purple-50 text-xs ${
                          selectedCategory === c.name ? 'text-[#6b21a8] font-bold bg-purple-50' : 'text-slate-700'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation links matching reference site */}
              <button
                onClick={() => {
                  onSelectCategory('All');
                  setSelectedBrand('All');
                }}
                className="px-2.5 py-1.5 rounded-md hover:text-[#6b21a8]"
              >
                Home
              </button>

              <button
                onClick={() => onSelectCategory('All')}
                className="px-2.5 py-1.5 rounded-md text-[#6b21a8] font-bold border-b-2 border-[#6b21a8]"
              >
                Products
              </button>

              <button
                onClick={() => setWholesaleOnly(true)}
                className="px-2.5 py-1.5 rounded-md hover:text-[#6b21a8]"
              >
                Bulk Orders
              </button>

              <button
                onClick={() => setSortBy('featured')}
                className="px-2.5 py-1.5 rounded-md hover:text-[#6b21a8]"
              >
                New Arrivals
              </button>

              <button
                onClick={() => setWholesaleOnly(true)}
                className="px-2.5 py-1.5 rounded-md hover:text-[#6b21a8]"
              >
                Offers
              </button>

              <a
                href="#about"
                className="px-2.5 py-1.5 rounded-md hover:text-[#6b21a8] hidden sm:inline"
              >
                About Us
              </a>

              <a
                href="#contact"
                className="px-2.5 py-1.5 rounded-md hover:text-[#6b21a8] hidden sm:inline"
              >
                Contact Us
              </a>
            </div>

            {/* Admin Portal Shortcut if Admin */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={onOpenAdminPortal}
                className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-md text-[11px] font-extrabold hover:bg-purple-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 4. MAIN BODY CONTAINER: Left Sidebar Filters + Right Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR (Width: 3 Cols) */}
          <aside className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-5">
            {/* 1. Price range (₹) */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs text-slate-800">Price range (₹)</h3>
              <form onSubmit={handleApplyPrice} className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="number"
                    value={tempMin}
                    onChange={(e) => setTempMin(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-semibold outline-none focus:border-purple-600"
                    placeholder="120"
                  />
                  <span className="text-slate-400 font-bold">—</span>
                  <input
                    type="number"
                    value={tempMax}
                    onChange={(e) => setTempMax(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-semibold outline-none focus:border-purple-600"
                    placeholder="68500"
                  />
                </div>
                <button
                  type="submit"
                  className="text-[11px] font-bold text-[#6b21a8] hover:underline"
                >
                  Apply price range
                </button>
              </form>
            </div>

            <div className="border-t border-slate-100" />

            {/* 2. Availability */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs text-slate-800">Availability</h3>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#6b21a8] focus:ring-purple-500 w-3.5 h-3.5"
                  />
                  <span>In stock only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={wholesaleOnly}
                    onChange={(e) => setWholesaleOnly(e.target.checked)}
                    className="rounded text-[#6b21a8] focus:ring-purple-500 w-3.5 h-3.5"
                  />
                  <span>Wholesale pricing available</span>
                </label>
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* 3. Brand Filters with Scrollable List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-slate-800">Brand</h3>
                {selectedBrand !== 'All' && (
                  <button
                    onClick={() => setSelectedBrand('All')}
                    className="text-[10px] text-purple-700 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Brand search filter */}
              <input
                type="text"
                placeholder="Search brand..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded mb-1 outline-none"
              />

              <div className="max-h-48 overflow-y-auto space-y-1 text-xs pr-1 scrollbar-thin">
                <label className="flex items-center gap-2 cursor-pointer select-none py-0.5 text-slate-700 hover:text-slate-900">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === 'All'}
                    onChange={() => setSelectedBrand('All')}
                    className="text-[#6b21a8] focus:ring-purple-500 w-3.5 h-3.5"
                  />
                  <span className="font-medium">All Brands</span>
                </label>

                {filteredBrands.map((b) => (
                  <label
                    key={b}
                    className="flex items-center gap-2 cursor-pointer select-none py-0.5 text-slate-700 hover:text-slate-900"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="text-[#6b21a8] focus:ring-purple-500 w-3.5 h-3.5"
                    />
                    <span className="truncate">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply Filters Purple Button */}
            <button
              onClick={() => {
                handleApplyPrice(new Event('submit'));
              }}
              className="w-full py-2.5 bg-[#6b21a8] hover:bg-[#581c87] active:scale-98 text-white font-bold rounded-lg text-xs shadow-xs transition-all text-center"
            >
              Apply Filters
            </button>
          </aside>

          {/* RIGHT PRODUCTS GRID (Width: 9 Cols) */}
          <main className="lg:col-span-9 space-y-5">
            {/* Active category / brand indication & Sort dropdown */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-1">
              <p>
                Showing{' '}
                <strong className="text-slate-900">
                  {displayedProducts.length} of {products.length}
                </strong>{' '}
                cosmetic products
                {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                {selectedBrand !== 'All' && ` for "${selectedBrand}"`}
              </p>

              <div className="flex items-center gap-2">
                <span className="font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="py-24 text-center text-slate-400">
                <div className="w-8 h-8 border-3 border-[#6b21a8] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs font-semibold">Loading Taj Traders cosmetics...</p>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <p className="font-bold text-slate-800">No products match your filter criteria.</p>
                <button
                  onClick={() => {
                    onSelectCategory('All');
                    setSelectedBrand('All');
                    setSearchTerm('');
                    setPriceMin(0);
                    setPriceMax(100000);
                    setWholesaleOnly(false);
                    setInStockOnly(false);
                  }}
                  className="px-4 py-2 bg-[#6b21a8] text-white text-xs font-bold rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedProducts.map((prod) => (
                  <ProductCard
                    key={prod._id}
                    product={prod}
                    onAddToCart={(p) => onAddToCart(p, 1)}
                    onOpenQuickView={(p) => onOpenQuickView(p)}
                    isWishlisted={wishlist.includes(prod._id)}
                    onToggleWishlist={onToggleWishlist}
                    isAdmin={currentUser?.role === 'admin'}
                    onDeleteProduct={onDeleteProduct}
                  />
                ))}
              </div>
            )}

            {/* Bottom Pagination matching Reference Site */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-6 text-xs font-semibold text-slate-700">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#6b21a8] text-white'
                          : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Green WhatsApp Widget on Bottom Right */}
      <a
        href="https://wa.me/918919733026?text=Hello%20Taj%20Traders,%20I%20have%20an%20inquiry%20regarding%20salon%20supplies"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        title="Chat with Taj Traders on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
