import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehicleProvider } from './context/VehicleContext';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

const App = () => {
  return (
    <AdminProvider>
      <VehicleProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </VehicleProvider>
    </AdminProvider>
  );
};

export default App;
