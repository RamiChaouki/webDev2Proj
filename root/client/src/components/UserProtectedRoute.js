import {useMemo,useRef,useState,useEffect } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UserProtectedRoute(){
    const getAuth=useAuth().GetAuth;
    const useAuthState=useAuth().authState;
    // var [authorized,setAuthorized]=useState(false);
    var authorized=useRef(false);
    var role=useRef("");


    useMemo(()=>{
        //Only run getAuth if there's a token, otherwise there's no point in doing an HTTP req since we already know the user isn't authorized, simply go back to home 
        
        var runCode=async()=>{
                if(localStorage.getItem('token')){
                    // getAuth()
                }

                
        }
        runCode();
            

    },[]);

    // if(useAuthState.username){
    //     authorized.current=true;
    // }
    
    // if(useAuthState.role==="admin"){
    //     role.current="admin";
    // }

    // if(authorized.current && role.current!=="admin"){
    //     return <Outlet/>;
    // }
    // else if(authorized.current && role.current==="admin"){
    //     return <Navigate to='/Admin/User'></Navigate>
    // }
    // else{
    //     return <Navigate to='/Login'></Navigate>
    // }
}
    

    
   
