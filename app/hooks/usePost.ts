import useSWR from 'swr';
import { useCurrentUserContext } from '../context/UserProvider';
import fetcher from '../libs/fetcher';

const usePost = (server: string, statusId?: string) => {
    const { server: currentServer, token } = useCurrentUserContext();

    if (!server && currentServer) {
        server = currentServer;
    }

    const url = `https://${server}/api/v1/statuses/${statusId}`;

    const { data, error, isLoading, mutate } = useSWR(
        server ? url : null, 
        (url) => fetcher(url, token!),
        { revalidateOnFocus: false }
    );
    
    const { data: statusContext, mutate: mutateComment } = useSWR(
        server ? url+'/context' : null, 
        (url) => fetcher(url, token!),
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