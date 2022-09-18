//EXPRESS DEPENDENCIES
    const express=require('express');
    const router=express.Router();

//HASHING DEPENDENCY
    const bcrypt=require('bcrypt');

//MODELS
    const Users=require('../models/user');

//MIDDLEWARE
    const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');
    const confirmActDoesntExist=require('./middleware/confirmActDoesntExist');
    const confirmNoEmptyField=require('./middleware/confirmNoEmptyField');
    const registrationHandler=require('./middleware/registrationHandler');

//TODO:
/**
 * middleware to make sure FIELDS NOT EMPTY -- DONE
 * middleware to make sure PASSWORD IS LARGER THAN 6 CHARACTERS, USERNAME LARGER THAN 3 CHAR, EMAIL IS AN ACTUAL EMAIL (VALIDATOR)
 * middleware to make sure USERNAME and EMAIL DON'T ALREADY EXIST -- DONE
 */



router.post('/Register',confirmNoEmptyField,confirmActDoesntExist,registrationHandler,apiErrorHandler,async (req,res)=>{
const {firstName, lastName, username, email, password, dateOfBirth}=req.body;

bcrypt.hash(password,10)
    .then((hash)=>{
                    Users.create({
                        firstName:firstName,
                        lastName:lastName,
                        username:username,
                        email:email,
                        password:hash,
                        dateOfBirth:dateOfBirth,
                        status:'active'
                    })
        .catch((error)=>{
            console.log(error);
            
        });
res.status(201).json({"Message":"User "+username+" created"});

})

});



module.exports=router;