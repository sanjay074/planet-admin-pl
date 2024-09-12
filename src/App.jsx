
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
// import AddProduct from './pages/AddProduct';
// import ProductList from './pages/ProductList';
// import Category from './pages/Category';
import SignInSide from './LogIn/SignInSide';
import './App.css';
import './assets/Global.css'
import { AddProduct } from './Pages/Product/AddProduct';
import { ProductList } from './Pages/Product/ProductList';
// import { Categories } from './Pages/Product/Categories';
import { NewOrder } from './Pages/Order/NewOrder';
import { OrderHistory } from './Pages/Order/OrderHistory/OrderHistory';

import { InsertOffer } from './Pages/HotOffer/InsertOffer';
import { ViewOffer } from './Pages/HotOffer/ViewOffer';
import { User } from './Pages/Customer/User';
import { TrackOrder } from './Pages/Order/TrackOrder/TrackOrder';
import { OrderSummary } from './Pages/Order/TrackOrder/OrderSummary';
import { TrackDetails } from './Pages/Order/TrackOrder/TrackDetails';
import Header from './components/Header';
import { Addcategory } from './Pages/Product/Category/Addcategory';
import { CategoryList } from './Pages/Product/Category/CategoryList';
import { ProductDetails } from './Pages/Product/ProductDetails';
import { OrderDetails } from './Pages/Order/OrderDetails';
import { ViewNewOrderDetails } from './Pages/Order/ViewNewOrderDetails';
import { EditOrderHistory } from './Pages/Order/OrderHistory/EditOrderHistory';
import { ViewOrderList } from './Pages/Order/OrderHistory/ViewOrderList';
import { AddSubCategory } from './Pages/Product/Category/AddSubCategory';
import { ViewRecentOrder } from './components/ViewRecentOrder';
import { Brand } from './Pages/Brands/Brand';
import { ViewDetails } from './Pages/ViewDetails/ViewDetails';
import { ViewEmail } from './Pages/ViewEmail/ViewEmail';
import { EditProductPopup } from './Pages/Product/EditProductPopup';
import { BrandList } from './Pages/Brands/BrandList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route
          path="*"
          element={
            <div className="app">
            
              <Sidebar />
              
              <div className="main-content">
              <Header/>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path='/AddProduct' element={<AddProduct/>}/>
                 <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
                  <Route path='/ProductList' element={<ProductList/>}/>
                  <Route path='/Addcategory' element={<Addcategory/>}/>
                  <Route path='/CategoryList' element={<CategoryList/>}/>
                  <Route path='/AddSubCategory' element={<AddSubCategory/>}/>
                  <Route path='/ViewDetails' element={<ViewDetails/>}/>
                  {/* <Route path='/Categories' element={<Categories/>}/> */}
                  <Route path='/NewOrder' element={<NewOrder/>}/>
                  <Route path='/OrderDetails/:id'element={<OrderDetails/>}/>
                  <Route path='/EditOrderHistory/:id' element={<EditOrderHistory/>}/>
                  <Route path='/ViewOrderList/:id' element={<ViewOrderList/>}/>
                  <Route path='/ViewNewOrderDetails/:id' element={<ViewNewOrderDetails/>}/>
                  <Route path='/OrderHistory' element={<OrderHistory/>}/>
                  <Route path='/TrackOrder' element={<TrackOrder/>}/>
                  <Route path='/OrderSummary' element={<OrderSummary/>}/>
                  <Route path='/InsertOffer' element={<InsertOffer/>}/>
                  <Route path='/TrackDetails' element={<TrackDetails/>}/>
                  <Route path='/ViewOffer' element={<ViewOffer/>}/>
                  <Route path='/User' element={<User/>}/>
                  <Route path='/ViewRecentOrder/:id' element={<ViewRecentOrder/>}/>
          <Route path='/Brand' element={<Brand/>}/>
          <Route path='/ViewEmail' element={<ViewEmail/>}/>
          <Route path='/EditProductPopup' element={<EditProductPopup/>}/>
          <Route path='/BrandList' element={<BrandList/>}/>
                  {/* <Route path="/products/add" element={<AddProduct />} />
                  <Route path="/products/list" element={<ProductList />} />
                  <Route path="/products/category" element={<Category />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} /> */}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
