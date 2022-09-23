import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

//PAGES AND COMPONENTS
import Registration from './components/registration/Registration';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Nav from './components/nav/Nav';
import Logout from './components/Logout';
import FriendList from './components/friendList/FriendList';
import CreatePost from './components/createPost/CreatePost'


//GLOBAL CONTEXTS
import {AuthProvider} from './context/AuthContext'
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// react-admin imports
import * as React from "react";
import {Admin, Resource} from 'react-admin';
import RestProvider from 'ra-data-simple-rest';
import UserList from './components/adminpanel/UserList';
// import {UserCreate} from './components/adminpanel/UserCreate'
//${process.env.S_PORT}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
            
          <Routes>

            <Route path='/' element={<UserProtectedRoute/>}>
              <Route path='/' element={[<Nav/>,<Home/>]}></Route>
              <Route path='Friend' element={[<Nav/>,<FriendList/>]}></Route>
              <Route path='/NewPost' element={<CreatePost/>}></Route>
            </Route>
              <Route path='/Register' element={[<Nav/>,<Registration/>]}></Route>
              <Route path='/Login' element={[<Nav/>,<Login/>]}></Route>
              <Route path='/Logout' element={[<Nav/>,<Home/>,<Logout/>]}></Route>

              {/* <Route path='/Admin' element={<AdminProtectedRoute/>}> */}
              <Route path='/Admin/*' element={      
                <Admin
                  basename="/Admin"
                  dataProvider={RestProvider(`http://localhost:3001/Admin`)}
                  //loginPage={MyLoginPage}
                  //authProvider={AuthProvider}
                  >
                  <Resource 
                    name="Users"
                    list={UserList}
                    options={{label: "Users"}}
                    />
                </Admin>}>
              {/* </Route> */}
            </Route>
            
              {/* <Route path='/Feed' element={<Post/>}></Route> */}
              <Route path='/Register' element={<Registration/>}></Route>
              <Route path='/Login' element={<Login/>}></Route>
              <Route path='/Logout' element={[<Logout/>]}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
