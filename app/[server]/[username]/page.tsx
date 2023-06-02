'use client';

import Header from "@/app/components/Header";
import PostFeed from "@/app/components/posts/PostFeed";
import UserBio from "@/app/components/users/UserBio";
import UserHero from "@/app/components/users/UserHero";
import useUser from "@/app/hooks/useUser";
import { ClipLoader } from "react-spinners";

interface UserViewParams {
  server: string;
  username: string;
}

const UserView = ({ params }: { params: UserViewParams }) => {
    // const router = useRouter();
    const server = params.server;
    const username = params.username.slice(3);
    // console.log(server, username);
    // const { userId } = router.query;
  
    const { data: fetchedUser, isLoading } = useUser(server, username);

    
    if (isLoading || !fetchedUser) {
      return (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80} />
        </div>
      )
    }
  
    return (
      <>
        <Header showBackArrow label={fetchedUser?.display_name} />
        <UserHero server={server as string} username={username as string} />
        <UserBio server={server as string} userId={username as string} />
        <PostFeed server={server as string} userId={fetchedUser?.id as string} />
      </>
     );
  }
   
  export default UserView;