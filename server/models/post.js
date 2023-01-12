const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = Schema({
  url: String,
  filename: String
})

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img:ImageSchema,
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
