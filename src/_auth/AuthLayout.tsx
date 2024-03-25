import { useUserContext } from "@/context/AuthContext"
import {Outlet , Navigate} from "react-router-dom"


function AuthLayout() {
    const { user } = useUserContext()
    console.log({ usera:user })
    const isAuth = !!user
    return(
        <>
           {
            isAuth?(
                <Navigate to="/" />
            ):(
             <>
                <section className="flex flex-1 justify-center items-center flex-col  py-10"  >
                    <Outlet /> 
                </section>

                <img src="/assets/img/side-img.svg" className="hidden xl:block h-screen w-1/2  bg-no-repeat object-cover "  alt="logo"/>
                

               
            </>
            )
           }
        </>
    )
   
  
}

export default AuthLayout