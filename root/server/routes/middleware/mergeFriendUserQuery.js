function MergeFriendUserQuery(req,res,next){
    const limit=Number(req.params.limit);
    const page=Number(req.params.page);
    const offset=limit*(page-1);
    
    
    const friendsMap=req.friendsMap;
    var usersMap=req.usersMap;

    var mergeList=[];

    //Loops over friendsMap and deletes any duplicates in usersMap => O(n)
    for(const [key,value] of friendsMap){
        if(usersMap.has(key)){
            usersMap.delete(key);
        }
    }

    //Adds friends first => O(n)
    for(const [key,value] of friendsMap){
        mergeList.push(value);
    }
    
    //Adds rest of users next=>O(n)
    for(const [key,value] of usersMap){
        mergeList.push(value);
    }
    
    req.mergeList=mergeList.slice(offset,offset+limit)
    next();
    return;
}

module.exports=MergeFriendUserQuery;