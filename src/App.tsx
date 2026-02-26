/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MapProvider } from './MapContext';
import MapPage from './pages/MapPage';
import UsersPage from './pages/UsersPage';

export default function App() {
  return (
    <MapProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    </MapProvider>
  );
}
