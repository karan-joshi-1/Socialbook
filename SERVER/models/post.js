import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      max: 500,
    },

    picturePath: {
      type: String,
      default: "",
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
