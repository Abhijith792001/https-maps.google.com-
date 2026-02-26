import React, { useEffect, useRef } from 'react';
import { useMap as useMapContext } from '../MapContext';
import { Place } from '../types';

declare global {
  interface Window {
    mappls: any;
  }
}

const MapComponent: React.FC = () => {
  const { 
    searchResults, 
    selectedPlace, 
    setSelectedPlace, 
    setMode, 
    setIsSidebarOpen,
    directions,
    users,
    mapCenter,
    mapZoom
  } = useMapContext();

  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkersRef = useRef<Map<string, any>>(new Map());
  const polylineRef = useRef<any>(null);

  // Initialize Map
  useEffect(() => {
    if (window.mappls && containerRef.current && !mapRef.current) {
      mapRef.current = new window.mappls.Map(containerRef.current, {
        center: { lat: mapCenter[0], lng: mapCenter[1] },
        zoom: mapZoom,
        zoomControl: true,
        hybrid: true,
      });

      mapRef.current.on('load', () => {
        console.log('Mappls Map Loaded');
      });
    }
  }, []);

  // Sync Map Center/Zoom
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat: mapCenter[0], lng: mapCenter[1] });
      mapRef.current.setZoom(mapZoom);
    }
  }, [mapCenter, mapZoom]);

  // Sync Search Results Markers
  useEffect(() => {
    if (!mapRef.current || !window.mappls) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    searchResults.forEach(place => {
      const marker = new window.mappls.Marker({
        map: mapRef.current,
        position: { lat: place.lat, lng: place.lng },
        popupHtml: `<div class="p-2"><strong>${place.name}</strong><br/>${place.address}</div>`,
      });

      marker.addListener('click', () => {
        setSelectedPlace(place);
        setMode('place');
        setIsSidebarOpen(true);
      });

      markersRef.current.push(marker);
    });
  }, [searchResults]);

  // Sync Route Polyline
  useEffect(() => {
    if (!mapRef.current || !window.mappls) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (directions.route && directions.route.geometry) {
      const path = directions.route.geometry.map((p: [number, number]) => ({ lat: p[0], lng: p[1] }));
      polylineRef.current = new window.mappls.Polyline({
        map: mapRef.current,
        path: path,
        strokeColor: '#4285F4',
        strokeOpacity: 0.7,
        strokeWeight: 5
      });
    }
  }, [directions.route]);

  // Sync Real-time User Markers
  useEffect(() => {
    if (!mapRef.current || !window.mappls) return;

    const currentIds = new Set(users.map(u => u.id));

    // Remove users who left
    for (const [id, marker] of userMarkersRef.current.entries()) {
      if (!currentIds.has(id)) {
        marker.remove();
        userMarkersRef.current.delete(id);
      }
    }

    // Add or Update users
    users.forEach(user => {
      if (userMarkersRef.current.has(user.id)) {
        const marker = userMarkersRef.current.get(user.id);
        marker.setPosition({ lat: user.lat, lng: user.lng });
      } else {
        const marker = new window.mappls.Marker({
          map: mapRef.current,
          position: { lat: user.lat, lng: user.lng },
          icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Simple blue dot for users
          popupHtml: `<div class="p-1 text-center"><strong>${user.name}</strong><br/><span class="text-[10px]">±${user.accuracy.toFixed(1)}m</span></div>`,
        });
        userMarkersRef.current.set(user.id, marker);
      }
    });
  }, [users]);

  return (
    <div className="h-full w-full relative">
      <div ref={containerRef} className="h-full w-full" id="mappls-map-container" />
    </div>
  );
};

export default MapComponent;
