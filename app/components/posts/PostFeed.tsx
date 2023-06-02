'use client';

import usePosts from "@/app/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  server?: string;
  userId?: string;
  type?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ server, userId, type }) => {
  const { data: posts = [] } = usePosts(server, userId, type);

  // if (posts.length === 0) {
  //   return <div className="flex justify-center items-center h-16 text-white">No more posts</div>;
  // }

  return (
    <>
      {posts.map((post: Record<string, any>,) => (
        <PostItem server={server} statusId={post.id} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;

