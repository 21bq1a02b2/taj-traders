import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle } from 'lucide-react';

export default function RegisterPage({ onSignIn }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    salonName: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    // Simulate registration: auto sign-in as customer
    if (onSignIn) {
      onSignIn({ name: form.name, email: form.email, role: 'customer' });
    }
    setLoading(false);
    setDone(true);
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="flex-1 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 py-6 text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">TT</span>
          <span className="text-sm font-semibold text-slate-700">Taj Traders</span>
        </Link>
      </div>

      <div className="container-page max-w-lg py-14">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Register Your Business</h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Join 166+ salons and parlours buying wholesale from{' '}
            <span className="font-medium text-brand-700">Taj Traders</span>.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
          {done ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
              <h3 className="text-lg font-bold text-slate-900">Registration Successful!</h3>
              <p className="mt-1 text-sm text-slate-600">Redirecting you to the homepage…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">{error}</div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Full name" className="input-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Salon / Business Name <span className="text-red-500">*</span>
                  </label>
                  <input name="salonName" required value={form.salonName} onChange={handleChange} placeholder="Beauty Salon" className="input-base" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 99999 99999" className="input-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input name="city" required value={form.city} onChange={handleChange} placeholder="Hyderabad" className="input-base" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@salon.com" className="input-base" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input name="password" type="password" required value={form.password} onChange={handleChange} placeholder="Min 4 chars" className="input-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" className="input-base" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-700 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? 'Registering…' : 'Create Account'}
              </button>
              <p className="text-center text-xs text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
                  Sign In
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
