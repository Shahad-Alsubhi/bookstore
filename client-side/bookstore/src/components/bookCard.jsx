import { useContext, useState } from "react";
import "../css/bookCard.css";
import { IoMdHeart } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from "../Layout";
import Swal from "sweetalert2";

export default function BookCard({ book, wishList = false }) {

  const [addtoCart,setAddtoCart]=useState(false)
  const [like, setLike] = useState(false);
  const { user } = useContext(UserContext);

  const handelAddtoCart = async (book) => {
    if (user) {
      await fetch(`http://localhost:5500/users/user/cartItems/${book._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
         book
        }),
      }).then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "added to cart successfully",
            showConfirmButton: false,
            timer: 1800,
          });
          setAddtoCart(true)
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Somthing went wrong, please try again",
            showConfirmButton: false,
            timer: 1800,
          });
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "login first, please",
        showConfirmButton: false,
        timer: 1800,
        customClass: {
          icon: "swal-icon",
        },
      });
    }
  };


  const liked = async () => {
    if(user){
    await fetch(`http://localhost:5500/books/favorite/${book._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    }).then((res) => {
      if (res.ok) {
        setLike(!like);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Somthing went wrong, please try again",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    });}
    else{
      Swal.fire({
        position: "center",
        icon: "info",
        title: "login first, please",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };


  return (
    <div className="bookContainer">
      <img src={book.bookCover} alt="" />
      <div className="bookInfo">
        <h2>{book.title}</h2>
        <h3>by: {book.authors}</h3>
        <h4 id="price">{book.price}SAR</h4>
        {!addtoCart?
        <button onClick={() => handelAddtoCart(book)}>Add</button>:
        <button style={{backgroundColor:"black", padding:"8px 10px"}}>In Cart</button>}
        {wishList ? (
          <MdDeleteOutline
            className="deleteIcon"
            style={{ color: "black" }}
            onClick={liked}
          />
        ) : (
          <IoMdHeart
            className="likeIcon"
            style={{ color: like ? "red" : "grey" }}
            onClick={liked}
          />
        )}
      </div>
    </div>
  );
}
