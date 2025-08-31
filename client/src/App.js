import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './compenants/register';
import Login from './compenants/login';
import Home from './compenants/home';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      {/* Add more routes as needed */}
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
