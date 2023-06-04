import { ReactNode, useCallback, useMemo } from 'react';

import {
	HiOutlineHeart,
	HiArrowUpTray,
	HiOutlineChatBubbleOvalLeft,
	HiOutlineArrowPath,
	HiOutlineChartBarSquare,
	HiOutlineBookmark,
} from 'react-icons/hi2';
import HoverCardDemo from '../radix/HoverCard';
import DropdownMenuDemo from '../radix/DropdownMenu';
import { useRouter } from 'next/navigation';
import useLoginModal from '../../hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';

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

	// const { server: currentServer, username } = useCurrentUserContext();
    // if (!server) {
    //     server = currentServer!;
    // }

	const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();
        router.push(`/${server}/@${data.account.acct}`)
    }, [router, data, server]);

	const goToPost = useCallback(() => {
        router.push(`/${server}/@${data.account.username}/${data.id}`);
    }, [router, data, server]);

	const createdAt = useMemo(() => {
        if (!data?.created_at) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.created_at));
    }, [data])

	
	return (
		<div onClick={goToPost}
			className="flex flex-1 gap-x-4 cursor-pointer transition" 
		>
			<div onClick={(ev: any) => {ev.stopPropagation();}} className="flex-shrink-0">
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
						<span onClick={goToUser} className="text-slate-900 font-bold cursor-pointer">
							{data?.account?.display_name}
							</span>
						<span className="text-slate-600 font-medium cursor-pointer">
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


				<div className="text-sm text-slate-900 mb-4" dangerouslySetInnerHTML={{ __html: data?.content ? data?.content : data?.reblog?.content }}>
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
						<li>
							<HiOutlineHeart className="w-5 h-5" />
							{/* {data?.favourites_count || ''} */}
							<p className="w-5">
                                {data?.favourites_count || ''}
                            </p>
						</li>
						<li>
							<HiOutlineBookmark className="w-5 h-5" />
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
