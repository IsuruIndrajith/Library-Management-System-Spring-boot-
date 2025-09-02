import React from 'react'
import Books from '../../Pages/Books';
import Reports from '../../Pages/Reports';
import Inventory from '../../Pages/Inventory';
import Members from '../../Pages/Members';
import Dashboard from '../../Pages/Dashboard';
import Login from '../../Pages/Login';
import Register from '../../Pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

// Protected Route Component - Requires ADMIN role
function ProtectedRoute({ children }) {
  const user = AuthService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'ADMIN') {
    AuthService.logout(); // Logout non-admin users
    return <Navigate to="/login" />;
  }
  
  return children;
}

// Public Route Component (redirects to dashboard if already logged in)
function PublicRoute({ children }) {
  const user = AuthService.getCurrentUser();
  return user ? <Navigate to="/dashboard" /> : children;
}

function AppRoutes() {
  return(
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Navigate to="/dashboard" />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/books" element={
        <ProtectedRoute>
          <Books />
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      } />
      
      <Route path="/inventory" element={
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      } />
      
      <Route path="/members" element={
        <ProtectedRoute>
          <Members />
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AppRoutes
