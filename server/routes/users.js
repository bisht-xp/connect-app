const express = require("express");
const router = express.Router();
const Users = require("../controllers/users");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

router.route("/").get(Users.getUser);

router.route("/friends/:userId").get(Users.getFriends);

// Update User
router
  .route("/:id")
  .put(
    upload.fields([
      { name: "profile", maxCount: 1 },
      { name: "coverPicture", maxCount: 1 },
    ]),
    Users.updateUser
  )
  .delete(Users.deleteUser);

// Follow a User
router.route("/:id/follow").put(Users.followUser);

// Unfollow a User
router.route("/:id/unfollow").put(Users.unfollowUser);

router.route("/alluser").get(Users.getAllUser);

module.exports = router;
