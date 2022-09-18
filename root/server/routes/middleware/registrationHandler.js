const ErrorApi = require('./errorHandling/ErrorApi');
const validator = require('validator');

function RegistrationHandler(req,res,next){
    const {password,username,email,dateOfBirth}=req.body;
    const date=new Date();
    const thirteenYearsAgo=new Date(
                                    date.getFullYear()-13,
                                    date.getMonth(),
                                    date.getDate()
                                );

    if(!validator.isLength(password,{min:6,max:255})){
        next(ErrorApi.badRequest("Invalid Password Length: Must be between 6 and 255 characters"));
        return;
    }

    if(!validator.isEmail(email)){
        next(ErrorApi.badRequest("Invalid Email Length: Must be of format xyz@abc.lmn"));
        return;
    }

    if(!validator.isLength(username,{min:4,max:16})){
        next(ErrorApi.badRequest("Invalid Username Length: Must be between 6 and 16 characters"));
        return;
    }

    if(validator.isAfter(dateOfBirth,thirteenYearsAgo.toDateString())){
        next(ErrorApi.badRequest("Invalid age: Must be at least 13 years old to scream into the void"));
        return;
    }

    next();
}

module.exports=RegistrationHandler;