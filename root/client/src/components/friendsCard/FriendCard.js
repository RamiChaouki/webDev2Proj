import './FriendCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

const FriendsCard=({friends,loading})=>{
    if(loading){
        return <h1><FontAwesomeIcon icon="fa-solid fa-spinner" /></h1>
    }

    return(
        friends.map(friend=>(
                        
                            <div id="friend-card" className="container d-inline-flex text-white bg-dark">
                            
                                <div className="col-4">
                                    <img id="profile-pic" src="https://picsum.photos/50" alt="Profile"></img>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                       <Link to={{search:`?${friend.FriendID.id}`}} className='link' replace> 
                                            <h5>{friend.FriendID.firstName} {friend.FriendID.lastName}</h5>
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
                                                <button id="accept-req-btn">
                                                    <FontAwesomeIcon icon="fa-solid fa-check" />
                                                </button>
                                                <button id="decline-req-btn" >
                                                    <FontAwesomeIcon icon="fa-solid fa-x" />
                                                </button>
                                            </>
                                        :
                                            <button id="decline-req-btn" >
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