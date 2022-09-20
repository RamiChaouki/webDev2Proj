import React, { useEffect } from 'react'
import {useAuth} from '../../context/AuthContext'

function Home() {
  const useAuthState=useAuth().authState;
  const getAuth=useAuth().GetAuth;

  //will fetch state on refresh!
  useEffect(()=>{getAuth();},[])
  
  return (<>
    <div>Home</div>
    <div>Welcome home {useAuthState.user}</div>
    </>
  )
}

export default Home;