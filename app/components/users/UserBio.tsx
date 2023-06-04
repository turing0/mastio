import useUser from "@/app/hooks/useUser";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import { useState } from "react";
import { useCurrentUserContext } from "@/app/context/UserProvider";
import useFollow from "@/app/hooks/useFollow";

interface UserBioProps {
    server: string;
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ server, userId }) => {
    const { account } = useCurrentUserContext();
    const { data: fetchedUser } = useUser(server, userId);
    // console.log('UserBio fetchedUser:', fetchedUser);
    const locked = fetchedUser?.locked;
    const { isFollowing, isFollowedBy, isRequested, toggleFollow } = useFollow(server, fetchedUser?.id, locked);
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => {
        setHovered(true);
        // if (isFollowing) {
        //   setHovered(true);
        // }
      };
      
    const handleMouseLeave = () => {
        setHovered(false);
        // if (isFollowing) {
        //     setHovered(false);
        // }
    };

    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
            {account?.url === fetchedUser?.url ? (
                <Button>Edit profile</Button>
                ) : (
                <Button
                    // onClick={toggleFollow} 
                    // label={isFollowing ? 'Following' : 'Follow'}
                    // label={hovered && isFollowing ? 'Unfollow' : (isFollowing ? 'Following' : 'Follow')}
                    // label={hovered && isFollowing ? 'Unfollow' : (isFollowing ? 'Following' : (locked ? 'Request to follow' : 'Follow'))}
                >{isRequested ? 'Requested' : 
                (isFollowedBy&&isFollowing ? (hovered ? 'Unfollow' : 'Mutuals') : (isFollowing ? (hovered ? 'Unfollow' : 'Following') : (isFollowedBy ? (hovered ? 'Follow back' : 'Follows you') : (locked ? 'Request to follow' : 'Follow'))))}</Button>
            )}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold">
                        {fetchedUser?.display_name}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fetchedUser?.acct}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    {/* <p className="text-white">
                        {fetchedUser?.note}
                    </p> */}
                    <span className="" dangerouslySetInnerHTML={{ __html: fetchedUser?.note }} />
                    <div className="
                        flex 
                        flex-row 
                        items-center 
                        gap-2 
                        mt-4 
                        text-neutral-500
                    ">
                        <BiCalendar size={24} />
                        <p>
                            Joined on {fetchedUser?.created_at.slice(0, 10)}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-4 gap-6">
                    <div className="flex flex-row items-center gap-1">
                        <p>{fetchedUser?.statuses_count}</p>
                        <p className="text-neutral-500">Posts</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p>{fetchedUser?.following_count}</p>
                        <p className="text-neutral-500">Following</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p>{fetchedUser?.followers_count || 0}</p>
                        <p className="text-neutral-500">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBio;