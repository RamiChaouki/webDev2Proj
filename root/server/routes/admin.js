const express=require('express');
const router=express.Router();
const user = require("../models/user");
const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');
const { badRequest, internal, conflict } = require("./middleware/errorHandling/ErrorApi");
const ErrorApi = require("./middleware/errorHandling/ErrorApi");
const {validateToken} = require("./middleware/JWTvalidation");

//npm install react-paginate
//in App.js - import React Paginate from "react-paginate";



//Throws ERROR if user doesn't exist
async function doesUserExist(req,res,next){
    
    const id = req.params.id;
    const result = await user.findByPk(id);
    if(result===null){
        // res.status(400).send("No such bid found!");
        req.doesUserExist='false';
        next(ErrorApi.badRequest('No such user found'));
        return;
    }
    req.doesUserExist='true'
    next();
}

/**
*   ROUTES
*/
// (GET)/Admin/Users - return info for a list of all users
//router.get('/Users',validateToken, async(req,res)=>{
    router.get('/Users', async(req,res)=>{  //testing line - original above. Tested: Validates token - Good, empty table - Good, 
    const listOfUsers = await user.findAll();
    res.json(listOfUsers);
});

// (GET)/Admin/Admins/:role - return info for a filtered list
router.get('/filteredList/:role', validateToken, async(req,res)=>{
    //router.get('/filteredList/:role',  async(req,res)=>{ //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - returns empty arr, proper param - Good

    const role = req.params.role;
    const filteredList = await user.findAll({where:{
        role: role
    }});
    res.json(filteredList);
});

// (GET)/Admin/User/id - return info for one user (when clicking on author when browsing posts or when clicking edit)
router.get('/User/:id', validateToken, doesUserExist, apiErrorHandler, async(req, res, next)=>{
    //router.get('/User/:id', doesUserExist, apiErrorHandler, async(req, res, next)=>{  //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - returns empty arr, proper param - Good

    const id = req.params.id;
    if (req.doesUserExist==='true'){
        const userInfo = await user.findByPk(id); // MUST RESERVE FIELDS FOR EDIT!
        res.json(userInfo);
    } else{
        res.status(ErrorApi.code).send(ErrorApi.msg);
    }
});

// (PATCH)/Admin/User/:id - saves the user record from the edited line
router.patch('/User/:id', validateToken, doesUserExist, apiErrorHandler, async(req,res)=>{
//router.patch('/User/:id', doesUserExist, apiErrorHandler, async(req,res)=>{ //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - 400, proper param - Good
    const id = req.params.id;
    const user = req.body;
    await user.update({ id: `${user.id}`, username: `${user.username}`, email: `${user.email}`,
    password: `${user.password}`, status: `${user.status}`, role: `${user.status}`,
    }, 
    {where: {id:`${id}`}});
    res.json(auction);
  });



// (DELETE)/Admin/User/:userId - deletes selected user by pressing X
router.delete('/User/:id', validateToken, doesUserExist, apiErrorHandler, async(req,res)=>{
//    router.delete('/User/:id', doesUserExist, apiErrorHandler, async(req,res)=>{ //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - 400, proper param - Good

    const id = req.params.id;
    await user.destroy({where: {id:`${id}`}});
    if (user === 0) {
      next(badRequest('No User with such ID exists'));
    } else res.json(user);
});


module.exports=router;