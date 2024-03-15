import {Outlet , Navigate} from "react-router-dom"


function AuthLayout() {
    const isAuth = false
    return(
        <>
           {
            isAuth?(
                <Navigate to="/" />
            ):(
             <>
                <section className="flex flex-1  flex-col   py-10"  >
                    <Outlet />
                      
                </section>

                <img src="/assets/img/insta_1.avif" className="hidden xl:block h-screen w-1/2  bg-no-repeat object-cover justify-self-center" />
                

               

            </>
            )
           }
        </>
    )
   
  
}

export default AuthLayout