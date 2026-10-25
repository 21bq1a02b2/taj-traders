import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MessageCircle, ArrowRight, ShieldCheck, Truck,
  Sparkles, Package, Star, ChevronRight, Loader2,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api';
import { seedProducts as fallbackProducts } from '../fallbackProducts';

const CATEGORIES = [
  {
    name: 'Hair Care',
    count: '12 products',
    image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912072/shree-gopi-traders/products/v5/professional-standing-hair-steamer-hood-dryer-machine-front-1786912072310.png',
    color: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Hair Color & Treatment',
    count: '9 products',
    image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786976277/shree-gopi-traders/products/v5/violet-anti-brass-dust-free-bleaching-powder-500g-front-1786976277091.jpg',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Makeup',
    count: '9 products',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Salon Furniture',
    count: '9 products',
    image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912064/shree-gopi-traders/products/v5/professional-glass-top-manicure-table-desk-dust-collector-front-1786912062998.png',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    name: 'Skin Care',
    count: '11 products',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    color: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Waxing',
    count: '8 products',
    image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912035/shree-gopi-traders/products/v5/black-charcoal-detox-stripless-hard-wax-beans-1kg-front-1786912035450.png',
    color: 'from-yellow-500 to-amber-600',
  },
  {
    name: 'Professional Equipment',
    count: '13 products',
    image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912079/shree-gopi-traders/products/v5/2-in-1-facial-ozone-steamer-magnifying-lamp-combo-station-front-1786912079553.jpg',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Barber Supplies',
    count: '13 products',
    image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912095/shree-gopi-traders/products/v5/professional-barber-continuous-spray-bottle-neck-duster-set-front-1786912095224.png',
    color: 'from-slate-600 to-slate-800',
  },
];

const TRUST_BADGES = [
  { icon: Truck, label: 'Pan India Delivery', sub: 'Doorstep courier to all states' },
  { icon: ShieldCheck, label: 'GST Invoicing', sub: 'Claim input tax credit' },
  { icon: Package, label: 'Wholesale Pricing', sub: 'Bulk slab discounts on 3+ units' },
  { icon: Star, label: '4.8★ Rated', sub: '166+ salon businesses served' },
];

export default function HomePage({ onAddToCart, onOpenQuickView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts({ limit: 100 })
      .then((res) => {
        const list = res.data || res.products || res;
        // Show backend products (includes admin-added); fall back to static list
        setProducts(Array.isArray(list) && list.length > 0 ? list : fallbackProducts);
      })
      .catch(() => setProducts(fallbackProducts))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(searchTerm.trim()
      ? `/products?search=${encodeURIComponent(searchTerm.trim())}`
      : '/products'
    );
  };

  return (
    <div className="flex-1 bg-white">

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-brand-800 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8 sm:py-16 lg:py-24">
          {/* Badge */}
          <div className="flex justify-center mb-3 sm:mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Taj Traders — Salon &amp; Parlour Wholesale
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.15]">
            Your One-Stop
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-purple-300 to-pink-300">
              Salon &amp; Beauty Supply Partner
            </span>
          </h1>

          <p className="mt-3 sm:mt-5 text-center text-xs sm:text-base text-brand-200 max-w-2xl mx-auto leading-relaxed px-1">
            Professional salon, parlour, beauty and spa supplies for businesses of every size.
            Order at wholesale rates, pay cash on delivery, and restock without hassle.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition-all active:scale-95"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/919966335074?text=Hello%20Taj%20Traders%2C%20I'd%20like%20to%20enquire%20about%20salon%20supplies."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="flex overflow-hidden rounded-xl border border-white/20 bg-white shadow-xl"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search shampoo, chairs, wax…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-700 px-4 text-xs sm:text-sm font-semibold text-white hover:bg-brand-800 transition-colors shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto border border-white/10">
            {[
              { value: '84+', label: 'Products' },
              { value: '8', label: 'Categories' },
              { value: '166+', label: 'Businesses' },
              { value: 'COD', label: 'Payment' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-3 sm:py-4 px-2 sm:px-3 bg-white/5 backdrop-blur-sm">
                <p className="text-lg sm:text-2xl font-bold text-white">{value}</p>
                <p className="text-[9px] sm:text-xs font-medium text-brand-300 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-6 sm:py-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-700" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Grid ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-10 sm:py-14">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Browse by Category</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Explore Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 shrink-0"
          >
            <span className="hidden sm:inline">View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Cards — 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>
              {/* Label */}
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-10 sm:py-14">
        <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Bestsellers</p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Popular in Salons This Week
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 shrink-0"
            >
              <span className="hidden sm:inline">Full Catalog</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Products Grid — 2 cols mobile, 3 tablet, 4 desktop */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white animate-pulse">
                  <div className="aspect-[4/3] bg-slate-200 rounded-t-xl sm:rounded-t-2xl" />
                  <div className="p-3 sm:p-4 space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-1/3" />
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="h-8 bg-slate-100 rounded mt-3" />
                  </div>
                </div>
              ))
            ) : (
              products.slice(0, 8).map((product, idx) => (
                <ProductCard
                  key={product._id || product.id || product.slug || `home-prod-${idx}`}
                  product={product}
                  onAddToCart={onAddToCart}
                  onOpenQuickView={onOpenQuickView}
                />
              ))
            )}
          </div>

          {/* View more CTA */}
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-300 bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors shadow-sm"
            >
              View All {products.length > 8 ? products.length : '84+'} Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Offers Banner ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8 sm:py-10">
        <Link
          to="/offers"
          className="group relative flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-indigo-900 p-6 sm:p-8 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none" />

          <div className="relative text-center sm:text-left">
            <span className="inline-block rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-bold text-amber-300 border border-amber-400/30 mb-3">
              🔥 Limited Time
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Up to 50% OFF on Salon Supplies
            </h2>
            <p className="mt-1.5 text-sm text-brand-200 max-w-sm">
              Barber kits, hair colors, wax machines and more — wholesale deals on top brands.
            </p>
          </div>

          <div className="relative shrink-0">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-800 shadow-md group-hover:bg-brand-50 transition-colors">
              View All Offers
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* ── Why Taj Traders ───────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-10 sm:py-14">
        <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Why Choose Taj Traders?</h2>
            <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
              Trusted by 166+ salons, parlours, and beauty studios across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: Package,
                title: 'Wholesale Tier Slabs',
                body: 'Order single units at retail rates or get automatic discounts when buying 3+ or 5+ units.',
              },
              {
                icon: Truck,
                title: 'Pan India Delivery',
                body: 'Doorstep courier dispatch to salons, parlours, and beauty studios across India with Cash on Delivery.',
              },
              {
                icon: ShieldCheck,
                title: 'GST Input Tax Credit',
                body: 'Official GST invoices issued for all wholesale orders so you can claim salon business tax credits.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-slate-200 p-5 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 mb-4">
                  <Icon className="h-6 w-6 text-brand-700" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA Strip ────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-8 sm:py-10">
        <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            Need Help Placing a Bulk Order?
          </h2>
          <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">
            Chat directly with us on WhatsApp for custom quotes, product availability and doorstep delivery.
          </p>
          <a
            href="https://wa.me/919966335074?text=Hello%20Taj%20Traders%2C%20I%27d%20like%20to%20place%20a%20bulk%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba58] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-200 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
