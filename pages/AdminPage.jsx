import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, Users, BarChart3, Plus, Edit3, Trash2,
  CheckCircle, Clock, XCircle, RefreshCw, LogOut, Loader2,
  ChevronDown, AlertCircle, Eye, X
} from 'lucide-react';
import {
  fetchProducts, createProduct, updateProduct, deleteProduct,
  fetchOrders, updateOrderStatus, resetSeedData
} from '../api';

const CATEGORIES = [
  'Hair Care', 'Hair Color & Treatment', 'Makeup', 'Salon Furniture',
  'Skin Care', 'Waxing', 'Professional Equipment', 'Barber Supplies',
];

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_COLORS = {
  Pending: 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Processing: 'bg-purple-100 text-purple-700',
  Shipped: 'bg-indigo-100 text-indigo-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const EMPTY_PRODUCT = {
  name: '', brand: '', category: 'Hair Care', price: '', mrp: '', stock: 10,
  description: '', imageUrl: '', discount: 0, moq: 1, isBestseller: false,
};

export default function AdminPage({ user, onSignOut }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
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

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, oRes] = await Promise.all([fetchProducts({}), fetchOrders()]);
      setProducts(pRes.data || []);
      setOrders(oRes || []);
    } catch {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        mrp: Number(productForm.mrp),
        stock: Number(productForm.stock),
        discount: Number(productForm.discount),
        moq: Number(productForm.moq),
      };
      if (editingId) {
        await updateProduct(editingId, payload);
        showToast('Product updated successfully!');
      } else {
        await createProduct(payload);
        showToast('Product added successfully!');
      }
      setProductForm(EMPTY_PRODUCT);
      setEditingId(null);
      setShowForm(false);
      loadData();
    } catch {
      showToast('Failed to save product', 'error');
    }
  };

  const handleEdit = (p) => {
    setProductForm({
      name: p.name || '',
      brand: p.brand || '',
      category: p.category || 'Hair Care',
      price: p.price || '',
      mrp: p.mrp || '',
      stock: p.stock ?? 10,
      description: p.description || '',
      imageUrl: p.imageUrl || '',
      discount: p.discount || 0,
      moq: p.moq || 1,
      isBestseller: p.isBestseller || false,
    });
    setEditingId(p._id || p.id);
    setShowForm(true);
    setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      showToast('Product deleted.');
      loadData();
    } catch {
      showToast('Failed to delete product', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleOrderStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
      showToast('Order status updated!');
    } catch {
      showToast('Failed to update order', 'error');
    }
  };

  const handleReseed = async () => {
    if (!window.confirm('Reset the entire catalog to 24 Taj Traders seed products? All custom products will be lost.')) return;
    setSeeding(true);
    try {
      await resetSeedData();
      showToast('Catalog reseeded with 24 products!');
      loadData();
    } catch {
      showToast('Reseed failed', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const filteredOrders = orderFilter === 'All' ? orders : orders.filter((o) => o.status === orderFilter);
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-brand-700', bg: 'bg-brand-50' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Orders', value: orders.filter((o) => o.status === 'Pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg">
        <div className="container-page flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 mr-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold">TT</span>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-none">Taj Traders</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Admin Portal</p>
            </div>
          </Link>

          <nav className="flex gap-1 overflow-x-auto flex-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { key: 'products', label: 'Products', icon: Package },
              { key: 'orders', label: 'Orders', icon: ShoppingBag },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setTab(key); setShowForm(false); }}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  tab === key ? 'bg-brand-700 text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <span className="hidden sm:block text-xs text-slate-400">
              {user.name}
            </span>
            <button
              onClick={() => { onSignOut(); navigate('/'); }}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-red-700 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-xl ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      <main className="flex-1 container-page py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
          </div>
        ) : (
          <>
            {/* DASHBOARD TAB */}
            {tab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name} 👋</h1>
                  <p className="text-sm text-slate-500 mt-1">Here's what's happening with Taj Traders today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {stats.map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} mb-3`}>
                        <Icon className={`h-5 w-5 ${color}`} />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={() => { setShowForm(true); setEditingId(null); setProductForm(EMPTY_PRODUCT); setTab('products'); }}
                    className="rounded-2xl border border-brand-200 bg-brand-50 p-5 text-left hover:bg-brand-100 transition-colors group"
                  >
                    <Plus className="h-6 w-6 text-brand-700 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-semibold text-slate-900">Add New Product</p>
                    <p className="text-xs text-slate-500 mt-0.5">Add a product to the Taj Traders catalog</p>
                  </button>
                  <button
                    onClick={() => setTab('orders')}
                    className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left hover:bg-amber-100 transition-colors group"
                  >
                    <ShoppingBag className="h-6 w-6 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-semibold text-slate-900">Manage Orders</p>
                    <p className="text-xs text-slate-500 mt-0.5">{orders.filter(o => o.status === 'Pending').length} orders pending your action</p>
                  </button>
                  <button
                    onClick={handleReseed}
                    disabled={seeding}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-left hover:bg-slate-50 transition-colors group"
                  >
                    <RefreshCw className={`h-6 w-6 text-slate-500 mb-2 group-hover:scale-110 transition-transform ${seeding ? 'animate-spin' : ''}`} />
                    <p className="font-semibold text-slate-900">Reseed Catalog</p>
                    <p className="text-xs text-slate-500 mt-0.5">Reset to 24 seed products from Taj Traders</p>
                  </button>
                </div>

                {/* Recent Orders */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h2>
                  <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Amount</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o._id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <p className="font-medium text-slate-800">{o.customerName || 'Unknown'}</p>
                              <p className="text-[11px] text-slate-400">{o.email || ''}</p>
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell font-semibold text-slate-700">
                              ₹{(o.totalAmount || 0).toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[o.status] || 'bg-slate-100 text-slate-600'}`}>
                                {o.status || 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {orders.length === 0 && (
                          <tr><td colSpan={3} className="py-8 text-center text-slate-400 text-sm">No orders yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {tab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                    <p className="text-sm text-slate-500">{products.length} products in catalog</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReseed}
                      disabled={seeding}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <RefreshCw className={`h-4 w-4 ${seeding ? 'animate-spin' : ''}`} />
                      Reseed
                    </button>
                    <button
                      onClick={() => { setProductForm(EMPTY_PRODUCT); setEditingId(null); setShowForm(true); }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add Product
                    </button>
                  </div>
                </div>

                {/* Product Form */}
                {showForm && (
                  <div className="rounded-2xl border border-brand-200 bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold text-slate-900">
                        {editingId ? 'Edit Product' : 'Add New Product'}
                      </h2>
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
                          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
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
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">MOQ (Min Order Qty)</label>
                        <input name="moq" type="number" min="1" value={productForm.moq} onChange={handleProductChange} className="input-base" />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <input id="bestseller" name="isBestseller" type="checkbox" checked={productForm.isBestseller} onChange={handleProductChange} className="h-4 w-4 rounded border-slate-300 text-brand-700" />
                        <label htmlFor="bestseller" className="text-sm font-medium text-slate-700">Mark as Bestseller</label>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Image URL</label>
                        <input name="imageUrl" value={productForm.imageUrl} onChange={handleProductChange} placeholder="https://..." className="input-base" />
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
                    <table className="w-full text-sm">
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
                        {products.map((p) => (
                          <tr key={p._id || p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                {p.imageUrl ? (
                                  <img src={p.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover border border-slate-200" />
                                ) : (
                                  <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center">
                                    <Package className="h-4 w-4 text-brand-400" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-slate-800 line-clamp-1 max-w-[200px]">{p.name}</p>
                                  <p className="text-[11px] text-slate-400">{p.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">{p.category}</span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-700">
                              ₹{(p.price || 0).toLocaleString('en-IN')}
                              {p.discount > 0 && (
                                <span className="ml-1.5 text-[10px] text-green-600 font-medium">{p.discount}% off</span>
                              )}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                (p.stock || 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                              }`}>
                                {(p.stock || 0) > 0 ? `${p.stock} in stock` : 'Out of stock'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleEdit(p)}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                                  title="Edit"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(p._id || p.id)}
                                  disabled={deletingId === (p._id || p.id)}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  title="Delete"
                                >
                                  {deletingId === (p._id || p.id) ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                          <tr><td colSpan={5} className="py-12 text-center text-slate-400">No products found. Add one or reseed the catalog.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {tab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
                    <p className="text-sm text-slate-500">{orders.length} total orders</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...STATUS_OPTIONS].map((s) => (
                      <button
                        key={s}
                        onClick={() => setOrderFilter(s)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                          orderFilter === s ? 'bg-brand-700 text-white' : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredOrders.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400">
                      No orders with status "{orderFilter}".
                    </div>
                  )}
                  {filteredOrders.map((o) => (
                    <div key={o._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-900">{o.customerName || 'Unknown Customer'}</p>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[o.status] || 'bg-slate-100 text-slate-600'}`}>
                              {o.status || 'Pending'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{o.email} · {o.phone}</p>
                          {o.city && <p className="text-xs text-slate-400">{o.address}, {o.city} {o.pincode}</p>}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-slate-900">₹{(o.totalAmount || 0).toLocaleString('en-IN')}</p>
                          <p className="text-xs text-slate-400">{o.paymentMethod || 'N/A'} · {o.orderType || 'Order'}</p>
                        </div>
                      </div>

                      {o.items && o.items.length > 0 && (
                        <div className="mb-3 border-t border-slate-100 pt-3">
                          <div className="space-y-1">
                            {o.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-xs text-slate-600">
                                <span>{item.name} × {item.quantity}</span>
                                <span>₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {o.notes && (
                        <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-800">
                          <span className="font-semibold">Notes:</span> {o.notes}
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                        <p className="text-xs text-slate-400">
                          {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                        </p>
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-medium text-slate-600">Update Status:</label>
                          <select
                            value={o.status || 'Pending'}
                            onChange={(e) => handleOrderStatus(o._id, e.target.value)}
                            className="rounded-lg border border-slate-300 bg-white py-1 pl-2 pr-6 text-xs font-medium text-slate-700 focus:border-brand-600 focus:outline-none"
                          >
                            {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Taj Traders Admin Portal · Manage your catalog and orders
      </footer>
    </div>
  );
}
