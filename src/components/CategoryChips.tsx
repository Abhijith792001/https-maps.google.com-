import React from 'react';
import { Utensils, Hotel, Camera, Landmark, Bus, Pill, Landmark as Bank } from 'lucide-react';

const categories = [
  { icon: <Utensils size={16} />, label: 'Restaurants' },
  { icon: <Hotel size={16} />, label: 'Hotels' },
  { icon: <Camera size={16} />, label: 'Things to do' },
  { icon: <Landmark size={16} />, label: 'Museums' },
  { icon: <Bus size={16} />, label: 'Transit' },
  { icon: <Pill size={16} />, label: 'Pharmacies' },
  { icon: <Bank size={16} />, label: 'ATMs' },
];

const CategoryChips: React.FC = () => {
  return (
    <div className="absolute top-16 left-4 right-4 md:top-3 md:left-[480px] z-[1000] flex items-center space-x-2 overflow-x-auto no-scrollbar md:max-w-[calc(100vw-600px)] pr-4">
      {categories.map((cat, i) => (
        <button
          key={i}
          className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-all whitespace-nowrap text-sm font-medium text-gray-700"
        >
          <span className="text-gray-600">{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
