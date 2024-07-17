import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Category from "./pages/Category";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/favoritesPage";
import Layout from "./Layout";
import Signup from "./pages/Signup";

const Router = createBrowserRouter([
  {
    path: "/books",
    element: <Layout />,
    children: [
      {
        path: "/books",
        element: <HomePage />,
      },
      {
        path: "/books/category/:categoryName",
        element: <Category />,
      },
      {
        path:"/books/user/favourite",
        element:<FavoritesPage/>
      },{
        path:'/books/login',
        element:<Login/>
      },
      {
        path:'/books/Signup',
        element:<Signup/>
      }
    ],
  },
  // {
  //   path:'/login',
  //   element:<Login/>
  // },
  // {
  //   path:'/Signup',
  //   element:<Signup/>
  // }
  
]);

export default Router;
