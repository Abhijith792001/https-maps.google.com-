import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Place, RouteInfo, MapMode, TransportMode } from './types';

interface MapContextType {
  mode: MapMode;
  setMode: (mode: MapMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Place[];
  setSearchResults: (results: Place[]) => void;
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
  directions: {
    origin: string;
    destination: string;
    route: RouteInfo | null;
    transportMode: TransportMode;
  };
  setDirections: (directions: any) => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  userLocation: { lat: number; lng: number; accuracy: number } | null;
  users: any[];
}

const MapContext = createContext<MapContextType | undefined>(undefined);

import { io } from 'socket.io-client';

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<MapMode>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6129, 77.2295]); // New Delhi
  const [mapZoom, setMapZoom] = useState(13);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const socketRef = useRef<any>(null);

  const [directions, setDirectionsState] = useState({
    origin: '',
    destination: '',
    route: null as RouteInfo | null,
    transportMode: 'driving' as TransportMode,
  });

  const setDirections = useCallback((updates: any) => {
    setDirectionsState(prev => ({ ...prev, ...updates }));
  }, []);

  // Socket initialization
  useEffect(() => {
    socketRef.current = io();
    
    socketRef.current.on('users_list', (data: any[]) => {
      setUsers(data);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Automatically request location on load and keep it updated
  React.useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          // Ignore extremely low accuracy signals (like IP-based location > 10km) 
          // if we're aiming for high precision, but allow it initially if nothing else exists
          setUserLocation(prev => {
            if (prev && prev.accuracy < accuracy && accuracy > 1000) {
              // If we already have a better fix, don't downgrade to a 1km+ accuracy fix
              return prev;
            }
            return { lat: latitude, lng: longitude, accuracy };
          });

          // Only update map center on initial load
          setMapCenter(prev => {
            if (prev[0] === 28.6129 && prev[1] === 77.2295) {
              return [latitude, longitude];
            }
            return prev;
          });

          // Emit to server only if accuracy is reasonable (under 5km)
          if (socketRef.current && accuracy < 5000) {
            socketRef.current.emit('update_location', {
              lat: latitude,
              lng: longitude,
              accuracy,
              name: `User ${socketRef.current.id?.slice(0, 4) || '...'}`
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        { 
          enableHighAccuracy: true,
          timeout: 20000, // Increase timeout to give GPS more time to lock
          maximumAge: 0 
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <MapContext.Provider
      value={{
        mode,
        setMode,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        selectedPlace,
        setSelectedPlace,
        directions,
        setDirections,
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
        isSidebarOpen,
        setIsSidebarOpen,
        userLocation,
        users,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
