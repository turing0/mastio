import useSWR from 'swr';
import { useCurrentUserContext } from '../context/UserProvider';
import fetcher from '../libs/fetcher';

const useUser = (server: string, userId: string) => {
  const { token } = useCurrentUserContext();
  // console.log('call useUser session:', session);
  // console.log('call useUser:', server, userId);

    const { data, error, isLoading, mutate } = useSWR(
        server && userId
          // ? `https://${server}/api/v1/accounts/${userId}/`
          ? `https://${server}/api/v1/accounts/lookup?acct=${userId}`
          : null,
        (url) => fetcher(url, token!),
        { revalidateOnFocus: false }
      );

    if (!server || !userId) {
        return {};
    }
    // console.log('useUser params:', server, userId);
    // console.log('useUser respnose data:', data);
    
    return {
      data,
      error,
      isLoading,
      mutate
    }
  };
  
  export default useUser;