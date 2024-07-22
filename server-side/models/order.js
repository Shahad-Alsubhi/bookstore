import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "incomplete",
  },
  amount: {
    type: String,
    require: true,
  },
  cartList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItem",
    },
  ],
  paymentDate: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
});

const Order = mongoose.model("order", orderSchema);
export default Order;
