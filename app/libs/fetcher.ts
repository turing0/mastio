import axios from 'axios';
import { Session } from 'next-auth';

// const { data: session, status } = useSession();

// const fetcher = (url: string) => {
//     // axios.get(url,
//     //     {
//     //         headers: {
//     //             Authorization: `Bearer ${session?.accessToken}`,
//     //             "Content-Type": "application/json",
//     //         },
//     //     }
//     //   ).then((res) => res.data);
//     const { data: session } = useSession();

//     return axios.get(url, {
//         headers: {
//         Authorization: `Bearer ${session?.accessToken}`,
//         'Content-Type': 'application/json',
//         },
//     }).then((res) => res.data);
// }

const fetcher = (url: string, session: Session | null) => {
    // if (!session) {
    //     return null;
    // }
    // const headers = session ? {
    // Authorization: `Bearer ${session?.accessToken}`,
    // 'Content-Type': 'application/json',
    // } : {};
    const headers = {
        Authorization: `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
      };
    // console.log('fetcher:', url, headers);
    return axios.get(url, { headers }).then((res) => res.data);
};

export default fetcher;