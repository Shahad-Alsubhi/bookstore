
import Joi from "joi";
import userRepo from "../repository/registrationRepo.js";



const requireLogin=async(req,res,next)=>{
    if(req.session.userId){
      return next()
    }
    return res.status(400).json({message:"login first"})
  
  } 

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

  export { 
    validateLoginForm,
    validateSignupForm,
    requireLogin

  }