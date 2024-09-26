import React from 'react'
import Sidebar from './Components/Layouts/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Layouts/Header';
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
           <div>
             <Header />
           </div>
            </div>

          }
          />
    </Routes>
    </Router>
    </div>
  ) 
}

export default App;
