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



router.get('/:limit([0-9]+)/:page([0-9]+)',JWTvalidation,apiErrorHandler,(req,res)=>{
    const {id}=req.user;

    var limit=0;
    var offset=0;

    if(!req.params.limit||!req.params.page){
        limit=10;
        req.params.page=1;
    }
    limit=Number(req.params.limit);//Params were coming out as string, which was messing up the mySQL query --- Not the most elegant solution

    offset=Number(limit*(Number(req.params.page)-1))//assumes pages start at 1
    friendStatus
                    .findAll(
                            {offset:offset,//limit and offset implement backend pagination
                            limit:limit,
                            order:[["status","ASC"]], //returns requests first
                            include:"FriendID",
                            where:{userId:id}})

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