import useSWR from 'swr';
import fetcher2 from '../libs/fetcher2';

const useVerifyCredentials = (server: string, token: string) => {
    const { data, error, isLoading, mutate } = 
      useSWR(
        server && token ? `https://${server}/api/v1/accounts/verify_credentials`
         : null, 
        (url) => fetcher2(url, token), 
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