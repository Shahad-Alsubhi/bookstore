import express from "express";
const router = express.Router();
import { validateSignupForm, validateLoginForm } from '../middelware/signin.js'; 
import user from "../models/User.js";
import userRepo from "../repository/registrationRepo.js";




router.post("/signup", validateSignupForm, async (req, res) => {
  const { userName, email, password } = req.body;
  const newUser = new user({
    userName,
    email,
    password,
  });
  const userId = await userRepo.signUp(newUser);
  req.session.userId = userId;

  return res.status(200).json({ message: "signup successful"});
});

router.post("/login", validateLoginForm, async (req, res) => {

  const userId = await userRepo.login(req.body);

  if (userId) {
    req.session.userId = userId;
    return res.status(200).json({ message: "Login successful"});

  } else {
    
    return res.status(400).json({ message: "email/password incorrect" });

  }
});




export default router;
