//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

//MIDDLEWARES
const apiErrorHandler = require('./middleware/errorHandling/apiErrorHandler');
const JWTvalidation = require('./middleware/JWTvalidation');
const getFriendStatus = require('./middleware/getFriendStatus');

//MODELS
const friendStatus=require('../models/friendStatus');
const newFriendReq = require('./middleware/newFriendReq');


router.get('/',JWTvalidation,apiErrorHandler,(req,res)=>{
    const {id}=req.user;
    friendStatus
                    .findAll({where:
                                    {userId:id}})
                    .then((friendList)=>{
                        res.status(200).json(friendList);
                    })

   

    
})

router.get('/Send_Request/:friendId([0-9]+)',JWTvalidation,getFriendStatus,newFriendReq,apiErrorHandler,(req,res)=>{
    res.status(201).json(req.user);
})


module.exports=router;