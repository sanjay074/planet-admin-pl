import React from 'react'
import Sidebar from './Components/Layout/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
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
  );
};

export default App;
