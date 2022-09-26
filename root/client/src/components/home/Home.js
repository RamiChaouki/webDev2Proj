import React, { useEffect } from 'react'
import {useAuth} from '../../context/AuthContext'
import ExistentialQuotes from './ExistentialQuotes.json';

function Home() {
  const useAuthState=useAuth().authState;
  const getAuth=useAuth().GetAuth;

  //will fetch state on refresh!
  useEffect(()=>{getAuth();},[])
  

  return (
    
    
    <div className='container'>
      <div>Home</div>
      <div>Welcome home {useAuthState.username}</div>
      <div>{Object.keys(ExistentialQuotes).length}</div>
    </div>
  )
}

export default Home;