import { Outlet } from "react-router-dom"
import Header from "./components/header"

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* footer */}
    </div>
  )
}

export default Layout
