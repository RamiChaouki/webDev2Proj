//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

//MODELS
const Users=require('../models/user');

//MIDDLEWARES
const JWTvalidation=require('./middleware/JWTvalidation');
const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');

router.get('/',JWTvalidation,apiErrorHandler,(req,res)=>{
    res.json(req.user);
})

module.exports=router;