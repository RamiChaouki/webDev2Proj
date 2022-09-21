//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

//MIDDLEWARES
const apiErrorHandler = require('./middleware/errorHandling/apiErrorHandler');
const JWTvalidation = require('./middleware/JWTvalidation');

//MODELS
const friendStatus=require('../models/friendStatus');


router.get('/',JWTvalidation,apiErrorHandler,(req,res)=>{
    const {id}=req.user;
    friendStatus
                    .findAll({where:
                                    {userId:id}})
                    .then((friendList)=>{
                        res.status(200).json(friendList);
                    })

   

    
})



module.exports=router;