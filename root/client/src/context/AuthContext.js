import React, {useContext,useState} from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

const AuthContext= React.createContext();


export function useAuth(){
    return useContext (AuthContext); //returns a function which once run returns an object with the values you placed in it. In this case it returns {authState,setAuthState,GetAuth}
    //you can call this object.prop to use the prop
}


export function AuthProvider({children}){
    const [authState,setAuthState]=useState({
                                                id:0,
                                                username:"",
                                                role:"user"
                                            });

async function GetAuth(){
        if(localStorage.getItem('token')){
           axios
                .get('http://localhost:3001/Auth',
                    {headers:{
                                accessToken:localStorage.getItem("token")
                            }
                    }
                ).then((res)=>{
                    setAuthState((prev)=>({
                                    ...prev,
                                    id:res.data.id,
                                    username:res.data.user,
                                    role:res.data.role
                                }))
                            })
                .catch((error)=>{
                    console.log(error);
                })
        }
}


    

    return(
        <AuthContext.Provider value={{authState,setAuthState,GetAuth}}>
                {children}
        </AuthContext.Provider>
    )
};