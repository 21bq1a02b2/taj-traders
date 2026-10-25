import React from 'react';
import { Eye } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onOpenQuickView }) {
  const discount =
    product.discount ||
    (product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">

      {/* ── Image ──────────────────────────────────────────────────────────── */}
      <div
        onClick={() => onOpenQuickView(product)}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          alt={product.name}
          src={product.image || product.imageUrl || ''}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // High-resolution commercial salon appliance fallback
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Quick View overlay — hidden on touch devices via pointer-fine */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
          <span className="flex translate-y-2 items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </span>
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute left-2 top-2 z-20">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-red-50 text-red-700 ring-1 ring-red-200 shadow-sm">
              {discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* ── Card Body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Brand */}
        <p className="truncate text-[10px] sm:text-[10px] font-semibold uppercase tracking-widest text-brand-600">
          {product.brand}
        </p>

        {/* Name */}
        <h3
          onClick={() => onOpenQuickView(product)}
          className="mt-1 line-clamp-2 text-xs sm:text-sm font-semibold leading-snug text-slate-900 cursor-pointer hover:text-brand-700"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Stars / Ratings — visible on mobile and desktop */}
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="h-3 w-3 sm:h-3 sm:w-3 text-amber-400" fill="currentColor">
                <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] sm:text-[10px] font-medium text-slate-500">
            {(product.rating || 4.8).toFixed(1)} ({product.reviewCount || 3})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-sm sm:text-base font-bold text-slate-900">
            ₹{(product.price || 0).toLocaleString('en-IN')}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-[10px] sm:text-xs text-slate-400 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* MOQ — hidden on xs */}
        <p className="mt-0.5 hidden sm:block text-[10px] text-slate-500">
          {product.volumeOrWeight || `MOQ: ${product.moq || 1} piece`}
        </p>

        {/* In Stock badge */}
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            In Stock
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex gap-1.5 sm:gap-2">
          <button
            onClick={() => onOpenQuickView(product)}
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[10px] sm:text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-brand-700 px-2 py-1.5 text-[10px] sm:text-xs font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
