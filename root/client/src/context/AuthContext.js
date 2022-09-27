import React, {useContext,useEffect,useMemo,useState} from 'react';
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
                                                role:""
                                            });

async function GetAuth(){
        if(localStorage.getItem('token')){
           axios
                .get(`${process.env.REACT_APP_API_HOST}/Auth`,
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

//new code starts

const fetchAuth = async (accessToken) => {
    const {
      data: { id, user, role },
    } = await axios.get(`${process.env.REACT_APP_API_HOST}/Auth`, {
      headers: { accessToken },
    });
  
    return { id, username: user, role };
  };
  
  
    // Loading state
    const [isLoading, setIsLoading] = useState(false);
  
    // Helper memo
    const role = useMemo(() => authState.role, [authState]);
  
    const getAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      try {
        if (token) {
          setAuthState(await fetchAuth(token));
        }
      } catch (err) {
        console.error(err.toJSON());
      } finally {
        setIsLoading(false);
      }
    };
  
    // Call getAuth on mount
    useEffect(() => {
      getAuth();
    }, []);
  

//new code ends

    return(
        <AuthContext.Provider value={{authState,setAuthState,GetAuth,role,isLoading}}>
                {children}
        </AuthContext.Provider>
    )
};