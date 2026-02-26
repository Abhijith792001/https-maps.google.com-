import React from 'react';
import { Plus, Minus, Crosshair, Compass, User } from 'lucide-react';
import { useMap } from '../MapContext';

const MapControls: React.FC = () => {
  const { mapZoom, setMapZoom, setMapCenter } = useMap();

  const handleZoomIn = () => setMapZoom(Math.min(mapZoom + 1, 18));
  const handleZoomOut = () => setMapZoom(Math.max(mapZoom - 1, 3));

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setMapZoom(16);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="absolute bottom-6 right-3 z-[1000] flex flex-col items-center space-y-2">
      <div className="google-card flex flex-col overflow-hidden">
        <button 
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-100 border-b border-gray-100 transition-colors"
          title="Zoom in"
        >
          <Plus size={20} className="text-gray-600" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-100 transition-colors"
          title="Zoom out"
        >
          <Minus size={20} className="text-gray-600" />
        </button>
      </div>

      <button 
        onClick={handleMyLocation}
        className="google-card p-2 hover:bg-gray-100 transition-colors"
        title="My location"
      >
        <Crosshair size={20} className="text-gray-600" />
      </button>

      <button className="google-card p-2 hover:bg-gray-100 transition-colors" title="Compass">
        <Compass size={20} className="text-gray-600" />
      </button>

      <button className="google-card p-2 hover:bg-gray-100 transition-colors" title="Street View">
        <User size={20} className="text-google-yellow" />
      </button>
    </div>
  );
};

export default MapControls;
