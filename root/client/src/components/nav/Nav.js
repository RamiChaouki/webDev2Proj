import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'
import {useAuth} from '../../context/AuthContext'

function Nav() {
  const useAuthState=useAuth().authState;
  const getAuth=useAuth().GetAuth;

    useEffect(()=>{
        getAuth();
    },[])

  if(useAuthState.id===0){
    return (
        <nav id='nav' className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <Link id='login' to='/Login'>LOGIN</Link>
            <Link id='nav-home' to='/'>Abyss.SOCIAL</Link>
            <Link id='register' to='/Register'>REGISTER</Link>
        </nav>
    )
  }
  else if(useAuthState.role==='user'){
    return(
        <nav id='nav' className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <form id="search" className="form-inline my-2 my-lg-0">
                    <input  id="search-input"className='form-control mr-sm-2' type='Search' placeholder='Find friends' aria-label='Search'/>
                </form>
                <Link id='nav-home' to='/'>Abyss.SOCIAL</Link>
                <Link id='user' to='/Feed'>welcome, {useAuthState.username}</Link>
                <div id='dropdown' className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" href="#">Feed</Link></li>
                        <li><Link className="dropdown-item" href="#">Edit Profile</Link></li>
                        <div className="dropdown-divider"></div>
                        <li><Link className="dropdown-item" to='/Logout'>Logout</Link></li>
                    </ul>
                </div>
            </nav> 
    )}
    else if(useAuthState.role==='admin'){
        return(<></>);
    }
    
  
}

export default Nav;