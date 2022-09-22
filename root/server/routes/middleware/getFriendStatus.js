const friendStatus=require('../../models/friendStatus')
const {Op} = require('sequelize');

async function GetFriendStatus(req,res,next){
    const userId=req.user.id;
    const friendId=req.params.friendId;
    var status="";

    //if this search turns up a result, that means either the user had sent a friend req before, or the person they're requesting had requested to be their friend
        const friendshipStatus =await friendStatus.findOne({where:{ 
                                        [Op.and]:[
                                            {userId:userId,
                                            friendId:friendId}
                                        ]
        }})
        
        if(friendshipStatus){
            status=friendshipStatus.dataValues.status;
        }else{
            status="Row Not Found";
        }

            //req.friendshipStatus gets passed to the next middleware in order to make them conditional. 
            switch(status){
                case "Friends": //nothing should happen since they are already friends
                    req.actionRequired="Nothing-Already Friends";
                    break;
                case "Request sent": //nothing should happen since they already sent a request
                    req.actionRequired="Nothing-Req Already Sent";
                    break;
                case "Request received": //if status== "Request received" it implies the friend had already sent a req and is waiting on a response. Otherwise, the row wouldn't exist. Must update both user and friend to "Friends"
                    req.actionRequired="Become Friends";
                    break;
                default:            //default occurs if "status"=="Row Not Found", which means that this is the first friend request initiated by either party. Must update user row to "req sent" and friend to "Request received"
                    req.actionRequired="Log Request";
                    break;
            }

        
        

        

        console.log(req.actionRequired);
        next();
        return;
    

}

module.exports=GetFriendStatus;
