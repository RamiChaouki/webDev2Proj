import {useEffect, useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios';
import FriendsCard from '../friendsCard/FriendCard'

export default function FriendList() {
    
    const auth=useAuth().authState;
    const [loading,setLoading]=useState(false);
    const [friends,setFriends]=useState([]);
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(20);

    useEffect(()=>{

        const fetchFriends= async()=>{
            setLoading(true);
            const res= await axios.get(`http://localhost:3001/Friend/${limit}/${page}`,
                                        {headers:{
                                            accessToken:localStorage.getItem("token")
                                                }
                                        });
            setFriends(res.data);
            setLoading(false);
        }

        fetchFriends();


    },[])
    console.log(friends);
  return (
    <>
        <h1>You've got friends, but even this shall pass away...</h1>
        <div className='container flex-d'>
            <FriendsCard friends={friends} loading={loading}/>
        </div>
    </>
  )
}

