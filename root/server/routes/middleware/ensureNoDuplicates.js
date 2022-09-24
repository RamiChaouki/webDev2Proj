const Users = require('../../models/user');
const {Op}=require('sequelize');
const ErrorApi = require('./errorHandling/ErrorApi');

// prevent from saving edits to user where an email would match someone else's email OR 
//username matches someone elses username BUT 
//exclude the original record from that search
async function EnsureNoDuplicates(req,res,next){
    const {id, username, email} = req.body;
    const account = null;
    try{
        // find a record where id!=req.id and username
        const account=await Users.findOne({
            where:{
                id: {
                    [Op.ne]: id
                },
                [Op.or]:[
                    {username:username},
                    {email:email}
                ]
            }
});
        
        if(account){
        account.dataValues.username==username
            ?next(ErrorApi.conflict('Username Already Taken'))
            :next(ErrorApi.conflict('Email Already Taken'));
        return;
    }
    }catch(error){
        next(error);
        return;
    }
    

    next();
}

module.exports=EnsureNoDuplicates;