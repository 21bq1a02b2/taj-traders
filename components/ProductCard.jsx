import React from 'react';
import { Star, ShoppingBag, Eye, Trash2 } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onOpenQuickView,
  isWishlisted,
  onToggleWishlist,
  isAdmin,
  onDeleteProduct,
}) {
  const discount =
    product.discountPercentage ||
    (product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0);

  const moqText = product.moq || (product.minWholesaleQty ? `MOQ: ${product.minWholesaleQty} pieces` : 'MOQ: 1 piece');

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {discount > 0 && (
          <span className="bg-rose-100 text-rose-700 text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
            {discount}% OFF
          </span>
        )}
        {product.wholesaleTierPrice && (
          <span className="bg-purple-100 text-purple-700 border border-purple-200 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
            Wholesale
          </span>
        )}
      </div>

      {/* Admin Quick Delete Action on Top Right */}
      {isAdmin && onDeleteProduct && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteProduct(product);
          }}
          className="absolute top-2.5 right-2.5 z-20 px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold shadow-md transition-all flex items-center gap-1 active:scale-95"
          title="Delete Product from Taj Traders"
        >
          <Trash2 className="w-3 h-3" />
          <span>Delete</span>
        </button>
      )}

      {/* Product Image Container with Quick View */}
      <div
        onClick={() => onOpenQuickView(product)}
        className="relative w-full aspect-square bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center p-3"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-full shadow-md hover:bg-purple-50 hover:text-purple-700 transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-purple-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1">
          {/* Brand Name in Purple Uppercase */}
          <p className="text-[#6b21a8] text-[11px] font-extrabold uppercase tracking-wide truncate">
            {product.brand || 'TAJ PROFESSIONAL'}
          </p>

          {/* Product Title */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 cursor-pointer leading-snug min-h-[36px]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 4.7)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700 ml-1">
              {product.rating || 4.7}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              ({product.reviewCount || 3})
            </span>
          </div>
        </div>

        {/* Pricing & MOQ */}
        <div className="space-y-0.5 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-slate-900">
              ₹{Number(product.price).toLocaleString()}
            </span>
            {product.mrp && Number(product.mrp) > Number(product.price) && (
              <span className="text-xs text-slate-400 line-through">
                ₹{Number(product.mrp).toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 font-medium">{moqText}</p>
        </div>

        {/* Stock Status */}
        <div>
          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>In Stock</span>
          </span>
        </div>

        {/* Action Buttons: View Details & Add to Cart */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onOpenQuickView(product)}
            className="w-full py-2 px-2 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200 transition-all text-center"
          >
            View Details
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-2 px-2 bg-[#6b21a8] hover:bg-[#581c87] active:scale-95 text-white font-bold rounded-lg text-xs shadow-xs transition-all text-center flex items-center justify-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Bottom Full-Width Admin Delete Button */}
        {isAdmin && onDeleteProduct && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteProduct(product);
            }}
            className="w-full py-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Product</span>
          </button>
        )}
      </div>
    </div>
  );
}
