import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './compenants/register';
import Login from './compenants/login';
import Home from './compenants/home';
import DashboardLayoutBranding from './compenants/admin/dashboard';
import { UserRoleContext } from './compenants/userRole';
import {useContext} from 'react';

function App() {
            const { role } = useContext(UserRoleContext);
            console.log("role in App.js:", role);

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={
            //  if admin show dashboard else show home
            //  call the useerRoleContext
            role === 'admin' ? <DashboardLayoutBranding/> : <Home/>

            }/>
          {/* Add more routes as needed */}
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
