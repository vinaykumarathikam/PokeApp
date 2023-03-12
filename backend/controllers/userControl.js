const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const registerUser = asynchandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("user already exists");
  }
  const user = await User.create({
    fullname,
    email,
    password,
    heights: [],
    weights: [],
    titles: [],
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      heights: user.heights,
      weights: user.weights,
      titles: user.titles,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      heights: user.heights,
      weights: user.weights,
      titles: user.titles,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});
const updateUser = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.titles = req.body.titles || user.titles;
    user.heights = req.body.heights || user.heights;
    user.weights = req.body.weights || user.weights;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      heights: updatedUser.heights,
      weights: updatedUser.weights,
      titles: updatedUser.titles,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
module.exports = { registerUser, authUser, updateUser };
