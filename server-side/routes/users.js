import express from "express";
import User from "../models/User.js";
import { requireLogin } from "../middelware/signin.js";
import CartItem from "../models/cartItems.js";
import createPage from "../paytabs.js";
import Order from "../models/order.js";

const router = express.Router();

router.get("/user/favorite", requireLogin, async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).populate("favoriteBooks");

    if (user) {
      return res.status(200).json({ favoriteBooks: user.favoriteBooks });
    }

    return res.status(400).send("user not found");
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user/cartItems", requireLogin, async (req, res) => {
  try {
    const id = req.userId._id;

    const cartItems = await CartItem.find({
      userId: id.toString(),
    }).populate("book");

    return res.status(200).json({ cartItems });
  } catch (e) {
    console.error("Error fetching cart items ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/user/cartItems/:bookId", requireLogin, async (req, res) => {
  const userId = req.userId;
  const { book } = req.body;

  await CartItem.create({
    userId: userId._id.toString(),
    book,
  });

  return res.status(200).json({ message: "added to the cart successfully" });
});

router.put("/user/cartItems/increaseQuantity/:itemId", async (req, res) => {

  const { itemId } = req.params;
  const item = await CartItem.findById(itemId);
  await CartItem.updateOne(
    { _id: itemId },
    { $set: { quantity: item.quantity + 1 } }
  );
  return res.status(200).json({ message: "update cart successfully" });
});

router.put("/user/cartItems/decreaseQuantity/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const item = await CartItem.findById(itemId);
  await CartItem.updateOne(
    { _id: itemId },
    { $set: { quantity: item.quantity - 1 } }
  );
  return res.status(200).json({ message: "update cart successfully" });
});

router.delete("/user/cartItems/deleteItem/:itemId", async (req, res) => {
  const { itemId } = req.params;
  await CartItem.findByIdAndDelete(itemId);

  return res.status(200).json({ message: "delete item successfully" });
});

router.post("/user/createOrder", requireLogin, async (req, res) => {

  const { amount, cartItems } = req.body;
  const order = await Order.create({
    amount,
    userId: req.userId._id,
  });
  cartItems.map((item) => {
    order.cartList.push(item);
  });
  order.save();


  return res.status(200).json({ orderId:order._id.toString() });;

});

router.post("/paymentPage",requireLogin, createPage);

export default router;
