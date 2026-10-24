import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Banknote,
  CreditCard,
  Smartphone,
  ShoppingBag,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { createOrder } from '../api';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Telangana',
    pincode: '',
    paymentMethod: 'Cash on Delivery',
    orderType: 'Wholesale Bulk',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  let subtotal = 0;
  cartItems.forEach((item) => {
    const isWholesale =
      item.wholesaleTierPrice &&
      item.quantity >= (item.minWholesaleQty || 3);
    const unitPrice = isWholesale ? item.wholesaleTierPrice : item.price;
    subtotal += unitPrice * item.quantity;
  });

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const totalAmount = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      setErrorMsg('Please fill in all required shipping fields (*)');
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        ...formData,
        items: cartItems.map((item) => ({
          product: item._id || item.id,
          name: item.name,
          image: item.image,
          price:
            item.wholesaleTierPrice && item.quantity >= (item.minWholesaleQty || 3)
              ? item.wholesaleTierPrice
              : item.price,
          quantity: item.quantity,
          volumeOrWeight: item.volumeOrWeight,
        })),
        subtotal,
        shippingFee,
        totalAmount,
      };

      const res = await createOrder(orderPayload);
      setCompletedOrder(res.data);
      onOrderSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-700" />
            <h2 className="font-bold text-slate-900 text-lg">
              {completedOrder ? 'Order Confirmed!' : 'Taj Traders Checkout & Delivery'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Screen */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">Thank You for Ordering with Taj Traders!</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your order has been saved in the database. Our warehouse dispatch team will contact you on WhatsApp / Phone to confirm shipping.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-slate-800">{completedOrder._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-800">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Amount:</span>
                <span className="font-black text-brand-700 text-sm">
                  ₹{completedOrder.totalAmount?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-slate-800">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                  {completedOrder.status}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            {/* Order Type */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, orderType: 'Wholesale Bulk' })}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  formData.orderType === 'Wholesale Bulk'
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Salon &amp; Parlour Wholesale Order
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, orderType: 'Retail' })}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  formData.orderType === 'Retail'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Retail / Personal Order
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Full Name / Salon Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="e.g. Royal Beauty Parlour / Imran Khan"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-600 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Phone / WhatsApp Mobile *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 9966335074"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-600 focus:bg-white outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Shop / House No, Street, Landmark"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-600 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Hyderabad / Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-600 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="e.g. 500001"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-600 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="block text-slate-700 font-bold text-xs">
                Payment Option:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
                  { id: 'UPI Simulation', label: 'UPI / QR Code', icon: Smartphone },
                  { id: 'Online Card Simulation', label: 'Card Payment', icon: CreditCard },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = formData.paymentMethod === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: mode.id })}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-brand-700 bg-brand-50 text-brand-800 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1 text-slate-700" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal ({cartItems.length} products):</span>
                <span className="font-bold text-slate-800">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Pan-India Courier / Shipping:</span>
                <span className="font-bold text-slate-800">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Payable:</span>
                <span className="text-brand-700">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-700 hover:bg-brand-800 active:scale-98 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-200 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Placing Order in Database...</span>
                </>
              ) : (
                <>
                  <span>Confirm Order (₹{totalAmount.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
