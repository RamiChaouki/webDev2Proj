import './UserCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '../../context/QueryContext';


const UsersCard=({users,setUsers,loading})=>{
    const useQuerySentState=useQuery().querySent;
    const setQuerySentState=useQuery().setQuerySent;
    
    
    
    if(loading){
        return <h1><FontAwesomeIcon icon="fa-solid fa-spinner" /></h1>
    }

    async function removeFriend(id){
        await axios
                .get(`http://localhost:3001/Friend/Unfriend/${id}`,
                        {headers:{
                            accessToken:localStorage.getItem("token")
                        }}
                );
                //This will rerun the useEffect in UserSearch.js so that the refusal of the request gets updated
                setQuerySentState(useQuerySentState=>!useQuerySentState);
    }

    async function addFriend(id){
        await axios
                .get(`http://localhost:3001/Friend/Send_Request/${id}`,
                        {headers:{
                            accessToken:localStorage.getItem("token")
                        }}
                )
                .then(()=>{
                    
                })

        var idNum=Number(id);
                for(const user of users){
                    if(user.id===idNum){
                        user.status='Friends';
                    }
                };
                setUsers(users);
                setQuerySentState(useQuerySentState=>!useQuerySentState);
    }

    
    return(
        users.map(user=>(
                        
                            <div key={user.username} id="friend-card" className="container d-inline-flex text-white bg-dark">
                            
                                <div className="col-4">
                                    <img id="profile-pic" src="https://picsum.photos/50" alt="Profile"></img>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                       <Link to={'/UserProfile/'+`${user.id}`} replace> 
                                            <h4>{user.firstName} {user.lastName}</h4>
                                        </Link>
                                    </div>
                                    <div className="row">
                                        <p>{user.username}</p>
                                    </div>
                                </div>

                                <div id="col3"className="col-4">
                                    
                                        <p id="status">
                                                {
                                                user.status==="Friends"
                                                ?
                                                "Friend"
                                                :
                                                user.status==="Request received"
                                                ?
                                                "Request received"
                                                :
                                                user.status==="Request sent"
                                                ?
                                                "Request sent"
                                                :
                                                "User"
                                                }
                                                
                                                                
                                        </p>

                                        {user.status==='Request received'
                                        ?
                                            <>
                                                <button id="accept-req-btn" data-accept={user.id} onClick={e=>addFriend(e.currentTarget.dataset.accept)} >{/*e.currentTarget.dataset.accept seems to be the only way so far to reliably have the function pass to the friendId to the function */}
                                                    <FontAwesomeIcon icon="fa-solid fa-check"  />
                                                </button>
                                                <button key={user.username} id="decline-req-btn" data-remove={user.id} onClick={e=>removeFriend(e.currentTarget.dataset.remove)} >
                                                    <FontAwesomeIcon icon="fa-solid fa-x" />
                                                </button>
                                            </>
                                        :
                                        user.status==='Request sent'
                                        ?
                                            <button key={user.username} id="decline-req-btn" data-remove={user.id} onClick={e=>removeFriend(e.currentTarget.dataset.remove)}>
                                                    <FontAwesomeIcon icon="fa-solid fa-x" />
                                            </button>
                                        :
                                        user.status==="Friends"
                                        ?
                                        <></>
                                        :
                                        <button id="accept-req-btn" data-accept={user.id} onClick={e=>addFriend(e.currentTarget.dataset.accept)} >
                                                    <FontAwesomeIcon icon="fa-solid fa-check"  />
                                        </button>
                                        }
                                </div>
                                
                            </div>
                       )
                    )
        
        

    )
}

export default UsersCard;