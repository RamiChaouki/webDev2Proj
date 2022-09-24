const Posts = require("../models/post");
const { sequelize } = require("../models/sequelizeConfig");
const axios = require("axios");

var results;
let date = new Date();
let dateString = date.toISOString();

for (let i = 1; i < 50; i++) {
  Posts.create({
    postText: "This is an auto-generated post from the post seeder!",
    type: "post",
    postDate: dateString,
    userId: i
  });
}
