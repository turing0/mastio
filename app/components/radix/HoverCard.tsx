import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Avatar from './Avatar';
import clsx from 'clsx';
import Button from '../Button';
import UserCard from '../UserCard';
import useFollow from '@/app/hooks/useFollow';
import useUser from '@/app/hooks/useUser';
import { useState } from 'react';

interface Props {
	src: string;
	server: string;
	userId: string;
	alt: string;
	initials: string;
	name: string;
	username: string;
	description: string;
	following: string;
	followers: string;
	onAvatarClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

const HoverCardDemo = ({
	src,
	server,
	userId,
	alt,
	initials,
	name,
	username,
	description,
	following,
	followers,
	onAvatarClick
}: Props) => {
    const { data: fetchedUser } = useUser(server, userId);
    const { isFollowing, isFollowedBy, isRequested, toggleFollow } = useFollow(server, fetchedUser?.id, fetchedUser?.locked);
    const [hovered, setHovered] = useState(false);
	
	return (
		<HoverCardPrimitive.Root>
			<HoverCardPrimitive.Trigger asChild>
				<div onClick={onAvatarClick}>
					<Avatar src={src} alt={alt} initials={initials} />
				</div>
				{/* <div onClick={onAvatarClick}>
					<a
						className="ImageTrigger inline-flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-white"
						href={href}
						rel="noreferrer noopener"
					>
						<Avatar src={src} alt={alt} initials={initials} />
					</a>
				</div> */}
				
			</HoverCardPrimitive.Trigger>
			<HoverCardPrimitive.Portal>
				<HoverCardPrimitive.Content
					align="center"
					sideOffset={4}
					className={clsx(
						'HoverCardPrimitiveContent radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
						'w-72 rounded-lg p-4',
						'bg-white border border-slate-200 shadow-xl',
						'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
					)}
				>
					<div className="w-full flex flex-col gap-y-2">
						<div className="flex justify-between items-start">
							<div onClick={onAvatarClick} className="cursor-pointer">
								<Avatar src={src} alt={alt} initials={initials} />
							</div>
							<div>
								<Button intent="outline" size="default">
								{isRequested ? 'Requested' : 
                (isFollowedBy&&isFollowing ? (hovered ? 'Unfollow' : 'Mutuals') : (isFollowing ? (hovered ? 'Unfollow' : 'Following') : (isFollowedBy ? (hovered ? 'Follow back' : 'Follows you') : (fetchedUser?.locked ? 'Request to follow' : 'Follow'))))}
								</Button>
							</div>
						</div>
						<UserCard
							name={name}
							username={username}
							description={description}
							following={following}
							followers={followers}
						/>
					</div>
				</HoverCardPrimitive.Content>
			</HoverCardPrimitive.Portal>
		</HoverCardPrimitive.Root>
	)
}

export default HoverCardDemo;
