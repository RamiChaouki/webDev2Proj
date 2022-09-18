const Users = require('../../models/user');
const {Op}=require('sequelize');
const ErrorApi = require('./errorHandling/ErrorApi');

async function ConfirmActDoesntExists(req,res,next){
    const {username, email} = req.body;
    const account = null;
    try{
        const account=await Users.findOne({
                                            where:{
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

module.exports=ConfirmActDoesntExists;