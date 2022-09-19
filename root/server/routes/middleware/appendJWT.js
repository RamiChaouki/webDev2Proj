require('dotenv').config();
const {sign} = require('jsonwebtoken');

function AppendJWT(req,res,next){
    // console.log(req.body);
    const accessToken=sign(
                        {
                            user:req.body.account.dataValues.username,
                            id:req.body.account.dataValues.id,
                            // role:req.body.account.dataValues.role
                        },
                        process.env.JWT_PRIVATE_KEY
    );
                        
    req.token=accessToken;
    next();
                        
}
module.exports=AppendJWT;