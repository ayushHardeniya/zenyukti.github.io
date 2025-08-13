import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid token"));
  }
};

export const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user data to request object
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token has expired'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

// Updated getCurrentUser function
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Handle both scenarios - full user object from authMiddleware or JWT payload from verifyJWT
    let userData;
    
    if (user._id) {
      // If it's a full user object from authMiddleware
      userData = {
        id: user._id,
        email: user.email,
        name: user.name,
        photo: user.photo,
        provider: user.provider
      };
    } else {
      // If it's JWT payload from verifyJWT (which is what we're using)
      userData = {
        id: user.userId || user.id,
        email: user.email,
        name: user.name,
        photo: user.photo,
        provider: user.provider || 'google'
      };
    }

    res.status(200).json({
      success: true,
      data: {
        user: userData
      }
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export default verifyJWT;
