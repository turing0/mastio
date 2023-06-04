'use client';

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useCurrentUserContext } from "../context/UserProvider";
import LoginButton from "./layout/LoginButton";

interface HeaderProps {
	showBackArrow?: boolean;
	title: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, title }) => {
	const router = useRouter();
	const { account } = useCurrentUserContext();
	
	const handleBack = useCallback(() => {
	  router.back();
	}, [router]);
	
	return (
		<div className="sticky bg-white/75 z-10 backdrop-blur-md top-0">
			<div className="flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-2">
					{showBackArrow && (
					<BiArrowBack 
						onClick={handleBack} 
						size={20} 
						className="
						cursor-pointer 
						hover:opacity-70 
						transition
					"/>
					)}
					{/* <Text variant='large/bold'>Home</Text> */}
					<h2 className="text-lg font-bold">{title}</h2>
				</div>
				{!account && (
					<LoginButton></LoginButton>
					// <button 
					// 	onClick={() => router.push('/signin')} 
					// 	className="
					// 	bg-blue-500 
					// 	text-white 
					// 	px-4 
					// 	py-2 
					// 	rounded 
					// 	hover:bg-blue-600 
					// 	transition
					// ">
					// 	Sign In
					// </button>
				)}
			</div>
		</div>
	)
}
	
export default Header;
