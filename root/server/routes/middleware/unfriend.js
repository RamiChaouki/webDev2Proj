const { Op } = require('sequelize')
const friendStatus=require('../../models/friendStatus')

async function Unfriend (req,res,next){
    const userId=req.user.id;
    const friendId=req.params.friendId;

    await friendStatus.destroy({where:{
                                    [Op.and]:[
                                        {userId:userId,
                                        friendId:friendId}
                                    ]
    }})

    await friendStatus.destroy({where:{
        [Op.and]:[
            {userId:friendId,
            friendId:userId}
        ]
    }})

    next();
    return;
}

module.exports=Unfriend;