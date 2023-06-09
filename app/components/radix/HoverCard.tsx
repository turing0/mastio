import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Avatar from './Avatar';
import clsx from 'clsx';
import Button from '../Button';
import UserCard from '../UserCard';
import useFollow, { useRelationships } from '@/app/hooks/useFollow';
import useUser from '@/app/hooks/useUser';
import { useEffect, useState } from 'react';

interface Props {
	src: string;
	server: string;
	userId: string;
	locked: boolean;
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
	locked,
	alt,
	initials,
	name,
	username,
	description,
	following,
	followers,
	onAvatarClick
}: Props) => {
    // const { data } = useRelationships(server, userId);

    const [hovered, setHovered] = useState(false);
	
	return (
		<HoverCardPrimitive.Root>
			<HoverCardPrimitive.Trigger asChild >
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
								{/* {data?.requested ? 'Requested' : 
                (data?.[0]?.followed_by&&data?.[0]?.following ? (hovered ? 'Unfollow' : 'Mutuals') : (data?.[0]?.following ? (hovered ? 'Unfollow' : 'Following') : (data?.[0]?.followed_by ? (hovered ? 'Follow back' : 'Follows you') : (locked ? 'Request to follow' : 'Follow'))))} */}
								Follow
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
