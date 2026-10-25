import React, { useState } from 'react';
import { Package, Truck, CreditCard, PhoneCall, X } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-brand-800 text-white">
      <div className="px-3 sm:px-6 lg:px-8 flex h-9 items-center justify-between gap-2 text-xs max-w-screen-xl mx-auto">
        {/* Left pills — show fewer on mobile */}
        <ul className="flex items-center gap-3 sm:gap-5 overflow-hidden">
          <li className="flex shrink-0 items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-brand-300" />
            <span className="whitespace-nowrap">Pan India Delivery</span>
          </li>
          <li className="hidden sm:flex shrink-0 items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5 text-brand-300" />
            <span className="whitespace-nowrap">Cash on Delivery</span>
          </li>
          <li className="hidden md:flex shrink-0 items-center gap-1.5">
            <Package className="h-3.5 w-3.5 text-brand-300" />
            <span className="whitespace-nowrap">Wholesale &amp; Bulk Orders</span>
          </li>
        </ul>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="tel:+919966335074"
            className="hidden sm:flex items-center gap-1.5 hover:text-brand-200 transition-colors"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">+91 99663 35074</span>
          </a>
          <a
            href="https://wa.me/919966335074?text=Hello%20Taj%20Traders%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-200 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Z" />
            </svg>
            <span className="whitespace-nowrap">WhatsApp</span>
          </a>
          <button
            onClick={() => setVisible(false)}
            className="ml-1 p-0.5 rounded hover:text-brand-200 transition-colors"
            aria-label="Close"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
