import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './compenants/register';
import Login from './compenants/login';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
