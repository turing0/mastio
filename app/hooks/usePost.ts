import useSWR from 'swr';
import fetcher2 from '../libs/fetcher2';
import { useCurrentUserContext } from '../context/UserProvider';

const usePost = (server: string, statusId?: string) => {
    const { server: currentServer, token } = useCurrentUserContext();

    if (!server && currentServer) {
        server = currentServer;
    }

    const url = `https://${server}/api/v1/statuses/${statusId}`;

    const { data, error, isLoading, mutate } = useSWR(
        server ? url : null, 
        (url) => fetcher2(url, token!),
        { revalidateOnFocus: false }
    );
    
    const { data: statusContext, mutate: mutateComment } = useSWR(
        server ? url+'/context' : null, 
        (url) => fetcher2(url, token!),
        { revalidateOnFocus: false }
    );
    // console.log('usePost params:', server, statusId);
    // console.log('usePost response data:', data);

    return {
        data,
        statusContext,
        error,
        isLoading,
        mutate,
        mutateComment
    }
};

export default usePost;