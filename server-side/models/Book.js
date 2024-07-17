import { Schema, model } from "mongoose";

const bookSChema = new Schema(
  {
   
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    bookCover: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Computers", "Health & Wellbeing", "Education", "Art & Design"],
    },
    
  },
);

const Book = model("book", bookSChema);
export default Book;
