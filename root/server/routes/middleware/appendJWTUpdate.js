require('dotenv').config();
const {sign} = require('jsonwebtoken');

function AppendJWTUpdate(req,res,next){
    console.log(req.body);
    const accessToken=sign(
                        {
                            user:req.body.username,
                            id:req.body.id,
                            role:req.body.role
                        },
                        process.env.JWT_PRIVATE_KEY
    );
                        
    req.token=accessToken;
    req.auth={
                user:req.body.username,
                id:req.body.id,
                role:req.body.role
            }
    next();
                        
}
module.exports=AppendJWTUpdate;