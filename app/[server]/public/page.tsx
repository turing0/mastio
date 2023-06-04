'use client';

import Feed from "@/app/components/posts/Feed";
import Header from "@/app/components/Header";

interface PublicViewParams {
  server: string;
  username: string;
}

const PublicView = ({ params }: { params: PublicViewParams }) => {
    const server = params.server;

    return (
      <>
        <title>Federated Timeline | Mastio</title>
        <Header title="Federated Timeline" />
        <Feed server={server} type='public' />
        {/* <PostFeed server={server} type="public" /> */}
      </>
     );
  }
   
  export default PublicView;