//EXPRESS DEPENDENCIES
const express = require("express");
const router = express.Router();

//MODELS
const Posts = require("../models/post");

//MIDDLEWARE
const apiErrorHandler = require("./middleware/errorHandling/apiErrorHandler");
const validatePostFields = require("./middleware/validatePostFields");

//DONE: GET FEED
router.get("/getFeed/:userId", async (req, res) => {
  const id = req.params.userId;
  const posts = await Posts.findAll({ where: { userId: id, type: "post" } });

  res.json(posts);
});
//DONE: GET SINGLE POST
router.get("/getPost/:id", apiErrorHandler, async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Posts.findByPk(id);

  res.json(basicInfo.dataValues);
});

//TODO: POST FEED/POST
router.post("/", validatePostFields, apiErrorHandler, async (req, res) => {
  const post = req.body;
  post.userId = 1; //For testing purposes
  await Posts.create(post);
  res.json(post);
});

//TODO: POST FEED/COMMENT/:postId
router.post(
  "/:postId",
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

//TODO: DELETE FEED/COMMENT/:postId
//TODO: DELETE FEED/:commentId
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
