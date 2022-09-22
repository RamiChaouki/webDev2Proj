//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

//MIDDLEWARES
const apiErrorHandler = require('./middleware/errorHandling/apiErrorHandler');
const JWTvalidation = require('./middleware/JWTvalidation');
const getFriendStatus = require('./middleware/getFriendStatus');
const unfriend = require('./middleware/unfriend');

//MODELS
const friendStatus=require('../models/friendStatus');
const newFriendReq = require('./middleware/newFriendReq');



router.get('/',JWTvalidation,apiErrorHandler,(req,res)=>{
    const {id}=req.user;
    friendStatus
                    .findAll({include:"FriendID"},
                            {where:
                                    {userId:id}})
                    .then((friendList)=>{
                        res.status(200).json(friendList);
                    })

   

    
})

//To SEND REQUEST, ACCEPT REQUEST -- HANDLES CASES WITH DUPLICATE REQUESTS AND WHERE USERS ARE ALREADY FRIENDS
router.get('/Send_Request/:friendId([0-9]+)',JWTvalidation,getFriendStatus,newFriendReq,apiErrorHandler,(req,res)=>{
    res.status(201).json(req.actionRequired);
})

//TO UNFRIEND, REFUSE REQUEST
router.get('/Unfriend/:friendId([0-9]+)',JWTvalidation,unfriend,apiErrorHandler,(req,res)=>{
    res.status(201).json(req.actionRequired);
})

module.exports=router;