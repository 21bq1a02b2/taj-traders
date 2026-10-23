import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Settings,
  Sparkles,
  X,
  Plus,
  User,
  LogOut,
  ChevronDown,
  Store,
  Building,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  LayoutDashboard,
} from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenAdmin,
  dbStatus,
  currentUser,
  activePortal, // 'user' | 'admin'
  currentView,
  onNavigateToUserDashboard,
  onNavigateToAdminPortal,
  onNavigateToRegister,
  onNavigateToLogin,
  onLogout,
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const isAdmin = currentUser?.role === 'admin';

  // Close user menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
          {/* Logo & Brand: Taj Traders */}
          <div
            onClick={activePortal === 'admin' ? onNavigateToAdminPortal : onNavigateToUserDashboard}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 uppercase">
                  Taj Traders
                </span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase ${
                    activePortal === 'admin'
                      ? 'bg-slate-900 text-amber-300'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {activePortal === 'admin' ? 'ADMIN' : 'PRO'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold tracking-wide flex items-center gap-1">
                {activePortal === 'admin' ? (
                  <span className="text-amber-700 font-bold">🛡️ Store Admin Portal</span>
                ) : (
                  <span>Cosmetics & Salon Supplies</span>
                )}
              </p>
            </div>
          </div>

          {/* Navigation Links based on Active Portal */}
          <nav className="hidden lg:flex items-center gap-2 pl-2">
            {activePortal === 'admin' ? (
              /* Admin Portal Navigation (Admin Only) */
              <>
                <button
                  onClick={onNavigateToAdminPortal}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentView === 'admin'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <span>Admin Studio</span>
                </button>

                {/* ADMIN ONLY ADDS PRODUCTS */}
                <button
                  onClick={onNavigateToAdminPortal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-xs"
                  title="Only Admins can add products"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Product (Admin Only)</span>
                </button>

                <button
                  onClick={onNavigateToUserDashboard}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  <Store className="w-3.5 h-3.5 text-slate-400" />
                  <span>Customer View</span>
                </button>
              </>
            ) : (
              /* Customer Portal Navigation (View & Buy) */
              <>
                <button
                  onClick={onNavigateToUserDashboard}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentView === 'dashboard'
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-rose-500" />
                  <span>User Dashboard & Shop</span>
                </button>

                <button
                  onClick={onNavigateToAdminPortal}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                  title="Store Administrator Access"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin Portal</span>
                </button>
              </>
            )}
          </nav>

          {/* Search Bar (in User Portal on desktop) */}
          {activePortal === 'user' && (
            <div className="flex-1 max-w-md mx-2 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search shampoos, facial kits, lipsticks, hair masks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 rounded-full text-xs font-medium border border-transparent focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Wishlist count (User Portal) */}
            {activePortal === 'user' && (
              <div
                onClick={onNavigateToUserDashboard}
                className="relative p-2.5 text-slate-600 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
            )}

            {/* Cart Button (View and Buy) */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-xl shadow-sm shadow-rose-300 font-semibold text-xs sm:text-sm transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-white text-rose-600 text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">Cart</span>
            </button>

            {/* User Account / Portal Profile Menu */}
            <div className="relative" ref={userMenuRef}>
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-all text-xs font-bold text-slate-800"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                      {currentUser.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        currentUser.name?.slice(0, 1).toUpperCase() || 'U'
                      )}
                    </div>
                    <span className="hidden sm:inline max-w-[90px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-xs text-slate-900 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono truncate">
                          {currentUser.email}
                        </p>
                        <span
                          className={`inline-block mt-1 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                            currentUser.role === 'admin'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {currentUser.role === 'admin' ? 'Store Administrator' : 'Customer Account'}
                        </span>
                      </div>

                      <div className="py-1 text-xs">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onNavigateToUserDashboard();
                          }}
                          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-rose-500" />
                          <span>Customer Dashboard</span>
                        </button>

                        {/* Admin Only Option in Dropdown */}
                        {currentUser.role === 'admin' ? (
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              onNavigateToAdminPortal();
                            }}
                            className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
                          >
                            <ShieldCheck className="w-4 h-4 text-rose-600" />
                            <span>Admin Portal (+ Add Product)</span>
                          </button>
                        ) : null}

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenCart();
                          }}
                          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4 text-slate-400" />
                          <span>My Cart & Checkout</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Not Logged In: "Register First / Login" */
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onNavigateToRegister}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    title="Register new account"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </button>

                  <button
                    onClick={onNavigateToLogin}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    title="User or Admin Login"
                  >
                    <User className="w-4 h-4 text-rose-400" />
                    <span>Login</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
