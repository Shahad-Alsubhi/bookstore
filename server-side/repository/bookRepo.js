import Book from "../models/Book.js"


async function getBooks(categoryName){

    if(categoryName == "all"){
        const books = await Book.find({});
        return books;
       }

       const books = await Book.find({ category: categoryName });
       return books;

}

export default{getBooks}