import './App.css';
import {BrowserRouter,Routes,Route, useParams} from 'react-router-dom';

//PAGES AND COMPONENTS
import Registration from './components/registration/Registration';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Nav from './components/nav/Nav';
import Logout from './components/Logout';
import FriendList from './components/friendList/FriendList';
import CreatePost from './components/createPost/CreatePost';
import UserSearch from './components/userSearch/UserSearch';
import Feed from './components/feed/Feed';
import UserProfile from './components/userProfile/UserProfile';
import Post from './components/posts/Post';
import Space404 from 'react-space-404';


//GLOBAL CONTEXTS
import {AuthProvider} from './context/AuthContext';
import {QueryProvider} from './context/QueryContext';
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// react-admin imports
import * as React from "react";
import {Admin, Resource} from 'react-admin';
import RestProvider from 'ra-data-simple-rest';
import UserList from './components/adminpanel/UserList';
import UserEdit from './components/adminpanel/UserEdit';
import UserCreate from './components/adminpanel/UserCreate';
import MyAppBar from './components/adminpanel/MyAppBar';
import MyLayout from './components/adminpanel/MyLayout';

// import {UserCreate} from './components/adminpanel/UserCreate'
//${process.env.S_PORT}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
        <QueryProvider>
        <Nav/>
          <Routes>

            <Route path='/' element={<UserProtectedRoute/>}>
              
              <Route path='/' element={[<Home/>]}></Route>
              <Route path='UserSearch' element={<UserSearch/>}></Route>
              <Route path='Friends' element={[<FriendList/>]}></Route>
              <Route path='/NewPost' element={<CreatePost/>}></Route>
              <Route path='/Feed' element={<Feed/>}></Route>
              <Route path='UserProfile'>
                  <Route path=':id' element={<UserProfile/>}></Route>
              </Route>
              <Route path='/Post/:id' element={<Post/>}></Route>
            </Route>
              <Route path='/Register' element={[<Registration/>]}></Route>
              <Route path='/Login' element={[<Login/>]}></Route>
              <Route path='/Logout' element={[<Home/>,<Logout/>]}></Route>

              <Route path='/Admin' element={<AdminProtectedRoute/>}>
              <Route path='/Admin/*' element={      
                <Admin layout={MyLayout}
                  basename="/Admin"
                  dataProvider={RestProvider(`http://localhost:3001/Admin`)}
                  // authProvider={AuthProvider}
                  >
                  
                  <Resource 
                    name="Users"
                    list={UserList}
                    edit={UserEdit}
                    create={UserCreate}
                    options={{label: "Users"}}
                    />
                </Admin>}>
              </Route>
            </Route>
            
              {/* <Route path='/Feed' element={<Post/>}></Route> */}
              {/* <Route path='/Register' element={<Registration/>}></Route>
              <Route path='/Login' element={<Login/>}></Route>*/}
              <Route path='/Logout' element={[<Home/>,<Logout/>]}></Route>
              <Route path='*' element={<Space404 countdown={20} href="/"/>}></Route>

          </Routes>
        </QueryProvider>
        </AuthProvider>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
