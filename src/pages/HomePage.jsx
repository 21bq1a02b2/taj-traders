import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MessageCircle, ArrowRight, ShieldCheck, Truck, Sparkles, Star, Package, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api';
import { seedProducts as fallbackProducts } from '../fallbackProducts';

export default function HomePage({ onAddToCart, onOpenQuickView }) {
  const [products, setProducts] = useState(fallbackProducts.slice(0, 8));

  useEffect(() => {
    fetchProducts({})
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch(() => {});
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const categories = [
    {
      name: 'Hair Care',
      count: '11 products',
      image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912072/shree-gopi-traders/products/v5/professional-standing-hair-steamer-hood-dryer-machine-front-1786912072310.png',
    },
    {
      name: 'Hair Color & Treatment',
      count: '8 products',
      image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Makeup',
      count: '8 products',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Salon Furniture',
      count: '17 products',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Skin Care',
      count: '27 products',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Waxing',
      count: '14 products',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Professional Equipment',
      count: '20 products',
      image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912079/shree-gopi-traders/products/v5/2-in-1-facial-ozone-steamer-magnifying-lamp-combo-station-front-1786912079553.jpg',
    },
    {
      name: 'Barber Supplies',
      count: '22 products',
      image: 'https://res.cloudinary.com/dg8z7pxju/image/upload/v1786912095/shree-gopi-traders/products/v5/professional-barber-continuous-spray-bottle-neck-duster-set-front-1786912095224.png',
    },
  ];

  return (
    <div className="flex-1 bg-white">
      {/* Hero Section matching Image 4 */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200 py-16 sm:py-24">
        {/* Soft background decor */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div className="container-page relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Taj Traders — Salon &amp; Parlour Wholesale
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Your One Stop <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-purple-800">
              Salon &amp; Beauty Supply Partner
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Professional salon, parlour, beauty and spa supplies for businesses of every size.
            Order at wholesale rates, pay cash on delivery, and restock without chasing five different suppliers.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-200 hover:bg-brand-800 transition-all active:scale-95"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="https://wa.me/919966335074?text=Hello%20Taj%20Traders%2C%20I'd%20like%20to%20enquire%20about%20salon%20supplies."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Quick Search on Hero */}
          <div className="mt-10 max-w-xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex overflow-hidden rounded-xl border border-slate-300 bg-white shadow-lg focus-within:border-brand-600">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search shampoo, chairs, wax, clippers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-sm text-slate-800 outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200 text-left">
            <div>
              <p className="text-2xl font-bold text-slate-900">127+</p>
              <p className="text-xs text-slate-500 font-medium">PRODUCTS STOCKED</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">8</p>
              <p className="text-xs text-slate-500 font-medium">CATEGORIES</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">166+</p>
              <p className="text-xs text-slate-500 font-medium">BUSINESSES SERVED</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">5+</p>
              <p className="text-xs text-slate-500 font-medium">ORDERS FULFILLED</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid matching Categories in Taj */}
      <section className="container-page py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Categories</h2>
            <p className="text-sm text-slate-500 mt-1">Browse professional supplies tailored for beauty studios, salons, and parlours</p>
          </div>
          <Link
            to="/categories"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Wholesale Bestsellers */}
      <section className="bg-slate-50 border-t border-slate-200 py-12 sm:py-16">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-brand-700 uppercase tracking-widest">Wholesale Bestsellers</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Popular in Salons This Week</h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
            >
              <span>See Full Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 8).map((product, idx) => (
              <ProductCard
                key={product._id || product.id || product.slug || `home-prod-${idx}`}
                product={product}
                onAddToCart={onAddToCart}
                onOpenQuickView={onOpenQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Taj Traders */}
      <section className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Wholesale Tier Slabs</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Order single units at retail rates or take advantage of automated discounts when buying 3+ or 5+ units.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6 bg-white space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Pan India Delivery</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Doorstep courier dispatch to salons, parlours, and beauty studios across India with Cash on Delivery available.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6 bg-white space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">GST Input Tax Credit</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Official GST invoices issued for all wholesale equipment and product orders to claim salon business tax credits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
