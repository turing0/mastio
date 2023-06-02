'use client';

import Header from "@/app/components/Header";
import PostFeed from "@/app/components/posts/PostFeed";

interface LocalViewParams {
  server: string;
  username: string;
}

const Exlpore = ({ params }: { params: LocalViewParams }) => {
    const server = params.server;

    return (
      <>
        <Header showBackArrow label="Exlpore" />
        <PostFeed server={server} type="local" />
      </>
     );
  }
   
  export default Exlpore;