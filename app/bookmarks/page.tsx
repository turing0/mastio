'use client';

import Header from "@/app/components/Header";
import Feed from "../components/posts/Feed";

const BookmarksView = ( ) => {
    // const router = useRouter();

    // const { data: fetchedUser, isLoading } = useUser(server!, username!);
    
    // if (isLoading || !fetchedUser) {
    //   return (
    //     <div className="flex justify-center items-center h-full">
    //       <ClipLoader color="lightblue" size={80} />
    //     </div>
    //   )
    // }
  
    return (
      <>
        <Header showBackArrow title="Bookmarks" />
        <Feed type="bookmarks" />
      </>
     );
  }
   
  export default BookmarksView;