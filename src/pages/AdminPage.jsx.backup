import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, Users, BarChart3, Plus, Edit3, Trash2,
  CheckCircle, Clock, XCircle, RefreshCw, LogOut, Loader2,
  ChevronDown, AlertCircle, Eye, X, TrendingUp, IndianRupee,
  Truck, Star, Search, Filter, Download, Calendar, MapPin,
  Phone, Mail, ChevronLeft, ChevronRight, Award, Zap, ShieldCheck,
  Upload,
} from 'lucide-react';
import {
  fetchProducts, createProduct, updateProduct, deleteProduct,
  fetchOrders, updateOrderStatus, resetSeedData,
} from '../api';
import {
  DEMO_USERS, DEMO_ORDERS, DEMO_STATS, getMonthlyRevenue,
} from '../adminDemoData';

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  'Hair Care', 'Hair Color & Treatment', 'Makeup', 'Salon Furniture',
  'Skin Care', 'Waxing', 'Professional Equipment', 'Barber Supplies',
];
const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_COLORS = {
  Pending:    'bg-amber-100 text-amber-700 border-amber-200',
  Confirmed:  'bg-blue-100 text-blue-700 border-blue-200',
  Processing: 'bg-purple-100 text-purple-700 border-purple-200',
  Shipped:    'bg-indigo-100 text-indigo-700 border-indigo-200',
  Delivered:  'bg-green-100 text-green-700 border-green-200',
  Cancelled:  'bg-red-100 text-red-700 border-red-200',
};
const EMPTY_PRODUCT = {
  name: '', brand: '', category: 'Hair Care', price: '', mrp: '',
  stock: 10, description: '', imageUrl: '', discount: 0, moq: 1, isBestseller: false,
};
const PAGE_SIZE = 10;

