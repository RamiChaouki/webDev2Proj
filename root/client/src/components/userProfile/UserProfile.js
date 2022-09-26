import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import UserEdit from './UserEdit';


function UserProfile() {
    const auth=useAuth().authState;
    const {id}=useParams();
    const [profile,setProfile]=useState({});
    const [myProfile,setMyProfile]=useState(false);
    const [editMode,setEditMode]=useState(false);

    useEffect(()=>{
        const fetchProfile =async ()=>{

            const res= await axios
                                .get(`http://localhost:3001/User/User/${id}`,
                                    {headers:
                                        {accessToken:localStorage.getItem("token")}})
                                    
            setProfile(res.data);
            
            if(auth.id===Number(id)){    
                setMyProfile(profile=>!profile);
            }
                                    
        }

        fetchProfile();
    },[])

    function calAge(DoB){
        return Math.floor((new Date() - new Date(DoB).getTime()) / 3.15576e+10)
    }

    function LoadProfile(myProfile){
        if(myProfile&&!editMode){
            return (
                <div className='container d-flex flex-column justify-content-center'>
                    <h1><u>UserProfile:</u></h1>
                    <h2><u>First Name:</u></h2>
                    <h3>{profile.firstName}</h3>
                    <h2><u>Last Name:</u></h2>
                    <h3>{profile.lastName}</h3>
                    <h2><u>Age</u></h2>
                    <h3>{calAge(profile.dateOfBirth)}</h3>
                    <Link onClick={()=>{setEditMode(mode=>!mode)}}>Edit Profile</Link>
                </div>
                    
            )
        }else if(editMode){
            return <UserEdit profile={profile} setMode={setEditMode}/>
        }else{
            return(
            <div className='container d-flex flex-column justify-content-center'>
                <h1><u>UserProfile:</u></h1>
                <h2><u>First Name:</u></h2>
                <h3>{profile.firstName}</h3>
                <h2><u>Last Name:</u></h2>
                <h3>{profile.lastName}</h3>
                <h2><u>Age</u></h2>
                <h3>{calAge(profile.dateOfBirth)}</h3>
            </div>
            )
        }
    }


  return (
    LoadProfile(myProfile)
  )
}

export default UserProfile