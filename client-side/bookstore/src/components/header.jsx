import "../css/header.css";
import { RiShoppingBag4Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { ImBooks } from "react-icons/im";
import { useContext } from "react";
import { UserContext } from "../Layout";

export default function Header() {
  const {user,setUser} = useContext(UserContext);

  const logout=()=>{
    setUser("")
    localStorage.removeItem("user")
  }
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="subContainer">
            <ImBooks id="logo" />
            <div className="sections">
              <NavLink className="navLink" to="/books">
                home
              </NavLink>
              <div className="categoriesContainer">
                <h3 className="navLink " style={{ display: "inline" }}>
                  Categories
                </h3>
                <div className="category">
                  <NavLink className="link" to="/books/category/all">
                    All Books
                  </NavLink>
                  <NavLink className="link" to="/books/category/Computers">
                    Computers
                  </NavLink>
                  <NavLink className="link" to="/books/category/Education">
                    Education
                  </NavLink>
                  <NavLink className="link" to="/books/category/Health">
                    Health
                  </NavLink>
                </div>
              </div>

              <NavLink className="navLink" to="/books/user/favourite">
                Wishlist
              </NavLink>
            </div>
          </div>
          <div className="subContainer">
            <div className="searchBox">
              <CiSearch style={{ marginBottom: "-2px" }} />{" "}
              <input type="text" placeholder="Search Book..." />
            </div>
            <NavLink to="/books/cartPage">
            <RiShoppingBag4Line
              style={{
                fontSize: "22px",
                marginRight: "12px",
                cursor: "pointer",
                color:"black"
              }}
            /></NavLink>
            {!user ? (
              <NavLink to="/books/login" className="signIn-btn">
                sign in
              </NavLink>
            ) : (
              <button onClick={logout} style={{fontSize:"16px" ,cursor:"pointer"}} className="signIn-btn">
                logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
