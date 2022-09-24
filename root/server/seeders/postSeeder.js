const Posts = require("../models/post");

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
