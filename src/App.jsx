import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehicleProvider } from './context/VehicleContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

const App = () => {
  return (
    <VehicleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </VehicleProvider>
  );
};

export default App;
