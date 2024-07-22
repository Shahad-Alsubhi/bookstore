import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Layout";
import "../css/cartPage.css";
import { useNavigate } from "react-router-dom";

const useCart=()=>{
const { user } = useContext(UserContext);
const [cartItems, setCartItems] = useState([]);
const navigate = useNavigate();
const [change, setChange] = useState(false);
 
useEffect(() => {
  const fetchData = async () => {
    if(!user){
      navigate("/books/login");
    }
    else{
    const cartItems= await fetchCartItems();
    setCartItems(cartItems)
  }};

  fetchData();
}, [change,user]);

const handleIncrease=async (item)=>{
   await fetch(`http://localhost:5500/users/user/cartItems/increaseQuantity/${item._id}`,{
    method:"put"
  })
  setChange(!change);

}
const handleDecrease=async (item)=>{
  if(item.quantity>1){

   await fetch(`http://localhost:5500/users/user/cartItems/decreaseQuantity/${item._id}`,{
    method:"put"
  })
  setChange(!change);}

}
const handleDeleteItem=async (item)=>{

   await fetch(`http://localhost:5500/users/user/cartItems/deleteItem/${item._id}`,{
    method:"delete"
  })
  setChange(!change);

}
const fetchCartItems = async () => {
      const res = await fetch(`http://localhost:5500/users/user/cartItems`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  })
  const {cartItems}  = await res.json();
   return cartItems;

};


const calculateTotal=()=>{
  
  return cartItems.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.quantity*currentValue.book.price);
  }, 0).toFixed(2);



};
return {
    cartItems,
    handleIncrease,
    handleDecrease,
    calculateTotal,
    handleDeleteItem
  };

} ; export default useCart;
