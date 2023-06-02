'use client';

import Header from "@/app/components/Header";
import PostFeed from "@/app/components/posts/PostFeed";

interface LocalViewParams {
  server: string;
  username: string;
}

const LocalView = ({ params }: { params: LocalViewParams }) => {
    const server = params.server;

    return (
      <>
      {/* <title>Local Timeline</title> */}
        <Header showBackArrow label="Local Timeline" />
        <PostFeed server={server} type="local" />
      </>
     );
  }
   
export default LocalView;

