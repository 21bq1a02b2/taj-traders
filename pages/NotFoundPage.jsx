import React from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 mb-5">
        <PackageSearch className="h-10 w-10 text-brand-700" />
      </div>
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-slate-700">Page Not Found</h2>
      <p className="mt-3 max-w-sm text-slate-500 text-sm">
        Looks like this page went out of stock. Head back to shop our 127+ products!
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="rounded-xl bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm"
        >
          Go Home
        </Link>
        <Link
          to="/products"
          className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
