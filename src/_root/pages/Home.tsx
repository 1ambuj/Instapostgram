import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queryAndMutations"
import { Models } from "appwrite";



const Home = () => {
  const {isLoading: isPostLoading, data: posts} = useGetRecentPosts();
   return (
    <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            {isPostLoading && !posts ? (
              "Loading..."
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full ">
                {posts?.documents.map((post: Models.Document) => (
                  <li key={post.$id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
  
        {/* <div className="home-creators">
          <h3 className="h3-bold text-light-1">Top Creators</h3>
          {isUserLoading && !creators ? (
            <Loader />
          ) : (
            <ul className="grid 2xl:grid-cols-2 gap-6">
              {creators?.documents.map((creator) => (
                <li key={creator?.$id}>
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
   )
}

export default Home