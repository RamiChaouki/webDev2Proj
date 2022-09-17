const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const Users=require('../models/user');

//TODO:
/**
 * middleware to make sure FIELDS NOT NULL
 * middleware to make sure PASSWORD IS LARGER THAN 6 CHARACTERS
 * middleware to make sure USERNAME and EMAIL DON'T ALREADY EXIST
 */



router.post('/Register',async (req,res)=>{
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