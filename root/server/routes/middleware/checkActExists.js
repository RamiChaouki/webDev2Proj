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
        next(ErrorApi.conflict('User Already Exists'));
        return;
    }

    next();
}

module.exports=CheckActExists;