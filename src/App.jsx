import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Layout/Sidebar';
import Header from './components/Header';
import Dashboard from './components/dashboard/Dashboard';
import { Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Brand from './Brand/Brand';
import BrandList from './Brand/BrandList';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Brand" element={<Brand/>} />
          <Route path="/BrandList" element={<BrandList/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
