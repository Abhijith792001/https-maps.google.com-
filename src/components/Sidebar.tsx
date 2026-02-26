import React from 'react';
import { useMap } from '../MapContext';
import SearchResults from './SearchResults';
import PlaceDetails from './PlaceDetails';
import DirectionsPanel from './DirectionsPanel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { mode, isSidebarOpen, setIsSidebarOpen } = useMap();

  return (
    <>
      <div 
        className={`absolute top-0 left-0 md:left-16 h-full z-[1001] bg-white transition-transform duration-300 ease-in-out shadow-lg ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-full md:max-w-[392px] flex flex-col`}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-0">
          {mode === 'search' && <SearchResults />}
          {mode === 'place' && <PlaceDetails />}
          {mode === 'directions' && <DirectionsPanel />}
        </div>

        {/* Sidebar Toggle Button - Now outside the overflow-hidden container */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white p-1 rounded-r-md shadow-md hover:bg-gray-50 transition-colors z-[1002] ${
            isSidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
      </div>
      
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-1/2 left-0 md:left-16 transform -translate-y-1/2 bg-white p-1 rounded-r-md shadow-md hover:bg-gray-50 transition-colors z-[1002]"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
