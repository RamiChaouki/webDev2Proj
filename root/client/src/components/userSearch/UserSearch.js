import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import {useQuery} from '../../context/QueryContext';
//Import Components
import UsersCard from '../userCard/UserCard';
import Pagination from '../pagination/Pagination';

function UserSearch() {
    //Global Context Variables
    const useQueryState=useQuery().query;
    const useQuerySentState=useQuery().querySent;
    const setQuerySentState=useQuery().setQuerySent;
    //Locally Owned Free Range Variables
    const [users,setUsers]=useState({});
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(20);
    const [listLength,setListLength]=useState(0);
    const [paginationLength,setPaginationLength]=useState(1);

    useMemo(()=>{

        const fetchUsers= async()=>{
            setLoading(true);
            const res= await axios.get(`http://localhost:3001/User/Search/${limit}/${page}/${useQueryState}`,
                                        {headers:{
                                            accessToken:localStorage.getItem("token")
                                                }
                                        })
            
            setUsers(res.data);
            setListLength(Number(res.headers['list-length']))//returns the total number of matches from the db -- THIS IS NOT the amounts of matches that are sent to the client because we truncate it server side before sending a response to make the response body smaller
            var PL=Math.ceil(listLength/limit)
            setPaginationLength(PL);
            setLoading(false);
        }

        fetchUsers();


    },[useQuerySentState])

  return (
    <>
        <div className='container flex-d'>
            <h1>You've got friends, but even this shall pass away...</h1>
            <Pagination 
                    setPage={setPage} 
                    paginationLength={paginationLength} 
                    setLimit={setLimit} 
                    queryState={setQuerySentState}>
            
                <UsersCard users={users} setUsers={setUsers} loading={loading}/>
                {console.log(users)}            
                {/* {users.map(user=>{  
                                    if(user.status==="Friends"){
                                        return <div>Friend</div>}
                                    else{
                                        return <div>User</div>
                                    }
                                        })}  */}
            </Pagination>
        </div>
    </>
            
  )
}

export default UserSearch