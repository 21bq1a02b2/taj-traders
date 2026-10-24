import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Plus,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  DollarSign,
  Package,
  Layers,
  Tag,
  Star,
  Info,
  RotateCcw,
  Eye,
  ShoppingBag,
} from 'lucide-react';
import { createProduct } from '../api';

const CATEGORIES = [
  'Skin Care',
  'Hair Care',
  'Makeup',
  'Barber & Grooming',
  'Professional Equipment',
  'Waxing',
  'Fragrance',
  'Bath & Body',
];

const PRESET_IMAGES = [
  {
    label: 'Radiance Serum',
    url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    category: 'Skin Care',
  },
  {
    label: 'Salon Hair Mask',
    url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    category: 'Hair Care',
  },
  {
    label: 'Matte Lipstick',
    url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    category: 'Makeup',
  },
  {
    label: 'Barber Fade Clipper',
    url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    category: 'Barber & Grooming',
  },
  {
    label: 'Luxury Perfume',
    url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    category: 'Fragrance',
  },
  {
    label: 'Whipped Body Butter',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    category: 'Bath & Body',
  },
];

export default function AddProductPage({ onBackToStore, onProductCreated, dbStatus }) {
  const initialForm = {
    name: '',
    brand: '',
    category: 'Skin Care',
    subcategory: '',
    price: '',
    mrp: '',
    wholesaleTierPrice: '',
    minWholesaleQty: 3,
    stock: 50,
    rating: 4.8,
    reviewCount: 20,
    volumeOrWeight: '50 ml',
    skinOrHairType: 'All Skin Types',
    image: '',
    description: '',
    benefits: 'Deep cellular hydration\nFades fine lines\nRestores natural skin radiance',
    howToUse: 'Apply 3-4 drops morning and night on cleansed face before moisturizing.',
    ingredients: 'Aqua, Hyaluronic Acid, Niacinamide, Botanical Extracts, Vitamin E.',
    tags: 'skincare, glow, hydration, salon quality',
    isFeatured: true,
    isBestSeller: false,
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createdProduct, setCreatedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrorMessage('');
  };

  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      image: preset.url,
      category: preset.category || prev.category,
    }));
  };

  const handleFillSample = () => {
    setFormData({
      name: 'Taj Signature Collagen & Peptide Age-Defying Elixir',
      brand: 'Taj Professional Care',
      category: 'Skin Care',
      subcategory: 'Serums & Elixirs',
      price: 849,
      mrp: 1299,
      wholesaleTierPrice: 620,
      minWholesaleQty: 3,
      stock: 65,
      rating: 4.9,
      reviewCount: 42,
      volumeOrWeight: '50 ml Dropper Bottle',
      skinOrHairType: 'Normal, Dry & Mature Skin',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      description: 'Exclusive Taj Traders salon-grade formula enriched with marine collagen peptides, pure hyaluronic acid, and botanical niacinamide for instantaneous firming and dewy glass-skin luminescence.',
      benefits: 'Stimulates natural collagen synthesis\nProvides 72-hour moisture lock\nSmoothes fine expression lines\nSafe for sensitive and pre-bridal skin prep',
      howToUse: 'Gently massage 3-4 drops over face, neck, and décolletage after toner. Use day and night.',
      ingredients: 'Purified Water, Marine Collagen Peptides, Niacinamide, Sodium Hyaluronate, Centella Asiatica, Vitamin E, Rose Floral Water.',
      tags: 'taj traders, collagen, anti-aging, serum, bridal glow, salon pack',
      isFeatured: true,
      isBestSeller: true,
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Product title is required.');
      return;
    }
    if (!formData.brand.trim()) {
      setErrorMessage('Brand name is required.');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setErrorMessage('Please enter a valid selling price.');
      return;
    }
    if (!formData.mrp || Number(formData.mrp) < Number(formData.price)) {
      setErrorMessage('MRP must be equal to or greater than the selling price.');
      return;
    }
    if (!formData.image.trim()) {
      setErrorMessage('Product image URL is required.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Product description is required.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        category: formData.category,
        subcategory: formData.subcategory.trim(),
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        wholesaleTierPrice: formData.wholesaleTierPrice ? Number(formData.wholesaleTierPrice) : undefined,
        minWholesaleQty: Number(formData.minWholesaleQty) || 3,
        stock: Number(formData.stock) || 0,
        rating: Number(formData.rating) || 4.8,
        reviewCount: Number(formData.reviewCount) || 10,
        volumeOrWeight: formData.volumeOrWeight.trim(),
        skinOrHairType: formData.skinOrHairType.trim(),
        image: formData.image.trim(),
        images: [formData.image.trim()],
        description: formData.description.trim(),
        benefits: formData.benefits
          ? formData.benefits.split('\n').map((b) => b.trim()).filter(Boolean)
          : [],
        howToUse: formData.howToUse.trim(),
        ingredients: formData.ingredients.trim(),
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
          : [],
        isFeatured: Boolean(formData.isFeatured),
        isBestSeller: Boolean(formData.isBestSeller),
      };

      const result = await createProduct(payload);
      setCreatedProduct(result.data || payload);
      setSuccessMessage(`Product "${payload.name}" has been added to Taj Traders catalog!`);
      if (onProductCreated) {
        onProductCreated(result.data || payload);
      }
    } catch (err) {
      console.error('Error creating product:', err);
      setErrorMessage(err.message || 'Failed to create product. Please verify fields and backend connectivity.');
    } finally {
      setLoading(false);
    }
  };

  const discountPercent =
    formData.mrp && formData.price && Number(formData.mrp) > Number(formData.price)
      ? Math.round(((Number(formData.mrp) - Number(formData.price)) / Number(formData.mrp)) * 100)
      : 0;

  const wholesaleDiscountPercent =
    formData.price && formData.wholesaleTierPrice && Number(formData.price) > Number(formData.wholesaleTierPrice)
      ? Math.round(((Number(formData.price) - Number(formData.wholesaleTierPrice)) / Number(formData.price)) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Header / Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Store</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Catalog Database:
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                dbStatus && dbStatus.includes('mongodb')
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  dbStatus && dbStatus.includes('mongodb') ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              {dbStatus && dbStatus.includes('mongodb') ? 'MongoDB Connected' : 'Resilient Memory Mode'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-rose-600 font-bold uppercase tracking-wider mb-1">
            <span>Taj Traders Admin Portal</span>
            <span>•</span>
            <span>Product Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Add New Cosmetic or Salon Supply Product
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Create and publish a new item into the Taj Traders live e-commerce catalog. Fill in wholesale tier pricing to provide automatic bulk discounts for beauty parlours and salons.
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-emerald-900 text-sm">Product Published Successfully!</p>
                <p className="text-xs text-emerald-700">{successMessage}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToStore}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                View in Store
              </button>
              <button
                onClick={() => {
                  setFormData(initialForm);
                  setSuccessMessage('');
                  setCreatedProduct(null);
                }}
                className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl hover:bg-emerald-100 transition-colors"
              >
                Add Another
              </button>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs text-rose-800 font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Two Column Layout: Form on Left, Live Card Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Complete Product Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-rose-600" />
                Product Details & Specifications
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillSample}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 transition-all"
                  title="Quickly fill sample data for testing"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Fill Sample
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(initialForm)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-colors"
                  title="Clear form"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  1. Basic Information
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product Name / Title *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Vitamin C 15% Brightening Serum with Ferulic Acid"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g. Taj Professional, L'Oréal, Streax"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-50 transition-all"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      placeholder="e.g. Serums, Facial Kits, Shampoos"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Volume / Weight
                    </label>
                    <input
                      type="text"
                      name="volumeOrWeight"
                      value={formData.volumeOrWeight}
                      onChange={handleChange}
                      placeholder="e.g. 50 ml, 500 g, 1000 ml"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Skin or Hair Type
                    </label>
                    <input
                      type="text"
                      name="skinOrHairType"
                      value={formData.skinOrHairType}
                      onChange={handleChange}
                      placeholder="e.g. All Skin Types, Frizzy Hair"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Wholesale B2B Slabs */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    2. Pricing & Wholesale Tier Slabs
                  </h3>
                  {discountPercent > 0 && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Retail Discount: {discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Regular Selling Price (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 649"
                        min="1"
                        required
                        className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      MRP / Maximum Retail Price (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                      <input
                        type="number"
                        name="mrp"
                        value={formData.mrp}
                        onChange={handleChange}
                        placeholder="e.g. 999"
                        min="1"
                        required
                        className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Wholesale Tier Pricing */}
                <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-rose-900 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-rose-600" />
                      Wholesale B2B Tier (Salon & Bulk Discounts)
                    </span>
                    {wholesaleDiscountPercent > 0 && (
                      <span className="text-[10px] font-extrabold bg-rose-600 text-white px-2 py-0.5 rounded-full">
                        Extra {wholesaleDiscountPercent}% Bulk Saving
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-rose-800 mb-1">
                        Wholesale Unit Price (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400 font-bold text-sm">₹</span>
                        <input
                          type="number"
                          name="wholesaleTierPrice"
                          value={formData.wholesaleTierPrice}
                          onChange={handleChange}
                          placeholder="e.g. 480 (Leave blank if none)"
                          className="w-full pl-8 pr-3.5 py-2 bg-white border border-rose-200 rounded-xl text-xs font-bold text-rose-900 focus:border-rose-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-rose-800 mb-1">
                        Min Quantity for Wholesale Price
                      </label>
                      <input
                        type="number"
                        name="minWholesaleQty"
                        value={formData.minWholesaleQty}
                        onChange={handleChange}
                        placeholder="3"
                        min="2"
                        className="w-full px-3.5 py-2 bg-white border border-rose-200 rounded-xl text-xs font-bold text-rose-900 focus:border-rose-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock & Rating */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Stock Units</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="50"
                      min="0"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rating (1-5)</label>
                    <input
                      type="number"
                      name="rating"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer select-none font-bold text-slate-700">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                      <span>Featured</span>
                    </label>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer select-none font-bold text-slate-700">
                      <input
                        type="checkbox"
                        name="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={handleChange}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                      <span>Best Seller</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Product Image URL & Presets */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  3. Product Image & Visuals
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Image URL *
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/photo-..."
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Instant Preset Buttons */}
                <div>
                  <p className="text-[11px] font-bold text-slate-500 mb-2">
                    Quick Sample Image Presets (Click to apply):
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left text-[11px] font-medium transition-all ${
                          formData.image === preset.url
                            ? 'border-rose-500 bg-rose-50 text-rose-700 font-bold'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-200"
                        />
                        <span className="truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: Descriptions & Specifications */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  4. Description & Specifications
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter detailed description of the product benefits, active ingredients, and salon usage."
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Key Benefits (One per line)
                    </label>
                    <textarea
                      name="benefits"
                      rows="3"
                      value={formData.benefits}
                      onChange={handleChange}
                      placeholder="Fades dark spots&#10;Hydrates deeply&#10;Safe for all skin types"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      How To Use
                    </label>
                    <textarea
                      name="howToUse"
                      rows="3"
                      value={formData.howToUse}
                      onChange={handleChange}
                      placeholder="Step-by-step directions for salon stylists or retail customers."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ingredients (INCI List)
                    </label>
                    <input
                      type="text"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleChange}
                      placeholder="Aqua, Niacinamide, Hyaluronic Acid, Vitamin E..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Search Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="serum, glow, facial, bridal, whitening"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onBackToStore}
                  className="px-5 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-200 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publishing to Catalog...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Publish Product to Store</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Real-Time Live Product Card Preview (5 Cols) */}
          <div className="lg:col-span-5 sticky top-20 space-y-4">
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-2">
                <Eye className="w-4 h-4 text-rose-400" />
                Live Store Card Preview
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Real-Time Render
              </span>
            </div>

            {/* Exact Store Card Mockup */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden transition-all max-w-sm mx-auto">
              {/* Product Image Container */}
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                    <ImageIcon className="w-12 h-12 mb-2 stroke-1" />
                    <p className="text-xs font-medium">Image preview will appear here</p>
                  </div>
                )}

                {/* Floating Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                  {formData.isBestSeller && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                      Best Seller
                    </span>
                  )}
                  {formData.isFeatured && (
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {formData.volumeOrWeight && (
                  <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {formData.volumeOrWeight}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-600 font-bold uppercase tracking-wider text-[10px]">
                    {formData.brand || 'Brand Name'}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{formData.rating || 4.8}</span>
                    <span className="text-slate-400 text-[10px]">
                      ({formData.reviewCount || 10})
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                  {formData.name || 'Sample Product Title (Type on left to preview)'}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {formData.description || 'Product description will display here...'}
                </p>

                {/* Pricing Display */}
                <div className="pt-2 border-t border-slate-100 flex items-baseline gap-2">
                  <span className="text-lg font-black text-slate-900">
                    ₹{formData.price ? Number(formData.price).toLocaleString() : '0'}
                  </span>
                  {formData.mrp && Number(formData.mrp) > Number(formData.price) && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{Number(formData.mrp).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Wholesale Tier Notice (Taj Traders B2B Pricing) */}
                {formData.wholesaleTierPrice && (
                  <div className="bg-rose-50 border border-rose-100 rounded-lg p-2 text-[11px] flex items-center justify-between">
                    <span className="text-rose-900 font-semibold">
                      Wholesale ({formData.minWholesaleQty || 3}+ pcs):
                    </span>
                    <span className="text-rose-700 font-black">
                      ₹{Number(formData.wholesaleTierPrice).toLocaleString()}/unit
                    </span>
                  </div>
                )}

                {/* Preview CTA Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="flex items-center justify-center gap-1.5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-sm">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </div>
                  <div className="flex items-center justify-center py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold">
                    <span>Quick View</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informational Guidance Box */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Info className="w-4 h-4 text-rose-500" />
                <span>Taj Traders Wholesale Guidelines</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Items added through this separate portal become immediately available for retail and salon wholesale purchase. All changes persist automatically in the database or memory cache.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
