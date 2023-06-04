'use client';

import Header from './components/Header'
import { useCurrentUserContext } from './context/UserProvider'
import TweetForm from './components/TweetForm';
import Feed from './components/posts/Feed';

export default function Home() {
  const {server, account: currentUser} = useCurrentUserContext();

  if (!server || !currentUser) {
    console.log('go to default server');
    return <></>
    // router.push(`/${defaultServer}/public/local`);
  }
  
  return (
    <>
		<title>Home | Mastio</title>
		
		<Header title="Home" />
    <TweetForm placeholder="What's up?" width="default" />
    <Feed server={server} type="home" />
		{/* <Tabs server={server} /> */}
    </>
  )
}
