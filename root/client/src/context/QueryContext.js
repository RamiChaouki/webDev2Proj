import React,{useContext, useState} from 'react'
const QueryContext=React.createContext("");



export function useQuery(){
    return useContext(QueryContext);
}

export function QueryProvider({children}) {
    
    const [query,setQuery]=useState("");
    const [querySent,setQuerySent]=useState(false);
    
    return (
        <QueryContext.Provider value={{query,setQuery,querySent,setQuerySent}}>
            {children}
        </QueryContext.Provider>
    )
}
