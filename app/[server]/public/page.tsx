'use client';

import Header from "@/app/components/Header";
import PostFeed from "@/app/components/posts/PostFeed";


interface PublicViewParams {
  server: string;
  username: string;
}

const PublicView = ({ params }: { params: PublicViewParams }) => {
    const server = params.server;

    return (
      <>
        <Header showBackArrow label="Federated Timeline" />
        <PostFeed server={server} type="public" />
      </>
     );
  }
   
  export default PublicView;