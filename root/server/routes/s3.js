//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

//MIDDLEWARES
const JWTvalidation=require('./middleware/JWTvalidation');
const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');
const generateUploadURL = require('./middleware/s3.js')


router.get('/',JWTvalidation,apiErrorHandler,async(req,res)=>{
    const url=await generateUploadURL();
    res.send({url});
})

module.exports=router;