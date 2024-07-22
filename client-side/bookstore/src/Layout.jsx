import { Outlet } from "react-router-dom"
import Header from "./components/header"
import { createContext, useState } from "react"

export const UserContext = createContext();

const Layout = () => {
  const initUser=localStorage.getItem("user")
  const [user,setUser]=useState(initUser?initUser:"");
  
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
