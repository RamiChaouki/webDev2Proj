const friendStatus=require('../models/friendStatus');
const {Op}=require('sequelize');

//All variables have to be let, not var, because otherwise they will run synchronously
  async function test(){for (let userId=1; userId<51;userId++){
            let friendsTally=[];
            for(let connections=0;connections<20;connections++ ){
                

                //While Loop ensures same friend doesn't get added twice
                
                let friendId;
                do{
                    friendId= Math.floor(50*Math.random()+1);
                    
                    if(userId==friendId&&userId!=50)friendId++;
                    if(userId==friendId&&userId===50)friendId--;
                    
                }while(friendsTally.includes(friendId))
                friendsTally.push(friendId);

                //AWAIT is necessary, otherwise findOne Runs First through the whole loop, THEN calls the creates. WHich means no actual checks take place
                    const find =   await friendStatus.findOne(
                                            {where:{
                                                [Op.and]:[
                                                    {"friendId":friendId},
                                                    {"userId":userId}
                                                ]}})
                                                .then((found)=>{
                                                    if(!found){
                                                        friendStatus.create({
                                                                                status:"Friends",
                                                                                friendId:friendId,
                                                                                userId:userId

                                                                            });

                                                        friendStatus.create({
                                                                                status:"Friends",
                                                                                friendId:userId,
                                                                                userId:friendId

                                                                            });                    
                                                    }
                                                })                               
                    
            
            }
        }}

        module.exports=test;