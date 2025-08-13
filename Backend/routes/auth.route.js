import express from "express";
import passport from "passport";
import { googleAuthSuccess, logoutUser } from "../controllers/auth.controller.js";
import { verifyJWT, getCurrentUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Start Google authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuthSuccess
);

// Add the missing /me endpoint that your frontend is calling
router.get("/me", verifyJWT, getCurrentUser);

// Logout
router.get("/logout", logoutUser);

export default router;
