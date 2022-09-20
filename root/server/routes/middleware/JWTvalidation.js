const {verify} = require('jsonwebtoken');
const ErrorApi = require('./errorHandling/ErrorApi');
require('dotenv').config();


function validateToken (req, res, next){
    const accessToken = req.header("accessToken");
    if(!accessToken){
        next(ErrorApi.unauthorized("You must first log in!"))
        return;
    };
    
    try {
        const validToken = verify(accessToken, process.env.JWT_PRIVATE_KEY)
        req.user = validToken;
        if(validToken){
             next();
             return
        }
    } catch (err) {
        next(ErrorApi.badRequest("Invalid Token Credentials."));
        return;
    }
}

module.exports = validateToken;