const express = require("express");
const router = express.Router();
const Users = require("../controllers/users");

router.route("/").get(Users.getUser);

router.route("/friends/:userId").get(Users.getFriends);

// Update User
router.route("/:id").put(Users.updateUser).delete(Users.deleteUser);

// Follow a User
router.route("/:id/follow").put(Users.followUser);

// Unfollow a User
router.route("/:id/unfollow").put(Users.unfollowUser);

module.exports = router;
