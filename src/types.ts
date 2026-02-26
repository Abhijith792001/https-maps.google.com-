export interface Place {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewsCount?: number;
  category?: string;
  type?: string;
  hours?: string;
  phone?: string;
  website?: string;
  image?: string;
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
}

export interface RouteInfo {
  distance: number;
  duration: number;
  geometry: [number, number][];
  steps: RouteStep[];
}

export type MapMode = 'search' | 'directions' | 'place';
export type TransportMode = 'driving' | 'walking' | 'cycling';
