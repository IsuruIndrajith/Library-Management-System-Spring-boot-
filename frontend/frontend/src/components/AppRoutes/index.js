import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Books from '../../Pages/Books';
import Reports from '../../Pages/Reports';
import Lending from '../../Pages/Lending';
import Members from '../../Pages/Members';

function AppRoutes() {
  return
  
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/lending" element={<Lending />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  
}

export default AppRoutes
