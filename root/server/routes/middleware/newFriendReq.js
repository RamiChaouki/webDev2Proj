const { Op } = require('sequelize')
const friendStatus=require('../../models/friendStatus')

async function NewFriendReq (req,res,next){
    //IMPORTED VALUES FROM GetFriendStatus MIDDLEWARE
    const action=req.actionRequired;
    const userId=req.user.id;
    const friendId=req.params.friendId;

    switch(action){
        case "Nothing-Already Friends":
            break;
        
        case "Nothing-Req Already Sent":
            break;
        
        case "Become Friends":
            await friendStatus.update(
                {status:"Friends"},
                {where:{
                    [Op.and]:[
                        {friendId:friendId,
                        userId:userId}
                    ]
                }
            });

            await friendStatus.update(
                {status:"Friends"},
                {where:{
                    [Op.and]:[
                        {friendId:userId,
                        userId:friendId}
                    ]
                }
            });   
            break;
        case "Log Request":
            await friendStatus.create({
                status:"Request Sent",
                friendId:friendId,
                userId:userId

            });

            await friendStatus.create({
                status:"Request received",
                friendId:userId,
                userId:friendId

            });   
            break;
        default:
            break;
    }

    next();
    return;
}

module.exports=NewFriendReq;