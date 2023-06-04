'use client';

import Header from './components/Header'
import Tabs from './components/radix/Tabs'
import PanelItemTrends from './components/PanelItemTrends'
import { useCurrentUserContext } from './context/UserProvider'

export default function Home() {
  const defaultServer = "mstdn.social";

  const {account: currentUser} = useCurrentUserContext();

  if (!currentUser) {
    console.log('go to default server');
    // router.push(`/${defaultServer}/public/local`);
  }
  
  return (
    <>
		<title>Home | Mastio</title>
		
		<Header title="Home" />
		<Tabs />
    </>
  )
}
