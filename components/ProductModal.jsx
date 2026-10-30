import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Check,
  Tag,
  Plus,
  Minus,
} from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');

  if (!product) return null;

  const discount =
    product.discount ||
    (product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0);

  const isWholesaleQualifying =
    product.wholesaleTierPrice && qty >= (product.minWholesaleQty || 3);
  const currentUnitPrice = isWholesaleQualifying
    ? product.wholesaleTierPrice
    : product.price;
  const totalPrice = currentUnitPrice * qty;

  const whatsappMessage = encodeURIComponent(
    `Hello Taj Traders, I would like to order ${qty} unit(s) of "${product.name}" (${product.brand}). Price: ₹${totalPrice}. Please confirm availability and delivery.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="p-6 md:p-8 bg-slate-50 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r border-slate-200">
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-white p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-red-50 text-red-700 ring-red-200 shadow-sm">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-brand-600" /> Pan-India Delivery
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Genuine
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-brand-50 text-brand-700 text-xs font-bold rounded uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-400">
                  {product.category} &bull; {product.volumeOrWeight || `MOQ: ${product.moq || 1} piece`}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-md text-amber-900 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{(product.rating || 4.8).toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({product.reviewCount || 3} reviews)
                  </span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock &amp; Ready to Dispatch
                </span>
              </div>

              {/* Price */}
              <div className="pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl md:text-3xl font-black text-slate-900">
                    ₹{currentUnitPrice.toLocaleString()}
                  </span>
                  {product.mrp && product.mrp > currentUnitPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      MRP ₹{product.mrp.toLocaleString()}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {product.wholesaleTierPrice && (
                  <div
                    className={`mt-2 p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                      isWholesaleQualifying
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-brand-50 border-brand-200 text-brand-900'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-brand-700 shrink-0" />
                      <span>
                        <strong>Wholesale Tier: ₹{product.wholesaleTierPrice}/unit</strong>{' '}
                        (Min {product.minWholesaleQty || 3} units)
                      </span>
                    </div>
                    {isWholesaleQualifying && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        APPLIED
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="text-xs md:text-sm text-slate-600 pt-1 leading-relaxed">
                {product.description}
              </p>

              {/* Tabs */}
              <div className="pt-2">
                <div className="flex border-b border-slate-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'benefits'
                        ? 'border-brand-700 text-brand-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Key Features
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'usage'
                        ? 'border-brand-700 text-brand-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Usage
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'specs'
                        ? 'border-brand-700 text-brand-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Specs &amp; Invoicing
                  </button>
                </div>

                <div className="pt-2 text-xs text-slate-600 min-h-[60px]">
                  {activeTab === 'benefits' && (
                    <ul className="list-disc list-inside space-y-1">
                      {product.benefits && product.benefits.length > 0 ? (
                        product.benefits.map((b, i) => <li key={i}>{b}</li>)
                      ) : (
                        <li>Commercial salon-grade durability and performance.</li>
                      )}
                    </ul>
                  )}

                  {activeTab === 'usage' && (
                    <p>{product.howToUse || 'Use as recommended for salon and professional treatments.'}</p>
                  )}

                  {activeTab === 'specs' && (
                    <p className="bg-slate-50 p-2 rounded border border-slate-200">
                      GST Invoicing available with HSN Code for salon input tax credit (ITC).
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Select Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="p-2 hover:bg-slate-100 text-slate-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-900">{qty}</span>
                  <button
                    onClick={() => setQty((prev) => prev + 1)}
                    className="p-2 hover:bg-slate-100 text-slate-600"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-sm shadow-md shadow-brand-200 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add {qty} to Cart (₹{totalPrice.toLocaleString()})
                </button>

                <a
                  href={`https://wa.me/918919733026?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
