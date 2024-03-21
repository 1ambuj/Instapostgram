

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form"
import {SigninValidation} from "@/lib/validation";
import {z} from "zod"
import {  useSignInAccount } from "@/lib/react-query/queryAndMutations"
import { useUserContext } from "@/context/AuthContext"



const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser , isLoading : isUserLoading } = useUserContext();
  const navigate = useNavigate()

  const {mutateAsync:signInAccount} = useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:"",
      password:""
    },
    
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {

     const session = await signInAccount({
      email: values.email,
      password : values.password
     })
  
     if(!session){
      return toast({title: 'sign in faild. please try'})
     }

     const isLoggedIn = await checkAuthUser();

 
     if(isLoggedIn){
       form.reset()

      
       navigate('/')
     }else{
      toast({title: 'Sign up faild . please try again'})
     }

  }
  
  return (
   
      <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
              <img src="/assets/img/instagram1.png"/>

               <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">Log in to your account</h2>
               <p className="text-light-3 small-medium md:base-regular">Welcome back pls enter your detail</p>
           
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mty-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {
            isUserLoading?(
              <div className="flex flex-center gap-2">
                    Loading...
              </div>
            ): "sign in"
          }
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semiboald ml-1">Sign up</Link>
        </p>
      </form>
      </div>
    </Form>
  )
}

export default SigninForm