import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes >
      </BrowserRouter >
    </div >
  )
}

export default App
