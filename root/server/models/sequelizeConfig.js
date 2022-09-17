'use strict';
const Sequelize = require('sequelize');
require('dotenv').config();


let sequelize = new Sequelize(process.env.DB_NAME, 
                              process.env.DB_USERNAME, 
                              process.env.DB_PASSWORD, 
                              {"dialect":"mysql"}
                              );



module.exports = {Sequelize,sequelize};
