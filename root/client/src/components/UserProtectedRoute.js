import {useEffect, useMemo,useRef,useState } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UserProtectedRoute(){
    const {role,isLoading}=useAuth();

    if(isLoading){
        return <p>Loading</p>
    }

    if(role==="user"){
        return <Outlet/>;
    }
   
}
