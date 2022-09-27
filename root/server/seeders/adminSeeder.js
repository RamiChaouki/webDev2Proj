const Users = require('../models/user');
const {sequelize} = require('../models/sequelizeConfig');
const axios = require('axios');
const bcrypt = require('bcrypt');




Users
    .findOne({where:{"username":"admin"}})
    .then((result)=>{
        if(!result){
            bcrypt.hash("123456",10)
                            .then((hash)=>{
                                    Users.create({
                                            firstName:"admin",
                                            lastName:"admin",
                                            username:"admin",
                                            email:"admin@test.test",
                                            password:hash,
                                            dateOfBirth:"2000-01-01",
                                            status:"active",
                                            role:"admin"
                                    })
                            })
        }
    });
