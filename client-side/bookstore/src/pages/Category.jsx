import "../css/category.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "../components/bookCard";

export default function Category() {
  const { categoryName } = useParams();

  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    const res = await fetch(
      `http://localhost:5500/books/category/${categoryName}`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getBooks = async () => {
      const books = await fetchData();
      setBooks(books);
    };

    getBooks();
  }, [categoryName]);

  return (
    <div className="container">
      {categoryName=="all"?
      <h1>Browse all books</h1>:
      <h1>{categoryName}</h1>}
      <div className="booksContainer">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
