const express = require("express");
const router = express.Router();
const Posts = require("../controllers/posts");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

// router.route("/").post(upload.single("image"), (req, res) => {
//   console.log("REQ.USER:..", req.user._id);
//   console.log(req.body, req.file);
//   res.send("it worked!!");
// });

router.route("/").post(upload.single("image"), Posts.createPost);
router.route("/:id/like").put(Posts.likeDislike);
router
  .route("/:id")
  .put(Posts.updatePost)
  .delete(Posts.deletePost)
  .get(Posts.getPost);

router.route("/timeline/:userId").get(Posts.timeline);

// User All Post

router.route("/profile/:username").get(Posts.userPosts);

module.exports = router;
