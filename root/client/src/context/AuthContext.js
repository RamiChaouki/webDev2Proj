import React, {useContext,useEffect,useState} from 'react';
import axios from 'axios';

const AuthContext= React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth(){
    return useContext (AuthContext);
}

// export function useAuthUpdate(){
//     return useContext(AuthUpdateContext);
// }

export function AuthProvider({children}){
    const [authState,setAuthState]=useState({
                                                id:0,
                                                username:"",
                                                role:"user"
                                            });

    function GetAuth(){
        
            axios
                .get('http://localhost:3001/Auth',
                    {headers:{
                                accessToken:localStorage.getItem("token")
                            }
                    }
                ).then((res)=>{
                    setAuthState({
                                    id:res.data.id,
                                    user:res.data.user,
                                    role:res.data.role
                    })
                })
                .catch((error)=>{
                    console.log(error);
                })
       
    }

    

    return(
        <AuthContext.Provider value={{authState,setAuthState,GetAuth}}>
            {/* <AuthUpdateContext.Provider value={setAuthState}> */}
                {children}
            {/* </AuthUpdateContext.Provider>    */}
        </AuthContext.Provider>
    )
};