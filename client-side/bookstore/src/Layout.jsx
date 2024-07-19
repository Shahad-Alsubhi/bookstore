import { Outlet } from "react-router-dom"
import Header from "./components/header"
import { createContext, useEffect, useState } from "react"

export const UserContext =createContext();
const Layout = () => {
  const [user,setUser]=useState("");
  useEffect( () => {
     function getUser(){
    const token =  localStorage.getItem("user");
    if (token) {
      setUser(token);
    }}
    getUser()
  }, []);
  
  return (
    <div>
      <UserContext.Provider value={{user,setUser}}> 
      <Header />
      <Outlet />
      {/* footer */}
      </UserContext.Provider>
    </div>
  )
}

export default Layout
