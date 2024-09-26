import React from 'react'
<<<<<<< HEAD
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
=======
import Sidebar from './Components/Layout/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div className='bg-red-500'>
    <Router>
    <Routes>
      <Route/>
      <Route
          path="*"
          element={
            <div className="flex flex-col h-screen">

           <Sidebar/>
            </div>
          }
          />
    </Routes>
    </Router>
    </div>
  ) 
>>>>>>> 0fe8fa3bdf79288614ae8488f6d0f96866a020c1
}

export default App;
