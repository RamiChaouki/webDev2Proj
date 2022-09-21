const friendStatus=require('../models/friendStatus');
const {Op}=require('sequelize');

//All variables have to be let, not var, because otherwise they will run synchronously
for (let userId=1; userId<51;userId++){
    for(let connections=0;connections<20;connections++ ){
        
        
            let friendId= Math.floor(50*Math.random()+1);
            if(userId==friendId)friendId++;

            friendStatus.findOne(
                                    {where:{
                                        [Op.and]:[
                                            {"friendId":friendId},
                                            {"userId":userId}
                                        ]}})
                                        .then((found)=>{
                                            if(!found){
                                                friendStatus.create({
                                                                        type:"Friends",
                                                                        friendId:friendId,
                                                                        userId:userId

                                                                    });

                                                friendStatus.create({
                                                                        type:"Friends",
                                                                        friendId:userId,
                                                                        userId:friendId

                                                                    });                    
                                            }
                                        })                               
            
    
    }
}