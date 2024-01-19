import User from "../models/user.js";

// read

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      await user.updateOne({ $pull: { friends: friendId } });
      await friend.updateOne({ $pull: { friends: id } });
      res.status(200).json("user has been unfriended");
    } else {
      await user.updateOne({ $push: { friends: friendId } });
      await friend.updateOne({ $push: { friends: id } });
      res.status(200).json("user has been friended");
    }

    await user.save();
    await friend.save();
  } catch (err) {
    res.status(500).json(err);
  }
};
