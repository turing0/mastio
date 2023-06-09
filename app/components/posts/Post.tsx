import { ReactNode, useCallback, useMemo } from 'react';

import {
	HiOutlineHeart,
	HiArrowUpTray,
	HiOutlineChatBubbleOvalLeft,
	HiOutlineArrowPath,
	HiOutlineChartBarSquare,
	HiOutlineBookmark,
	HiHeart,
	HiBookmark,
} from 'react-icons/hi2';
import HoverCardDemo from '../radix/HoverCard';
import DropdownMenuDemo from '../radix/DropdownMenu';
import { useRouter } from 'next/navigation';
import useLoginModal from '../../hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import useLike from '@/app/hooks/useLike';
import { useCurrentUserContext } from '@/app/context/UserProvider';
import clsx from 'clsx';
import useBookmark from '@/app/hooks/useBookmark';
import { useRelationships } from '@/app/hooks/useFollow';

interface Props {
	data: Record<string, any>;
	server?: string;
	statusId?: string;
	// content: string;
	// name: string;
	// username: string;
	// date: string;
	// src: string;
	// initials: string;
	// followers: string;
	// following: string;
	// description: string;
	children?: ReactNode;
}


const Post = ({
	data = {},
	server,
	statusId,
	// content,
	// name,
	// username,
	// date,
	children,
	...props
}: Props) => {
	const router = useRouter();
    const loginModal = useLoginModal();
    const { server: currentServer, username } = useCurrentUserContext();
	if (!server) {
        server = currentServer!;
    }
    const { hasLiked, likeCount, toggleLike } = useLike(server!, statusId!, data?.favourited, data?.favourites_count);
    const { isBookmarking, toggleBookmark } = useBookmark(server!, statusId!, data?.bookmarked);

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

    const LikeIcon = hasLiked ? HiHeart : HiOutlineHeart;
    const BookmarkIcon = isBookmarking ? HiBookmark : HiOutlineBookmark;
	
	return (
		<div onClick={goToPost}
			className="flex flex-1 gap-x-4 transition cursor-pointer" 
		>
			<div onClick={(ev: any) => {ev.stopPropagation();}} className="flex-shrink-0 h-[50px]">
				<HoverCardDemo
					src={data?.account?.avatar}
					server={server}
					userId={data?.account?.id}
					locked={data?.account?.locked}
					onAvatarClick={goToUser}
					alt={data?.account?.display_name}
					initials={data?.account?.display_name}
					name={data?.account?.display_name}
					username={data?.account?.acct}
					following={data?.account?.following_count}
					followers={data?.account?.followers_count}
					description={data?.account?.note}
				/>
			</div>
			<div className="flex flex-col flex-1">
				<div className="flex flex-1">
					<div className="flex flex-1 gap-x-1 text-sm">
						<span onClick={goToUser} className="text-slate-900 font-bold cursor-pointer hover:underline">
							{data?.account?.display_name}
							</span>
						<span className="text-slate-600 font-medium cursor-pointer">
							@{data?.account?.acct}
						</span>·
						<span className="text-slate-600 font-medium">
							{createdAt}
						</span>
					</div>
					<div className="">
						<DropdownMenuDemo />
					</div>
				</div>

				{/* <div className="flex flex-1">
					<div className="flex flex-1 gap-x-1 text-sm">
						<span onClick={goToUser} className="text-slate-900 font-bold cursor-pointer hover:underline">
							{data?.account?.display_name}
							</span>
						<span className="text-slate-600 font-medium cursor-pointer hidden md:inline">
							@{data?.account?.acct}
						</span>·
						<span className="text-slate-600 font-medium whitespace-nowrap">
							{createdAt}
						</span>
					</div>
					<div className="">
						<DropdownMenuDemo />
					</div>
				</div>
				<span className="text-slate-600 font-medium cursor-pointer hidden md:inline mt-[-10px]">
							@{data?.account?.acct}
				</span> */}

				<div 
					className="text-sm text-slate-900 mb-4"
					dangerouslySetInnerHTML={{ __html: data?.content ? data?.content : data?.reblog?.content }}>
					{/* {data?.content} */}
					{/* <div dangerouslySetInnerHTML={{ __html: data?.content ? data?.content : data?.reblog?.content }} /> */}
				</div>
				{children}
				<div>
					{/* <ul className="flex gap-x-10 xl:gap-x-14 text-xs text-slate-700 [&_li:first-child]:hidden [&_li:first-child]:lg:flex [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3 "> */}
					<ul className="flex gap-x-10 xl:gap-x-14 text-xs text-slate-700 [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3 ">
						{/* <li className="">
							<HiOutlineChartBarSquare className="w-5 h-5" />
							20
						</li> */}
						<li>
							<HiOutlineChatBubbleOvalLeft className="w-5 h-5" />
							{/* {data?.replies_count || ''} */}
							<p className="w-5">
                                {data?.replies_count || ''}
                            </p>
						</li>
						<li>
							<HiOutlineArrowPath className="w-5 h-5" />
							{/* {data?.reblogs_count || ''} */}
							<p className="w-5">
                                {data?.reblogs_count || ''}
                            </p>
						</li>
						<li onClick={onLike}
							className="
							transition 
							hover:text-red-500
						"
						>
							{/* <HiOutlineHeart className="w-5 h-5" /> */}
							<LikeIcon className={clsx(hasLiked && "text-red-500", "w-5 h-5")} />
							{/* {data?.favourites_count || ''} */}
							<p className={clsx(hasLiked && "text-red-500", "w-5")}>
								{likeCount || ''}
                            </p>
						</li>
						<li onClick={onBookmark}
							className="
							transition 
							hover:text-yellow-500
						"
						>
							{/* <HiOutlineBookmark className="w-5 h-5" /> */}
							<BookmarkIcon className={clsx(isBookmarking && "text-yellow-500", "w-5 h-5")} />
						</li>
						{/* <li>
							<HiArrowUpTray className="w-5 h-5" />
						</li> */}
					</ul>
				</div>
			</div>
		</div>
	)

};

export default Post;
