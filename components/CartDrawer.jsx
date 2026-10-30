import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  MessageCircle,
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;

  let subtotal = 0;
  let regularSubtotal = 0;

  cartItems.forEach((item) => {
    const isWholesale =
      item.wholesaleTierPrice &&
      item.quantity >= (item.minWholesaleQty || 3);
    const unitPrice = isWholesale ? item.wholesaleTierPrice : item.price;
    subtotal += unitPrice * item.quantity;
    regularSubtotal += (item.mrp || item.price) * item.quantity;
  });

  const totalSavings = regularSubtotal - subtotal;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const generateWhatsAppMessage = () => {
    let msg = `*Taj Traders - New Product Order Inquiry*\n\n`;
    cartItems.forEach((item, idx) => {
      const isWs =
        item.wholesaleTierPrice &&
        item.quantity >= (item.minWholesaleQty || 3);
      const rate = isWs ? item.wholesaleTierPrice : item.price;
      msg += `${idx + 1}. *${item.name}*\n   Qty: ${item.quantity} | Rate: ₹${rate} | Subtotal: ₹${rate * item.quantity}\n`;
    });
    msg += `\n*Total Amount:* ₹${subtotal.toLocaleString()}\n`;
    msg += `Delivery: Pan-India | Free shipping on wholesale\n`;
    msg += `Please confirm my order with Taj Traders!`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-700" />
            <h2 className="font-bold text-slate-900 text-lg">Your Cart</h2>
            <span className="bg-brand-100 text-brand-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Indicator */}
        <div className="bg-brand-50 p-3 px-5 border-b border-brand-100 text-xs">
          <div className="flex items-center justify-between font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-brand-700" />
              {isFreeShipping ? (
                <strong className="text-emerald-700">Free Pan-India Delivery Unlocked! 🎉</strong>
              ) : (
                <span>Add <strong>₹{remainingForFreeShipping}</strong> more for Free Shipping above ₹5,000</span>
              )}
            </span>
            <span className="font-bold text-slate-900">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-brand-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isFreeShipping ? 'bg-emerald-500' : 'bg-brand-700'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Your Cart is Empty</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore Taj Traders professional salon, parlour, and barber catalog to add products.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-brand-700 text-white text-xs font-semibold rounded-xl hover:bg-brand-800 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const isWholesale =
                item.wholesaleTierPrice &&
                item.quantity >= (item.minWholesaleQty || 3);
              const unitPrice = isWholesale ? item.wholesaleTierPrice : item.price;

              return (
                <div key={item._id || item.id} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-[10px] text-brand-700 font-bold uppercase truncate">
                      {item.brand}
                    </p>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                      {item.name}
                    </h4>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">
                        ₹{unitPrice}
                      </span>
                      {isWholesale && (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                          Wholesale Rate
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQty(item._id || item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded-l"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item._id || item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded-r"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item._id || item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">₹{subtotal.toLocaleString()}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Savings</span>
                  <span>-₹{totalSavings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="font-semibold text-slate-800">
                  {isFreeShipping ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-700 hover:bg-brand-800 active:scale-98 text-white font-bold rounded-xl text-sm shadow-md shadow-brand-200 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/918919733026?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl text-xs shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
