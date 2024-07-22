import "../css/category.css";
// import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import BookCard from "../components/bookCard";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Layout";

export default function FavoritesPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5500/users/user/favorite`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });

    if (res.ok) {
      const { favoriteBooks } = await res.json();
      return favoriteBooks;
    } else {
      navigate("/books/login");
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      if (!user) {
        navigate("/books/login");
      } else {
        const books = await fetchData();

        setBooks(books);
      }
    };

    getBooks();
  }, [user]);

  return (
    <div className="container">
      <h1>Wishlist</h1>
      {books.length == 0 ? (
        <h3>No favorite books found </h3>
      ) : (
        <div className="booksContainer">
          {books.map((book) => (
            <BookCard key={book._id} book={book} wishList={true} />
          ))}
        </div>
      )}
    </div>
  );
}
