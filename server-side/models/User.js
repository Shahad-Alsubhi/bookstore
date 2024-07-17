import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  favoriteBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

const User = mongoose.model("user", userSchema);
export default User;
