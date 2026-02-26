import React from 'react';
import { Layers } from 'lucide-react';

const LayersToggle: React.FC = () => {
  return (
    <div className="absolute bottom-6 left-20 z-[1000]">
      <button className="google-card p-0 overflow-hidden group relative w-12 h-12">
        <img 
          src="https://picsum.photos/seed/satellite/100/100" 
          alt="Layers" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 p-1 rounded shadow-sm">
            <Layers size={16} className="text-gray-700" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] py-0.5 text-center">
          Layers
        </div>
      </button>
    </div>
  );
};

export default LayersToggle;
