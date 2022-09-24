//EXPRESS DEPENDENCIES
const express = require("express");
const router = express.Router();

//HASHING DEPENDENCY
const bcrypt = require("bcrypt");

//MODELS
const Users = require("../models/user");

//MIDDLEWARE
const apiErrorHandler = require("./middleware/errorHandling/apiErrorHandler");
const confirmActDoesntExist = require("./middleware/confirmActDoesntExist");
const confirmNoEmptyField = require("./middleware/confirmNoEmptyField");
const registrationHandler = require("./middleware/registrationHandler");
const confirmLogin = require("./middleware/confirmLogin");
const appendJWT = require("./middleware/appendJWT");
const parseQuery=require("./middleware/parseQuery");
const searchFriends=require("./middleware/searchFriends");
const searchUsers=require("./middleware/searchUsers");
const JWTvalidation=require("./middleware/JWTvalidation");
const mergeFriendUserQuery = require("./middleware/mergeFriendUserQuery");

//TODO:
/**
 * middleware to make sure FIELDS NOT EMPTY -- DONE
 * middleware to make sure PASSWORD IS LARGER THAN 6 CHARACTERS, USERNAME LARGER THAN 3 CHAR, EMAIL IS AN ACTUAL EMAIL (VALIDATOR) -- DONE
 * middleware to make sure USERNAME and EMAIL DON'T ALREADY EXIST -- DONE
 */

router.post(
  "/Register",
  confirmNoEmptyField,
  confirmActDoesntExist,
  registrationHandler,
  apiErrorHandler,
  async (req, res) => {
    const { firstName, lastName, username, email, password, dateOfBirth } =
      req.body;

    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hash,
        dateOfBirth: dateOfBirth,
        status: "active",
      }).catch((error) => {
        console.log(error);
      });
      res.status(201).json({ Message: "User " + username + " created" });
    });
  }
);

router.post(
  "/Login",
  confirmNoEmptyField,
  confirmLogin,
  appendJWT,
  apiErrorHandler,
  async (req, res) => {
    res.status(200).json({
      Message: "Logged in Successfully",
      token: req.token,
      auth: req.auth,
    });
  }
);

router.get("/User/:id", async (req, res) => {
  const id = req.params.id;
  const account = await Users.findOne({
    attributes: {exclude: ['password']},
    where: { id: id },
  });
  res.send(account)
});

//SEARCH FOR USERS BY USERNAME, FIRST NAME, or LAST NAME
router.get(
  '/Search/:limit/:page/:query',
  JWTvalidation,
  parseQuery,
  searchFriends,
  searchUsers,
  mergeFriendUserQuery,
  apiErrorHandler,
  (req,res)=>{
  res.header("Access-Control-Expose-Headers","list-length")
  res.header("list-length",req.listLength);
  res.status(201).json(req.mergeList);
})

module.exports = router;
