const {Op}=require('sequelize');
const { sequelize } = require('../../models/sequelizeConfig');

async function SearchFriends(req,res,next){
    const userId=req.user.id;
    let tempList=[];
    let friendsList=[];
    let queryArray=req.params.query; //Query has been modified by parse query

    for(queryItem of queryArray){
       tempList=
            await sequelize.query(
                "Select `users`.`firstName`, `users`.`lastName`,`users`.`username`,`users`.`id`,`users`.`profile`,`friendstatuses`.`status` from friendstatuses inner join users on friendstatuses.friendId=users.id where (firstName like :query or username like :query or lastName like :query) and userId=:userId order by `friendstatuses`.`status`",
                {
                    replacements:{
                                query:queryItem+'%',
                                userId:userId  
                                }
                }

            )
       //tempList returns an array of size 2. tempList[0] is an array of query result objects and tempList[1] is a duplicate. Since THIS for loop might run more than once, pushing tempList[0] into an array at each loop will create an array within an array, where each index is the array of objects from a search. e.g. [[{s1},{s1}],[{s2},{s2}]].
       //By using the spread operator ...spread , we can seamlessly integrate the result objects from each loop into one single array. e.g. [{s1},{s1},{s2},{s2}]. This makes processing by the later middlewares much easier.
        
       friendsList=[...tempList[0],...friendsList];
    }

    const friendsMap=new Map();

    for(const friend of friendsList){
        friendsMap.set(friend.id,friend);
    }

    req.friendsMap=friendsMap;

    req.friendsList=friendsList;
    next();
    return;
}

module.exports=SearchFriends;