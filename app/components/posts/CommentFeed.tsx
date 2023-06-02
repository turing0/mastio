import CommentItem from "./CommentItem";
import PostItem from "./PostItem";

interface Comments {
  descendants: [];
  // Add other properties as needed
}

interface CommentFeedProps {
  // comments?: Record<string, any>[];
  comments: Comments;
  server?: string;
  // ancestors?: Record<string, any>[];
  // descendants?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = {descendants: []}, server }) => {
  return (// TODO: ancestors
    <>
      {comments.descendants.map((comment: Record<string, any>,) => (
        // <CommentItem key={comment.id} data={comment} />
        <PostItem server={server} statusId={comment.id} key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;