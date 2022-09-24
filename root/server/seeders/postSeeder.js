const Posts = require("../models/user");
const { sequelize } = require("../models/sequelizeConfig");
const axios = require("axios");

var results;
var date = new Date();
var dateString = date.toISOString();

for (let i = 1; i < 51; i++) {
  Posts.create({
    postText: "This is an auto-generated post from the post seeder!",
    type: "post",
    postDate: dateString,
    userId: i
  });
}
