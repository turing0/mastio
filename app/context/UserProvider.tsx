"use client";

// import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addKV, deleteFirstKV, getKV } from "../libs/db";

interface UsersObject {
    server: string;
    token: string;
    account: any;
}

interface Account {
    id: string;
    username: string;
    acct: string;
    display_name: string;
    locked: boolean;
    bot: boolean;
    url: string;
    avatar: string;
    // 其他属性...
}

export interface AuthContextProps {
  children: React.ReactNode;
}

const UserContext = createContext({
    server: null,
    token: null,
    username: null as string | null,
    account: null as Account | null,
    // currentUser: null,
    // setCurrentUser: () => {},
    loading: true,
    signIn: (server: string, token: string, account: Account) => {},
    signOut: () => {}
});

export default function UserProvider({ 
  children
}: AuthContextProps) {
    // const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [server, setServer] = useState<any>(null);
    const [username, setUsername] = useState<string | null>(null);
    // const [token, setToken] = useState<string | null>(null);
    const [token, setToken] = useState<any>(null);
    const [account, setAccount] = useState<Account | null>(null);

    // useEffect(() => {
    //     // const user = localStorage.getItem('user');
    //     // const user = useCurrentUserLocal();

    //     // if (user) {
    //     //   setCurrentUser(JSON.parse(user));
    //     // }
    //     async function loadUserData() {
    //         const user = getCurrentUser();
    //         if (user) {
    //             const {server, token, username, account} = useCurrentUserLocal();
    //             if (account) {
    //                 setServer(server);
    //                 setUsername(username);
    //                 setToken(token);
    //                 setAccount(account);
    //             }
    //         }
    //         setLoading(false)
    //     }
    //     loadUserData()
    //   }, []);
      useEffect(() => {
        const fetchUserAndToken = async () => {
            // const user = await getCurrentUser();
            // setCurrentUser(user);
  
            const values = await getKV('users');
  
            if (values) {
                // TODO: 查找具体的用户
                const server = (values as UsersObject[])?.[0]?.server;
                const username = (values as UsersObject[])?.[0]?.account?.username;
                const token = (values as UsersObject[])?.[0]?.token;
                const account = (values as UsersObject[])?.[0]?.account;
                if (token) {
                    setServer(server);
                    setUsername(username);
                    setToken(token);
                    setAccount(account);
                }
                
            }
            setLoading(false);
        };
  
        fetchUserAndToken();
      }, []);

      const signIn = (server: string, token: string, account: Account) => {
        // const { data: token } = await api.post('auth/login', { email, password })
        if (server && account) {
            // setCurrentUser(`${data.username}@${server}`);
            addKV('users', { server, token, account });
            setServer(server);
            setUsername(account.username);
            setToken(token);
            setAccount(account);
        }
    }

    const signOut = () => {
        deleteFirstKV('users');
        setServer(null);
        setUsername(null);
        setToken(null);
        setAccount(null);
        router.push('/');
        // setUser(null)
        // window.location.pathname = '/login'
    }

//   return <SessionProvider>{children}</SessionProvider>;
  return (
    <UserContext.Provider value={{ server, token, username, account: account as Account | null, loading, signIn, signOut }}>
        {children}
    </UserContext.Provider>
  );
}

// 创建一个自定义Hook，用于在子组件中获取用户状态
export function useCurrentUserContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useCurrentUserContext must be used within a UserProvider');
    }
    return context;
}