import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  const categories = [
    'Skin Care',
    'Hair Care',
    'Makeup',
    'Barber & Grooming',
    'Professional Equipment',
    'Waxing',
    'Fragrance',
    'Bath & Body',
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Prop Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Pan-India Delivery</h4>
              <p className="text-slate-400">Fast doorstep courier shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Brands</h4>
              <p className="text-slate-400">Directly sourced salon cosmetics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Wholesale Slabs</h4>
              <p className="text-slate-400">Extra savings for salon & parlours</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Easy Inquiries</h4>
              <p className="text-slate-400">Instant WhatsApp order quotes</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-900/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight uppercase">
                  Taj Traders
                </span>
                <span className="block text-[10px] text-rose-400 font-bold tracking-wider uppercase">
                  Cosmetics & Salon Supplies
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Taj Traders is India's premier digital cosmetics marketplace for professional beauty salons, spas, bridal artists, barbers, and skincare enthusiasts.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Commercial Market & Pan-India Hub
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 98765 43210 (Mon-Sat 10am-8pm)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" /> support@tajtraders.com
              </p>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              Beauty Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="hover:text-rose-400 transition-colors text-slate-400"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              Professional Supplies
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="hover:text-rose-400 transition-colors text-slate-400"
                  >
                    {cat}
                  </button>
                </li>
              ))}
              <li>
                <span className="text-amber-400 text-[11px] font-semibold">
                  ★ GST Invoices provided for Salon Input Tax Credit
                </span>
              </li>
            </ul>
          </div>

          {/* Bulk Inquiries */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              Wholesale & Parlours
            </h4>
            <p className="text-xs text-slate-400">
              Running a salon or beauty academy? Contact our wholesale desk for tier discount quotes and custom product bundles.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20Taj%20Traders,%20I%20am%20a%20salon%20owner%20interested%20in%20bulk%20supply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Wholesale Team
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Taj Traders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
