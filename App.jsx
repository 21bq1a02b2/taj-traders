import React, { useState, useEffect } from 'react';
import StoreLandingPage from './components/StoreLandingPage';
import AdminPortal from './components/AdminPortal';
import LoginPage from './components/LoginPage';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { fetchProducts, fetchCategories, deleteProduct } from './api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('');

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('taj_traders_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sequential Flow:
  // 1. 'register' (First register page)
  // 2. 'login' (After register, login page)
  // 3. 'store' (After login, landing page identical to reference site)
  // 4. 'admin' (Admin portal: admin only adds products)
  const getInitialRouting = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#admin' || hash === '#admin-portal' || hash === '#add-product') {
      return { portal: 'admin', view: 'admin' };
    }
    if (hash === '#store' || hash === '#products' || hash === '#dashboard') {
      return { portal: 'user', view: 'store' };
    }
    if (hash === '#login' || hash === '#/login') {
      return { portal: 'user', view: 'login' };
    }
    if (hash === '#register' || hash === '#/register') {
      return { portal: 'user', view: 'register' };
    }

    // Default flow: If user is logged in -> show Store Landing Page;
    // If NOT logged in -> Step 1: First Register Page!
    const savedUser = localStorage.getItem('taj_traders_user');
    if (savedUser) {
      return { portal: 'user', view: 'store' };
    }
    return { portal: 'user', view: 'register' };
  };

  const initialRoute = getInitialRouting();
  const [activePortal, setActivePortal] = useState(initialRoute.portal);
  const [currentView, setCurrentView] = useState(initialRoute.view);

  // Filters & Sorting in Store / Landing Page
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wholesaleOnly, setWholesaleOnly] = useState(false);

  // Cart & Wishlist
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('taj_traders_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('taj_traders_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Hash Navigation Handler
  useEffect(() => {
    const handleHashChange = () => {
      const route = getInitialRouting();
      setActivePortal(route.portal);
      setCurrentView(route.view);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (portal, view, hash = '') => {
    setActivePortal(portal);
    setCurrentView(view);
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('taj_traders_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('taj_traders_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Auth Handlers
  const handleLoginSuccess = (user, token) => {
    setCurrentUser(user);
    localStorage.setItem('taj_traders_user', JSON.stringify(user));
    if (token) localStorage.setItem('taj_traders_token', token);

    if (user.role === 'admin') {
      showToast(`Welcome to Taj Traders Admin Portal, ${user.name}!`);
      navigateTo('admin', 'admin', '#admin-portal');
    } else {
      showToast(`Welcome to Taj Traders, ${user.name}!`);
      // Step 3: Later Landing Page opens!
      navigateTo('user', 'store', '#store');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('taj_traders_user');
    localStorage.removeItem('taj_traders_token');
    showToast('Signed out of Taj Traders', 'info');
    navigateTo('user', 'login', '#login');
  };

  // Catalog Loader
  const loadCatalog = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (selectedBrand && selectedBrand !== 'All') {
        params.brand = selectedBrand;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }
      if (sortBy) {
        params.sort = sortBy;
      }
      if (priceMin > 0) {
        params.minPrice = priceMin;
      }
      if (priceMax < 100000) {
        params.maxPrice = priceMax;
      }

      const [prodRes, catRes] = await Promise.all([
        fetchProducts(params),
        fetchCategories(),
      ]);

      let list = prodRes.data || [];
      if (wholesaleOnly) {
        list = list.filter((p) => p.wholesaleTierPrice);
      }
      if (inStockOnly) {
        list = list.filter((p) => (p.stock || 25) > 0);
      }

      setProducts(list);
      setDbStatus(prodRes.dbStatus || 'Connected');
      setCategories(catRes.data || []);
    } catch (err) {
      console.error('Failed to load Taj Traders catalog:', err);
      showToast('Could not connect to backend API', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, [selectedCategory, selectedBrand, sortBy, priceMin, priceMax, wholesaleOnly, inStockOnly]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      loadCatalog();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Cart Operations (View & Buy)
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added "${product.name?.slice(0, 26)}..." to cart!`);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    showToast('Item removed from cart', 'info');
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product._id);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== product._id);
      } else {
        showToast('Added to wishlist', 'success');
        return [...prev, product._id];
      }
    });
  };

  const handleDeleteProduct = async (product) => {
    if (!product?._id) return;
    if (!window.confirm(`Are you sure you want to permanently delete "${product.name}" from Taj Traders?`)) {
      return;
    }
    try {
      await deleteProduct(product._id);
      showToast(`Deleted "${product.name?.slice(0, 24)}..." from catalog`, 'info');
      loadCatalog();
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'error');
    }
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* STEP 1 & 2: FIRST REGISTER PAGE, THEN LOGIN PAGE */}
      {(currentView === 'register' || currentView === 'login') && (
        <LoginPage
          initialTab={currentView === 'register' ? 'register' : 'login'}
          currentUser={currentUser}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          onBackToStore={() => navigateTo('user', 'store', '#store')}
          onNavigateToAdminPortal={() => navigateTo('admin', 'admin', '#admin-portal')}
        />
      )}

      {/* ADMIN PORTAL: ADMIN ONLY ADDS PRODUCTS & MANAGES CATALOG */}
      {activePortal === 'admin' && currentView === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <AdminPortal
            currentUser={currentUser}
            products={products}
            onProductCreated={(newProd) => {
              showToast(`"${newProd.name}" added to Taj Traders!`, 'success');
              loadCatalog();
            }}
            onRefreshProducts={loadCatalog}
            onSwitchToCustomerStore={() => navigateTo('user', 'store', '#store')}
            onOpenAdminLogin={() => navigateTo('user', 'login', '#login')}
            dbStatus={dbStatus}
          />
        </div>
      )}

      {/* STEP 3: LATER LANDING PAGE (Exact match to reference site https://sreegopitraders.com/products) */}
      {activePortal === 'user' && currentView === 'store' && (
        <>
          <StoreLandingPage
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            wholesaleOnly={wholesaleOnly}
            setWholesaleOnly={setWholesaleOnly}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAdminPortal={() => navigateTo('admin', 'admin', '#admin-portal')}
            currentUser={currentUser}
            onLogout={handleLogout}
            onNavigateToLogin={() => navigateTo('user', 'login', '#login')}
            onNavigateToRegister={() => navigateTo('user', 'register', '#register')}
            onAddToCart={handleAddToCart}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onDeleteProduct={handleDeleteProduct}
            loading={loading}
          />

          <Footer
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* Quick View Details Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderSuccess={() => {
          setCart([]);
          showToast('Order confirmed! Taj Traders dispatch is preparing your items.', 'success');
        }}
      />

      {/* Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
