const Users = require('../../models/user');
const {Op}=require('sequelize');
const ErrorApi = require('./errorHandling/ErrorApi');

async function CheckActExists(req,res,next){
    const {username, email} = req.body;
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
            :next(ErrorApi.conflict('Email Already in Use'));
        return;
    }

    next();
}

module.exports=CheckActExists;