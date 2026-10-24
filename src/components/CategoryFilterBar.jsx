import React from 'react';
import {
  Sparkles,
  Smile,
  Scissors,
  Palette,
  Heart,
  Droplets,
  Wand2,
} from 'lucide-react';

const CATEGORY_ICONS = {
  All: Sparkles,
  'Cosmetics': Sparkles,
  'Makeup': Palette,
  'Skin Care': Smile,
  'Hair Care': Scissors,
  'Hair Accessories': Heart,
  'Bath & Body': Droplets,
  'Beauty Tools': Wand2,
};

export default function CategoryFilterBar({
  categories = [],
  selectedCategory,
  onSelectCategory,
  totalProductsCount = 0,
}) {
  const allList = [{ name: 'All', count: totalProductsCount }, ...categories];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Product Categories
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          Showing {selectedCategory === 'All' ? 'All Cosmetics' : selectedCategory}
        </span>
      </div>

      {/* Scrollable pill buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {allList.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const IconComponent = CATEGORY_ICONS[cat.name] || Sparkles;

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:bg-rose-50/50'
              }`}
            >
              <IconComponent
                className={`w-3.5 h-3.5 ${
                  isSelected ? 'text-white' : 'text-rose-500'
                }`}
              />
              <span>{cat.name}</span>
              {cat.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
