import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import Topbar from "@/components/shared/Topbar"
import { useUserContext } from "@/context/AuthContext"
import {Navigate, Outlet} from "react-router-dom"

const RootLayout = () => {
  const { user } = useUserContext()
  
  if (!user) {
    return  <Navigate to="/sign-in" />
  }

  return (
    <div className="w-full md:flex"> 
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  )
}

export default RootLayout