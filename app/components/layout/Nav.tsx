import { ReactNode, useState } from 'react';
import DialogDemo from '../radix/Dialog';
import NavItem from '../NavItem';
import PopoverDemo from '../radix/PopoverDemo';

import { MdFavoriteBorder } from 'react-icons/md'; 
import { BsMastodon } from "react-icons/bs";
import { FaBookmark, FaCompass, FaUser, FaUsers } from 'react-icons/fa'; 
import { RiEarthLine, RiGroup2Line } from 'react-icons/ri';

import {
	HiOutlineHome,
	HiHashtag,
	HiOutlineBell,
	HiOutlineEnvelope,
	HiOutlineBookmark,
	HiOutlineUser,
} from 'react-icons/hi2';
import AccountNavItem from '../AccountNavItem';
import clsx from 'clsx';

interface NavLinkItem {
	href: string;
	text: string;
	icon?: ReactNode;
}

const server = null;
const defaultServer = "mstdn.social";

const items: NavLinkItem[] = [
	{
		href: '/',
		text: 'Home',
		icon: <HiOutlineHome className="w-6 h-6" />,
	},
	{
		href: '/notifications',
		text: 'Notifications',
		icon: <HiOutlineBell className="w-6 h-6" />,
	},
	{
		href: '/explore',
		text: 'Explore',
		icon: <HiHashtag className="w-6 h-6" />,
	},
	{
		href: `/${server ? server : defaultServer}/public/local`,
		text: 'Local',
		icon: <RiGroup2Line className="w-6 h-6" />,
	},
	{
		href: `/${server ? server : defaultServer}/public`,
		text: 'Federated',
		icon: <RiEarthLine className="w-6 h-6" />,
	},
	// {
	// 	href: '/messages',
	// 	text: 'Messages',
	// 	icon: <HiOutlineEnvelope className="w-6 h-6" />,
	// },
	{
		href: '/favorites',
		text: 'Favorites',
		icon: <MdFavoriteBorder className="w-6 h-6" />,
	},
	{
		href: '/bookmarks',
		text: 'Bookmarks',
		icon: <HiOutlineBookmark className="w-6 h-6" />,
	},
	{
		href: '/profile',
		text: 'Profile',
		icon: <HiOutlineUser className="w-6 h-6" />,
	},
];

const Nav = () => {
	const [selectedNavItem, setSelectedNavItem] = useState("explore");

	return (
		<>
		<header className="hidden sm:flex w-24 xl:col-span-2">
			<div className="flex flex-1 xl:w-60 flex-col fixed h-full">
				<div className="flex flex-col flex-1">
					<NavItem href="/" width="inline" size="default">
						<BsMastodon className="w-6 h-6" />
					</NavItem>
					{items.map(({ href, text, icon }, i) => (
						<div
							key={`header-${i}`}
							// value={`item-${i + 1}`}
							className="rounded-lg focus:outline-none overflow-hidden"
						>
							<NavItem href={href} width="inline" size="default">
								{icon}
								<div className="hidden xl:inline-flex flex-none text-lg font-medium">
									{text}
								</div>
							</NavItem>
						</div>
					))}
					{/* <PopoverDemo /> */}
					{/* <DialogDemo /> */}
				</div>
				<div>
					<AccountNavItem />
				</div>
			</div>
		</header>

		{/* mobile */}
		<header className="sm:hidden flex fixed bottom-0 left-0 right-0 bg-white" style={{ zIndex: 100 }}>
			<div className="container mx-auto flex items-center justify-between px-4 py-0 border border-gray-300 h-12" >
				<div className="ml-5">
					<NavItem onClick={() => setSelectedNavItem('explore')} href={`/explore`} width="inline" size="default">
						<HiHashtag className={clsx('w-6', 'h-6', { 'text-blue-500': selectedNavItem === 'explore' })} />
					</NavItem>
				</div>
				<NavItem onClick={() => setSelectedNavItem('local')} href={`/${server ? server : defaultServer}/public/local`} width="inline" size="default">
					<RiGroup2Line className={clsx('w-6', 'h-6', { 'text-blue-500': selectedNavItem === 'local' })} />
				</NavItem>
				<NavItem onClick={() => setSelectedNavItem('federated')} href={`/${server ? server : defaultServer}/public`} width="inline" size="default">
					<RiEarthLine className={clsx('w-6', 'h-6', { 'text-blue-500': selectedNavItem === 'federated' })} />
				</NavItem>
				<div className="flex items-center justify-center mr-5">
					<PopoverDemo />
				</div>
			</div>
		</header>
		</>
	)
};

export default Nav;