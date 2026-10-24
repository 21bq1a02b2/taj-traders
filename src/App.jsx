import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import OffersPage from './pages/OffersPage';
import BulkOrdersPage from './pages/BulkOrdersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// ─── Scroll to top on route change ──────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

// ─── Protected Admin Route ────────────────────────────────────────────────────
function AdminRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

// ─── Layout wrapper (Announcement + Navbar + Footer) ─────────────────────────
function Layout({ children, searchTerm, setSearchTerm, cartCount, onOpenCart, user, onSignOut, onSelectCategory }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        user={user}
        onSignOut={onSignOut}
      />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer onSelectCategory={onSelectCategory || (() => {})} />
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function AppInner() {
  // ── User / auth state ────────────────────────────────────────────────────
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('taj_traders_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('taj_traders_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('taj_traders_user');
  };

  // ── Cart state ────────────────────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('taj_traders_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('taj_traders_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => (item._id || item.id) === (product._id || product.id));
      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === (product._id || product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 30)}${product.name.length > 30 ? '…' : ''}" to cart!`);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) { handleRemoveFromCart(id); return; }
    setCart((prev) =>
      prev.map((item) => ((item._id || item.id) === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // ── Modal / overlay state ─────────────────────────────────────────────────
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // ── Search (shared across pages) ─────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── Shared props ──────────────────────────────────────────────────────────
  const sharedProductProps = {
    onAddToCart: handleAddToCart,
    onOpenQuickView: setQuickViewProduct,
    showToast,
  };

  const layoutProps = {
    searchTerm,
    setSearchTerm,
    cartCount,
    onOpenCart: () => setIsCartOpen(true),
    user,
    onSignOut: handleSignOut,
  };

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ── Admin (no layout wrapper, fully self-contained) ─────────────── */}
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminPage user={user} onSignOut={handleSignOut} />
            </AdminRoute>
          }
        />

        {/* ── Auth pages (no footer/navbar needed beyond minimal) ─────────── */}
        <Route
          path="/login"
          element={
            <div className="flex min-h-screen flex-col bg-slate-50">
              <AnnouncementBar />
              <Navbar {...layoutProps} />
              <main className="flex flex-1 flex-col">
                <SignInPage onSignIn={handleSignIn} />
              </main>
              <Footer onSelectCategory={() => {}} />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="flex min-h-screen flex-col bg-slate-50">
              <AnnouncementBar />
              <Navbar {...layoutProps} />
              <main className="flex flex-1 flex-col">
                <RegisterPage onSignIn={handleSignIn} />
              </main>
              <Footer onSelectCategory={() => {}} />
            </div>
          }
        />

        {/* ── Main pages ──────────────────────────────────────────────────── */}
        <Route
          path="/"
          element={
            <Layout {...layoutProps}>
              <HomePage {...sharedProductProps} />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout {...layoutProps}>
              <ProductsPage
                {...sharedProductProps}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout {...layoutProps}>
              <CategoriesPage />
            </Layout>
          }
        />
        <Route
          path="/offers"
          element={
            <Layout {...layoutProps}>
              <OffersPage {...sharedProductProps} />
            </Layout>
          }
        />
        <Route
          path="/bulk-orders"
          element={
            <Layout {...layoutProps}>
              <BulkOrdersPage showToast={showToast} />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout {...layoutProps}>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout {...layoutProps}>
              <ContactPage />
            </Layout>
          }
        />

        {/* ── 404 ─────────────────────────────────────────────────────────── */}
        <Route
          path="*"
          element={
            <Layout {...layoutProps}>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>

      {/* ── Global Overlays (rendered above all routes) ───────────────────── */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderSuccess={() => {
          setCart([]);
          setIsCheckoutOpen(false);
          showToast('Order confirmed! Thank you for shopping with Taj Traders 🎉', 'success');
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
