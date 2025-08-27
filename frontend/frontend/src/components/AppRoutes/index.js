import React from 'react'
import Books from '../../Pages/Books';
import Reports from '../../Pages/Reports';
import Inventory from '../../Pages/Inventory';
import Members from '../../Pages/Members';
import Dashboard from '../../Pages/Dashboard';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

function AppRoutes() {
  return(
  
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  )
}

export default AppRoutes
