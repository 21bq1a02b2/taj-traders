import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex-1 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-800 py-16 text-white text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-3 text-brand-200 text-lg">
          We'd love to hear from you. Reach out for orders, queries or partnerships.
        </p>
      </section>

      <div className="container-page grid gap-10 py-16 lg:grid-cols-3">
        {/* Contact Info Cards */}
        <div className="space-y-5 lg:col-span-1">
          {[
            {
              icon: MessageCircle,
              color: 'text-[#25D366]',
              bg: 'bg-green-50',
              title: 'WhatsApp',
              subtitle: 'Fastest response',
              value: '+91 99663 35074',
              href: 'https://wa.me/919966335074',
            },
            {
              icon: Phone,
              color: 'text-brand-700',
              bg: 'bg-brand-50',
              title: 'Phone',
              subtitle: 'Mon–Sat, 10am–7pm',
              value: '+91 99663 35074',
              href: 'tel:+919966335074',
            },
            {
              icon: Mail,
              color: 'text-slate-600',
              bg: 'bg-slate-50',
              title: 'Email',
              subtitle: 'Response within 24 hrs',
              value: 'info@tajtraders.com',
              href: 'mailto:info@tajtraders.com',
            },
            {
              icon: MapPin,
              color: 'text-rose-500',
              bg: 'bg-rose-50',
              title: 'Location',
              subtitle: 'Warehouse & Head Office',
              value: 'Hyderabad, Telangana, India',
              href: null,
            },
            {
              icon: Clock,
              color: 'text-amber-600',
              bg: 'bg-amber-50',
              title: 'Business Hours',
              subtitle: 'Walk-ins by appointment',
              value: 'Mon–Sat: 10am to 7pm',
              href: null,
            },
          ].map(({ icon: Icon, color, bg, title, subtitle, value, href }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm font-semibold text-slate-800 hover:text-brand-700 transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919966335074?text=Hello%20Taj%20Traders%2C%20I%20have%20a%20query!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white hover:bg-[#20B358] transition-colors shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp Now
          </a>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                <p className="mt-2 text-slate-600">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="mt-6 rounded-xl bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="input-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@salon.com"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <select name="subject" value={form.subject} onChange={handleChange} className="input-base">
                      <option value="">Select a topic</option>
                      <option value="product-query">Product Query</option>
                      <option value="bulk-order">Bulk Order / Wholesale</option>
                      <option value="order-status">Order Status</option>
                      <option value="return-refund">Return / Refund</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="input-base resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white hover:bg-brand-800 transition-colors disabled:opacity-60 shadow-sm"
                  >
                    {loading ? (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
