import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queryAndMutations"


type PostFormProps={
  post?: Models.Document;
  action: 'Create' | 'Update'
}

const PostForm = ({post, action}: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate} =  useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate} =  useUpdatePost();
  


  const {user} = useUserContext();
  const { toast } = useToast()
  const navigate = useNavigate();
    // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption : post? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
     if(post && action === "Update"){
         const updatedPost = await updatePost({
          
           postId: post.$id,
           imageId: post.imageId,
           imageUrl: post.imageUrl,
           caption:values.caption,
           file:[]
         })
         if(!updatePost){
           toast({ title: "please try again"})
         }else{
          return navigate(`/posts/${post.$id}`)
         }
         
     }else{
      const newPost = await createPost({
        ...values,
        userId : user.id
       })
       if(!newPost){
          toast({
            title: 'please try again'
          })
       }
       navigate("/");
      }
     }
   
    
  console.log(post?.imageUrl)
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
            <FormControl>
              <Textarea placeholder="shadcn" {...field} className="shad-textarea custom-scrollbar" />
            </FormControl>
            
            <FormMessage  className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
               <Input type="text" className="shad-input"/>
            </FormControl>
            <FileUploader 
               fieldChange={field.onChange}
               mediaUrl = {post?.imageUrl}
            />
            <FormMessage  className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Location</FormLabel>
            <FormControl>
               <Input type="text" className="shad-input" {...field}/>
            </FormControl>
           
            <FormMessage  className="shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Tags(separated by comma " , ")</FormLabel>
            <FormControl>
               <Input 
               type="text" 
               className="shad-input"
               placeholder="Js, React, NextJs"
               {...field}
               />
            </FormControl>
            <FormMessage  className="shad-form_message"/>
          </FormItem>
        )}
      />
      <div className="flex gap-4 items-center justify-end">
      <Button type="button" className="shad-button_dark_4" onClick={() => navigate(-1)}> Cancel</Button>
      <Button type="submit" className="shad-button_primary whaitespace-nowrap"  disabled={isLoadingCreate || isLoadingUpdate}> {isLoadingCreate || isLoadingUpdate && 'Loading...'}Submit</Button>
      </div>
    </form>
  </Form>
  )
}

export default PostForm