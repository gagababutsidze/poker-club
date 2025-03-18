import React from 'react';
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import PokerComponent from './pages/PokerComponent';
import Login from './pages/Login';
import Playboard from './pages/Playboard';
import Dashboard from './pages/Dashboard';
//import { WebSocketProvider } from './WebSocketContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
    return (
        
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/play/:id" element={isAuthenticated ? <Playboard /> : <Navigate to="/login" />} />
             <Route path="/login" element={isAuthenticated ? <Navigate to="/play" /> : <Login />} />
            </Routes>
       
    );
};

export default App;