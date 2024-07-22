import bcrypt from "bcrypt";
import user from "../models/User.js";

async function signUp(newUser) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedpassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedpassword;
    await newUser.save();
    return newUser._id;
  } catch (error) {
    console.error("Error during user signup", error);
    throw new Error("Error during user signup");
  }
}

async function login(credentials) {
  try {
    const { email, password } = credentials;
    const userRecord = await user.findOne({ email });

    if (userRecord != null) {
      if (await bcrypt.compare(password, userRecord.password)) {
        return userRecord._id;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error during user Login", error);
    throw new Error("Error during user Login");
  }
}

async function isEmailExist(email) {
  if ((await user.findOne({ email: email })) !== null) {
    return true;
  } else return false;
}

export default {
  signUp,
  login,
  isEmailExist,
};
