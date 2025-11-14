// src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Loader from './components/Loader';
import './styles/index.css';

function AppWithLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Timer para mostrar el loader por 3 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer); // Cleanup del timer
  }, []);

  return (
    <>
      {loading ? <Loader /> : <App />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithLoader />
  </React.StrictMode>
);
