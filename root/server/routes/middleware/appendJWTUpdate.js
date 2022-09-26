require('dotenv').config();
const {sign} = require('jsonwebtoken');

function AppendJWTUpdate(req,res,next){
    console.log(req.body);

    const id = req.params.id;
    

    const accessToken=sign(
                        {
                            user:req.body.username,
                            id:req.params.id,
                            role:"user"
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