function ParseQuery(req,res,next){
    const query=req.params.query;
    const queryArray=query.split(" ");

    req.params.query=queryArray;

    next();
    return;
}

module.exports=ParseQuery;