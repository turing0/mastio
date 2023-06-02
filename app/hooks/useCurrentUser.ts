import useSWR from 'swr';
import fetcher2 from '../libs/fetcher2';
import { useCurrentUserContext } from '../context/UserProvider';

// type UserDataType = {
//   id?: string;
//   username?: string;
//   url?: string;
//   avatar_static?: string;
// }; 

const useCurrentUser = () => {
    const { server, token } = useCurrentUserContext();

    const { data, error, isLoading, mutate } = 
      useSWR(
        server && token ? `https://${server}/api/v1/accounts/verify_credentials`
         : null, 
        (url) => fetcher2(url, token!), 
        { revalidateOnFocus: false }
      );
    // console.log('useCurrentUser:',);

    return {
        data,
        error,
        isLoading,
        mutate
    }

    // const [userData, setUserData] = useState<UserDataType>({});
    
    // const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
  
    // useEffect(() => {
    //   async function fetchData() {
    //     if (!session || !session.accessToken || !session.server) {
    //       return;
    //     }
  
    //     try {
    //       const response = await axios.get(
    //         `https://${session.server}/api/v1/accounts/verify_credentials`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${session.accessToken}`,
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );

    //       const userDataObject = {
    //         id: response.data.id,
    //         username: response.data.username,
    //         url: response.data.url,
    //         avatar_static: response.data.avatar_static,
    //         // Add other fields as per your need
    //       };
  
    //       setUserData(response.data);
    //       // setUserData(userDataObject);
    //       console.log(response.data);
    //     } catch (error) {
    //       console.error(error);
    //       setUserData({});
    //     }
    //   }
  
    //   fetchData();
    // }, [session]);
    
    // return { 
    //   userData, 
    //   isLoading: status === "loading" 
    // };

    // return {
    //   data,
    //   error,
    //   isLoading,
    //   mutate
    // }
};

export default useCurrentUser;