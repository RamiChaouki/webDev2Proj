// const Posts = require('../../models/post');
const validator = require('validator');
const ErrorApi = require('./errorHandling/ErrorApi');

function validatePostFields(req,res,next){
    const {postText, type, postDate} = req.body;
    if(!postText||!type ||!postDate){
        next(error);
        return;
    }
    if(!validator.equals(type,"comment")&&!validator.equals(type,"post")){
        error = "Type should be post or comment";
        next(ErrorApi.badRequest("Type should be a comment or post."));
        return;
    }
    if(!validator.isISO8601(postDate)){
        error = "Invalid post date";
        next(ErrorApi.badRequest("Invalid post date"));
        return;
    }

    next();
}

module.exports=validatePostFields;