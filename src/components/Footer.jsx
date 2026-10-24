import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function Footer({ onSelectCategory = () => {} }) {
  const categories = [
    'Hair Care',
    'Hair Color & Treatment',
    'Makeup',
    'Salon Furniture',
    'Skin Care',
    'Waxing',
    'Professional Equipment',
    'Barber Supplies',
  ];

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <a className="group flex items-center gap-2.5" href="/">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white shadow-sm"
                aria-hidden="true"
              >
                TT
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight text-slate-900">
                  Taj Traders
                </span>
                <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Salon &amp; Parlour Supplies
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              Professional salon, parlour, beauty and spa supplies for businesses of every size.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href="https://wa.me/919966335074?text=Hello%20Taj%20Traders%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </a>
              <p className="text-xs font-medium text-slate-700">
                WhatsApp / Call:{' '}
                <a
                  href="https://wa.me/919160050697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  +91 91600 50697
                </a>
              </p>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Shop</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="link-muted"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="link-muted"
                >
                  Categories
                </button>
              </li>
              <li>
                <Link className="link-muted" to="/offers">
                  Offers
                </Link>
              </li>
              <li>
                <a className="link-muted" href="#bulk-orders">
                  Bulk Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="link-muted"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a className="link-muted" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="link-muted" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="link-muted" href="#orders">
                  Track Order
                </a>
              </li>
              <li>
                <a className="link-muted" href="#account">
                  My Account
                </a>
              </li>
            </ul>
            <div className="mt-6 space-y-1 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Payment</p>
              <p>Cash on Delivery available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Row */}
      <div className="border-t border-slate-200">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Taj Traders. All rights reserved.</p>
          <p>B2B salon, parlour, spa &amp; beauty supplies · GST invoicing available</p>
        </div>
      </div>
    </footer>
  );
}
