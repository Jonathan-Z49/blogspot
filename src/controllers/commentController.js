const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
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
    const userId = mongoose.Types.ObjectId(req.body.user);
    const comment = new Comment({ author: userId, body: req.body.body });
    const postId = mongoose.Types.ObjectId(req.params.id);
    await Post.findAndUpdate({ _id: postId }, { $push: { comments: comment } });
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
    await Comment.findByIdAndDelete({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    res.json({ status: "Comment deleted" });
  } catch (error) {
    console.error(error);
  }
};
