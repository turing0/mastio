'use client';

import Form from "@/app/components/Form";
import Header from "@/app/components/Header";
import BigPostItem from "@/app/components/posts/BigPostItem";
import CommentFeed from "@/app/components/posts/CommentFeed";
import usePost from "@/app/hooks/usePost";
import { ClipLoader } from "react-spinners";

interface StatusViewParams {
  server: string;
  username: string;
  statusId: string;
}

const StatusView = ({ params }: { params: StatusViewParams }) => {
    // const router = useRouter();
    const server = params.server;
    const username = params.username.slice(3);
    const statusId = params.statusId;
    // console.log('StatusView:', server, username, statusId);
  
    const { data: fetchedPost, statusContext, isLoading } = usePost(server, statusId);
    
    if (isLoading || !fetchedPost) {
      return (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80} />
        </div>
      )
    }
  
    return (
      <>
        <Header showBackArrow label="Back" />
        <BigPostItem server={server} statusId={statusId} data={fetchedPost} />
        <Form postId={statusId as string} isComment placeholder="Tweet your reply" />
        <CommentFeed comments={statusContext} server={server} />
      </>
     );
  }
   
  export default StatusView;