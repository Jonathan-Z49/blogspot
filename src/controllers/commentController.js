const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.comment_list_by_blog = async (req, res) => {
  try {
    const comments = await Post.find(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      "comments"
    ).populate("comments");
    res.json(comments);
  } catch (error) {
    console.error(error);
  }
};

exports.comment_create = async (req, res) => {
  try {
    const postId = mongoose.Types.ObjectId(req.params.id);
    const comment = new Comment({
      author: req.user.id,
      body: req.body.body,
      post: mongoose.Types.ObjectId(postId),
    });
    await comment.save();
    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment } }
    );
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { comments: comment } }
    );
    res.json({ status: "Comment created" });
  } catch (error) {
    console.error(error);
  }
};
exports.comment_update = async (req, res) => {
  try {
    await Comment.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { body: req.body.body }
    );
    res.json({ status: "Comment updated" });
  } catch (error) {
    console.error(error);
  }
};
exports.comment_delete = async (req, res) => {
  try {
    const cmt = await Comment.findOneAndDelete(
      { _id: req.params.id },
      { body: req.body.body }
    );
    await User.findOneAndUpdate(
      { _id: cmt.author },
      { $pull: { comments: req.params.id } }
    );
    await Post.findOneAndUpdate(
      { _id: cmt.post },
      { $pull: { comments: req.params.id } }
    );
    res.json({ status: "Comment deleted" });
  } catch (error) {
    console.error(error);
  }
};
