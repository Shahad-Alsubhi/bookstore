import express from "express";
const router = express.Router();
import { validateSignupForm, validateLoginForm } from "../middelware/signin.js";
import user from "../models/User.js";
import userRepo from "../repository/registrationRepo.js";
import jwt from "jsonwebtoken";

router.post("/signup", validateSignupForm, async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const newUser = new user({
      userName,
      email,
      password,
    });
    const userId = await userRepo.signUp(newUser);
    // req.session.userId = userId;
    const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: "1d" });

    return res.status(200).json({ message: "signup successful", token });
  } catch (e) {
    console.error("Signup error:", e);
    return res
      .status(500)
      .json({ message: "Signup failed. Please try again later." });
  }
});

router.post("/login", validateLoginForm, async (req, res) => {
  try {
    const userId = await userRepo.login(req.body);
    // req.session.userId = userId;
    if (userId) {
      const token = jwt.sign({ userId }, process.env.SECRET, {
        expiresIn: "10h",
      });

      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(400).json({ message: "email/password incorrect" });
    }
  } catch (e) {
    console.error("Login error:", e);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
});

export default router;
