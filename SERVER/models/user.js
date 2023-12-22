import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3, // use minlength instead of min
      maxlength: 20, // use maxlength instead of max
    },

    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    picturePath: {
      type: String,
      default: "",
    },

    friends: {
      type: Array,
      default: [],
    },

    location: {
      type: String,
      default: "",
    },

    occupation: {
      type: String,
      default: "",
    },

    viewedProfile: {
      type: Number,
      default: 0, // changed from "" to 0
    },

    impressions: {
      type: Number,
      default: 0, // changed from "" to 0
    },
  },
  { timestamps: true } // moved timestamps option here
);

const User = mongoose.model("User", UserSchema);
export default User;
