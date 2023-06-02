'use client';

import Header from './components/Header'
import Form from './components/Form'
import PostFeed from './components/posts/PostFeed'
import { useCurrentUserContext } from './context/UserProvider';
// import { useEffect, useState } from 'react';
// import getCurrentUser from './actions/getCurrentUser';
// import { useRouter } from 'next/navigation';



// export default function Home({ currentUser }: { currentUser: any }) {
export default function Home() {
  const defaultServer = "mstdn.social";

  const {account: currentUser} = useCurrentUserContext();
  // const currentUser = getCurrentUser();
  // const [isCurrentUserFetched, setIsCurrentUserFetched] = useState(false);

  // useEffect(() => {
  //   setIsCurrentUserFetched(true);
  // }, [currentUser]);
  // const router = useRouter();

  if (!currentUser) {
    console.log('go to default server');
    // router.push(`/${defaultServer}/public/local`);
  }
  
  return (
    <>
      <Header label='Home' />
      <Form placeholder="Inspire and be inspired..." />
      <PostFeed type='home'/>
    </>
  )
}

// export const metadata: Metadata = {
//   // title: 'Mastio',
//   title: {
//     default: 'Mastio',
//     template: '%s | Mastio',
//   },
//   description: 'A Mastodon Web Client',
// }