import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

//PAGES AND COMPONENTS
import Registration from './components/registration/Registration';
import Home from './components/home/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/Register' element={<Registration/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
