const Post = require("../models/post");
const User = require("../models/user");

module.exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    post.userId = req.user._id;
    post.img = {
      url:req.file.path,
      filename: req.file.filename
    }
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.userId) {
    try {
      await post.updateOne({ $set: req.body });
      res.status(200).json("sccuessfully update post");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("you can't update other's post");
  }
};

module.exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.userId) {
    try {
      await post.deleteOne();
      res.status(200).json("sccuessfully deleted post");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("you can't delete other's post");
  }
};

module.exports.likeDislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.timeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.userPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
