import express from "express";
const router = express.Router();
import Book from "../models/Book.js";
import User from "../models/User.js";
import { requireLogin } from "../middelware/signin.js";
import bookRepo from "../repository/bookRepo.js";

router.get("/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  const books = await bookRepo.getBooks(categoryName);
  return res.json(books);
});

router.post("/favorite/:bookId", requireLogin, async (req, res) => {
  try{
  const bookId = req.params.bookId;
  const userId = req.userId;

  const user = await User.findOne({ _id: userId }).populate("favoriteBooks");

  const foundBook = user.favoriteBooks.find(
    (book) => book._id.toString() === bookId
  );

  if (!foundBook) {
    const book = await Book.findById(bookId);
    user.favoriteBooks.push(book);
    await user.save();
  } else {
    await User.updateOne(
      { _id: userId },
      { $pull: { favoriteBooks: foundBook._id } }
    );
  }
  return res.status(200).json({ message: "favorites have been updated" });}
  catch(e){
    console.error("Error fetching favorite books:", e);
    return res.status(500).json({ message: "Internal server error" });

  }
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const bookDetails = await Book.findById(id);
//   res.render("bookDetails", { bookDetails });
// });

export default router;
