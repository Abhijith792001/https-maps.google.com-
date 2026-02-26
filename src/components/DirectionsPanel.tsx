import React, { useState } from 'react';
import { useMap } from '../MapContext';
import { 
  ArrowLeft, 
  Car, 
  Footprints, 
  Bike, 
  Bus, 
  Plane, 
  MoreVertical, 
  ArrowUpDown,
  Circle,
  MapPin
} from 'lucide-react';
import { getRoute } from '../services/routingService';
import { searchPlaces } from '../services/geocodingService';

const DirectionsPanel: React.FC = () => {
  const { directions, setDirections, setMode, setMapCenter, setMapZoom } = useMap();
  const [origin, setOrigin] = useState(directions.origin || 'Your location');
  const [destination, setDestination] = useState(directions.destination || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetDirections = async () => {
    if (!origin || !destination) return;
    
    setIsLoading(true);
    try {
      const originResults = await searchPlaces(origin);
      const destResults = await searchPlaces(destination);
      
      if (originResults.length > 0 && destResults.length > 0) {
        const start = originResults[0];
        const end = destResults[0];
        
        const route = await getRoute(
          [start.lat, start.lng],
          [end.lat, end.lng],
          directions.transportMode
        );
        
        if (route) {
          setDirections({ 
            origin: start.address, 
            destination: end.address, 
            route 
          });
          setMapCenter([start.lat, start.lng]);
          setMapZoom(12);
        }
      }
    } catch (error) {
      console.error('Directions error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10">
        <div className="flex items-center space-x-4 mb-4">
          <button 
            onClick={() => setMode('search')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex-1 flex justify-around">
            <button 
              onClick={() => setDirections({ transportMode: 'driving' })}
              className={`p-2 rounded-full transition-colors ${directions.transportMode === 'driving' ? 'bg-blue-50 text-google-blue' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Car size={20} />
            </button>
            <button 
              onClick={() => setDirections({ transportMode: 'walking' })}
              className={`p-2 rounded-full transition-colors ${directions.transportMode === 'walking' ? 'bg-blue-50 text-google-blue' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Footprints size={20} />
            </button>
            <button 
              onClick={() => setDirections({ transportMode: 'cycling' })}
              className={`p-2 rounded-full transition-colors ${directions.transportMode === 'cycling' ? 'bg-blue-50 text-google-blue' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Bike size={20} />
            </button>
            <button className="p-2 text-gray-300 cursor-not-allowed">
              <Bus size={20} />
            </button>
            <button className="p-2 text-gray-300 cursor-not-allowed">
              <Plane size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-center space-y-1">
            <Circle size={12} className="text-gray-400" />
            <div className="w-[1px] h-8 bg-gray-300"></div>
            <MapPin size={16} className="text-google-red" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="relative">
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Choose starting point..."
                className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-google-blue"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGetDirections()}
                placeholder="Choose destination..."
                className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-google-blue"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button 
              onClick={swapLocations}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowUpDown size={18} className="text-gray-500" />
            </button>
            <button 
              onClick={handleGetDirections}
              disabled={isLoading}
              className="p-2 bg-google-blue text-white rounded-full shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <ArrowLeft className="rotate-180" size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Route Info */}
      <div className="flex-1 overflow-y-auto p-4">
        {directions.route ? (
          <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-medium text-gray-900">
                    {Math.round(directions.route.duration / 60)} min
                  </div>
                  <div className="text-sm text-gray-600">
                    {(directions.route.distance / 1000).toFixed(1)} km
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-google-green">Fastest route</div>
                  <div className="text-xs text-gray-500">via Main St</div>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 mb-4">Steps</h3>
            <div className="space-y-6">
              {directions.route.steps.map((step, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-google-blue mt-1.5"></div>
                    {i < directions.route!.steps.length - 1 && (
                      <div className="w-[1px] flex-1 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800">{step.instruction}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {step.distance < 1000 ? `${Math.round(step.distance)} m` : `${(step.distance / 1000).toFixed(1)} km`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Car size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Plan your trip</h3>
            <p className="text-sm text-gray-500 mt-1">Enter your starting point and destination to see the best route.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectionsPanel;
