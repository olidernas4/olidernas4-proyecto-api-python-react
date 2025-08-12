import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import EstudiantesManager from './components/EstudiantesManager';
import ProfesoresManager from './components/ProfesoresManager';
import './App.css';

const App = () => {
  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return localStorage.getItem('access_token') !== null;
  };

  // Componente para proteger rutas
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Ruta raíz - redirige al dashboard si está autenticado, sino al login */}
          <Route 
            path="/" 
            element={
              isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* Rutas protegidas */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/estudiantes" 
            element={
              <ProtectedRoute>
                <EstudiantesManager />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profesores" 
            element={
              <ProtectedRoute>
                <ProfesoresManager />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
