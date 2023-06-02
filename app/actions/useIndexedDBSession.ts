// import { Session } from "next-auth";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import db from "./db";

// async function getSessionFromDB(): Promise<Session | undefined> {
//     // 打开 IndexedDB 数据库
//     const db = await openDB<MyDB>('my-db', 1, {
//       upgrade(db) {
//         db.createObjectStore('sessions');
//       },
//     });
  
//     // 从数据库中获取 session
//     return db.get('sessions', 'current');
// }

// async function getSession(): Promise<Session> {
//     // 尝试从 IndexedDB 获取 session
//     let session = await getSessionFromDB();
  
//     // 如果获取失败，从服务器获取
//     if (!session) {
//     //   session = await fetchSession();
//       const { data: session, status } = useSession();
//       await updateSessionInDB(session?.server, session?.accessToken);
//     }
  
//     return session;
// }

// export default function useIndexedDBSession() {
//     const [session, setSession] = useState<Session | null>(null);
  
//     useEffect(() => {
//       async function getSessionAndSetState() {
//         const session = await getSession();
//         setSession(session);
//       }
  
//       getSessionAndSetState();
//     }, []);
  
//     return session;
// }