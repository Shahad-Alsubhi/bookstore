import "../css/category.css";
// import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "../components/bookCard";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
  
    const res = await fetch(
      `http://localhost:5500/users/user/favorite`, {
        credentials: "include",
      }
    );

    if (res.ok) {
      const { favoriteBooks } = await res.json();
      return favoriteBooks;
    } else {
      navigate("/books/login");
    }
   
  };

  useEffect(() => {
    const getBooks = async () => {
      const books = await fetchData();
      setBooks(books);
    };

    getBooks();
  }, []);

  return (
    <div className="container">
      <h1>Wishlist</h1>
      {books.length==0?<h3>No favorite books found </h3>:
      <div className="booksContainer">
        {books.map((book) => (
          <BookCard key={book._id} book={book} wishList={true} />
        ))}
      </div>} 
    </div>
  );
}
