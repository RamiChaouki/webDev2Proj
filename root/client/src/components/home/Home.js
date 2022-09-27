import React, { useEffect, useRef, useState } from 'react'
import {useAuth} from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  const useAuthState=useAuth().authState;
  const getAuth=useAuth().GetAuth;
  const [quote,setQuote]=useState([]);
  const feedLinks=useRef("/Login");
  const postLinks=useRef("/Login");

  //will fetch state on refresh!
  useEffect(()=>{
    getAuth();
    setQuote(existentialGenerator(existentialQuotes))
    if(useAuthState!==""){
      postLinks.current='/NewPost';
      feedLinks.current='/Feed'
    }
  },[])
  

  function existentialGenerator(ExistentialQuotes){
    const numberOfQuotes=ExistentialQuotes.length;
    const quoteRandomiser=Math.floor(Math.random()*numberOfQuotes);
    return ExistentialQuotes[quoteRandomiser];
  }



  const existentialQuotes=[
  
    ["Jean-Paul Sartre", "Life has no meaning the moment you lose the illusion of being eternal."],
    ["Hermann Hesse","I realize today that nothing in the world is more distasteful to a man than to take the path that leads to himself."],
    ["Philip K. Dick","We are all insects. Groping towards something terrible or divine."],
    ["Søren Kierkegaard","With every increase in the degree of consciousness, and in proportion to that increase, the intensity of despair increases, the more consciousness the more intense the despair"],
    ["Rob Ryser","At the end of time I want my art to stand up and my soul to bow down"],
    ["Jack Kerouac","At night I closed my eyes and saw my bones threading the mud of my grave."],
    ["Saul Bellow","God may save all, but human rescue is only for a few."],
    ["Antoine de Saint-Exupéry","One needs, in order to exist, realities that last."],
    ["Jean-Paul Sartre","We do not know what we want and yet we are responsible for what we are - that is the fact."]

]







  return (
    
    
    <div id="homecontainer" className='container d-flex justify-content-md-center'>
      <div id="bigbox" className='row d-flex justify-content-md-center'>
        <div className='col d-flex align-items-center justify-content-center' id="welcome">Welcome home {useAuthState.username}</div>

          <Link className='col links ' to={feedLinks.current}>
            <div id="feed" className='d-flex align-items-center justify-content-center'>
                STARE INTO THE ABYSS
            </div>
          </Link>
        
      
      <div className="w-100"></div>
      
        <Link className='col links' to={postLinks.current}>
          <div id="post" className='d-flex align-items-center justify-content-center'>
              SCREAM INTO THE VOID
          </div>
        </Link>
        
        <div className='col d-flex align-items-center justify-content-center' id="quote-box">
          <span id="quote"><i>{quote[1]}</i> -<b>{quote[0]}</b></span>
        </div>
      </div>
      
    </div>
  )
}

export default Home;