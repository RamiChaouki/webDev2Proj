//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

//MODELS
const Posts=require('../models/post');

//MIDDLEWARE
const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');
const checkActExists=require('./middleware/checkActExists');

//TODO: GET FEED
// router.get("/", async (req, res)=>{

// });

//TODO: POST FEED/POST

//TODO: POST FEED/COMMENT/:postId

//TODO: DELETE FEED/COMMENT/:postId

//TODO: DELETE FEED/:commentId



module.exports=router;