'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from "../Avatar";
import { AiFillHeart, AiOutlineEllipsis, AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from "react-icons/ai";
import useLike from "@/app/hooks/useLike";
import { BiBookmark } from "react-icons/bi";
import { useCurrentUserContext } from "@/app/context/UserProvider";
import useBookmark from "@/app/hooks/useBookmark";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface PostItemProps {
  data: Record<string, any>;
  server?: string;
  statusId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, server, statusId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { server: currentServer, username } = useCurrentUserContext();
    if (!server) {
        server = currentServer!;
    }
    // console.log('PostItem server:', server);

    // const { hasLiked, toggleLike } = useLike({ postId: data.id, userId});
    
    const { hasLiked, likeCount, toggleLike } = useLike(server!, statusId!, data?.favourited, data?.favourites_count);
    const { isBookmarking, toggleBookmark } = useBookmark(server!, statusId!, data?.bookmarked);

    // const [currentU, setCurrentU] = useState<string | null>(null);
    // useEffect(() => {
    //     const fetchSession = async () => {
    //         const currentU = await getCurrentUser();
    //         setCurrentU(currentU);
    //     };
    
    //     fetchSession();
    // }, []);
    // const server = currentU ? currentU.match(/@(.*)/)?.[1] : null;
    
    const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();
        router.push(`/${server}/@${data.account.acct}`)
    }, [router, data, server]);

    const goToPost = useCallback(() => {
        router.push(`/${server}/@${data.account.username}/${data.id}`);
    }, [router, data, server]);

    const onLike = useCallback(async (ev: any) => {
        ev.stopPropagation();
    
        if (!server || !username) {
          return loginModal.onOpen();
        }
    
        toggleLike();
    }, [loginModal, toggleLike, server, username]);
    const onBookmark = useCallback(async (ev: any) => {
        ev.stopPropagation();
    
        if (!server || !username) {
          return loginModal.onOpen();
        }
    
        toggleBookmark();
    }, [loginModal, toggleBookmark, server, username]);
    
    const createdAt = useMemo(() => {
        if (!data?.created_at) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.created_at));
    }, [data])

    // const favourited = data?.favourited;
    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
    const BookmarkIcon = isBookmarking ? FaBookmark : FaRegBookmark;

    return (
        <div onClick={goToPost}
        // <div onClick={(event: any) => {
        //     // const path = event.target.composedPath();
        //     console.log(event.target.nodeName);
        //     if (event.target.nodeName !== "A") {
        //       goToPost();
        //     }
        //   }}
            className="
            border-b-[1px] 
            border-neutral-800 
            p-5 
            cursor-pointer 
            hover:bg-neutral-900 
            transition
        ">
            <div className="flex flex-row items-start gap-3">
                {/* <Avatar userId={data?.account?.username} src={data?.account?.avatar} /> */}
                <div style={{ width: '50px', height: '50px', overflow: 'hidden', flexShrink: 0 }}>
                    <Avatar server={server} userId={data?.account?.acct} src={data?.account?.avatar} />
                </div>
                <div className="flex-grow justify-between">
                    <div className="flex flex-row gap-2 items-center">
                            <p onClick={goToUser}
                                className="
                                    text-white 
                                    font-semibold 
                                    cursor-pointer 
                                    hover:underline
                            ">
                                {data?.account?.display_name}
                            </p>
                            <span 
                                onClick={goToUser}
                                className="
                                    text-neutral-500
                                    cursor-pointer
                                    hover:underline
                                    hidden
                                    md:block
                            ">
                                @{data?.account?.acct}
                            </span>

                        <span className="text-neutral-500 text-sm whitespace-nowrap">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {/* {data?.content} */}
                        {/* <span className="text-white" dangerouslySetInnerHTML={{ __html: data?.content ? data?.content : data?.reblog?.content }} /> */}
                        <div dangerouslySetInnerHTML={{ __html: data?.content ? data?.content : data?.reblog?.content }} />
                    </div>
                    <div className="flex justify-between flex-row items-center mt-3 gap-10 h-5">
                        <div className="
                            flex 
                            flex-row 
                            items-center 
                            text-neutral-500 
                            gap-2 
                            cursor-pointer 
                            transition 
                            hover:text-sky-500
                        ">
                            <AiOutlineMessage size={20} />
                            <p className="w-6">
                                {data?.replies_count || ''}
                            </p>
                        </div>
                        <div className="
                            flex 
                            flex-row 
                            items-center 
                            text-neutral-500 
                            gap-2 
                            cursor-pointer 
                            transition 
                            hover:text-sky-500
                        ">
                            <AiOutlineRetweet size={20} />
                            <p className="w-6">
                                {data?.reblogs_count || ''}
                            </p>
                        </div>
                        <div 
                            onClick={onLike}
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-red-500
                            ">
                                <LikeIcon className={hasLiked ? "text-red-500" : ""} size={20} />
                                <p className={hasLiked ? "text-red-500 w-6" : "w-6"}>
                                    {likeCount || ''}
                                </p>
                        </div>
                        <div 
                            onClick={onBookmark}
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-yellow-500
                            ">
                                <BookmarkIcon className={isBookmarking ? "text-yellow-500" : ""} size={20} style={{ height: 17 }} />
                        </div>
                        <div 
                            onClick={() => {}}
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-yellow-500
                            ">
                                <AiOutlineEllipsis size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
