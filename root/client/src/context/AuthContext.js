import React, {useContext,useState} from 'react';
import axios from 'axios';

const AuthContext= React.createContext();


export function useAuth(){
    return useContext (AuthContext);
}


export function AuthProvider({children}){
    const [authState,setAuthState]=useState({
                                                id:0,
                                                username:"",
                                                role:"user"
                                            });

    function GetAuth(){
        if(localStorage.getItem('token')){
            axios
                .get('http://localhost:3001/Auth',
                    {headers:{
                                accessToken:localStorage.getItem("token")
                            }
                    }
                ).then((res)=>{
                    setAuthState({
                                    id:res.data.id,
                                    username:res.data.user,
                                    role:res.data.role
                    })
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