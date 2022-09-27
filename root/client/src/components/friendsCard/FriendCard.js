import './FriendCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import axios from 'axios';

const FriendsCard=({friends,setFriends,loading,updater,setUpdater})=>{
    if(loading){
        return <h1><FontAwesomeIcon icon="fa-solid fa-spinner" /></h1>
    }

    async function removeFriend(id){
        await axios
                .get(`${process.env.REACT_APP_API_HOST}/Friend/Unfriend/${id}`,
                        {headers:{
                            accessToken:localStorage.getItem("token")
                        }}
                );
                console.log(id);
                const newList = friends.filter((friend) => friend.friendId !== Number(id));
                setFriends(newList);
    }

    async function addFriend(id){
        await axios
                .get(`${process.env.REACT_APP_API_HOST}/Friend/Send_Request/${id}`,
                        {headers:{
                            accessToken:localStorage.getItem("token")
                        }}
                )
                .then(()=>{
                    
                })

        var idNum=Number(id);
                for(const friend of friends){
                    if(friend.friendId===idNum){
                        friend.status='Friends';
                    }
                };
                setFriends(friends);
                setUpdater(updater=>!updater) //Forces a rerender. The reason setFriends doesn't do this is because I am changin a value of the object, but not the object itself, so React doesn't detect a change. Read more:https://blog.logrocket.com/how-when-to-force-react-component-re-render/
    }

    
    return(
        friends.map((friend,key)=>(
                        
                            <div key={key} id="friend-card" className="container d-inline-flex text-white bg-dark">
                            
                                <div className="col-4">
                                    <img id="profile-pic" src="https://picsum.photos/50" alt="Profile"></img>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                       <Link to={'/UserProfile/'+`${friend.FriendID.id}`} replaceclassName='link' replace> 
                                            <h4>{friend.FriendID.firstName} {friend.FriendID.lastName}</h4>
                                        </Link>
                                    </div>
                                    <div className="row">
                                        <p>{friend.FriendID.username}</p>
                                    </div>
                                </div>

                                <div id="col3"className="col-4">
                                    
                                        <p id="status">{friend.status}</p>

                                        {friend.status==='Request received'
                                        ?
                                            <>
                                                <button id="accept-req-btn" data-accept={friend.friendId} onClick={e=>addFriend(e.currentTarget.dataset.accept)} >{/*e.currentTarget.dataset.accept seems to be the only way so far to reliably have the function pass to the friendId to the function */}
                                                    <FontAwesomeIcon icon="fa-solid fa-check"  />
                                                </button>
                                                <button key={friend.FriendID.username} id="decline-req-btn" data-remove={friend.FriendID.id} onClick={e=>removeFriend(e.currentTarget.dataset.remove)} >
                                                    <FontAwesomeIcon icon="fa-solid fa-x" />
                                                </button>
                                            </>
                                        :
                                            <button key={friend.FriendID.username} id="decline-req-btn" data-remove={friend.FriendID.id} onClick={e=>removeFriend(e.currentTarget.dataset.remove)}>
                                                    <FontAwesomeIcon icon="fa-solid fa-x" />
                                            </button>
                                        }
                                </div>
                                
                            </div>
                        
                    )
        )
        

    )
}

export default FriendsCard;