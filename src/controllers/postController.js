const Post = require("../models/postModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
exports.post_list_all = async (req, res) => {
  try {
    const all_posts = await Post.find({})
      .sort({ date: 1 })
      .populate([
        { path: "author", model: "User" },
        {
          path: "comments",
          model: "Comment",
          populate: { path: "author", model: "User" },
        },
      ]);
    res.json(all_posts);
  } catch (error) {
    console.error(error);
  }
};

exports.post_list_by_id = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    })
      .sort({ date: 1 })
      .populate([
        { path: "author", model: "User" },
        {
          path: "comments",
          model: "Comment",
          populate: { path: "author", model: "User" },
        },
      ]);
    res.json(post);
  } catch (error) {
    console.error(error);
  }
};

exports.post_list_by_user = async (req, res) => {
  try {
    const post = await Post.find({
      author: mongoose.Types.ObjectId(req.params.id),
    })
      .sort({
        date: 1,
      })
      .populate([
        { path: "author", model: "User" },
        {
          path: "comments",
          model: "Comment",
          populate: { path: "author", model: "User" },
        },
      ]);
    res.json(all_posts);
  } catch (error) {
    console.error(error);
  }
};

exports.post_create = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({ title: title, author: req.user.id, body: body });
    await post.save();
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { posts: mongoose.Types.ObjectId(post.id) } }
    );
    res.json({ status: "Post created", new_post: post });
  } catch (error) {
    console.error(error);
  }
};

exports.post_update = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    });
    if (req.user.id == post.author) {
      const postUpdateObj = parseBody(req.body);
      const postToUpdate = await Post.findOneAndUpdate(
        { _id: req.params.id },
        postUpdateObj
      );
      res.json({ status: "Post updated", updated_post: postToUpdate });
    } else {
      res.json({ status: "Unauthorized access" });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.post_delete = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    });
    if (req.user.id == post.author) {
      const postToDelete = await Post.findOneAndDelete({ _id: req.params.id });
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { posts: req.params.id } }
      );
    } else {
      res.json({ status: "Unauthorized access" });
    }
    res.json({ status: "Post deleted" });
  } catch (error) {
    console.error(error);
  }
};

function parseBody(body) {
  const obj = {};
  for (const [key, value] of Object.entries(body)) {
    if (value.length > 0) {
      obj[key] = value;
    }
  }
  return obj;
}
