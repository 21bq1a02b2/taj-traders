import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, Flame, Clock, ShieldCheck, ArrowRight, Percent, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api';
import { seedProducts as fallbackProducts } from '../fallbackProducts';

export default function OffersPage({ onAddToCart, onOpenQuickView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'mega', 'high'

  useEffect(() => {
    fetchProducts({ limit: 100 })
      .then((res) => {
        const list = res.data || res.products || res;
        setProducts(Array.isArray(list) && list.length ? list : fallbackProducts);
      })
      .catch(() => {
        setProducts(fallbackProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute discount for each product
  const discountedProducts = products
    .map((p) => {
      const disc =
        p.discount ||
        (p.mrp && p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0);
      return { ...p, calculatedDiscount: disc };
    })
    .filter((p) => p.calculatedDiscount > 0)
    .sort((a, b) => b.calculatedDiscount - a.calculatedDiscount);

  const filteredDeals = discountedProducts.filter((p) => {
    if (activeTab === 'mega') return p.calculatedDiscount >= 40;
    if (activeTab === 'high') return p.calculatedDiscount >= 30 && p.calculatedDiscount < 40;
    return true;
  });

  return (
    <div className="flex-1 bg-slate-50 pb-16">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 py-12 text-white sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="container-page relative z-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-1 text-xs font-bold text-amber-300 ring-1 ring-inset ring-amber-400/40 backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              Special Wholesale & Retail Deals
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Exclusive Salon Offers & Deals
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-brand-200 sm:text-base">
              Get up to 50% OFF on professional salon furniture, styling equipment, hair treatments, and beauty supplies.
              Wholesale pricing with nationwide door delivery.
            </p>

            {/* Quick Coupons Bar */}
            <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
                  <Percent className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">UP TO 50% OFF</div>
                  <div className="text-xs text-brand-200">On Barber Supplies & Kits</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                  <Tag className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300">BULK DISCOUNTS</div>
                  <div className="text-xs text-brand-200">Extra savings on 3+ units</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-400/20 text-purple-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider text-purple-300">PAN INDIA SHIPPING</div>
                  <div className="text-xs text-brand-200">Fast delivery with COD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Offer Filter Pills ─── */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Discounted Items', count: discountedProducts.length },
              {
                id: 'mega',
                label: 'Mega Deals (40%+ OFF)',
                count: discountedProducts.filter((p) => p.calculatedDiscount >= 40).length,
              },
              {
                id: 'high',
                label: 'Special Offers (30% - 40%)',
                count: discountedProducts.filter(
                  (p) => p.calculatedDiscount >= 30 && p.calculatedDiscount < 40
                ).length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            View Full Catalog
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ─── Offers Product Grid ─── */}
      <div className="container-page mt-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Featured Discounted Products
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Showing {filteredDeals.length} active deals on professional parlour & salon goods
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-700 border-t-transparent" />
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-700">No offers in this category</p>
            <p className="mt-1 text-xs text-slate-500">Check back soon for fresh deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredDeals.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenQuickView={onOpenQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
