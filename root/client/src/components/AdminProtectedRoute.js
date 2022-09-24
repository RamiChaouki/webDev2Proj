import {useMemo,useRef } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminProtectedRoute(){
    const getAuth=useAuth().GetAuth;
    const useAuthState=useAuth().authState;
    // var [authorized,setAuthorized]=useState(false);
    var authorized=useRef(false);
    useMemo(()=>{
        //Only run getAuth if there's a token, otherwise there's no point in doing an HTTP req since we already know the user isn't authorized, simply go back to home
            if(localStorage.getItem('token')){
                getAuth(); 
                if(useAuthState.role === "admin"){
                    authorized.current=true;
                }

            }

    },[]);

    if(authorized){
        return <Outlet/>;
    }
    else{
        return <Navigate to='/Login'></Navigate>
    }
   
}