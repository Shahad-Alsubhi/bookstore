import express from "express";
import connectDB from "./config/db.js";
import booksRoutes from "./routes/books.js";
import AuthenticationRoutes from "./routes/login-signup.js";
// import session from "express-session";
import usersRoutes from "./routes/users.js"


import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors
  ({
    origin: 'http://localhost:5173', 
    credentials: true
  })
); 
// app.use(session({secret:"secret"}))


app.listen(5500, () => {
  console.log("listening on port 5500");
});

connectDB();
app.use("/auth", AuthenticationRoutes);
app.use("/books", booksRoutes);
app.use('/users',usersRoutes)
