import mongoose from "mongoose";

const cartItemsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartItem = mongoose.model("cartItem", cartItemsSchema);
export default CartItem;
