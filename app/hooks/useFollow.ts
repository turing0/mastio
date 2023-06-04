import useLoginModal from "./useLoginModal";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import fetcher from "../libs/fetcher";
import { useCurrentUserContext } from "../context/UserProvider";
import { postWithToken } from "../libs/postWithToken";

const useRelationships = (server: string, userId: string) => {
    const { server: currentServer, token, account: currentUser } = useCurrentUserContext();
    const url = `https://${server}/api/v1/accounts/relationships?id[]=${userId}`;
    const { data, error, isLoading, mutate } = useSWR(
        token ? url : null,
        (url: string) => fetcher(url, token!),
        { revalidateOnFocus: false }
    );
  
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

// interface UserFollowing {
//     id: number
// }

const useFollow = (server: string, userId: string, locked: boolean) => {
    // const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { account: currentUser } = useCurrentUserContext();
    const { data: relationData, mutate: mutateCurrentUserF } = useRelationships(server, userId);
    // const { mutate: mutateFetchedUser } = useUser(server, userId);

    const loginModal = useLoginModal();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowedBy, setIsFollowedBy] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    useEffect(() => {
        setIsFollowing(relationData?.[0]?.following);
        setIsFollowedBy(relationData?.[0]?.followed_by);
        setIsRequested(relationData?.[0]?.requested);
    }, [relationData]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        if (isRequested) {
            return ;
        }

        let request;
        if (locked) {
            if (isFollowing) {
                setIsFollowing(false);
                request = () => postWithToken(`https://${server}/api/v1/accounts/${userId}/unfollow`);
            } else {
                setIsRequested(true);
                request = () => postWithToken(`https://${server}/api/v1/accounts/${userId}/follow`);
            }
        }
        else {
            if (isFollowing) {
                setIsFollowing(false);
                request = () => postWithToken(`https://${server}/api/v1/accounts/${userId}/unfollow`);
            } else {
                setIsFollowing(true);
                request = () => postWithToken(`https://${server}/api/v1/accounts/${userId}/follow`);
            }
        }

        try {
            const res = await request();
            // console.log('follow response:', res?.data);
            // mutateCurrentUser();

            // mutateCurrentUserF();
            // mutateFetchedUser?.();
        } catch(error) {
            setIsFollowing(!isFollowing);
            toast.error('Something went wrong!');
        }

    }, [currentUser, isFollowing, userId, loginModal, server, isRequested, locked]);

    return {
        isFollowing,
        isFollowedBy,
        isRequested,
        toggleFollow,
    };
}

export default useFollow;