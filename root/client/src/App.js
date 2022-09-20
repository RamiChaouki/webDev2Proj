import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

//PAGES AND COMPONENTS
import Registration from './components/registration/Registration';
import Home from './components/home/Home';
import Login from './components/login/Login';

//GLOBAL CONTEXTS
import {AuthProvider} from './context/AuthContext'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>  
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/Register' element={<Registration/>}></Route>
              <Route path='/Login' element={<Login/>}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
