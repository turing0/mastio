'use client'

// import { signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import Input from "../Input";
import Modal from "../Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface MyObject {
    server: string;
    token: string;
    // add any other properties here
}

// async function saveKV(key: string, value: object[]) {
//     try {
//         await db.kv.put({ key, value });
//     } catch (error) {
//         console.error(error);
//     }
// }

const LoginModal = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // signIn('credentials', {
    //     email,
    //     password
    // })
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         console.log('browser...');
    //         const fetchSession = async () => {
    //             // const session = await getSession();
    //             const values =  await getKV('users');
    //             // const jsonArray: object[] | null = JSON.parse(values);
    //             // const jsonArray = JSON.parse(value);
    //             console.log('db values:', (values as MyObject[]));
    //         };
            
    //         fetchSession();
    //     }
    // }, []);

    const loginModal = useLoginModal();

    const router = useRouter();

    const [server, setServer] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            if (!server) {
                return;
            }
            setIsLoading(true);
            // await signIn('credentials', {
            //     email,
            //     password,
            // });
            
            const response = await axios.post('/api/auth', {
                server
            }, {
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            // console.log(response.data);
            router.push(response.data);

            // signIn('credentials', { 'url': server, 'accessToken': '123456' });
            
            toast.loading('Signing in...');
        
            loginModal.onClose();
        } catch (error) {
            toast.error('Server unavailable');
            console.log(error)
        } finally {
          setIsLoading(false);
        }
    }, [server, loginModal, router]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            {/* <h3 className="text-white">Mastodon Server Address</h3> */}
            <Input 
                onChange={(e) => setServer(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit();
                    }
                }}
                value={server!}
                label="Mastodon Server Address"
                disabled={isLoading}  
            />
            {/* <Input 
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading} 
            /> */}
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Don&apos;t have a Mastodon account?&nbsp; 
                {/* <span 
                onClick={onToggle} 
                className="
                    text-white 
                    cursor-pointer 
                    hover:underline
                "
                > pick a server and register one</span> */}
                <a 
                    href="https://joinmastodon.org/servers" 
                    target="_blank"
                    className="
                        text-white 
                        cursor-pointer 
                        hover:underline
                ">
                    Pick a server and register one
                </a>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Sign in"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;