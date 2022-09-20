import React, { useMemo } from 'react'
import {useAuth} from '../context/AuthContext'
import {Navigate} from 'react-router-dom'

function Logout() {
    const setAuthState=useAuth().setAuthState;

    useMemo(()=>{
        setAuthState((prev)=>({
            id:0,
            username:"",
            role:"user"
          }
        )
    );
        
        localStorage.removeItem('token');
    },[])

  return (
    <Navigate to='/'/>
  )
}

export default Logout