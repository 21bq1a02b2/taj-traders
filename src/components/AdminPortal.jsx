import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Plus,
  Package,
  ShoppingBag,
  Database,
  ArrowLeft,
  Trash2,
  Edit2,
  Eye,
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  Truck,
  Sparkles,
  Lock,
  LayoutGrid,
  List,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import AddProductPage from './AddProductPage';
import { fetchOrders, updateOrderStatus, deleteProduct, resetSeedData } from '../api';

export default function AdminPortal({
  currentUser,
  products,
  onProductCreated,
  onRefreshProducts,
  onSwitchToCustomerStore,
  onOpenAdminLogin,
  dbStatus,
}) {
  // Default to 'inventory' so admin immediately sees products & delete buttons!
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'add-product' | 'orders'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchInventory, setSearchInventory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusMessage, setStatusMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    if (isAdmin && activeTab === 'orders') {
      loadOrders();
    }
  }, [isAdmin, activeTab]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetchOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}" from Taj Traders catalog?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProduct(id);
      setStatusMessage(`Successfully deleted "${name}" from store catalog.`);
      if (onRefreshProducts) {
        await onRefreshProducts();
      }
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert(err.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReseedCatalog = async () => {
    if (!window.confirm('Restore all 52+ default salon products to the catalog?')) return;
    try {
      const res = await resetSeedData();
      setStatusMessage(res.message || 'Catalog restored with full default products!');
      if (onRefreshProducts) {
        await onRefreshProducts();
      }
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      alert(err.message || 'Failed to reset catalog');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  // If not logged in as Admin, show Access Guard
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
              Restricted Area
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Admin Portal Access Only
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Only authorized Taj Traders administrators can add products or delete items from the store catalog.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={onOpenAdminLogin}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-200 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In as Taj Admin</span>
            </button>

            <button
              onClick={onSwitchToCustomerStore}
              className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Return to Customer Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter products by search and category
  const filteredInventory = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchInventory.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchInventory.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchInventory.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    'All',
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
    <div className="space-y-6">
      {/* Admin Portal Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-purple-900/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Taj Traders Admin Studio
              </h1>
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-purple-500/30">
                Administrator
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as <strong>{currentUser.name}</strong> • Add new products, delete discontinued items, and manage orders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleReseedCatalog}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
            title="Restore default catalog products"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset / Restore Catalog</span>
          </button>

          <button
            onClick={onSwitchToCustomerStore}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#6b21a8] hover:bg-[#581c87] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            title="Preview customer store"
          >
            <Eye className="w-4 h-4" />
            <span>Customer View</span>
          </button>
        </div>
      </div>

      {/* Admin Portal Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold overflow-x-auto">
        {/* Tab 1: Manage & Delete Products (Primary) */}
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'inventory'
              ? 'bg-[#6b21a8] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Trash2 className="w-4 h-4 text-rose-300" />
          <span>Manage & Delete Products ({products.length})</span>
        </button>

        {/* Tab 2: Add New Product */}
        <button
          onClick={() => setActiveTab('add-product')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'add-product'
              ? 'bg-[#6b21a8] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Product (Separate Page)</span>
        </button>

        {/* Tab 3: Customer Orders */}
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'orders'
              ? 'bg-[#6b21a8] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {statusMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* TAB 1: MANAGE & DELETE PRODUCTS */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          {/* Header Controls: Search, Category Filter & View Mode */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-rose-600" />
                <span>Product Management & Deletion Studio</span>
              </h2>
              <p className="text-xs text-slate-500">
                Click the red <strong>Delete</strong> button next to any product to remove it permanently from the store.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              {/* Search filter input */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search product to delete..."
                  value={searchInventory}
                  onChange={(e) => setSearchInventory(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-600 focus:bg-white"
                />
              </div>

              {/* Category filter select */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Categories' : c}
                  </option>
                ))}
              </select>

              {/* View Toggle: Table vs Cards Grid */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Add Product Shortcut */}
              <button
                onClick={() => setActiveTab('add-product')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6b21a8] hover:bg-[#581c87] text-white font-bold text-xs rounded-xl shadow-xs shrink-0 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Product</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: TABLE VIEW WITH EXPLICIT RED DELETE BUTTONS */}
          {viewMode === 'table' ? (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3.5">Product & Brand</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price / MRP</th>
                    <th className="py-3 px-3">Wholesale Slab</th>
                    <th className="py-3 px-3">Stock Units</th>
                    <th className="py-3 px-3.5 text-right font-black text-rose-700">Delete Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400">
                        No products match your search or filter.
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3.5 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-11 h-11 rounded-xl object-contain bg-slate-50 border border-slate-200 shrink-0 p-0.5"
                          />
                          <div className="max-w-xs sm:max-w-sm">
                            <p className="font-bold text-slate-900 truncate text-xs">{p.name}</p>
                            <p className="text-[11px] text-[#6b21a8] font-bold uppercase">{p.brand}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-700">{p.category}</td>
                        <td className="py-3 px-3">
                          <span className="font-black text-slate-900">₹{Number(p.price).toLocaleString()}</span>
                          {p.mrp && Number(p.mrp) > Number(p.price) && (
                            <span className="text-[11px] text-slate-400 line-through ml-1.5">
                              ₹{Number(p.mrp).toLocaleString()}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          {p.wholesaleTierPrice ? (
                            <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200 text-[11px]">
                              ₹{p.wholesaleTierPrice} ({p.minWholesaleQty || 3}+ pcs)
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-700">{p.stock || 25} pcs</td>
                        <td className="py-3 px-3.5 text-right">
                          {/* HIGH VISIBILITY RED DELETE BUTTON */}
                          <button
                            onClick={() => handleDeleteProduct(p._id, p.name)}
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white rounded-xl font-bold text-xs border border-rose-200 hover:border-rose-600 transition-all shadow-xs active:scale-95 disabled:opacity-50"
                            title={`Delete "${p.name}"`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* VIEW MODE 2: CARDS GRID VIEW WITH LARGE RED DELETE BUTTONS */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredInventory.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow relative"
                >
                  <div className="space-y-2">
                    <div className="w-full aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 relative border border-slate-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute top-2 left-2 text-[10px] bg-slate-900/80 text-white font-bold px-1.5 py-0.5 rounded">
                        {p.category}
                      </span>
                    </div>

                    <div>
                      <p className="text-[#6b21a8] text-[10px] font-extrabold uppercase">
                        {p.brand}
                      </p>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-tight">
                        {p.name}
                      </h4>
                    </div>

                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="font-black text-sm text-slate-900">₹{p.price}</span>
                      {p.mrp && <span className="text-[10px] text-slate-400 line-through">₹{p.mrp}</span>}
                    </div>
                  </div>

                  {/* PROMINENT RED DELETE BUTTON AT THE BOTTOM OF THE CARD */}
                  <div className="pt-3 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => handleDeleteProduct(p._id, p.name)}
                      disabled={isDeleting}
                      className="w-full py-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white rounded-xl font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Product</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ADD PRODUCT STUDIO (The separate dedicated add product page) */}
      {activeTab === 'add-product' && (
        <AddProductPage
          onBackToStore={onSwitchToCustomerStore}
          onProductCreated={(p) => {
            onProductCreated(p);
            setActiveTab('inventory');
          }}
          dbStatus={dbStatus}
        />
      )}

      {/* TAB 3: CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-base text-slate-900">
                Customer Purchases & Orders
              </h2>
              <p className="text-xs text-slate-500">
                Manage order delivery status and customer shipping information.
              </p>
            </div>
            <button
              onClick={loadOrders}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700"
              title="Refresh Orders"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {loadingOrders ? (
            <div className="py-12 text-center text-slate-400">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-1">
              <ShoppingBag className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-semibold text-xs">No orders recorded yet.</p>
              <p className="text-[11px]">Orders placed by users in the customer portal will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord._id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800">
                        #{ord._id?.slice(-6).toUpperCase()}
                      </span>
                      <span className="font-bold text-slate-900">{ord.customerName}</span>
                      <span className="text-slate-400">({ord.phone})</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      {ord.address}, {ord.city} - {ord.pincode}
                    </p>
                    <p className="text-slate-600 font-semibold">
                      Items: {ord.items?.length || 0} product(s) • Total: ₹{ord.totalAmount?.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500">Status:</span>
                    <select
                      value={ord.status || 'Pending'}
                      onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-bold text-xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
