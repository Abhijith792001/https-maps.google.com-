import React from 'react';
import { useMap } from '../MapContext';
import { Star, MapPin } from 'lucide-react';
import { Place } from '../types';

const SearchResults: React.FC = () => {
  const { searchResults, setSelectedPlace, setMode, setMapCenter, setMapZoom } = useMap();

  const handleResultClick = (place: Place) => {
    setSelectedPlace(place);
    setMode('place');
    setMapCenter([place.lat, place.lng]);
    setMapZoom(16);
  };

  if (searchResults.length === 0) {
    return (
      <div className="p-8 text-center mt-16">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No results found</h3>
        <p className="text-sm text-gray-500 mt-1">Try searching for a different location or business.</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        {['All', 'Restaurants', 'Hotels', 'Gas', 'Parks'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap"
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="divide-y divide-gray-100">
        {searchResults.map((place) => (
          <button
            key={place.id}
            onClick={() => handleResultClick(place)}
            className="w-full p-4 hover:bg-gray-50 text-left flex space-x-4 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-medium text-lg text-gray-900 leading-tight">{place.name}</h3>
              <div className="flex items-center mt-1 space-x-1">
                <span className="text-sm font-medium text-gray-700">{place.rating}</span>
                <div className="flex text-google-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < Math.floor(Number(place.rating)) ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
                <span className="text-xs text-google-secondary">({place.reviewsCount})</span>
              </div>
              <div className="text-sm text-google-secondary mt-1">{place.category}</div>
              <div className="text-sm text-google-secondary mt-1 truncate">{place.address}</div>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs font-medium text-google-green">Open</span>
                <span className="text-xs text-google-secondary">⋅ Closes 10 PM</span>
              </div>
            </div>
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img 
                src={`https://picsum.photos/seed/${place.id}/200/200`} 
                alt={place.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
