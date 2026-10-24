import React from 'react';
import { Eye, Star } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onOpenQuickView,
}) {
  const discount =
    product.discount ||
    (product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Image Block with Aspect Ratio 4/3 */}
      <div
        onClick={() => onOpenQuickView(product)}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-50 cursor-pointer"
      >
        <img
          alt={product.name}
          src={product.image}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
          <span className="flex translate-y-2 items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </span>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute left-2.5 top-2.5 z-20 flex flex-col items-start gap-1">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset bg-red-50 text-red-700 ring-red-200 shadow-sm">
              {discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand */}
        <p className="truncate text-[10px] font-semibold uppercase tracking-widest text-brand-600">
          {product.brand}
        </p>

        {/* Title */}
        <h3
          onClick={() => onOpenQuickView(product)}
          className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 cursor-pointer hover:text-brand-700"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2">
          <div className="flex items-center gap-1">
            <div className="flex" aria-label="Rating">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5 text-amber-400"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"></path>
                </svg>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              {(product.rating || 4.8).toFixed(1)} ({product.reviewCount || 3})
            </span>
          </div>
        </div>

        {/* Price Row */}
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-base font-bold text-slate-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-slate-400 line-through">
              ₹{product.mrp.toLocaleString()}
            </span>
          )}
        </div>

        {/* MOQ */}
        <p className="mt-1 text-[11px] text-slate-500">
          {product.volumeOrWeight || `MOQ: ${product.moq || 1} piece`}
        </p>

        {/* In Stock Badge */}
        <div className="mt-2 min-h-5">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            In Stock
          </span>
        </div>

        {/* Bottom Buttons: View Details & Add to Cart */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onOpenQuickView(product)}
            className="inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 px-3 py-1.5 text-xs gap-1.5 flex-1"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 bg-brand-700 text-white hover:bg-brand-800 border border-transparent px-3 py-1.5 text-xs gap-1.5 flex-1 shadow-sm active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
