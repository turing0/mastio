import useSWR from 'swr';
import fetcher from '../libs/fetcher';

const useVerifyCredentials = (server: string, token: string) => {
    const { data, error, isLoading, mutate } = 
      useSWR(
        server && token ? `https://${server}/api/v1/accounts/verify_credentials`
         : null, 
        (url) => fetcher(url, token), 
        { revalidateOnFocus: false }
      );
    // console.log('useVerifyCredentials response data:', data);
    
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useVerifyCredentials;