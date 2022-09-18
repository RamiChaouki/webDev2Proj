//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

//MODELS
const Posts=require('../models/post');

//MIDDLEWARE
const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');
const validatePostFields=require('./middleware/validatePostFields')

//TODO: GET FEED
router.get("/", async (req, res)=>{

});

//TODO: POST FEED/POST
router.post("/", validatePostFields, apiErrorHandler, async (req, res)=>{
    
    const post = req.body;
    post.userId = 1; //For testing purposes
    await Posts.create(post);
    res.json(post);

});

//TODO: POST FEED/COMMENT/:postId

//TODO: DELETE FEED/COMMENT/:postId

//TODO: DELETE FEED/:commentId



module.exports=router;