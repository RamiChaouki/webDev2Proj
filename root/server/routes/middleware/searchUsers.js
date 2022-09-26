const {sequelize}=require('../../models/sequelizeConfig')
const {Op} = require('sequelize');

async function SearchUsers(req,res,next){
    let usersList=[];
    let queryArray=req.params.query;
        
        for(queryItem of queryArray){
            let tempList=
            await sequelize.query(
                "Select firstName, lastName,username,id,profile from users where (firstName like :query or username like :query or lastName like :query)",
                {
                    replacements:{
                                query:queryItem+'%' 
                                }
                }

            )
            //tempList returns an array of size 2. tempList[0] is an array of query result objects and tempList[1] is a duplicate. Since THIS for loop might run more than once, pushing tempList[0] into an array at each loop will create an array within an array, where each index is the array of objects from a search. e.g. [[{s1},{s1}],[{s2},{s2}]].
            //By using Object.assign, we can seamlessly integrate the result objects from each loop into one single array. e.g. [{s1},{s1},{s2},{s2}]. This makes processing by the later middlewares much easier.
            
            usersList=[...tempList[0],...usersList];
        }
 
    const usersMap=new Map();

    for(const user of usersList){
        usersMap.set(user.id,user);
    }

    req.usersMap=usersMap;
     req.usersList=usersList;
    next();
    return;
}

module.exports=SearchUsers;