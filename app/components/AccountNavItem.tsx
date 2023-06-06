'use client';

import Link from 'next/link';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import Avatar from './radix/Avatar';
import { useRouter } from 'next/navigation';
import { useCurrentUserContext } from '../context/UserProvider';


const AccountNavItem = ({ data }: {data: any}) => {
	const router = useRouter();
	const {server, account} = useCurrentUserContext();

	const goToProfile = () => {
		router.push(`/${server}/${account?.acct}`);
	};

	return (
		<div className="flex flex-1 items-center gap-x-2 px-4 py-8 ">
		<div className="flex items-center gap-x-3 flex-1">
			<div onClick={goToProfile} className="flex flex-1 xl:flex-none justify-center xl:justify-start cursor-pointer">
				<Avatar
					src={data?.avatar}
					alt={data?.display_name}
					initials=""
				/>
			</div>
			<div className="hidden xl:flex flex-col ">
				<p className="text-base font-semibold">Roy Quilor</p>
				<p className="text-sm text-slate-600 font-medium">@RoyQuilor</p>
			</div>
		</div>
		<div className="hidden xl:flex">
			<Link href="/">
				<HiOutlineEllipsisHorizontal className="w-6 h-6" />
			</Link>
		</div>
	</div>
	)
}

export default AccountNavItem;
