import Post from "./Post";

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
      {/* {comments.descendants.map((comment: Record<string, any>,) => (
        // <CommentItem key={comment.id} data={comment} />
        <Post server={server} statusId={comment.id} key={comment.id} data={comment} />

      ))} */}

        <ul className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-slate-200">
          {comments.descendants.map((post: Record<string, any>, index: number) => (
              <li key={index} className="p-4 hover:bg-gray-100 transition">
                <Post
                  data={post}
                  statusId={post.id}
                  server={server}
                >
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'space-between' 
                  }}>
                  {
                    post?.media_attachments?.length > 0 && post?.media_attachments.map((attachment: { preview_url: string }, id: number) => (
                    <div key={id} style={{ 
                      flexBasis: post?.media_attachments.length === 1 ? '100%' : 'calc(50% - 10px)',  // 如果只有一张图片，占100%宽度，否则占50%宽度减去左右间距
                      margin: '5px',  // 上下左右的间距都为5px
                      height: post?.media_attachments.length === 1 ? '400px' : '300px',  // 如果只有一张图片，高度为600px，否则为300px
                      overflow: 'hidden'  // 如果图片超出容器，将其隐藏
                    }}>
                      <img
                      style={{ 
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      className="rounded-3xl"
                      src={attachment.preview_url}
                      alt={``}
                      />
                    </div>
                    ))
                  }
                  </div>

                </Post>
              </li>
            ),
          )}
        </ul>
    </>
  );
};

export default CommentFeed;