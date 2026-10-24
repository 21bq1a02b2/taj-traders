import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Building,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ShoppingBag,
  LogOut,
  UserPlus,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';
import { loginUser, registerUser } from '../api';

export default function LoginPage({
  initialTab = 'register', // Default: First register page
  currentUser,
  onLoginSuccess,
  onLogout,
  onBackToStore,
  onNavigateToAdminPortal,
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'register' | 'login' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Register form state (First register page)
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    salonName: '',
    phone: '',
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Admin login form state
  const [adminEmail, setAdminEmail] = useState('admin@tajtraders.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  const handleQuickLogin = async (email, password) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await loginUser({ email, password });
      setSuccessMessage(res.message || 'Logged in successfully!');
      if (onLoginSuccess) {
        onLoginSuccess(res.user, res.token);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regData.name.trim() || !regData.email.trim() || !regData.password) {
      setErrorMessage('Please fill in your name, email and password.');
      return;
    }
    if (regData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const res = await registerUser({
        ...regData,
        role: 'customer', // Customer portal registration
      });
      // Step 1: Register done -> Step 2: Transition to Login page!
      setLoginEmail(regData.email.trim());
      setSuccessMessage('Registration successful! Please sign in with your password to access Taj Traders.');
      setActiveTab('login');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try a different email.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const res = await loginUser({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      setSuccessMessage(`Welcome back! Loading your dashboard...`);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(res.user, res.token);
        }
      }, 500);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await loginUser({
        email: adminEmail.trim(),
        password: adminPassword,
      });
      if (res.user.role !== 'admin') {
        throw new Error('This account does not have Admin Portal privileges.');
      }
      setSuccessMessage('Admin credentials verified! Entering Taj Traders Admin Portal...');
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(res.user, res.token);
        }
      }, 500);
    } catch (err) {
      setErrorMessage(err.message || 'Admin authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Store</span>
          </button>

          <div
            onClick={onBackToStore}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-400 flex items-center justify-center text-white shadow-sm shadow-rose-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 uppercase">
              Taj Traders
            </span>
          </div>

          <div className="w-24 sm:w-32" />
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-md w-full space-y-6">
          {/* Brand Introduction */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-400 text-white shadow-lg shadow-rose-200 mb-1">
              <Sparkles className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentUser ? 'Your Taj Traders Profile' : 'Taj Traders Portal'}
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {currentUser
                ? `Signed in as ${currentUser.name} (${currentUser.role === 'admin' ? 'Store Admin' : 'Customer'})`
                : 'First register your account, then sign in to access your customer dashboard with catalog and search bar.'}
            </p>
          </div>

          {/* If already logged in, show User Card */}
          {currentUser ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl font-black shrink-0 border border-rose-200 overflow-hidden shadow-sm">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    currentUser.name?.slice(0, 2).toUpperCase() || 'TT'
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 text-lg">
                      {currentUser.name}
                    </h3>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        currentUser.role === 'admin'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {currentUser.role === 'admin' ? 'Store Admin' : 'Customer'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>
                  {currentUser.salonName && (
                    <p className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {currentUser.salonName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onBackToStore}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-200 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Go to Customer Dashboard</span>
                </button>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={onNavigateToAdminPortal}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-rose-400" />
                    <span>Enter Admin Portal (Add Products)</span>
                  </button>
                )}

                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Account</span>
                </button>
              </div>
            </div>
          ) : (
            /* Auth Card with Tabs */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
              {/* Quick 1-Click Demo Buttons */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-3.5 rounded-2xl border border-rose-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    Instant 1-Click Demo Access:
                  </span>
                  <span className="text-[10px] bg-rose-200 text-rose-800 px-1.5 py-0.2 rounded font-bold">
                    Quick Test
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('customer@tajtraders.com', 'user123')}
                    disabled={loading}
                    className="p-2 bg-white hover:bg-rose-100/50 rounded-xl border border-rose-200 text-left transition-all active:scale-95 shadow-xs"
                  >
                    <span className="font-extrabold text-slate-900 text-xs block">👤 User Portal</span>
                    <span className="text-[10px] text-slate-500 font-medium">View & Buy Products</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin@tajtraders.com', 'admin123')}
                    disabled={loading}
                    className="p-2 bg-white hover:bg-rose-100/50 rounded-xl border border-rose-200 text-left transition-all active:scale-95 shadow-xs"
                  >
                    <span className="font-extrabold text-slate-900 text-xs block">🛡️ Admin Portal</span>
                    <span className="text-[10px] text-slate-500 font-medium">Add Products Only</span>
                  </button>
                </div>
              </div>

              {/* Tab Selector: 1. Register (First) | 2. User Sign In | 3. Admin Portal */}
              <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl gap-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`py-2 rounded-lg transition-all ${
                    activeTab === 'register'
                      ? 'bg-white text-rose-600 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1. Register First
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`py-2 rounded-lg transition-all ${
                    activeTab === 'login'
                      ? 'bg-white text-rose-600 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2. User Login
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('admin');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`py-2 rounded-lg transition-all ${
                    activeTab === 'admin'
                      ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  3. Admin Login
                </button>
              </div>

              {/* Status Alert Messages */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* TAB 1: FIRST REGISTER PAGE */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 text-xs text-rose-800 space-y-0.5">
                    <p className="font-extrabold">New User Registration</p>
                    <p className="text-[11px] text-rose-700">
                      Register your account below. After registering, your Customer Dashboard will open with the search bar and product catalog!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={regData.name}
                        onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={regData.email}
                        onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                        placeholder="e.g. priya@glamstudio.com"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Create Password (min 6 characters) *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regData.password}
                        onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Salon / Parlour Name
                      </label>
                      <input
                        type="text"
                        value={regData.salonName}
                        onChange={(e) => setRegData({ ...regData, salonName: e.target.value })}
                        placeholder="Optional"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={regData.phone}
                        onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                        placeholder="Optional"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-200 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Registering & Setting Up Dashboard...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Register & Open User Dashboard</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <span className="text-xs text-slate-500">Already registered? </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Click here to Login
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: USER LOGIN PAGE */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-0.5">
                    <p className="font-bold text-slate-800">Customer Sign In</p>
                    <p className="text-[11px] text-slate-500">
                      Login to open your user dashboard with live product search and cart.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="customer@tajtraders.com"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-200 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <span>Sign In & Open User Dashboard</span>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <span className="text-xs text-slate-500">Don't have an account? </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Register first
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: ADMIN PORTAL LOGIN */}
              {activeTab === 'admin' && (
                <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                  <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 text-xs space-y-0.5">
                    <p className="font-bold flex items-center gap-1.5 text-rose-400">
                      <KeyRound className="w-3.5 h-3.5" />
                      Taj Traders Administrator Portal
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Restricted to store owners. Only Admins can add products and manage catalog inventory.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="admin@tajtraders.com"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Master Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Admin Authorization...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-rose-400" />
                        <span>Access Admin Portal (Add Products)</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Security reassurance */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-Bit SSL Encrypted & Verified Taj Traders Portals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
