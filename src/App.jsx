import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Sidebar from './Components/Layouts/Sidebar';
import Header from './components/Header';
import Dashboard from './components/dashboard/Dashboard';
import AddProduct from './pages/Product/AddProduct';
import ProductList from './pages/Product/ProductList';
import ProductDetails from './pages/Product/ProductDetails';
import EditProductPopup from './pages/Product/EditProductPopup';
import Login from './pages/Login';
import { ViewDetails } from './pages/ViewDetails';
import { AllPayment } from './pages/AllPayments';
import { User } from './pages/Users';
import AddOffer from './pages/AddOffer';
import ViewOffer from './pages/ViewOffer';
import NewOrder from './pages/order/NewOrder';
import { OrderHistory } from './pages/order/OrederHistory';
import TrackOrder from './pages/order/TrackOrder';
import OrderDetails from './pages/order/OrderDetails';
import Brand from './pages/Brand/Brand';
import BrandList from './pages/Brand/BrandList';
import AddCategory from './pages/Product/Category/AddCategory';
import AddSubCategory from './pages/Product/Category/AddSubCategory';
import CategoryList from './pages/Product/Category/CategoryList';
import { ViewEmail } from './pages/ViewEmail';



const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full h-full overflow-x-auto">
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
          <Route path='/AddProduct' element={<AddProduct />} />
          <Route path='/ProductList' element={<ProductList />} />
          <Route path='/ProductDetails/:id' element={<ProductDetails />} />
          <Route path='/EditProductPopup/:id' element={<EditProductPopup />} />
          <Route path='/ViewDetails' element={<ViewDetails />} />
          <Route path='/payment' element={<AllPayment />} />
          <Route path='/user' element={<User />} />
          <Route path='/InsertOffer' element={<AddOffer />} />
          <Route path='/ViewOffer' element={<ViewOffer />} />
          <Route path='/NewOrder' element={<NewOrder />} />
          <Route path='/OrderHistory' element={<OrderHistory />} />
          <Route path='/TrackOrder' element={<TrackOrder />} />
          <Route path='/OrderDetails/:id' element={<OrderDetails />} />
          <Route path='/Brand' element={<Brand />} />
          <Route path='/BrandList' element={<BrandList />} />
          <Route path='/AddCategory' element={<AddCategory />} />
          <Route path='/AddSubCategory' element={<AddSubCategory />} />
          <Route path='/CategoryList' element={<CategoryList />} />
          <Route path='/ViewEmail' element={<ViewEmail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;