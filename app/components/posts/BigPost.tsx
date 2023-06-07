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
import { useCurrentUserContext } from '@/app/context/UserProvider';
import useLike from '@/app/hooks/useLike';
import clsx from 'clsx';
import useBookmark from '@/app/hooks/useBookmark';

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

const BigPost = ({
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
	// const { server: currentServer, username } = useCurrentUserContext();
    // if (!server) {
    //     server = currentServer!;
    // }
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
		<>
		<div className="flex flex-1 gap-x-4">
			<div className="flex flex-1 gap-x-4">
				<div onClick={(ev: any) => {ev.stopPropagation();}} className="flex-shrink-0 cursor-pointer" >
					<HoverCardDemo
						src={data?.account?.avatar}
						onAvatarClick={goToUser}
						alt={data?.account?.display_name}
						initials={data?.account?.display_name}
						name={data?.account?.display_name}
						username={data?.account?.acct}
						following={'following'}
						followers={'followers'}
						description={'description'}
					/>
				</div>
				<div className="flex flex-col flex-1">
					<div className="flex flex-1">
						<div className="flex flex-1 gap-x-1 text-sm">
							<span onClick={goToUser} className="text-lg text-slate-900 font-bold cursor-pointer hover:underline">
								{data?.account?.display_name}
							</span>

						</div>
						<div className="">
							<DropdownMenuDemo />
						</div>
					</div>
					<span className="text-slate-600 font-medium -mt-2">
						@{data?.account?.acct}
					</span>
					
				</div>
			</div>
			
		</div>

		<div className="text-sm text-slate-900 mb-4 py-2" dangerouslySetInnerHTML={{ __html: data?.content ? data?.content : data?.reblog?.content }}>
			{/* <div dangerouslySetInnerHTML={{ __html: data?.content ? data?.content : data?.reblog?.content }} /> */}
		</div>
		{children}
		
		<div className="text-sm py-1">
			<span className="text-slate-600 font-medium">
				{createdAt}
			</span>
		</div>

		<div className="border-t border-gray-400 py-2">
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
					cursor-pointer
					hover:text-red-500
					"
				>
					{/* <HiOutlineHeart className="w-5 h-5" /> */}
					<LikeIcon className={clsx(hasLiked && "text-red-500", "w-5 h-5")} />
					<p className={clsx(hasLiked && "text-red-500", "w-5")}>
						{likeCount || ''}
					</p>
				</li>
				<li onClick={onBookmark}
					className="
					transition 
					cursor-pointer
					hover:text-yellow-500
				">
					<BookmarkIcon className={clsx(isBookmarking && "text-yellow-500", "w-5 h-5")} />
				</li>
				{/* <li>
					<HiArrowUpTray className="w-5 h-5" />
				</li> */}
			</ul>
		</div>
		</>

	)

};

export default BigPost;
