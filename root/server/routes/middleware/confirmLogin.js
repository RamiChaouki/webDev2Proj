const Users = require('../../models/user');
const {Op}=require('sequelize');
const ErrorApi = require('./errorHandling/ErrorApi');
const bcrypt = require("bcrypt");

async function ConfirmLogin(req,res,next){
    const {usernameOrEmail,password} = req.body;
    let account = null;
    let exitRouter=false;
    
    try{//Finds User
                account=await Users.findOne({
                                            where:{
                                                [Op.or]:[
                                                    {username:usernameOrEmail},
                                                    {email:usernameOrEmail}
                                                ]
                                            }
        });
        
        if(!account){
            next(ErrorApi.badRequest('Invalid Credentials.'));
            return;
        }
        //Checks pwd against the database
        bcrypt
            .compare(password,account.dataValues.password)
            .then(async(match)=>{
                    if(!match) {
                      next(ErrorApi.badRequest('Invalid Crendentials.'));
                      exitRouter=true;
                      return;
                    }
            })
            //if you don't write the then, bcrypt matching will run AFTER reading line 39 "next()" and create a JWT, this will result in two requests being sent. appendJWT must only be called once bcrypt has run.
            .then(()=>{
                if(!exitRouter){ 
                    req.body.account=account;
                    next();
                };
            });
        

    }
    catch(error){
        next(error);
        return;
    }
}

module.exports=ConfirmLogin;