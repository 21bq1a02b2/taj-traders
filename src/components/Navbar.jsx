import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, Search, User, ShoppingCart, ChevronDown, X, LogOut, Settings,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Hair Care' },
  { name: 'Hair Color & Treatment' },
  { name: 'Makeup' },
  { name: 'Salon Furniture' },
  { name: 'Skin Care' },
  { name: 'Waxing' },
  { name: 'Professional Equipment' },
  { name: 'Barber Supplies' },
];

export default function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
  user,
  onSignOut,
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  const handleCategorySelect = (catName) => {
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
    navigate(`/products?category=${encodeURIComponent(catName)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Main Header Row */}
      <div className="container-page flex h-[72px] items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white shadow-sm">
            TT
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">Taj Traders</span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Salon &amp; Parlour Supplies
            </span>
          </span>
        </Link>

        {/* Center Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative mx-auto hidden max-w-xl flex-1 lg:flex">
          <input
            type="search"
            placeholder="Search products, brands, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-l-xl border border-r-0 border-slate-300 py-2 pl-4 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none"
          />
          <button
            type="submit"
            className="flex w-14 items-center justify-center rounded-r-xl bg-brand-700 text-white transition-colors hover:bg-brand-800"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Right Action Icons */}
        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          {/* WhatsApp */}
          <a
            href="https://wa.me/918919733026?text=Hello%20Taj%20Traders%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 xl:inline-flex"
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#25D366]">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.34C8.45 21.52 10.19 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.67 0-3.22-.49-4.52-1.33l-.32-.19-3.02.79.82-2.96-.21-.34C3.49 15.21 3 13.67 3 12c0-4.96 4.04-9 9-9s9 4.04 9 9-4.04 9-9 9z" />
            </svg>
            <span className="text-xs">WhatsApp</span>
          </a>

          {/* Sign In / User */}
          {user ? (
            <div className="relative group">
              <button className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200">
                <User className="h-4 w-4 text-brand-700" />
                <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 hidden group-hover:block">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 font-medium"
                  >
                    <Settings className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={onSignOut}
                  className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative inline-flex h-10 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden lg:inline">Cart</span>
            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                cartCount > 0 ? 'bg-brand-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="container-page pb-3 lg:hidden">
        <form onSubmit={handleSearchSubmit} className="flex w-full">
          <input
            type="search"
            placeholder="Search products, brands, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-l-xl border border-r-0 border-slate-300 py-2 pl-4 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none"
          />
          <button type="submit" className="flex w-12 items-center justify-center rounded-r-xl bg-brand-700 text-white">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Secondary Navigation Row — Desktop */}
      <nav className="hidden border-t border-slate-200 lg:block">
        <div className="container-page flex h-11 items-center gap-1">
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              <span>Categories</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {categoriesOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCategoriesOpen(false)} />
                <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50">
                  <Link
                    to="/categories"
                    onClick={() => setCategoriesOpen(false)}
                    className="block w-full rounded-lg px-3 py-2 text-sm text-brand-700 hover:bg-brand-50 font-semibold border-b border-slate-100 mb-1"
                  >
                    All Categories →
                  </Link>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleCategorySelect(c.name)}
                      className="w-full text-left rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 font-medium"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <span className="mx-2 h-5 w-px bg-slate-200" aria-hidden="true" />

          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Products' },
            { to: '/bulk-orders', label: 'Bulk Orders' },
            { to: '/categories', label: 'New Arrivals' },
            { to: '/offers', label: 'Offers' },
            { to: '/about', label: 'About Us' },
            { to: '/contact', label: 'Contact Us' },
          ].map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(to)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white pb-4 lg:hidden">
          <div className="container-page space-y-1 pt-3">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' },
              { to: '/categories', label: 'Categories' },
              { to: '/offers', label: 'Offers' },
              { to: '/bulk-orders', label: 'Bulk Orders' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact Us' },
              { to: '/login', label: 'Sign In' },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
              >
                {label}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => { onSignOut(); setMobileMenuOpen(false); }}
                className="block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Sign Out ({user.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
