import { RouteInfo, TransportMode } from '../types';

export const getRoute = async (
  start: [number, number],
  end: [number, number],
  mode: TransportMode = 'driving'
): Promise<RouteInfo | null> => {
  const profile = mode === 'walking' ? 'foot' : mode === 'cycling' ? 'bike' : 'driving';
  
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/${profile}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson&steps=true`
    );
    const data = await response.json();
    
    if (data.code !== 'Ok') return null;
    
    const route = data.routes[0];
    
    return {
      distance: route.distance,
      duration: route.duration,
      geometry: route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]),
      steps: route.legs[0].steps.map((step: any) => ({
        instruction: step.maneuver.instruction,
        distance: step.distance,
        duration: step.duration,
      })),
    };
  } catch (error) {
    console.error('Routing error:', error);
    return null;
  }
};
