const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  photo: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

userSchema.virtual("name").get(() => {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model("User", userSchema);
