import React from 'react';
import { Sparkles, Tag, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

export default function HeroBanner({ onExploreClick }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white py-12 md:py-16 mb-8 rounded-3xl shadow-xl max-w-7xl mx-auto px-6 lg:px-12 mt-4">
      {/* Decorative background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Taj Traders • India's Trusted Cosmetics & Salon Supply Store
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Taj Traders Professional <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">
              Beauty & Salon Supplies
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Supplying premium salon, parlour, spa, bridal, and personal care cosmetics across India.
            Enjoy <strong>Wholesale Tier Discounts</strong> on bulk quantities, 100% authentic professional brands, and direct doorstep delivery.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-rose-900/30 active:scale-95 transition-all text-sm"
            >
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919876543210?text=Hi%20Taj%20Traders,%20I%20am%20looking%20for%20cosmetics%20wholesale%20rates"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-800/80 hover:bg-slate-800 text-emerald-400 font-semibold rounded-xl border border-slate-700 active:scale-95 transition-all text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Wholesale WhatsApp Inquiry
            </a>
          </div>

          {/* Key Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">8+ Categories</p>
              <p className="text-xs text-slate-400">Skincare to Salon Equip</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-rose-400">Up to 40% OFF</p>
              <p className="text-xs text-slate-400">Wholesale Tier Pricing</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-amber-300">100% Genuine</p>
              <p className="text-xs text-slate-400">GST Invoice & Verified</p>
            </div>
          </div>
        </div>

        {/* Right Promotional Feature Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> B2B Slab Offer
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                Live Now
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">
                Salon & Parlour Starter Packs
              </h3>
              <p className="text-xs text-slate-300">
                Automatic tiered wholesale discounts apply when you order 3+ or 5+ units of any cosmetic item.
              </p>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl space-y-2 border border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Retail Single Item:</span>
                <span className="text-slate-200 font-semibold">Standard Store Price</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-rose-300">Wholesale Tier (3+ items):</span>
                <span className="text-rose-300 font-bold">Save 20% - 35% extra!</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free shipping on all wholesale orders above ₹5,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
