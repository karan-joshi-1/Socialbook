import Post from "../models/post.js";
import User from "../models/user.js";
// create

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new post({
      userId,
      description,
      picturePath,
      firstName: user.firstName,
      lastName: user.lastName,
      picturePath: user.picturePath,
      location: user.location,  
      likes: {},
      Comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// read

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ userId: req.params.userId });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.userId)) {
      await post.updateOne({ $push: { likes: req.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
