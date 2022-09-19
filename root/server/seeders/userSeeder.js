const Users = require('../models/user');
const {sequelize} = require('../models/sequelizeConfig');
const axios = require('axios');

var results;

axios
    .get('https://randomuser.me/api/?inc=name,email,login,dob&&results=50')
    .then((res)=>{
        results=Object.entries(res.data.results);
        for(let i=0; i<50;i++){
            Users.create({
                firstName:results[i][1].name.first,
                lastName:results[i][1].name.last,
                username:results[i][1].login.username,
                email:results[i][1].email,
                password:"testtest",
                dateOfBirth:results[i][1].dob.date,
                status:'active'
            })
}
        })
    .catch((error)=>{
        console.log("Seeder failed");
        console.log(error);
    })
