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
import {SignupValidation} from "@/lib/validation/index"
import {z} from "zod"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queryAndMutations"
import { useUserContext } from "@/context/AuthContext"



const SignupForm = () => {
  const { toast } = useToast()
  const {checkAuthUser , isLoading : isUserLoading } = useUserContext();
  const navigate = useNavigate()

  const { mutateAsync: createUserAccount, isLoading : isCreatingUser} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username:"",
      email:"",
      password:""
    },
    
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
     const newUser = await createUserAccount(values); 
     if(!newUser){
      return toast({title: ' Sign up faild. please try again'})
     }
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

               <h3 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">Create a new account</h3>
               <p className="text-light-3 small-medium md:base-regular"></p>
           
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mty-4">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input formEncType="text"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            isCreatingUser?(
              <div className="flex flex-center gap-2">
                    Loading...
              </div>
            ): "sign up"
          }
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semiboald ml-1">Log in</Link>
        </p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm