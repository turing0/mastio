'use client';

import Feed from "@/app/components/posts/Feed";
import Header from "@/app/components/Header";
import TweetForm from "@/app/components/TweetForm";

interface LocalViewParams {
  server: string;
  username: string;
}

const LocalView = ({ params }: { params: LocalViewParams }) => {
    const server = params.server;

    return (
      <>
        <title>Local Timeline | Mastio</title>

        <Header title="Local Timeline" />
        <Feed server={server} type='local' />
        {/* <PostFeed server={server} type="local" /> */}
      </>
     );
  }
   
export default LocalView;

