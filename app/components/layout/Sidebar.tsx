import { BsBellFill, BsHouseFill, BsListUl } from 'react-icons/bs'; 
import { FaBookmark, FaCompass, FaUser, FaUsers } from 'react-icons/fa'; 
import { BiLogIn, BiLogOut, BiWorld, BiBookmark } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md'; 
import { IoMdBookmark } from 'react-icons/io'; 

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';

import SidebarTweetButton from './SidebarTweetButton';
import signOutCurrentUser from '@/app/actions/signOutCurrentUser';
import { useCurrentUserContext } from '@/app/context/UserProvider';

const Sidebar = () => {
    // let userServer = null;
    // if (currentUser) {
    //     userServer = currentUser?.url.split(/\/@/)[0].slice(8); 
    // }

    // const [currentU, setCurrentU] = useState<string | null>(null);
    // useEffect(() => {
    //     const fetchSession = async () => {
    //         console.log(`call sotre post`);
    //         const clientId = 'my-client-id';
    //         setRedisKey('TestKey', '123456');
    //     };
    
    //     fetchSession();
    // }, []);

    // const server = currentU ? currentU.match(/@(.*)/)?.[1] : null;
    // const username = currentU ? currentU.split('@')[0] : null;
    const defaultServer = "mstdn.social";
    const HOSTURL = process.env.HOST_URL;
    // const { server, username } = useCurrentUserLocal();
    const { server, username, signOut } = useCurrentUserContext();
    // console.log('Sidebar useCurrentUserContext:', username, server);
    // console.log('HOSTURL:', HOSTURL);
    // addKV('users', {server: 'xmc.im', acct: {id: '1234'}});
    // deleteFirstKV('users');
    const items = [
        {
            label: 'Home',
            icon: BsHouseFill,
            href: '/',
            auth: true,
        },
        {
            icon: BsBellFill,
            label: 'Notifications',
            href: '/notifications',
            auth: true,
            // alert: currentUser?.hasNotification
        },
        {
            icon: FaUser,
            label: 'Profile',
            // href: `/${userServer}/@${currentUser?.username}`,
            // href: userServer ? `/${userServer}/@${currentUser?.username}` : "/",
            href: server&&username ? `/${server}/@${username}` : "/",
            auth: true,
        },
        {
            icon: FaCompass,
            label: 'Explore',
            href: `/${server ? server : defaultServer}/explore`,
            // auth: true,
        },
        {
            icon: FaUsers,
            label: 'Local',
            href: `/${server ? server : defaultServer}/public/local`,
            // auth: true,
        },
        {
            icon: BiWorld,
            label: 'Federated',
            href: `/${server ? server : defaultServer}/public`,
            // auth: true,
        },
        {
            icon: MdFavorite,
            label: 'Favorites',
            href: `/favorites`,
            auth: true,
        },
        {
            icon: IoMdBookmark,
            label: 'Bookmarks',
            href: `/bookmarks`,
            auth: true,
        },
        {
            icon: BsListUl,
            label: 'Lists',
            href: `/lists`,
            auth: true,
        },
    ]
    
    const handleSignOut = () => {
        signOutCurrentUser();
        // signOut();
        return 
    }
    
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">    
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            // alert={item.alert}
                            auth={item.auth}
                            href={item.href} 
                            icon={item.icon} 
                            label={item.label}
                      />
                    ))}
                    {/* {currentUser && (
                        <SidebarItem onClick={signOutCurrentUser} icon={BiLogOut} label="Logout" />
                    )} */}
                    {/* {!server && (
                        <SidebarItem onClick={() => signIn('credentials', {'url': '123@mail.com', 'accessToken': '123456'})} icon={BiLogIn} label="SignIn" />
                    )} */}
                    {/* <p className='text-sky-500'>{server}</p> */}
                    {/* <p className='text-sky-500'>{session?.accessToken}</p> */}
                        
                    {server && (
                        // <SidebarItem onClick={handleSignOut} icon={BiLogOut} label="Sign out" />
                        <SidebarItem onClick={signOut} icon={BiLogOut} label="Sign out" />
                    )}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
