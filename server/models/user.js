const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const ProfileSchema = Schema({
  url: String,
  filename: String,
});

const ImageSchema = Schema({
  url: String,
  filename: String,
});

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: ProfileSchema,
    coverPicture: ImageSchema,
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      default: "",
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
