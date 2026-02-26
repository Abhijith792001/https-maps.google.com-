import React from 'react';
import { useMap } from '../MapContext';
import { 
  Navigation, 
  Bookmark, 
  MapPin, 
  Share2, 
  Phone, 
  Globe, 
  Clock, 
  Star, 
  ChevronLeft,
  Copy
} from 'lucide-react';

const PlaceDetails: React.FC = () => {
  const { selectedPlace, setMode, setDirections } = useMap();

  if (!selectedPlace) return null;

  const handleDirections = () => {
    setDirections({ destination: selectedPlace.address });
    setMode('directions');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Image */}
      <div className="relative h-48 w-full bg-gray-200">
        <img 
          src={`https://picsum.photos/seed/${selectedPlace.id}/800/400`} 
          alt={selectedPlace.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => setMode('search')}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-normal text-gray-900">{selectedPlace.name}</h1>
        
        <div className="flex items-center mt-1 space-x-1">
          <span className="text-sm font-medium text-gray-700">{selectedPlace.rating}</span>
          <div className="flex text-google-yellow">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(Number(selectedPlace.rating)) ? 'currentColor' : 'none'} 
              />
            ))}
          </div>
          <span className="text-xs text-google-secondary">({selectedPlace.reviewsCount} reviews)</span>
        </div>
        
        <div className="text-sm text-google-secondary mt-1">{selectedPlace.category}</div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 px-2">
          <button 
            onClick={handleDirections}
            className="flex flex-col items-center space-y-1 group"
          >
            <div className="p-3 rounded-full border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
              <Navigation size={20} className="text-google-blue" />
            </div>
            <span className="text-xs text-google-blue font-medium">Directions</span>
          </button>
          <button className="flex flex-col items-center space-y-1 group">
            <div className="p-3 rounded-full border border-gray-200 group-hover:bg-gray-50 transition-colors">
              <Bookmark size={20} className="text-google-blue" />
            </div>
            <span className="text-xs text-google-blue font-medium">Save</span>
          </button>
          <button className="flex flex-col items-center space-y-1 group">
            <div className="p-3 rounded-full border border-gray-200 group-hover:bg-gray-50 transition-colors">
              <MapPin size={20} className="text-google-blue" />
            </div>
            <span className="text-xs text-google-blue font-medium">Nearby</span>
          </button>
          <button className="flex flex-col items-center space-y-1 group">
            <div className="p-3 rounded-full border border-gray-200 group-hover:bg-gray-50 transition-colors">
              <Share2 size={20} className="text-google-blue" />
            </div>
            <span className="text-xs text-google-blue font-medium">Share</span>
          </button>
        </div>

        <div className="h-[1px] bg-gray-100 my-6"></div>

        {/* Info List */}
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <MapPin size={20} className="text-google-blue mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-gray-800">{selectedPlace.address}</div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Copy size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="flex items-start space-x-4">
            <Clock size={20} className="text-google-blue mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-gray-800">
                <span className="text-google-green font-medium">Open</span> ⋅ Closes 10 PM
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Globe size={20} className="text-google-blue mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-google-blue hover:underline cursor-pointer">
                website.com
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone size={20} className="text-google-blue mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-google-blue hover:underline cursor-pointer">
                (555) 123-4567
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-gray-100 my-6"></div>

        {/* Reviews Preview */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Reviews</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">User Name</div>
                  <div className="flex text-google-yellow mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    Great place! The atmosphere is amazing and the service is top-notch. Highly recommend visiting if you are in the area.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-google-blue hover:bg-blue-50 rounded transition-colors">
            View all reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
