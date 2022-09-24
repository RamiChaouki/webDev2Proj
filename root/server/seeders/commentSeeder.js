const Posts = require("../models/post");

let date = new Date();
let dateString = date.toISOString();
let k = 1;

for (let i = 49; i > 0; i--) {
  
  Posts.create({
    postText: "This is an auto-generated comment from the comment seeder!",
    type: "comment",
    postDate: dateString,
    userId: i,
    parentId: k
  });
  k++
}
