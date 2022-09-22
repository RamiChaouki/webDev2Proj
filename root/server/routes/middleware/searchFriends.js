const friendTable=require('../../models/friendStatus');
const {Op}=require('sequelize');

async function SearchFriends(req,res,next){
    const userId=req.user.id;
    let friendsList={}
    let queryArray=req.params.query; //Query has been modified by parse query

    for(queryItem of queryArray){
        // await friendTable.query()
    }

    next();
    return;
}

module.exports=SearchFriends;