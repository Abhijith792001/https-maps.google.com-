import React from 'react';
import { Bookmark, History, Menu } from 'lucide-react';

const LeftRail: React.FC = () => {
  return (
    <div className="hidden md:flex absolute top-0 left-0 h-full w-16 bg-white border-r border-gray-200 z-[1005] flex-col items-center py-16 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <button className="flex flex-col items-center group">
          <div className="p-2 group-hover:bg-gray-100 rounded-full transition-colors">
            <Bookmark size={20} className="text-gray-600" />
          </div>
          <span className="text-[10px] text-gray-500 mt-1">Saved</span>
        </button>
        
        <button className="flex flex-col items-center group">
          <div className="p-2 group-hover:bg-gray-100 rounded-full transition-colors">
            <History size={20} className="text-gray-600" />
          </div>
          <span className="text-[10px] text-gray-500 mt-1">Recents</span>
        </button>
      </div>

      <div className="mt-auto pb-4">
        <button className="flex flex-col items-center group">
          <div className="p-2 group-hover:bg-gray-100 rounded-full transition-colors">
            <img src="https://www.gstatic.com/images/branding/product/2x/maps_96dp.png" alt="Maps" className="w-6 h-6 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
          </div>
          <span className="text-[10px] text-gray-500 mt-1">Get app</span>
        </button>
      </div>
    </div>
  );
};

export default LeftRail;
