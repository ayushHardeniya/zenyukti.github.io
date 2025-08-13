import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => !field || field === "")) {
        throw new ApiError(400, "All fields are required!");
    }


    const existedUser = await User.findOne(
        {
            $or: [{ email }]
        }
    )
    if (existedUser) {
        throw new ApiError(401, "User Already Exist.")
    }
    const user = await User.create(
        {
            email,
            password
        }
    )
    const createdUser = await User.findById(user._id)
    return (res.status(201).json(
        new ApiResponse(200, createdUser, "Registered SuccessFully")
    ))
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User not found. Please sign up.");
  }

  const isMatch = user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = user.generateAuthToken();

  res.status(200).json(
    new ApiResponse(200, { user, token }, "Login successful")
  );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, "User authenticated")
  );
});

export { 
    registerUser,
    loginUser,
    getCurrentUser
 };