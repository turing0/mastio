import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IconType } from "react-icons";
import clsx from 'clsx';
import { useCurrentUserContext } from "@/app/context/UserProvider";

interface SidebarItemProps {
    label: string;
    icon: IconType;
    href?: string;
    onClick?: () => void;
    auth?: boolean;
    alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label, 
    icon: Icon, 
    href, 
    auth = false, 
    onClick, 
    alert
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    // const [currentUser, setCurrentUser] = useState<string | null>(null);
    // useEffect(() => {
    //     const fetchSession = async () => {
    //         const currentU = await getCurrentUser();
    //         // console.log(`call currentU`);
    //         setCurrentUser(currentU);
    //     };
    
    //     fetchSession();
    // }, []);
    const { account:currentUser } = useCurrentUserContext();
    
    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }
        
        if (auth && !currentUser) {
            loginModal.onOpen();
        }
        else if (href) {
            router.push(href); 
        }
        
    }, [router, onClick, href, currentUser, auth, loginModal])

    return (
        <div onClick={handleClick} className={clsx(
            'flex flex-row items-center',
            auth && !currentUser
              ? 'opacity-50 pointer-events-none' // Button is disabled
              : 'cursor-pointer'
          )}>
            <div className="
                    relative
                    rounded-full 
                    h-12
                    w-14
                    flex
                    items-center
                    justify-center 
                    p-4
                    hover:bg-slate-300 
                    hover:bg-opacity-10 
                    cursor-pointer 
                    lg:hidden
                "
            >
                <Icon size={28} color="white"
                />
            </div>
            <div
                className="
                    relative
                    hidden 
                    lg:flex 
                    items-row 
                    gap-4 
                    p-2
                    rounded-full 
                    hover:bg-slate-300 
                    hover:bg-opacity-10 
                    cursor-pointer
                    items-center
                "
            >
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-white text-base">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default SidebarItem;