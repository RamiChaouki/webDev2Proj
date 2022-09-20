const Users = require('../../models/user');
const {Op}=require('sequelize');
const ErrorApi = require('./errorHandling/ErrorApi');

async function EnsureNoDuplicates(req,res,next){
    const {id, username, email} = req.body;
    const account = null;
    try{
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