import express from "express";
const router = express.Router();
import { validateSignupForm, validateLoginForm } from '../middelware/signin.js'; 
import user from "../models/User.js";
import userRepo from "../repository/registrationRepo.js";
import jwt from "jsonwebtoken"




router.post("/signup", validateSignupForm, async (req, res) => {
  const { userName, email, password } = req.body;
  const newUser = new user({
    userName,
    email,
    password,
  });
  const userId = await userRepo.signUp(newUser);
  // req.session.userId = userId;
  const token= jwt.sign({userId},process.env.SECRET,{expiresIn:'1d'})
  

  return res.status(200).json({ message: "signup successful" , token});
});

router.post("/login", validateLoginForm, async (req, res) => {

  const userId = await userRepo.login(req.body);

  if (userId) {
    // req.session.userId = userId;

    const token= jwt.sign({userId},process.env.SECRET,{expiresIn:'10h'})

    return res.status(200).json({ message: "Login successful",token});

  } else {
    
    return res.status(400).json({ message: "email/password incorrect" });

  }
});




export default router;
