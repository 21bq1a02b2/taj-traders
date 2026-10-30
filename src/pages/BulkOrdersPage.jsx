import React, { useState } from 'react';
import {
  ClipboardList,
  FileText,
  CheckCircle,
  Truck,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { createOrder } from '../api';

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    requirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.phone || !formData.requirements) {
      setErrorMsg('Please complete all required fields (*)');
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        customerName: `${formData.contactPerson} (${formData.companyName})`,
        phone: formData.phone,
        email: formData.email,
        city: formData.city || 'India',
        address: `Bulk Requirement: ${formData.requirements}`,
        pincode: '000000',
        orderType: 'Wholesale Bulk Quote',
        paymentMethod: 'WhatsApp Inquiry',
        notes: formData.requirements,
        subtotal: 0,
        totalAmount: 0,
        items: [],
      });

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Taj Traders, I'd like a bulk quote.\nSalon/Business: ${formData.companyName || 'My Salon'}\nContact: ${formData.contactPerson || 'Owner'}\nPhone: ${formData.phone || ''}\nCity: ${formData.city || ''}\nRequirement: ${formData.requirements || 'Complete salon setup / bulk supplies'}`
  );

  return (
    <div className="flex-1 bg-white">
      {/* Dark Hero Banner matching Image 1 */}
      <section className="bg-slate-950 py-16 sm:py-20 text-white border-b border-slate-800">
        <div className="container-page max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/10 text-brand-300 ring-1 ring-inset ring-white/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Wholesale &amp; Bulk Procurement
          </span>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Bulk orders, quoted for your business
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300 max-w-3xl">
            Opening a new salon, running a chain, or stocking an academy? Send us your requirement
            and we will come back with a custom rate — better than the listed wholesale tiers on large quantities.
          </p>
        </div>
      </section>

      {/* 4 Step Cards matching Image 1 */}
      <section className="container-page py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Step 1 */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 font-bold">
                <ClipboardList className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step 1
              </span>
            </div>
            <h2 className="mt-3.5 text-sm font-semibold text-slate-900">Send your requirement</h2>
            <p className="mt-1 text-sm text-slate-600">List the products and quantities you need.</p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 font-bold">
                <FileText className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step 2
              </span>
            </div>
            <h2 className="mt-3.5 text-sm font-semibold text-slate-900">We prepare a quote</h2>
            <p className="mt-1 text-sm text-slate-600">Our team reviews stock and prices your order.</p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 font-bold">
                <CheckCircle className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step 3
              </span>
            </div>
            <h2 className="mt-3.5 text-sm font-semibold text-slate-900">Approve and order</h2>
            <p className="mt-1 text-sm text-slate-600">Accept the quote and we convert it to an order.</p>
          </div>

          {/* Step 4 */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 font-bold">
                <Truck className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step 4
              </span>
            </div>
            <h2 className="mt-3.5 text-sm font-semibold text-slate-900">Dispatch</h2>
            <p className="mt-1 text-sm text-slate-600">Bulk consignments dispatched on a scheduled date.</p>
          </div>
        </div>
      </section>

      {/* Quote Form & Sidebar Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          {/* Left Form */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Request a bulk quote
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Tell us what you need. We usually respond within one working day.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Quote Request Submitted!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you! Our wholesale procurement desk has received your list. We will calculate tiered pricing and get back to you shortly.
                  </p>
                  <div className="pt-3">
                    <a
                      href={`https://wa.me/918919733026?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Forward Directly to WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Salon / Business Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        placeholder="e.g. Royal Glow Unisex Salon"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        placeholder="e.g. Imran Khan"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. 8919733026"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        City / State
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="e.g. Hyderabad, Telangana"
                        value={formData.city}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. salon@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Required Products &amp; Approximate Quantities *
                    </label>
                    <textarea
                      rows={5}
                      name="requirements"
                      required
                      placeholder="e.g. 
- 5x Barber Station Cordless Clippers
- 10x Liposoluble Hard Wax (1kg)
- 2x Facial Ozone Steamer Combo Stations
- 20x Keratin Repair Hair Masks (Salon Packs)"
                      value={formData.requirements}
                      onChange={handleChange}
                      className="input-base"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Quote Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">
            {/* Card 1: Prefer to talk? */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h3 className="text-base font-semibold text-slate-900">Prefer to talk?</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                Send your list on WhatsApp and we will quote directly in chat.
              </p>
              <div className="mt-4">
                <a
                  href="https://wa.me/918919733026?text=Hello%20Taj%20Traders%2C%20I'd%20like%20a%20bulk%20quote.%20My%20requirement%20is%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors bg-[#25D366] text-white hover:bg-[#1eb455]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Card 2: Typical bulk requirements */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h3 className="text-base font-semibold text-slate-900">Typical bulk requirements</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                  <span>Complete new salon or parlour setup</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                  <span>Monthly consumables for multi-chair salons</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                  <span>Academy kits for student batches</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                  <span>Furniture and equipment fit-outs</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                  <span>Chain-wide restocking across branches</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
