const User = require("../models/user");
const { cloudinary } = require("../cloudinary/index");

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (req.body.desc) {
      user.desc = req.body.desc;
    }
    if (req.body.city) {
      user.city = req.body.city;
    }
    if (req.body.relationship) {
      user.relationship = req.body.relationship;
    }
    if (req.files.profile) {
      // console.log("profilePicture", req.files.profile[0]);
      if(user.profilePicture) {
        await cloudinary.uploader.destroy(user.profilePicture.filename);
      }
      user.profilePicture = {
        url: req.files.profile[0].path,
        filename: req.files.profile[0].filename,
      };
    }
    if (req.files.coverPicture) {
      // console.log("CoverPicture", req.files.coverPicture[0]);
      if(user.coverPicture) {
        await cloudinary.uploader.destroy(user.coverPicture.filename);
      }
      user.coverPicture = {
        url: req.files.coverPicture[0].path,
        filename: req.files.coverPicture[0].filename,
      };
    }
    if (req.body.password) {
      await user.setPassword(req.body.password);
    }

    await user.save();
    res.status(200).json({ message: "Successful!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = username
      ? await User.findOne({ username: username })
      : await User.findById(userId);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: user._id } });
        res.status(200).json("man you follow a person");
      } else {
        res
          .status(403)
          .json(
            "Boy how it is possible to follow a person who you allready follow"
          );
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json("man you are try to follow your self. How it is possible");
  }
};

module.exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { followings: user._id } });
        res.status(200).json("man you unfollow a person");
      } else {
        res.status(403).json("you don't follow a person");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("can't unfollow yourself");
  }
};

module.exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
