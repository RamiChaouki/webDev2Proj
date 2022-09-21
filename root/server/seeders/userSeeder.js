const Users = require('../models/user');
const {sequelize} = require('../models/sequelizeConfig');
const axios = require('axios');
const bcrypt = require('bcrypt');

var results;


Users
    .findOne({where:{"username":"test"}})
    .then((result)=>{
        if(!result){
            bcrypt.hash("testtest",10)
                            .then((hash)=>{
                                    Users.create({
                                            firstName:"test",
                                            lastName:"test",
                                            username:"test",
                                            email:"test@test.test",
                                            password:hash,
                                            dateOfBirth:"2000-01-01",
                                            status:'active'
                                    })
                            })
        }
    });




axios
    .get('https://randomuser.me/api/?inc=name,email,login,dob&&results=50')
    .then((res)=>{
        results=Object.entries(res.data.results);

        for(let i=0; i<50;i++){
            bcrypt.hash("testtest",10)
                .then((hash)=>{
                    Users.create({
                        firstName:results[i][1].name.first,
                        lastName:results[i][1].name.last,
                        username:results[i][1].login.username,
                        email:results[i][1].email,
                        password:hash,
                        dateOfBirth:results[i][1].dob.date,
                        status:'active'
                    })
                })
                .catch((error)=>{
                    console.log(error);
                    
                });
        } 
    })
    .catch((error)=>{
        console.log("Seeder failed");
        console.log(error);
    })
