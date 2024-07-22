import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Layout";
import "../css/cartPage.css";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate("/books/login");
      } else {
        const cartItems = await fetchCartItems();
        setCartItems(cartItems);
      }
    };

    fetchData();
  }, [change, user]);

  const handleIncrease = async (item) => {
    await fetch(
      `http://localhost:5500/users/user/cartItems/increaseQuantity/${item._id}`,
      {
        method: "put",
      }
    );
    setChange(!change);
  };
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      await fetch(
        `http://localhost:5500/users/user/cartItems/decreaseQuantity/${item._id}`,
        {
          method: "put",
        }
      );
      setChange(!change);
    }
  };
  const handleDeleteItem = async (item) => {
    await fetch(
      `http://localhost:5500/users/user/cartItems/deleteItem/${item._id}`,
      {
        method: "delete",
      }
    );
    setChange(!change);
  };
  const fetchCartItems = async () => {
    const res = await fetch(`http://localhost:5500/users/user/cartItems`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    const { cartItems } = await res.json();
    return cartItems;
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity * currentValue.book.price;
      }, 0)
      .toFixed(2);
  };

  const handlecheckout = async () => {
    const amount = calculateTotal();
    const res = await fetch("http://localhost:5500/users/user/createOrder", {
      method: "post",
      body: JSON.stringify({ cartItems, amount: amount.toString() }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });

    if (res.ok) {
      const { orderId } = await res.json();
      const response = await fetch("http://localhost:5500/users/paymentPage", {
        method: "post",
        body: JSON.stringify({ amount: amount.toString(), cartId: orderId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const result = await response.json();
      if (result.redirect_link) {
        window.location.href = result.redirect_link;
      } else {
        console.error("Failed to get redirect URL:", result.error);
      }
    }
  };

  return {
    cartItems,
    handleIncrease,
    handleDecrease,
    calculateTotal,
    handleDeleteItem,
    handlecheckout,
  };
};
export default useCart;
