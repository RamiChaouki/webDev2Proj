const express=require('express');
const router=express.Router();
const user = require("../models/user");
const apiErrorHandler=require('./middleware/errorHandling/apiErrorHandler');
const { badRequest, internal, conflict } = require("./middleware/errorHandling/ErrorApi");
const ErrorApi = require("./middleware/errorHandling/ErrorApi");
const ensureNoDuplicates = require("./middleware/ensureNoDuplicates");
const confirmActDoesntExist = require("./middleware/confirmActDoesntExist");
const confirmNoEmptyField = require("./middleware/confirmNoEmptyField");
const registrationHandler = require("./middleware/registrationHandler");
const validateToken = require("./middleware/JWTvalidation");
//HASHING DEPENDENCY
const bcrypt=require('bcrypt');

//npm install react-paginate
//in App.js - import React Paginate from "react-paginate";



//Throws ERROR if user doesn't exist
async function doesUserExist(req,res,next){
    
    const id = req.params.id;
    const result = await user.findByPk(id);
    if(result===null){
        // res.status(400).send("No such user found!");
        req.doesUserExist='false';
        next(ErrorApi.badRequest('No such user found'));
        return;
    }
    req.doesUserExist='true'
    next();
}

// returns count of total number of users
async function getUserCount(req,res,next){
    const {count, rows} = await user.findAndCountAll();
    req.count=`Users 0-5/${count}`;
    console.log(req.count);
    next();
}

/**
*   ROUTES
*/
// (GET)/Admin/Users - return info for a list of all users
// router.get('/Users',validateToken, getUserCount,async(req,res)=>{
router.get('/Users', getUserCount, async(req,res,next)=>{  //testing line - original above. Tested: Validates token - Good, empty table - Good, 
    const listOfUsers = await user.findAll();
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range', req.count);
    res.json(listOfUsers);
});


// (GET)/Admin/User/id - return info for one user (when clicking on author when browsing posts or when clicking edit)
// router.get('/User/:id', validateToken, doesUserExist, apiErrorHandler, async(req, res, next)=>{
    router.get('/Users/:id', doesUserExist, apiErrorHandler, async(req, res, next)=>{  //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - returns empty arr, proper param - Good

    const id = req.params.id;
    if (req.doesUserExist==='true'){
        const userInfo = await user.findByPk(id); // MUST RESERVE FIELDS FOR EDIT!
        res.json(userInfo);
    } else{
        res.status(ErrorApi.code).send(ErrorApi.msg);
    }
});

// (GET)/Admin//Users?... - SCRAP code for getting pagination to work
// router.get('/User/:id', validateToken, doesUserExist, apiErrorHandler, async(req, res, next)=>{
// //    router.get('/Users?sort=[field, order]&range=[page, perPage]&filter={"title":"bar"}', doesUserExist, apiErrorHandler, async(req, res, next)=>{  //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - returns empty arr, proper param - Good       

//     var _a = params.pagination,
//     page = _a.page,
//     perPage = _a.perPage;
//     var _b = params.sort,
//     field = _b.field,
//     order = _b.order;
//     var query = __assign(__assign({}, 
//         fetchUtils.flattenObject(params.filter)), {
//             _sort: field,
//             _order: order,
//             _start: (page - 1) * perPage + 1,
//             _end: page * perPage,
//         }
//     );
//     var url = apiUrl + "/" + resource + "?" + stringify(query);
    
//     return httpClient(url).then(function (_a) {
//     var headers = _a.headers,
//     json = _a.json;
//     if (!headers.has("x-total-count")) {
//         throw new Error(`The X-Total-Count header is missing in the HTTP Response. 
//         The jsonServer Data Provider expects responses for lists of resources to contain this header 
//         with the total number of results to build the pagination. If you are using CORS, 
//         did you declare X-Total-Count in the Access-Control-Expose-Headers header?`);
//     }
    
//     return {
//         data: json,
//         total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
//     };
// });



        router.post("/Users", confirmNoEmptyField, confirmActDoesntExist, registrationHandler, apiErrorHandler, async (req, res) => {
          const { firstName, lastName, username, email, password, dateOfBirth, status, role } = req.body;

          bcrypt.hash(password, 10)
          .then(async( hash) => {
                await user.create({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: hash,
                dateOfBirth: dateOfBirth,
                status: status,
                role: role,
                })
            })
            .catch((error) => {
                res.status(ErrorApi.code).send(ErrorApi.msg);
            })
            .then(async ()=>{ 
                await user.findOne({
                    where: {
                      username: username
                    }
                })
                .then((result)=>{res.json(result)})
            });});


// (PUT)/Admin/User/:id - updates the user record from the edited line
// router.patch('/User/:id', validateToken, doesUserExist, EnsureNoDuplicates, apiErrorHandler, async(req,res)=>{
    router.put('/Users/:id', doesUserExist, ensureNoDuplicates, apiErrorHandler, async(req,res)=>{ 
        const id = req.params.id;
        const newValues = req.body;
        if (req.doesUserExist==='true'){
            user.update({ id: `${newValues.id}`, firstName: `${newValues.firstName}`, lastName: `${newValues.lastName}`, 
            username: `${newValues.username}`, email: `${newValues.email}`, dateOfBirth: `${newValues.dateOfBirth}`, status: `${newValues.status}`, role: `${newValues.role}`}, {where: {id:`${id}`}});
            const result = await user.findByPk(id);
            res.json(result);
        } else {
            res.status(ErrorApi.code).send(ErrorApi.msg);
        }
    });


// (DELETE)/Admin/User/:userId - deletes selected user by pressing Delete
router.delete('/Users/:id',  doesUserExist, apiErrorHandler, async(req,res,next)=>{

    const id = req.params.id;
    await user.destroy({where: {id:`${id}`}});
    if (user === 0) {
      next(badRequest('No User with such ID exists'));
    } else res.json(user);
});

//------------------------Unused routes-------------------------
// (GET)/Admin/Admins/:role - return info for a filtered list by role
router.get('/filterByRole/:role', validateToken, async(req,res)=>{
   
    const role = req.params.role;
    const filteredList = await user.findAll({where:{
        role: role
    }});
    res.json(filteredList);
});

// (GET)/Admin/Admins/:role - return info for a filtered list by status
router.get('/filterByStatus/:status', validateToken, async(req,res)=>{
    //router.get('/filterByStatus/:status',  async(req,res)=>{ //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - returns empty arr, proper param - Good

    const status = req.params.status;
    const filteredList = await user.findAll({where:{
        status: status
    }});
    res.json(filteredList);
});

// (GET)/Admin/Admins/:role - return info for a filtered list by status
router.get('/searchByUsername/:username', validateToken, async(req,res)=>{
    //router.get('/searchByUsername/:username',  async(req,res)=>{ //testing line - original above. Tested: Validates token - Good, empty table - Good,broken param - returns empty arr, proper param - Good

    const username = req.params.username;
    const result = await user.findAll({where:{
        username: username
    }});
    res.json(result);
});

module.exports=router;