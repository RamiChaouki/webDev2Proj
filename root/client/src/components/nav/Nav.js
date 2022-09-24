import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'
import {useAuth} from '../../context/AuthContext' //returns a function, that when run returns this object:{authState,setAuthState,GetAuth}
import {useQuery} from '../../context/QueryContext';

function Nav() {
  const useAuthState=useAuth().authState;
  const getAuth=useAuth().GetAuth;
  const useQueryState=useQuery().query;
  const setQueryState=useQuery().setQuery;

useEffect(()=>{
    getAuth();
},[])

function handleChange(e){
    setQueryState(e.target.value);
    console.log(useQueryState);
}

function search(e){
    
}

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
                <form onSubmit={search} id="search" className="form-inline my-2 my-lg-0">
                    <input value={useQueryState} onChange={handleChange} id="search-input"className='form-control mr-sm-2' type='Search' placeholder='Find friends' aria-label='Search'/>
                </form>
                <Link id='nav-home' to='/'>Abyss.SOCIAL</Link>
                <Link id='user' to='/Feed'>welcome, {useAuthState.username}</Link>
                <div id='dropdown' className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" href="/Feed">Feed</Link></li>
                        <li><Link className='dropdown-item' to='/NewPost'>Create a new Post</Link></li>
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