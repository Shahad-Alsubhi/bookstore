import "../css/header.css";
import { RiShoppingBag4Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { ImBooks } from "react-icons/im";


export default function Header() {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="subContainer">
              <ImBooks id="logo"/>
            <div className="sections">
              <NavLink className="navLink" to="/books">home</NavLink>
              <div className="categoriesContainer">
                <h3 className="navLink " style={{ display: "inline" }}>Categories</h3>
                <div className="category">
                  <NavLink className="link" to="/books/category/all">All Books</NavLink>
                  <NavLink className="link" to="/books/category/Computers">Computers</NavLink>
                  <NavLink className="link" to="/books/category/Education">Education</NavLink>
                  <NavLink className="link" to="/books/category/Health">Health</NavLink>
                </div>
              </div>

              <NavLink className="navLink" to="/books/user/favourite">Wishlist</NavLink>
            </div>
          </div>
          <div className="subContainer">
            <div className="searchBox">
              <CiSearch  style={{marginBottom:"-2px"}}/> <input type="text" placeholder="Search Book..." />
            </div>
            <RiShoppingBag4Line style={{fontSize: "22px",
    marginRight: "12px", cursor:"pointer"}} />
            <NavLink
              to="/books/login"
              className="signIn-btn"
            >
              sign in
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
