import {useMemo,useRef } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminProtectedRoute(){
    const {role,isLoading}=useAuth();

    if(isLoading){
        return <p>Loading</p>
    }

    if(role==="admin"){
        return <Outlet/>;
    }
   
}
