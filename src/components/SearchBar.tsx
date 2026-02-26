import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Mic, Navigation, X, User } from 'lucide-react';
import { useMap } from '../MapContext';
import { searchPlaces } from '../services/geocodingService';
import { Place } from '../types';

const SearchBar: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setSearchResults, 
    setMapCenter, 
    setMapZoom, 
    setMode, 
    setIsSidebarOpen,
    setSelectedPlace
  } = useMap();
  
  const [inputValue, setInputValue] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    const results = await searchPlaces(query);
    setSearchResults(results);
    setMode('search');
    setIsSidebarOpen(true);
    setShowSuggestions(false);

    if (results.length > 0) {
      const first = results[0];
      setMapCenter([first.lat, first.lng]);
      setMapZoom(15);
      setSelectedPlace(first);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length > 2) {
      const results = await searchPlaces(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place: Place) => {
    setInputValue(place.name);
    setSearchQuery(place.name);
    setSearchResults([place]);
    setMapCenter([place.lat, place.lng]);
    setMapZoom(16);
    setSelectedPlace(place);
    setMode('place');
    setIsSidebarOpen(true);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="absolute top-3 left-4 right-4 md:left-20 z-[1002] md:max-w-[392px]">
      <div className="google-card flex items-center px-2 py-1 h-12 rounded-lg">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={20} className="text-gray-600" />
        </button>
        <img 
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
          alt="Google" 
          className="h-5 ml-1 mr-1 hidden sm:block pointer-events-none" 
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(inputValue)}
          placeholder="Search Google Maps"
          className="flex-1 outline-none text-base text-gray-800 placeholder-gray-500 px-2 min-w-0"
        />
        
        <div className="flex items-center space-x-1">
          {inputValue && (
            <button 
              onClick={() => { 
                setInputValue(''); 
                setSuggestions([]); 
                setSearchResults([]);
                setIsSidebarOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
          <button 
            onClick={() => handleSearch(inputValue)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search size={20} className="text-gray-500" />
          </button>
          <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
          <button 
            onClick={() => { setMode('directions'); setIsSidebarOpen(true); }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Navigation size={20} className="text-google-blue" />
          </button>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="google-card mt-1 py-2 max-h-[400px] overflow-y-auto">
          {suggestions.map((place) => (
            <button
              key={place.id}
              onClick={() => handleSuggestionClick(place)}
              className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-left"
            >
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Search size={16} className="text-gray-500" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-gray-900 truncate">{place.name}</div>
                <div className="text-xs text-gray-500 truncate">{place.address}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
