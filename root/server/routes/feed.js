//EXPRESS DEPENDENCIES
const express = require("express");
const router = express.Router();

//MODELS
const Posts = require("../models/post");
const Users = require("../models/user");
const FriendStatus = require("../models/friendStatus");

//MIDDLEWARE
const apiErrorHandler = require("./middleware/errorHandling/apiErrorHandler");
const validatePostFields = require("./middleware/validatePostFields");
const validateToken = require("./middleware/JWTvalidation");

//TODO: Get a feed
router.get("/getFeed/", validateToken, async (req, res) => {
  const friends = await FriendStatus.findAll({
    attributes: ["friendId"],
    where: { userId: req.user.id, status: "Friends" },
  });
  const friendArray = [];
  for (let i = 0; i < friends.length; i++) {
    friendArray[i] = friends[i].friendId;
  }
  friendArray[friendArray.length] = req.user.id;
  const posts = await Posts.findAll({include: [
    {
      model: Users,
      attributes: ["username"],
    },
  ],
    where: { userId: friendArray, type: "post" },
    order:[['postDate','DESC']],
  }); //Needs to be reworked to add friends as well.
  res.json(posts);
});
//DONE: Get a single post
router.get("/getPost/:id", apiErrorHandler, async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Posts.findByPk(id);

  res.json(basicInfo.dataValues);
});

//TODO: Create a new post
router.post(
  "/newPost",
  validateToken,
  validatePostFields,
  apiErrorHandler,
  async (req, res) => {
    const post = req.body;
    // post.userId = 1; For testing purposes
    await Posts.create(post);
    res.json(post);
  }
);

// Get the comments of a post
router.get("/getComments/:postId", async (req, res) => {
  const postId = req.params.postId;
  const commentList = await Posts.findAll(
    {
      include: [
        {
          model: Users,
          attributes: ["firstName", "LastName", "username"],
        },
      ],
      where: {
        parentId: postId,
        type: "comment",
      },
    },
    {}
  );
  res.json(commentList);
});

//TODO: POST FEED/COMMENT/:postId
router.post(
  "/addComment/:postId",
  validatePostFields,
  apiErrorHandler,
  async (req, res) => {
    const post = req.body;
    post.userId = 1; //For testing purposes
    post.postId = req.params.postId;
    await Posts.create(post);
    res.json(post);
  }
);

// Delete a post/comment
router.delete("/delete/:postId", async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
