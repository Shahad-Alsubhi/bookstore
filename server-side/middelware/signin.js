import Joi from "joi";
import User from "../models/User.js";
import userRepo from "../repository/registrationRepo.js";
import jwt from "jsonwebtoken";

const requireLogin = async (req, res, next) => {
 
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "authorization token required" });
  }
  
  const token = authorization.split(" ")[1];
   if(!token){
    return res.status(401).json({ message: "authorization token required" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRET);
    req.userId = await User.findOne({ _id: userId }).select("_id");
    next();
  } catch (e) {

    console.log(e);
    return res.status(401).json({ message: "invalid token" });
  }
};

const validateSignupForm = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  } else if (await userRepo.isEmailExist(req.body.email)) {
    return res.status(400).json({ message: "email already exists" });
  }
  next();
};

const validateLoginForm = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }
  next();
};

export { validateLoginForm, validateSignupForm, requireLogin };
