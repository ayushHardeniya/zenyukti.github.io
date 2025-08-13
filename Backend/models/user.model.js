import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
  },
  googleId: 
  { type: String },
  displayName: 
  { type: String },
  photo: 
  { type: String }
});


userSchema.methods.comparePassword = function (password) {
  return password === this.password;
};


userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: "7d" }
  );
};

export const User = mongoose.model("User", userSchema);
