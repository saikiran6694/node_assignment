import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc Register new user
// ROUTE POST /api/register
// Access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, full_name, age, gender } = req.body;
  if (!username || !email || !password || !full_name || !age || !gender) {
    res.status(400).json({
      status: "error",
      code: "INVALID_REQUEST",
      message:
        "Invalid request. Please provide all required fields: username, email, password, full_name.",
    });
  }
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("User already registered");
  }
  const user = await User.create({
    username,
    email,
    password,
    full_name,
    age,
    gender,
  });
  if (user) {
    res.status(201).json({
      status: "success",
      message: "User successfully registered!",
      data: {
        user_id: user._id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        age: user.age,
        gender: user.gender,
      },
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login user (get access_token)
// ROUTE POST /api/token
// Access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing_fields");
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          id: user.id,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      status: "success",
      message: "Access token generated successfully.",
      data: {
        access_token: accessToken,
        expires_in: 3600,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Current user
// ROUTE GET /api/current
// Access PRIVATE
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export { registerUser, loginUser, currentUser };
