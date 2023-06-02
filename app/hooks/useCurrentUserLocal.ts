'use client';

import { useEffect, useState } from 'react';
// import getCurrentUser from '../actions/getCurrentUser';
import db, { getKV } from '../actions/db';

interface UsersObject {
  server: string;
  token: string;
  account: any;
}

const useCurrentUserLocal = () => {
    // console.log('db values[0]:', (values as MyObject[])?.[0]);

    // const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [server, setServer] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [account, setAccount] = useState<any>(null); // Add a new state variable for account
    // useEffect(() => {
    //     const fetchUser = async () => {
    //     const user = await getCurrentUser();
    //     if (!user) {
    //       return {
    //         server: null,
    //         username: null,
    //         token: null,
    //         account: null
    //       }
    //     }
    //     setCurrentUser(user);

    //     const values =  await getKV('users');
    //     
    //     const token = (values as UsersObject[])?.[0]?.token;
    //     const account = (values as UsersObject[])?.[0]?.account; // Get the account field

    //     setToken(token);
    //     setAccount(account);
    //   };
    //   fetchUser();
    // }, []);
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

              setServer(server);
              setUsername(username);
              setToken(token);
              setAccount(account);
          }
      };

      fetchUserAndToken();
    }, []);

    // const server = currentUser ? currentUser.match(/@(.*)/)?.[1] : null;
    // const username = currentUser ? currentUser.split('@')[0] : null;

    return {
        server,
        username,
        token,
        account
    }
};

export default useCurrentUserLocal;