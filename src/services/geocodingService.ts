import { Place } from '../types';

export const searchPlaces = async (query: string): Promise<Place[]> => {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=10`
    );
    const data = await response.json();
    
    return data.map((item: any) => ({
      id: item.place_id.toString(),
      name: item.display_name.split(',')[0],
      address: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      category: item.type,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Mock rating
      reviewsCount: Math.floor(Math.random() * 2000), // Mock reviews
    }));
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
};

export const reverseGeocode = async (lat: number, lng: number): Promise<Place | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    );
    const item = await response.json();
    
    if (item.error) return null;

    return {
      id: item.place_id.toString(),
      name: item.display_name.split(',')[0],
      address: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      category: item.type,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 2000),
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};
