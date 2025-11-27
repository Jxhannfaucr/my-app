// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectVentas from './pages/ProjectVentas';
import Loader from './components/Loader';
import './styles/index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
        {/* Fondo animado */}
        <div className="background-container">
            <div className="curve-line"></div>
            <div className="curve-line"></div>
            <div className="curve-line"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="gradient-overlay"></div>
        </div>
      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/ventas" element={<ProjectVentas />} />
      </Routes>
    </Router>
  );
}

export default App;