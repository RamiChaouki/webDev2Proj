import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

//PAGES AND COMPONENTS
import Registration from './components/registration/Registration';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Nav from './components/nav/Nav';
import Logout from './components/Logout'

//GLOBAL CONTEXTS
import {AuthProvider} from './context/AuthContext'
import UserProtectedRoute from './components/UserProtectedRoute';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Nav/>  
          <Routes>
            <Route path='/' element={<UserProtectedRoute/>}>
              <Route path='/' element={<Home/>}></Route>
            </Route>
              <Route path='/Register' element={<Registration/>}></Route>
              <Route path='/Login' element={<Login/>}></Route>
              <Route path='/Logout' element={[<Home/>,<Logout/>]}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
