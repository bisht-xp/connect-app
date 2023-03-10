const express = require("express");
const passport = require("passport");
const router = express.Router();

//models
const User = require("../models/user");

router.route("/register").post(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    await registeredUser.save();

    res.json("user Added!!");
  } catch (err) {
    // console.log(err.response);
    res.status(500).json(err);
  }
});

router.route("/login").post(
  passport.authenticate("local", {
    failureMessage: true,
  }),
  async (req, res) => {
    try {
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.route("/logout").get((req, res) => {
  // console.log(req.user);
  req.logout(req.user, (err) => {
    if (err) return next(err);
    // req.flash("success", "Goodbye!");
    res.redirect("/login");
  });
});

module.exports = router;
