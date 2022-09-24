import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import {useQuery} from '../../context/QueryContext';
import UsersCard from '../userCard/UserCard';
function UserSearch() {
    const useQueryState=useQuery().query;
    const useQuerySentState=useQuery().querySent;
    const [users,setUsers]=useState({});
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(20);

    useMemo(()=>{

        const fetchUsers= async()=>{
            setLoading(true);
            const res= await axios.get(`http://localhost:3001/User/Search/${limit}/${page}/${useQueryState}`,
                                        {headers:{
                                            accessToken:localStorage.getItem("token")
                                                }
                                        })
            
            setUsers(res.data);
            setLoading(false);
        }

        fetchUsers();


    },[useQuerySentState])

  return (
    <>
        <h1>You've got friends, but even this shall pass away...</h1>
        
        <div className='container flex-d'>
        <UsersCard users={users} setUsers={setUsers} loading={loading}/>
        {console.log(users)};            
            {/* {users.map(user=>{  
                                if(user.status==="Friends"){
                                    return <div>Friend</div>}
                                else{
                                    return <div>User</div>
                                }
                                    })}  */}
        </div>
    </>
  )
}

export default UserSearch