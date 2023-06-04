'use client';

import BigPost from "@/app/components/posts/BigPost";
import Header from "@/app/components/Header";
import Post from "@/app/components/posts/Post";
import usePost from "@/app/hooks/usePost";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

// import Form from "@/app/components/Form";
// import Header from "@/app/components/Header";
// import BigPostItem from "@/app/components/posts/BigPostItem";
// import CommentFeed from "@/app/components/posts/CommentFeed";
// import usePost from "@/app/hooks/usePost";
// import { ClipLoader } from "react-spinners";

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
        <Header showBackArrow title="Back" />

        <ul className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-slate-200">
          <li className="p-4">
            <BigPost server={server} statusId={statusId} data={fetchedPost}>
              {/* {fetchedPost?.media_attachments?.length > 0 && (
								<img
									// fill={true}
									style={{ objectFit: 'cover' }}
									className="rounded-3xl"
									src={`${fetchedPost?.media_attachments[0].url}`}
									alt=""
								/>
              )} */}

              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'space-between' 
              }}>
                {
                  fetchedPost?.media_attachments?.length > 0 && fetchedPost?.media_attachments.map((attachment: { preview_url: string }, id: number) => (
                    <div key={id} style={{ 
                      flexBasis: fetchedPost?.media_attachments.length === 1 ? '100%' : 'calc(50% - 10px)',  // 如果只有一张图片，占100%宽度，否则占50%宽度减去左右间距
                      margin: '5px',  // 上下左右的间距都为5px
                      height: fetchedPost?.media_attachments.length === 1 ? '600px' : '300px',  // 如果只有一张图片，高度为600px，否则为300px
                      overflow: 'hidden'  // 如果图片超出容器，将其隐藏
                    }}>
                      <img
                        key={id}
                        style={{ 
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }}
                        className="rounded-3xl"
                        src={attachment.preview_url}
                        alt={`Attachment ${id}`}
                      />
                    </div>
                  ))
                }
              </div>
              
            </BigPost>
          </li>
			  </ul>

        {/* <Form postId={statusId as string} isComment placeholder="Tweet your reply" /> */}
        {/* <CommentFeed comments={statusContext} server={server} /> */}
      </>
     );
  }
   
  export default StatusView;
