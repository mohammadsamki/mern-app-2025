import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './compenants/register';
import Login from './compenants/login';
import Home from './compenants/home';
import DashboardLayoutBranding from './compenants/admin/dashboard';
import { UserRoleContext ,useUserRole} from './compenants/userRole';
import {useContext} from 'react';
import NotFound from './compenants/404';
import ProductsManagement from './compenants/user/products';
import Cart from './compenants/user/cart';

function App() {
            
            const { role ,loading} = useUserRole();
            console.log("role in App.js:", role);
  if (loading) {
    return <div>Loading...

      <img src="https://media.tenor.com/o8m3bKTsifUAAAAM/hold-on.gif" alt="Loading..." />
    </div>; // or a spinner, etc.
  }
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/*' element={<NotFound/>}/>
          <Route path='/' element={
            //  if admin show dashboard else show home
            //  call the useerRoleContext
            role === 'admin' ? <DashboardLayoutBranding/> : <Home/>

            }/>
          {/* Add more routes as needed */}
          {/* users path */}
          <Route path='/dashboard' element={<DashboardLayoutBranding/>}/>
          <Route path='/users' element={<DashboardLayoutBranding/>}/>
          <Route path='/category' element={<DashboardLayoutBranding/>}/>
          <Route path='/products' element={<DashboardLayoutBranding/>}/>
          <Route path='/orders' element={<DashboardLayoutBranding/>}/>
          <Route path='/ProductsManagement' element={<ProductsManagement/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
