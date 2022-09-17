//EXPRESS DEPENDENCIES
    const express=require('express');
    const router=express.Router();

//HASHING DEPENDENCY
    const bcrypt=require('bcrypt');

//MODELS
    const Users=require('../models/user');

//MIDDLEWARE
    const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');
    // const confirmActDoesntExist=require('./middleware/confirmActDoesntExist');
    // const confirmNoEmptyField=require('./middleware/confirmNoEmptyField');
    const {confirmActDoesntExist,confirmNoEmptyField}=require('./middleware')

//TODO:
/**
 * middleware to make sure FIELDS NOT EMPTY
 * middleware to make sure PASSWORD IS LARGER THAN 6 CHARACTERS
 * middleware to make sure USERNAME and EMAIL DON'T ALREADY EXIST
 */



router.post('/Register',confirmNoEmptyField,confirmActDoesntExist,apiErrorHandler,async (req,res)=>{
const {firstName, lastName, username, email, password, dateOfBirth,status}=req.body;

bcrypt.hash(password,10)
    .then((hash)=>{
                    Users.create({
                        firstName:firstName,
                        lastName:lastName,
                        username:username,
                        email:email,
                        password:hash,
                        dateOfBirth:dateOfBirth,
                        status:status
                    })
        .catch((error)=>{
            console.log(error);
            // res.status(500).json({"Error":"Error: "+ error})
        });
res.status(201).json({"Message":"User "+username+" created"});

})

});



module.exports=router;