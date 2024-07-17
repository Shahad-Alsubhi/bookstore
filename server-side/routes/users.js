import express from "express";
import User from "../models/User.js";
import { requireLogin } from "../middelware/signin.js";

const router = express.Router();

router.get("/user/favorite", requireLogin, async (req, res) => {
  const id = req.session.userId;
  const user = await User.findById(id).populate("favoriteBooks");

  if (user) {
    return res.status(200).json({ favoriteBooks: user.favoriteBooks });
  }

  return res.status(400).send("user not found");
});
export default router;