// ─── Mini bar chart (pure CSS) ────────────────────────────────────────────────
function RevenueChart({ data }) {
  const max = Math.max(...data.map(d => d.revenue), 1);
  return (
    <div className="flex items-end gap-3 h-24 mt-4">
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[10px] font-semibold text-slate-600">
            ₹{(d.revenue / 1000).toFixed(0)}k
          </span>
          <div className="w-full rounded-t-lg bg-brand-100 relative overflow-hidden" style={{ height: '60px' }}>
            <div
              className="absolute bottom-0 w-full rounded-t-lg bg-brand-600 transition-all duration-700"
              style={{ height: `${(d.revenue / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, bg, sub }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} mb-3`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
      {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ page, total, perPage, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-xs text-slate-500">
        Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
          const p = page <= 3 ? i + 1 : page - 2 + i;
          if (p < 1 || p > pages) return null;
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                p === page ? 'bg-brand-700 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === pages}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage({ user, onSignOut }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const tabHistoryRef = React.useRef(['dashboard']);
  const ignoreNextPopRef = React.useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      const history = tabHistoryRef.current;

      if (history.length > 1) {
        history.pop();
        setTab(history[history.length - 1]);
        setShowForm(false);
        ignoreNextPopRef.current = true;
        window.history.pushState({ adminTab: true }, '');
      }
    };

    window.history.pushState({ adminTab: true }, '');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const changeAdminTab = (nextTab) => {
    if (nextTab !== tab) {
      tabHistoryRef.current.push(nextTab);
      setTab(nextTab);
      setShowForm(false);
      window.history.pushState({ adminTab: true }, '');
    }
  };
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [orderFilter, setOrderFilter] = useState('All');
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Merge live orders with demo orders for display
  const allOrders = useMemo(() => [...DEMO_ORDERS, ...(Array.isArray(orders) ? orders : [])], [orders]);
  const monthlyRevenue = useMemo(() => getMonthlyRevenue(), []);

  const totalRevenue = allOrders
    .filter(o => o.status !== 'Cancelled')
    .reduce((s, o) => s + (o.totalAmount || 0), 0);

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/login');
  }, [user, navigate]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, oRes] = await Promise.all([fetchProducts({}), fetchOrders()]);
      setProducts(Array.isArray(pRes.data) ? pRes.data : []);
      setOrders(Array.isArray(oRes) ? oRes : []);
    } catch {
      showToast('Failed to load live data — showing demo data', 'error');
      setProducts([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { loadData(); }, []);

  // Clean and normalise image links (handles Google redirect links, adurl, imgurl parameters)
  const cleanImageURL = (url) => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();

    // Check if it's a Google Shopping / ad redirect URL containing &adurl=
    if (trimmed.includes('google.com') && trimmed.includes('adurl=')) {
      try {
        const parsed = new URL(trimmed);
        const target = parsed.searchParams.get('adurl');
        if (target) return target;
      } catch {}
    }

    // Check if it's a Google Images redirect URL containing &imgurl=
    if (trimmed.includes('google.com') && trimmed.includes('imgurl=')) {
      try {
        const parsed = new URL(trimmed);
        const target = parsed.searchParams.get('imgurl');
        if (target) return decodeURIComponent(target);
      } catch {}
    }

    return trimmed;
  };

  // ── Product form handlers ────────────────────────────────────────────────────
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'imageUrl') {
      setProductForm(f => ({ ...f, imageUrl: cleanImageURL(value) }));
    } else {
      setProductForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  };
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        image: productForm.imageUrl,
        price: Number(productForm.price), mrp: Number(productForm.mrp),
        stock: Number(productForm.stock), discount: Number(productForm.discount),
        moq: Number(productForm.moq),
      };
      if (editingId) { await updateProduct(editingId, payload); showToast('Product updated!'); }
      else { await createProduct(payload); showToast('Product added!'); }
      setProductForm(EMPTY_PRODUCT); setEditingId(null); setShowForm(false); loadData();
    } catch (error) { console.error('Product save error:', error); showToast(error.message || 'Failed to save product', 'error'); }
  };
  const handleEdit = (p) => {
    setProductForm({
      name: p.name || '', brand: p.brand || '', category: p.category || 'Hair Care',
      price: p.price || '', mrp: p.mrp || '', stock: p.stock ?? 10,
      description: p.description || '', imageUrl: p.image || p.imageUrl || '',
      discount: p.discount || 0, moq: p.moq || 1, isBestseller: p.isBestseller || false,
    });
    setEditingId(p._id || p.id); setShowForm(true); setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeletingId(id);
    try { await deleteProduct(id); showToast('Product deleted.'); loadData(); }
    catch { showToast('Failed to delete product', 'error'); }
    finally { setDeletingId(null); }
  };
  const handleOrderStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      showToast('Order status updated!');
    } catch { showToast('Failed to update order', 'error'); }
  };
  const handleReseed = async () => {
    if (!window.confirm('Reset catalog to seed products?')) return;
    setSeeding(true);
    try { await resetSeedData(); showToast('Catalog reseeded!'); loadData(); }
    catch { showToast('Reseed failed', 'error'); }
    finally { setSeeding(false); }
  };

  // ── Filtered lists ───────────────────────────────────────────────────────────
  const filteredUsers = DEMO_USERS.filter(u =>
    !userSearch ||
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.city.toLowerCase().includes(userSearch.toLowerCase())
  );
  const pagedUsers = filteredUsers.slice((userPage - 1) * PAGE_SIZE, userPage * PAGE_SIZE);

  const filteredOrders = allOrders.filter(o => {
    const matchStatus = orderFilter === 'All' || o.status === orderFilter;
    const matchSearch = !orderSearch ||
      o.customerName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.orderNumber?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.city?.toLowerCase().includes(orderSearch.toLowerCase());
    return matchStatus && matchSearch;
  });
  const pagedOrders = filteredOrders.slice((orderPage - 1) * PAGE_SIZE, orderPage * PAGE_SIZE);

  const filteredProducts = products.filter(p =>
    !productSearch ||
    p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category?.toLowerCase().includes(productSearch.toLowerCase())
  );
  const pagedProducts = filteredProducts.slice((productPage - 1) * PAGE_SIZE, productPage * PAGE_SIZE);

  // ── Launch date ──────────────────────────────────────────────────────────────
  const launchDate = new Date(DEMO_STATS.launchDate);
  const daysRunning = Math.floor((Date.now() - launchDate) / 86400000);

  const TABS = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'payments', label: 'Payments', icon: IndianRupee },
    { key: 'orders', label: 'Orders', icon: ShoppingBag },
    { key: 'products', label: 'Products', icon: Package },
  ];

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Admin Top Bar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8 flex h-14 sm:h-16 items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 mr-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold">TT</span>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-none">Taj Traders</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Admin Portal</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 flex-1 overflow-x-auto">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => changeAdminTab(key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  tab === key ? 'bg-brand-700 text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto mr-2 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            onClick={() => setIsMobileMenuOpen(m => !m)}
          >
            <Filter className="h-3.5 w-3.5" />
            Menu
          </button>

          {/* User + Sign Out */}
          <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
            <span className="hidden sm:block text-xs text-slate-400 max-w-[100px] truncate">{user.name}</span>
            <button
              onClick={() => { onSignOut(); navigate('/'); }}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-red-700 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 px-4 py-2 flex flex-wrap gap-2 bg-slate-800">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { changeAdminTab(key); setIsMobileMenuOpen(false); }}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  tab === key ? 'bg-brand-700 text-white' : 'text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Toast ─────────────────────────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed bottom-6 right-4 left-4 sm:left-auto sm:w-auto z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-xl ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle className="h-4 w-4 shrink-0" />}
          {toast.msg}
        </div>
      )}

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
          </div>
        ) : (
          <>
            {/* ════════════════════ DASHBOARD TAB ════════════════════ */}
            {tab === 'dashboard' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Welcome back, {user.name} 👋
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Taj Traders is live for{' '}
                      <span className="font-semibold text-brand-700">{daysRunning} days</span>
                      {' '}· Launched {launchDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-700 border border-green-200 self-start sm:self-auto">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Platform Active
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  <StatCard
                    label="Registered Users"
                    value={DEMO_STATS.totalUsers}
                    icon={Users}
                    color="text-brand-700"
                    bg="bg-brand-50"
                    sub={`+${Math.round(DEMO_STATS.totalUsers * 0.18)} this month`}
                  />
                  <StatCard
                    label="Total Orders"
                    value={allOrders.length}
                    icon={ShoppingBag}
                    color="text-emerald-600"
                    bg="bg-emerald-50"
                    sub={`${DEMO_STATS.deliveredOrders} delivered`}
                  />
                  <StatCard
                    label="Total Revenue"
                    value={`₹${(totalRevenue / 1000).toFixed(0)}k`}
                    icon={TrendingUp}
                    color="text-blue-600"
                    bg="bg-blue-50"
                    sub="Excl. cancelled orders"
                  />
                  <StatCard
                    label="Avg Order Value"
                    value={`₹${DEMO_STATS.avgOrderValue.toLocaleString('en-IN')}`}
                    icon={IndianRupee}
                    color="text-violet-600"
                    bg="bg-violet-50"
                    sub={`${DEMO_STATS.pendingOrders} pending`}
                  />
                </div>

                {/* Revenue Chart + Quick Actions */}
                <div className="grid gap-4 lg:grid-cols-3">
                  {/* Revenue Trend */}
                  <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900">Monthly Revenue (Last 3 Months)</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Platform revenue trend since launch</p>
                    <RevenueChart data={monthlyRevenue} />
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                      {monthlyRevenue.map(d => (
                        <div key={d.label} className="text-center">
                          <p className="text-sm font-bold text-slate-800">₹{(d.revenue / 1000).toFixed(1)}k</p>
                          <p className="text-[10px] text-slate-500">{d.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Platform Milestones */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900 mb-4">Platform Milestones</h2>
                    <div className="space-y-3">
                      {[
                        { icon: Zap, color: 'text-amber-500 bg-amber-50', label: 'Platform Launched', sub: launchDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                        { icon: Users, color: 'text-blue-500 bg-blue-50', label: '50 Registered Users', sub: '20 Oct 2026' },
                        { icon: ShoppingBag, color: 'text-emerald-500 bg-emerald-50', label: '100+ Orders Placed', sub: '22 Oct 2026' },
                        { icon: Award, color: 'text-violet-500 bg-violet-50', label: 'First Bulk Order', sub: '14 Oct 2026' },
                        { icon: TrendingUp, color: 'text-brand-600 bg-brand-50', label: '₹2L+ Revenue', sub: '24 Oct 2026' },
                      ].map(({ icon: Icon, color, label, sub }) => (
                        <div key={label} className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color.split(' ')[1]}`}>
                            <Icon className={`h-4 w-4 ${color.split(' ')[0]}`} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{label}</p>
                            <p className="text-[10px] text-slate-500">{sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Status Breakdown */}
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                  {[
                    { label: 'Delivered', count: DEMO_STATS.deliveredOrders, color: 'bg-green-100 text-green-700' },
                    { label: 'Shipped', count: allOrders.filter(o => o.status === 'Shipped').length, color: 'bg-indigo-100 text-indigo-700' },
                    { label: 'Processing', count: allOrders.filter(o => o.status === 'Processing').length, color: 'bg-purple-100 text-purple-700' },
                    { label: 'Confirmed', count: allOrders.filter(o => o.status === 'Confirmed').length, color: 'bg-blue-100 text-blue-700' },
                    { label: 'Pending', count: DEMO_STATS.pendingOrders, color: 'bg-amber-100 text-amber-700' },
                    { label: 'Cancelled', count: DEMO_STATS.cancelledOrders, color: 'bg-red-100 text-red-700' },
                  ].map(({ label, count, color }) => (
                    <div key={label} className={`rounded-xl p-3 text-center ${color}`}>
                      <p className="text-lg font-bold">{count}</p>
                      <p className="text-[11px] font-medium">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-slate-900">Recent Orders</h2>
                    <button onClick={() => setTab('orders')} className="text-xs font-semibold text-brand-700 hover:text-brand-800">View all →</button>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[480px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Order #</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {allOrders.slice(0, 8).map((o) => (
                            <tr key={o._id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-4 text-xs font-mono text-slate-500">{o.orderNumber || o._id?.slice(-8)}</td>
                              <td className="py-3 px-4">
                                <p className="font-medium text-slate-800 text-xs">{o.customerName}</p>
                                <p className="text-[10px] text-slate-400">{o.city}</p>
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-700 text-xs">₹{(o.totalAmount || 0).toLocaleString('en-IN')}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold border ${STATUS_COLORS[o.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                  {o.status || 'Pending'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[10px] text-slate-400">
                                {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                  <button
                    onClick={() => { setShowForm(true); setEditingId(null); setProductForm(EMPTY_PRODUCT); setTab('products'); }}
                    className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-left hover:bg-brand-100 transition-colors group"
                  >
                    <Plus className="h-6 w-6 text-brand-700 mb-2" />
                    <p className="font-semibold text-slate-900 text-sm">Add New Product</p>
                    <p className="text-xs text-slate-500 mt-0.5">Add to the Taj Traders catalog</p>
                  </button>
                  <button
                    onClick={() => setTab('users')}
                    className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left hover:bg-blue-100 transition-colors group"
                  >
                    <Users className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="font-semibold text-slate-900 text-sm">View All Users</p>
                    <p className="text-xs text-slate-500 mt-0.5">{DEMO_STATS.totalUsers} registered customers</p>
                  </button>
                  <button
                    onClick={() => setTab('payments')}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left hover:bg-emerald-100 transition-colors group"
                  >
                    <IndianRupee className="h-6 w-6 text-emerald-600 mb-2" />
                    <p className="font-semibold text-slate-900 text-sm">Payment Records</p>
                    <p className="text-xs text-slate-500 mt-0.5">₹{(totalRevenue / 1000).toFixed(0)}k total collected</p>
                  </button>
                </div>
              </div>
            )}

            {/* ════════════════════ USERS TAB ════════════════════ */}
            {tab === 'users' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Registered Users</h1>
                    <p className="text-xs sm:text-sm text-slate-500">{DEMO_USERS.length} customers on the platform</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      value={userSearch}
                      onChange={e => { setUserSearch(e.target.value); setUserPage(1); }}
                      placeholder="Search by name, email, city…"
                      className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 w-full sm:w-64"
                    />
                  </div>
                </div>

                {/* User Cards (mobile) / Table (desktop) */}
                <div className="hidden sm:block rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">#</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">City</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Phone</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Orders</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Spent</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {pagedUsers.map((u, idx) => (
                          <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 text-xs text-slate-400">
                              {(userPage - 1) * PAGE_SIZE + idx + 1}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                                  {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                  <p className="font-medium text-slate-800 text-xs">{u.name}</p>
                                  <p className="text-[10px] text-slate-400">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs text-slate-600 hidden md:table-cell">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-slate-400" />
                                {u.city}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs text-slate-600 hidden lg:table-cell">
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-slate-400" />
                                {u.phone}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center justify-center h-6 min-w-[24px] px-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                                {u.orders}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-xs font-semibold text-slate-700">
                              ₹{u.totalSpent.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 text-[10px] text-slate-400">
                              {new Date(u.joinedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile cards */}
                <div className="sm:hidden space-y-3">
                  {pagedUsers.map(u => (
                    <div key={u.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                          {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="rounded-lg bg-slate-50 p-2">
                          <p className="font-bold text-slate-800">{u.orders}</p>
                          <p className="text-slate-500">Orders</p>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2">
                          <p className="font-bold text-slate-800">₹{(u.totalSpent / 1000).toFixed(1)}k</p>
                          <p className="text-slate-500">Spent</p>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2">
                          <p className="font-bold text-slate-800">{u.city}</p>
                          <p className="text-slate-500">City</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination page={userPage} total={filteredUsers.length} perPage={PAGE_SIZE} onChange={setUserPage} />
              </div>
            )}

            {/* ════════════════════ PAYMENTS TAB ════════════════════ */}
            {tab === 'payments' && (
              <div className="space-y-5">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Payment Records</h1>
                  <p className="text-xs sm:text-sm text-slate-500">All transactions from the last 3 months</p>
                </div>

                {/* Payment Summary Cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  <StatCard label="Total Collected" value={`₹${(totalRevenue / 1000).toFixed(0)}k`} icon={IndianRupee} color="text-emerald-600" bg="bg-emerald-50" sub="Excl. cancelled" />
                  <StatCard label="COD Payments" value={allOrders.filter(o => o.paymentMethod === 'Cash on Delivery').length} icon={ShieldCheck} color="text-blue-600" bg="bg-blue-50" sub="Cash on delivery" />
                  <StatCard label="UPI Payments" value={allOrders.filter(o => o.paymentMethod === 'UPI').length} icon={Zap} color="text-violet-600" bg="bg-violet-50" sub="Digital payments" />
                  <StatCard label="Bank Transfers" value={allOrders.filter(o => o.paymentMethod === 'Bank Transfer').length} icon={Truck} color="text-amber-600" bg="bg-amber-50" sub="NEFT / IMPS" />
                </div>

                {/* Payments Table */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">Transaction History</p>
                    <span className="text-xs text-slate-400">{allOrders.length} transactions</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Order ID</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Method</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {allOrders.slice((orderPage - 1) * PAGE_SIZE, orderPage * PAGE_SIZE).map(o => (
                          <tr key={o._id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-mono text-[10px] text-slate-500">{o.orderNumber || o._id?.slice(-8)}</td>
                            <td className="py-3 px-4">
                              <p className="font-medium text-slate-800 text-xs">{o.customerName}</p>
                              <p className="text-[10px] text-slate-400">{o.city}</p>
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-800 text-xs">
                              ₹{(o.totalAmount || 0).toLocaleString('en-IN')}
                              {o.shipping === 0 && <span className="ml-1 text-[9px] text-emerald-600">Free shipping</span>}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                o.paymentMethod === 'UPI' ? 'bg-violet-100 text-violet-700' :
                                o.paymentMethod === 'Bank Transfer' ? 'bg-blue-100 text-blue-700' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {o.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                o.orderType === 'Wholesale' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {o.orderType}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold border ${STATUS_COLORS[o.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[10px] text-slate-400">
                              {new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination page={orderPage} total={allOrders.length} perPage={PAGE_SIZE} onChange={setOrderPage} />
              </div>
            )}

            {/* ════════════════════ ORDERS TAB ════════════════════ */}
            {tab === 'orders' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Orders</h1>
                    <p className="text-xs sm:text-sm text-slate-500">{allOrders.length} total orders</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      value={orderSearch}
                      onChange={e => { setOrderSearch(e.target.value); setOrderPage(1); }}
                      placeholder="Search customer, city, order #…"
                      className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:border-brand-600 focus:outline-none w-full sm:w-64"
                    />
                  </div>
                </div>

                {/* Status Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  {['All', ...STATUS_OPTIONS].map(s => (
                    <button
                      key={s}
                      onClick={() => { setOrderFilter(s); setOrderPage(1); }}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                        orderFilter === s ? 'bg-brand-700 text-white' : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                      <span className="ml-1.5 opacity-60">
                        {s === 'All' ? allOrders.length : allOrders.filter(o => o.status === s).length}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {pagedOrders.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-sm">
                      No orders found.
                    </div>
                  )}
                  {pagedOrders.map(o => (
                    <div key={o._id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-slate-900 text-sm">{o.customerName}</p>
                            <span className="font-mono text-[10px] text-slate-400">#{o.orderNumber || o._id?.slice(-8)}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${STATUS_COLORS[o.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                              {o.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="flex items-center gap-1 text-[11px] text-slate-500">
                              <Mail className="h-3 w-3" />{o.email}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-slate-500">
                              <Phone className="h-3 w-3" />{o.phone}
                            </span>
                          </div>
                          {o.address && (
                            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />{o.address}, {o.city} {o.pincode}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-lg text-slate-900">₹{(o.totalAmount || 0).toLocaleString('en-IN')}</p>
                          <p className="text-[10px] text-slate-400">{o.paymentMethod} · {o.orderType}</p>
                        </div>
                      </div>

                      {o.items?.length > 0 && (
                        <div className="mb-3 border-t border-slate-100 pt-3 space-y-1">
                          {o.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-xs text-slate-600">
                              <span>{item.name} × {item.quantity}</span>
                              <span>₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                          {o.shipping > 0 && (
                            <div className="flex justify-between text-xs text-slate-400">
                              <span>Shipping</span><span>₹{o.shipping}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                        <p className="text-[10px] text-slate-400">
                          {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                        </p>
                        {!o.orderNumber?.startsWith('TT0') ? (
                          <div className="flex items-center gap-2">
                            <label className="text-xs font-medium text-slate-600">Update:</label>
                            <select
                              value={o.status || 'Pending'}
                              onChange={e => handleOrderStatus(o._id, e.target.value)}
                              className="rounded-lg border border-slate-300 bg-white py-1 pl-2 pr-6 text-xs font-medium text-slate-700 focus:border-brand-600 focus:outline-none"
                            >
                              {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                            </select>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Historical order (read-only)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination page={orderPage} total={filteredOrders.length} perPage={PAGE_SIZE} onChange={setOrderPage} />
              </div>
            )}

            {/* ════════════════════ PRODUCTS TAB ════════════════════ */}
            {tab === 'products' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Products</h1>
                    <p className="text-xs sm:text-sm text-slate-500">{products.length} products in catalog</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        value={productSearch}
                        onChange={e => { setProductSearch(e.target.value); setProductPage(1); }}
                        placeholder="Search products…"
                        className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:border-brand-600 focus:outline-none w-full sm:w-52"
                      />
                    </div>
                    <button
                      onClick={handleReseed}
                      disabled={seeding}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <RefreshCw className={`h-4 w-4 ${seeding ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline">Reseed</span>
                    </button>
                    <button
                      onClick={() => { setProductForm(EMPTY_PRODUCT); setEditingId(null); setShowForm(true); }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Product Form */}
                {showForm && (
                  <div className="rounded-2xl border border-brand-200 bg-white p-5 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-bold text-slate-900">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                      <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleProductSubmit} className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name *</label>
                        <input name="name" required value={productForm.name} onChange={handleProductChange} placeholder="e.g. Wella Professionals Color Touch" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Brand *</label>
                        <input name="brand" required value={productForm.brand} onChange={handleProductChange} placeholder="e.g. Wella" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                        <select name="category" value={productForm.category} onChange={handleProductChange} className="input-base">
                          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (₹) *</label>
                        <input name="price" type="number" required min="1" value={productForm.price} onChange={handleProductChange} placeholder="850" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">MRP (₹)</label>
                        <input name="mrp" type="number" min="0" value={productForm.mrp} onChange={handleProductChange} placeholder="1000" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock</label>
                        <input name="stock" type="number" min="0" value={productForm.stock} onChange={handleProductChange} className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Discount %</label>
                        <input name="discount" type="number" min="0" max="99" value={productForm.discount} onChange={handleProductChange} className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">MOQ</label>
                        <input name="moq" type="number" min="1" value={productForm.moq} onChange={handleProductChange} className="input-base" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input id="bestseller" name="isBestseller" type="checkbox" checked={productForm.isBestseller} onChange={handleProductChange} className="h-4 w-4 rounded border-slate-300 text-brand-700" />
                        <label htmlFor="bestseller" className="text-sm font-medium text-slate-700">Mark as Bestseller</label>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Product Image
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1">
                            <input
                              name="imageUrl"
                              value={productForm.imageUrl}
                              onChange={handleProductChange}
                              placeholder="Paste image address (e.g. https://... .jpg, .png)"
                              className="input-base"
                            />
                          </div>
                          <label className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-300 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 cursor-pointer text-xs font-semibold shadow-sm transition-colors">
                            <Upload className="h-4 w-4 text-brand-700" />
                            <span>Upload from Computer</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setProductForm(f => ({ ...f, imageUrl: reader.result }));
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </label>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500">
                          <strong>How to get an image from Google:</strong> Right-click the photo on Google Images → select <strong>"Copy image address"</strong> (NOT "Copy link address") and paste here, or save the image to your computer and click <strong>"Upload from Computer"</strong>.
                        </p>
                        {productForm.imageUrl && (
                          <div className="mt-3 flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-md">
                            <div className="relative h-16 w-16 shrink-0 rounded-lg border border-slate-200 bg-white overflow-hidden flex items-center justify-center">
                              <img
                                src={productForm.imageUrl}
                                alt="Live Preview"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    const errDiv = parent.querySelector('.img-error-badge');
                                    if (errDiv) errDiv.style.display = 'flex';
                                  }
                                  const statusTxt = document.getElementById('img-status-msg');
                                  if (statusTxt) {
                                    statusTxt.innerHTML = '<span class="text-red-600 font-semibold">⚠️ Cannot load this link directly:</span> This is a Google webpage link, not a photo link. Please click <strong>"Upload from Computer"</strong> above, or right-click the photo on Google and select <strong>"Copy image address"</strong>.';
                                  }
                                }}
                              />
                              <div className="img-error-badge hidden absolute inset-0 bg-red-50 text-red-600 flex-col items-center justify-center text-[10px] font-bold text-center p-1">
                                ❌ Not an image
                              </div>
                            </div>
                            <div className="text-xs flex-1">
                              <p id="img-status-msg" className="text-slate-700">
                                <span className="font-semibold text-emerald-600">✓ Image Preview Active</span>
                              </p>
                              <button
                                type="button"
                                onClick={() => setProductForm(f => ({ ...f, imageUrl: '' }))}
                                className="text-[11px] text-red-600 hover:underline mt-1 font-medium inline-block"
                              >
                                Remove image
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                        <textarea name="description" rows={3} value={productForm.description} onChange={handleProductChange} placeholder="Product description..." className="input-base resize-none" />
                      </div>
                      <div className="sm:col-span-2 flex gap-3 justify-end">
                        <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                        <button type="submit" className="rounded-xl bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800 shadow-sm">
                          {editingId ? 'Save Changes' : 'Add Product'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Products Table */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[500px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Stock</th>
                          <th className="py-3 px-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {pagedProducts.map(p => (
                          <tr key={p._id || p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                {p.image || p.imageUrl ? (
                                  <img src={p.image || p.imageUrl} alt="" className="h-9 w-9 rounded-lg object-cover border border-slate-200 shrink-0" onError={e => { e.target.style.display = 'none'; }} />
                                ) : (
                                  <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                                    <Package className="h-4 w-4 text-brand-400" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-slate-800 text-xs line-clamp-1 max-w-[160px] sm:max-w-[240px]">{p.name}</p>
                                  <p className="text-[10px] text-slate-400">{p.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">{p.category}</span>
                            </td>
                            <td className="py-3 px-4 text-xs font-semibold text-slate-700">
                              ₹{(p.price || 0).toLocaleString('en-IN')}
                              {p.discount > 0 && <span className="ml-1 text-[10px] text-green-600">{p.discount}% off</span>}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${(p.stock || 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                {(p.stock || 0) > 0 ? `${p.stock} in stock` : 'Out of stock'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => handleEdit(p)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-brand-50 hover:text-brand-700 transition-colors" title="Edit">
                                  <Edit3 className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => handleDelete(p._id || p.id)} disabled={deletingId === (p._id || p.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                                  {deletingId === (p._id || p.id) ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                          <tr><td colSpan={5} className="py-12 text-center text-slate-400 text-sm">No products. Add one or reseed.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination page={productPage} total={filteredProducts.length} perPage={PAGE_SIZE} onChange={setProductPage} />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Taj Traders Admin Portal · {daysRunning} days live · {allOrders.length} orders processed
      </footer>
    </div>
  );
}
