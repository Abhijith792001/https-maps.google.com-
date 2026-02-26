import React from 'react';
import { MapProvider } from '../MapContext';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import MapControls from '../components/MapControls';
import LeftRail from '../components/LeftRail';
import CategoryChips from '../components/CategoryChips';
import LayersToggle from '../components/LayersToggle';
import { LayoutGrid } from 'lucide-react';

const MapPage: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-100">
      {/* Map Layer */}
      <MapComponent />

        {/* UI Overlay Layer */}
        <LeftRail />
        <SearchBar />
        <CategoryChips />
        <Sidebar />
        <LayersToggle />
        <MapControls />

        {/* Top Right UI */}
        <div className="absolute top-3 right-4 z-[1000] flex items-center space-x-3">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <LayoutGrid size={20} className="text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white text-sm font-medium shadow-sm">
            A
          </button>
        </div>

        {/* Bottom Logo & Terms */}
        <div className="absolute bottom-2 left-4 md:left-20 z-[1000] flex items-center space-x-2 pointer-events-none overflow-hidden whitespace-nowrap">
          <div className="bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-gray-600 border border-gray-200">
            Map data ©2026 OpenStreetMap
          </div>
          <div className="hidden sm:block bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-gray-600 border border-gray-200">
            Terms
          </div>
          <div className="hidden sm:block bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-gray-600 border border-gray-200">
            Privacy
          </div>
        </div>
        
        {/* Scale indicator */}
        <div className="absolute bottom-2 right-4 md:right-20 z-[1000] flex items-center space-x-1 pointer-events-none">
          <div className="text-[10px] text-gray-600 bg-white/50 px-1">500 m</div>
          <div className="w-12 h-[2px] bg-gray-600 border-x border-gray-600"></div>
        </div>
        {/* Bottom Logo */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
          <img 
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
            alt="Google" 
            className="h-6 opacity-80"
          />
        </div>
      </div>
  );
};

export default MapPage;
