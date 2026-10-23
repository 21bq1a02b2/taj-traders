import React from 'react';
import { Phone, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 font-semibold text-rose-400">
            <Sparkles className="w-3.5 h-3.5" /> Taj Traders • B2B Wholesale & Retail Cosmetics Hub
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
            <Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Pan-India Delivery on orders over ₹1,999
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 100% Genuine Salon Brands
          </span>
          <span className="text-slate-500">|</span>
          <a
            href="https://wa.me/919876543210?text=Hello%20Taj%20Traders,%20I%20have%20an%20inquiry%20regarding%20wholesale%20supplies"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            <Phone className="w-3 h-3" /> WhatsApp: +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
}
