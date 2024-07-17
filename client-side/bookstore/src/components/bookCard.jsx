import { useState } from "react";
import "../css/bookCard.css";
import { IoMdHeart } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";


export default function BookCard({ book , wishList=false}) {
  const [like, setLike] = useState(false);

  const liked = async () => {
    
    await fetch(`http://localhost:5500/books/favorite/${book._id}`, {
      credentials: "include", 
    }).then((res) => {
      if (res.ok) {
        setLike(!like);
      }
      else{
        alert("You need to login first");

      }
    });
  };

  return (
    <div className="bookContainer">
      <img src={book.bookCover} alt="" />
      <div className="bookInfo">
        <h2>{book.title}</h2>
        <h3>by: {book.authors}</h3>
        <h4 id="price">34.00$</h4>
        <button>Add</button>
        {wishList?
        <MdDeleteOutline className="deleteIcon"
          style={{ color:"black"}}
          onClick={liked}
        />:
        <IoMdHeart className="likeIcon"
          style={{ color: like ? "red" : "grey"}}
          onClick={liked}
        />}
      </div>
    </div>
  );
}
