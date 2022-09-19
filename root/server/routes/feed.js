//EXPRESS DEPENDENCIES
const express = require("express");
const router = express.Router();

//MODELS
const Posts = require("../models/post");

//MIDDLEWARE
const apiErrorHandler = require("./middleware/errorHandling/apiErrorHandler");
const validatePostFields = require("./middleware/validatePostFields");

//TODO: GET FEED
router.get("/", async (req, res) => {});

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
