import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/auth.route.js"
import "./config/passport.js";

dotenv.config();
connectDB();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Mount auth routes BEFORE user routes so /api/auth/me works
app.use("/api/auth", authRoutes);

app.use("/api/v1/users", (req, res, next) => {
  console.log("Request received:", req.method, req.url, req.body);
  next(); 
}, userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});