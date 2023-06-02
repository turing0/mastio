import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { postWithToken } from "../actions/postWithToken";
import { useCurrentUserContext } from "../context/UserProvider";

// const useLike = (server: string, postId: string, favorited: boolean) => {
const useLike = (server: string, postId: string, favorited: boolean, initialLikes: number) => {
    const { account: currentUser } = useCurrentUserContext();
    // const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(server, postId);
    // const { mutate: mutateFetchedPosts } = usePosts(userId);
  
    const loginModal = useLoginModal();
    const [hasLiked, setHasLiked] = useState(favorited);
    const [likeCount, setLikeCount] = useState(initialLikes);
  
    // const hasLiked = useMemo(() => {
    //   return fetchedPost?.favourited;
    // }, [fetchedPost]);
  
    const toggleLike = useCallback(async () => {
      if (!currentUser) {
        return loginModal.onOpen();
      }

      let request;
      if (hasLiked) {
        setHasLiked(false);  
        setLikeCount(likeCount - 1);
        request = () => postWithToken(`https://${server}/api/v1/statuses/${postId}/unfavourite`);
      } else {
        setHasLiked(true);  
        setLikeCount(likeCount + 1);
        request = () => postWithToken(`https://${server}/api/v1/statuses/${postId}/favourite`);
      }
  
      try {
        const res = await request();
        // console.log('useLike response:', res.data);

        // mutateFetchedPost();
        // mutateFetchedPosts();
  
        // toast.success('Success');
      } catch (error) {
        setHasLiked(!hasLiked);
        toast.error('Something went wrong');
      }
    }, [currentUser, postId, loginModal, hasLiked, likeCount, server]);
  
    return {
      hasLiked,
      likeCount,
      toggleLike,
    }

}

export default useLike;