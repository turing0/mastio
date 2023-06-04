'use client';

// import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCurrentUserContext } from '@/app/context/UserProvider';
import useVerifyCredentials from '@/app/hooks/useVerifyCredentials';

export default function MyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {signIn} = useCurrentUserContext();

  const token = searchParams.get('token');
  const server = searchParams.get('server');
  const { data, error } = useVerifyCredentials(server!, token!);

  useEffect(() => {
    // async function fetchData() {
      // const data = await verifyCredentials(server, token!);
      // const {data} = await useVerifyCredentials(server, token!);
      // console.log('------signin data:', data);
      if (data) {
        signIn(server!, token!, data);
        router.push('/');

        // signIn('credentials', {
        //   'url': server,
        //   'accessToken': token,
        //   callbackUrl: '/',
        // }).then((result) => {
        //   if (result?.error) {
        //     console.log('Login failed: Invalid token');
        //   } else {
        //     setCurrentUser(`${data.username}@${server}`);
        //     saveKV('users', [{ server: server, token: token!, 'account':data }]);
        //   }
        // }).catch((error) => {
        //   toast.error('Signin failed: Invalid token');
        // });
      } else if (error) {
        toast.error('Signin failed: Invalid token or server');
        router.push('/');
      }
    // }
    // fetchData();
  }, [data, error, server, token, router, signIn]); // Only run this effect if server or token changes

  // return null;
  return (
    <div className='text-white'>
      <p>Signing in...</p>
      {/* <p>Token: {token}</p> */}
      {/* <p>status: {status}</p> */}
    </div>
  );
}

