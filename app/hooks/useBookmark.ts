import useLoginModal from "./useLoginModal";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { postWithToken } from "../actions/postWithToken";
import { useCurrentUserContext } from "../context/UserProvider";

// const useCurrentUserFollwing = (server: string, userId: string) => {
//     const { server: currentServer, token, account: currentUser } = useCurrentUserContext();
//     const url = `https://${server}/api/v1/accounts/relationships?id[]=${userId}`;
//     const { data, error, isLoading, mutate } = useSWR(
//         token ? url : null,
//         (url: string) => fetcher(url, token!),
//         { revalidateOnFocus: false }
//     );
  
//     return {
//         data,
//         error,
//         isLoading,
//         mutate
//     }
// };

const useBookmark = (server: string, statusId: string, initialIsBookmarking?: boolean) => {
    // const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { account: currentUser } = useCurrentUserContext();
    // const { data: relationData, mutate: mutateCurrentUserF } = useCurrentUserFollwing(server, statusId);
    // const { mutate: mutateFetchedUser } = useUser(server, userId);

    const loginModal = useLoginModal();
    const [isBookmarking, setIsBookmarking] = useState(initialIsBookmarking);
    // useEffect(() => {
    //     setIsBookmarking(relationData?.[0]?.following);
    // }, [relationData]);

    const toggleBookmark = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        let request;
        if (isBookmarking) {
            setIsBookmarking(false);
            request = () => postWithToken(`https://${server}/api/v1/statuses/${statusId}/unbookmark`);
        } else {
            setIsBookmarking(true);
            request = () => postWithToken(`https://${server}/api/v1/statuses/${statusId}/bookmark`);
        }

        try {
            const res = await request();
            // console.log('follow response:', res?.data);
            // mutateCurrentUser();

            // mutateCurrentUserF();
            // mutateFetchedUser?.();
        } catch(error) {
            setIsBookmarking(!isBookmarking);
            toast.error('Something went wrong!');
        }

    }, [currentUser, isBookmarking, statusId, loginModal, server]);

    return {
        isBookmarking,
        toggleBookmark,
    };
}

export default useBookmark;