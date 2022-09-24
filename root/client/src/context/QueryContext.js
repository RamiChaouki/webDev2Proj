import React,{useContext, useState} from 'react'
const QueryContext=React.createContext("");



export function useQuery(){
    return useContext(QueryContext);
}

export function QueryProvider({children}) {
    
    const [query,setQuery]=useState("");
    
    return (
        <QueryContext.Provider value={{query,setQuery}}>
            {children}
        </QueryContext.Provider>
    )
}
