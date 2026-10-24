import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Package, ShoppingBag, Sparkles, CheckCircle, MessageCircle } from 'lucide-react';

const stats = [
  { value: '127+', label: 'Products', icon: Package },
  { value: '8', label: 'Categories', icon: ShoppingBag },
  { value: '166+', label: 'Businesses Served', icon: Users },
  { value: '5+', label: 'Years Experience', icon: Award },
];

const reasons = [
  {
    title: 'Built for Salon Professionals',
    desc: 'We source only professional-grade products used in top salons and parlours across India. Everything we stock is tested and trusted by experts.',
    icon: Sparkles,
  },
  {
    title: 'Wholesale & Bulk Pricing',
    desc: 'Get access to slab-based wholesale pricing when you buy in bulk. The more you order, the more you save — ideal for salon owners and distributors.',
    icon: Award,
  },
  {
    title: 'Pan-India Delivery',
    desc: 'We deliver to every corner of India. Fast shipping, careful packaging, and COD available so you never have to worry about receiving your orders.',
    icon: Package,
  },
  {
    title: 'Dedicated Support',
    desc: 'Our WhatsApp-first support team is always ready to help with product queries, bulk quotes, and order tracking — 7 days a week.',
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1 bg-white">
      {/* Dark Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dymkfv9kz/image/upload/v1700000000/pattern.png")',
            backgroundSize: '400px',
          }}
        />
        <div className="container-page relative z-10 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-brand-700/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
            <Sparkles className="h-3.5 w-3.5" />
            Our Story
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            The supply partner behind
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              the salon chair.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Taj Traders is India's trusted B2B supplier of professional salon, parlour, and beauty
            products — helping thousands of salons run smoother, smarter, and more profitably.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/919966335074?text=Hello%20Taj%20Traders%2C%20I'd%20like%20to%20know%20more!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#20B358] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with Us on WhatsApp
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-slate-200 bg-brand-50">
        <div className="container-page grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-2 bg-brand-50 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700/10">
                <Icon className="h-5 w-5 text-brand-700" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{value}</p>
              <p className="text-sm font-medium text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why We Exist */}
      <section className="container-page py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Why We Exist</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            We started Taj Traders because salon professionals deserved a reliable, affordable, and
            professional-grade supply chain — not just generic retail products.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700/10">
                <Icon className="h-5 w-5 text-brand-700" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            "To be the most trusted and accessible supplier of professional beauty and salon
            products in India — empowering every salon owner to deliver world-class results to their
            clients, without breaking the bank."
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {[
              'GST-compliant invoices',
              'COD available',
              'Bulk wholesale pricing',
              'Pan-India shipping',
            ].map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle className="h-4 w-4 text-brand-400 shrink-0" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Ready to Stock Your Salon?</h2>
        <p className="mt-3 text-slate-600">Browse 127+ professional products across 8 categories.</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/products"
            className="rounded-xl bg-brand-700 px-8 py-3 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm"
          >
            Shop Now
          </Link>
          <Link
            to="/bulk-orders"
            className="rounded-xl border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Request Bulk Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
