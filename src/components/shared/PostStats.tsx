
import React ,{useState, useEffect} from "react"
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import { checkIsLiked } from "@/lib/utils";
// import { deleteSavedPost } from "@/lib/appwrite/api";

type PostStatsProps = {
    post?:Models.Document;
    userId: string;

}

const PostStats = ({post, userId}:PostStatsProps) => {
   
   

   const [likes , setLikes] = useState<string[]>([]);
   const [isSaved, setIsSaved]  = useState(false)
   const {mutate: likePost } =  useLikePost();
   const {mutate: savePost , isPending: isSavingPost} = useSavePost();
   const {mutate: deleteSavedPost , isPending: isDeletingSaved} = useDeleteSavedPost();
   
   const {data : currentUser } = useGetCurrentUser();
   console.log("likes",likes)
   useEffect(()=>{
    if(post && currentUser){
      const savedPostRecord =  currentUser?.save.find((record: Models.Document) =>{
        if(record && record.post && post){
          return record.post.$id === post.$id;
        }
        return false
      })
      setIsSaved(savedPostRecord? true : false)
      setLikes(post.likes.map((user:Models.Document) => user.$id))
    }

   },[post,currentUser])
   console.log("likes",likes)

   const handleLikePost = (e: React.MouseEvent) =>{
    e.stopPropagation();
   
    const newLikes = likes.includes(userId) ? likes.filter((id: string) => id !== userId) : [...likes, userId];
    setLikes(newLikes);
    likePost({postId: post?.$id || '', likesArray: newLikes})
   }

   const handleSavedPost = (e: React.MouseEvent) => {
   e.stopPropagation();
    

  //  if(savedPostRecord){
  //    setIsSaved(false);
  //    deleteSavedPost(savedPostRecord.$id);

  //  }else{
  //   savePost({ postId : post.$id, userId});
  //   setIsSaved(true);
  //  }
  if (post) {
    if (isSaved) {
        setIsSaved(false);
        const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id);
        if (savedPostRecord) {
            deleteSavedPost(savedPostRecord.$id);
        }
    } else {
        savePost({ postId: post.$id, userId });
        setIsSaved(true);
    }
}

   
   }
  return (
    <div className="flex justify-between items-center z-20">
         <div className="flex gap-2 mr-5">
          
          <img src={checkIsLiked(likes, userId) 
            ?"/assets/icons/liked.svg" 
            : "/assets/icons/like.svg"}
            
                alt="like" 
                width={20}
                height={20}
                onClick = {handleLikePost}
                className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{likes.length}</p>
         </div>
         <div className="flex gap-2">
         {isSavingPost || isDeletingSaved ? "Loading.." :<img src={isSaved
            ? "/assets/icons/saved.svg" 
            : "/assets/icons/save.svg" }
            
                alt="like" 
                width={20}
                height={20}
                onClick = {handleSavedPost}
                className="cursor-pointer"
            />}
         </div>
    </div>
  )
}

export default PostStats