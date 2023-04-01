const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.user_by_id = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    }).populate("posts");
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};
