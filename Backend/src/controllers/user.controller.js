import User from "../model/user.model.js";
import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse.js";
import { OPTIONS } from "../constants.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utility/cloudinary.js";

const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return next(new ApiError(400, "All fields are required."));
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ApiError(400, "User already registered"));
    }

    if (password !== confirmPassword) {
      return next(new ApiError(402, "Invalid Password"));
    }

    const createUser = await User.create({
      username,
      email,
      password,
    });

    if (!createUser) {
      return next(500, "User not created. Try again");
    }

    const token = createUser.generateToken();

    createUser.token = token;
    await createUser.save();

    const user = await User.findById(createUser._id).select("-password -token");

    return res
      .status(201)
      .cookie("token", token, OPTIONS)
      .json(new ApiResponse(201, user, "Registered successfully", true));
  } catch (error) {
    next(error);
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "All fields are required. Try again"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ApiError(404, "No user found. Signup please"));
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return next(new ApiError(404, "Invalid credentials"));
    }

    const token = await user.generateToken();

    user.token = token;
    await user.save();

    const loggedInUser = await User.findById(user._id).select(
      "-password -token"
    );

    return res
      .status(201)
      .cookie("token", token, OPTIONS)
      .json(
        new ApiResponse(201, loggedInUser, "User Logged in successfully", true)
      );
  } catch (error) {
    next(error);
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }
    user.token = "";
    await user.save();

    return res
      .status(200)
      .clearCookie("token", OPTIONS)
      .json(new ApiResponse(201, null, "Logout Successfully.", true));
  } catch (error) {
    next(error);
  }
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const loggedUser = await User.findById(req.user._id);

    if (!loggedUser) {
      return next(401, "User not found. Try again");
    }

    const user = await User.find({ _id: { $ne: loggedUser._id } }).select(
      "-password -token"
    );

    if (!user) {
      return next(401, "Invalid request");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, user, "All users fetched.", true));
  } catch (error) {
    next(error);
  }
});

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const getUser = await User.findById(id);

    if (!getUser) {
      return next(new ApiError(401, "User not found."));
    }

    const user = await User.findById(getUser._id).select("-password -token");

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User fetched successfully", true));
  } catch (error) {
    console.error(error);
  }
});

const changeProfileImage = asyncHandler(async (req, res, next) => {
  try {
    const localAvatarFile = req.file?.path;

    if (!localAvatarFile) {
      return next(new ApiError(401, "Avatar not found."));
    }

    const avatar = await uploadOnCloudinary(localAvatarFile);
    if (!avatar) {
      return next(
        new ApiError(401, "Filed to upload on cloudinary. Try again")
      );
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { avatar: avatar.url },
      },
      { new: true }
    ).select("-password -token");

    return res.status(200).json(
      new ApiResponse(200, user, "Avatar changed successfully", true)
    );
  } catch (error) {
    next(error);
  }
});

const changeUsername = asyncHandler(async (req, res, next)=> {
  const newUsername = req.body.username

  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        username: newUsername
      }
    },{new: true}).select("-password -token")

    if(!user){
      return next(new ApiError(404, "User not found. Try again"))
    }

    return res.status(200).json(
      new ApiResponse(200, user, "Username updated successfully", true)
    )
  } catch (error) {
    next(error)
  }
})

export { register, login, logout, getAllUsers, getUser, changeProfileImage, changeUsername };
