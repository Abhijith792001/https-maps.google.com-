import React from 'react';
import { User, Mail, MapPin, Calendar, Shield, RefreshCw, Signal } from 'lucide-react';
import { useMap } from '../MapContext';

const UsersPage: React.FC = () => {
  const { users, userLocation } = useMap();
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Real-Time User Network</h1>
            <p className="text-gray-600 mt-2">Currently active users on the platform with high-precision GPS tracking.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center text-sm text-google-blue font-medium hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} className="mr-2" />
              Refresh GPS
            </button>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center text-sm text-google-green font-medium self-start md:self-auto">
              <RefreshCw size={14} className="mr-2 animate-spin" />
              {users.length} User{users.length !== 1 ? 's' : ''} Online
            </div>
          </div>
        </header>

        {userLocation && userLocation.accuracy > 1000 && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600">
              <Signal size={20} />
            </div>
            <div>
              <h4 className="text-amber-900 font-bold text-sm">Low Accuracy Detected (±{(userLocation.accuracy / 1000).toFixed(1)}km)</h4>
              <p className="text-amber-700 text-xs mt-1">
                Your browser is currently using IP-based location. For exact coordinates (under 10m), please ensure you are using a device with GPS (like a phone) or a stable Wi-Fi connection, and that you've granted high-accuracy permissions.
              </p>
            </div>
          </div>
        )}

        {users.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Signal size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Waiting for connections...</h3>
            <p className="text-gray-500 mt-1">Grant location permission on the main map to appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-google-green text-white text-[10px] px-3 py-1 font-bold uppercase tracking-wider">
                  Live
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-google-blue flex items-center justify-center text-white text-xl font-bold">
                    {user.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center text-sm text-google-blue font-medium">
                      <Shield size={14} className="mr-1" />
                      Active Session
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">Live Coordinates</div>
                    <div className="flex items-center text-gray-900 text-sm font-mono bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <MapPin size={16} className="mr-3 text-google-red" />
                      {user.lat.toFixed(8)}, {user.lng.toFixed(8)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-gray-500">GPS Accuracy</span>
                    <span className={`text-xs font-bold ${user.accuracy < 20 ? 'text-google-green' : 'text-google-yellow'}`}>
                      ±{user.accuracy.toFixed(1)}m
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-[10px] italic">
                    <RefreshCw size={10} className="mr-1" />
                    Last updated: {new Date(user.lastUpdate).toLocaleTimeString()}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                    Track
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-google-blue hover:bg-blue-700 rounded-lg transition-colors">
                    Focus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
