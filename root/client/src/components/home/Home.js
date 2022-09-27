import React, { useEffect } from 'react'
import {useAuth} from '../../context/AuthContext'
import ExistentialQuotes from './ExistentialQuotes.json' 

function Home() {
  const useAuthState=useAuth().authState;
  const getAuth=useAuth().GetAuth;

  //will fetch state on refresh!
  useEffect(()=>{getAuth();},[])
  

  // function existentialGenerator(ExistentialQuotes){
  //   // const keyNums=Object.keys(ExistentialQuotes).length;
  //   // // const quoteRandomiser=Math.floor(Math.random()*keyNums);
  //   // const parsedJSON=Object.keys(ExistentialQuotes);
  //   return ExistentialQuotes;
  // }
  return (
    
    
    <div className='container'>
      <div>Home</div>
      <div>Welcome home {useAuthState.username}</div>
      <div>{}</div>
    </div>
  )
}

export default Home;