import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';

export default function SignInPage({ onSignIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter email and password.');
      return;
    }

    setLoading(true);
    // Simulate auth: admin@tajtraders.com / admin123 → admin, any other → customer
    await new Promise((r) => setTimeout(r, 800));

    if (formData.email === 'admin@tajtraders.com' && formData.password === 'admin123') {
      onSignIn({ name: 'Admin', email: formData.email, role: 'admin' });
      navigate('/admin');
    } else if (formData.email && formData.password.length >= 4) {
      const name = formData.email.split('@')[0];
      onSignIn({ name: name.charAt(0).toUpperCase() + name.slice(1), email: formData.email, role: 'customer' });
      navigate('/');
    } else {
      setErrorMsg('Invalid email or password.');
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 bg-white">
      {/* Page header bar */}
      <div className="border-b border-slate-200 bg-slate-50 py-6 text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">TT</span>
          <span className="text-sm font-semibold text-slate-700">Taj Traders</span>
        </Link>
      </div>

      {/* Sign In Form matching sreegopitraders.com/login */}
      <div className="container-page max-w-lg py-16">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Sign in to your account
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Order at wholesale rates from{' '}
            <span className="font-medium text-brand-700">Taj Traders</span>.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@salon.com"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-base pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-700 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-500">
            New to us?{' '}
            <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
              Register your business
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
