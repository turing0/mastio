'use client';

// import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import setCurrentUser from '@/app/actions/setCurrentUser';
import db from '@/app/actions/db';
import toast from 'react-hot-toast';
import useVerifyCredentials from '@/app/hooks/useVerifyCredentials';
import { useCurrentUserContext } from '@/app/context/UserProvider';

async function saveKV(key: string, value: object[]) {
  try {
      await db.kv.put({ key, value });
  } catch (error) {
      console.error(error);
  }
}

export default function MyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {signIn} = useCurrentUserContext();

  const token = searchParams.get('token');
  const server = searchParams.get('server') || '';
  // console.log('server:', server);
  // console.log('token:', token);

  // useEffect(() => {
  //   const handleSignIn = async () => {
  //     await signIn('credentials', { 'url': server, 'accessToken': token }); // 执行登录动作
  //     router.push('/'); // 登录成功后重定向到首页
  //   };

  //   // if (status === 'unauthenticated') {
  //   if (!session) {
  //     handleSignIn(); // 如果用户未登录，则执行自动登录
  //   // } else if (status === 'authenticated') {
  //   } else {
  //     router.push('/'); // 如果用户已经登录，则直接重定向到首页
  //   }
  // }, []);

  // const handleSignInAndRedirect = async () => {
  //   if (!session) {
  //     // await signIn('credentials', { 'url': server, 'accessToken': token });
  //     await signIn('credentials', { 'url': server, 'accessToken': token, callbackUrl: '/' });
  //   }
  // };
  // handleSignInAndRedirect();

  // useEffect(() => {
  //   const handleSignInAndRedirect = async () => {
  //     if (!session) {
  //       // await signIn('credentials', { 'url': server, 'accessToken': token });
  //       await signIn('credentials', { 'url': server, 'accessToken': token, callbackUrl: '/' });
  //     }
  //   };

  //   handleSignInAndRedirect();
  // }, [session, token, server]);  // Re-run the effect when `session`, `token`, or `server` changes
  // useEffect(() => {
  //   const handleSignInAndRedirect = async () => {
  //     const response = await signIn('credentials', {
  //       'url': server,
  //       'accessToken': token,
  //       callbackUrl: '/',
  //       // redirect: false, // Important: This must be false if you're doing a custom redirect
  //     });

  //     if (!response) {
  //       // Handle failed login attempt
  //       console.error('Login failed');
  //     }
  //   };

  //   handleSignInAndRedirect();
  // }, [server, token]);

  const { data, error } = useVerifyCredentials(server, token!);

  useEffect(() => {
    // async function fetchData() {
      // const data = await verifyCredentials(server, token!);
      // const {data} = await useVerifyCredentials(server, token!);
      // console.log('------signin data:', data);
      if (data) {
        signIn(server, token!, data);
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

