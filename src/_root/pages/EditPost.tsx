import PostForm from "@/components/forms/PostForm"
import { useGetPostById } from "@/lib/react-query/queryAndMutations";
import {useParams } from "react-router-dom"

const EditPost = () => {
  const { id } = useParams(); 
  const { data: post, isPending } = useGetPostById(id || "") ;


  if(isPending) return <div>Loading..</div>
  return (
    <div className="flex flex-1">
        <div className="common-container">
           <div className="max-w-5xl flex-statr gap-3 justify-start w-full">
              <img src="/assets/img/add-post.svg" alt="add" width={36} height={36}/>
              <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post </h2>
           </div>
           <PostForm  action="Update" post={post}/>
        </div>
    </div>
  )
}

export default EditPost