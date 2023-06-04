import useSWR from 'swr';
import fetcher from '../libs/fetcher';
import { useCurrentUserContext } from '../context/UserProvider';
// import { useCurrentUserContext } from '../context/UserProvider';

const usePosts = (server?: string, userId?: string, type?: string, maxId?: string, offset?: number) => {
    const { server: currentServer, token } = useCurrentUserContext();
    let url = null;

    if (!server && currentServer) {
        server = currentServer;
    }

    if (!userId) {
        if (type==='home') {
            url = `https://${server}/api/v1/timelines/home`;
        } else if (type === 'trends') {
            url = `https://${server}/api/v1/trends/statuses`;
        } else if (type === 'local') {
            url = `https://${server}/api/v1/timelines/public?limit=30&local=true`;
        } else if (type === 'public') {
            url = `https://${server}/api/v1/timelines/public?limit=30`;
        } else if (type === 'favorites') {
            url = `https://${server}/api/v1/favourites`;
        } else if (type === 'bookmarks') {
            url = `https://${server}/api/v1/bookmarks`;
        } else { // default home
            url = `https://${server}/api/v1/timelines/home`;
        }

    } else {
        url = `https://${server}/api/v1/accounts/${userId}/statuses?limit=30&exclude_replies=true`;
    }
    if (maxId) {
        url = url + `&max_id=${maxId}`;
    }
    if (offset) {
        url = url + `?offset=${offset}`;
    }
    const { data, error, isLoading, mutate } = useSWR(
        server ? url : null, 
        // url, 
        (url) => fetcher(url, token!),
        { revalidateOnFocus: false }
    );
    // console.log('usePosts response data:', data);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default usePosts;