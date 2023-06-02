'use client';

import { useCallback, useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import toast from "react-hot-toast";
import Avatar from "./Avatar";
import Button from "./Button";
import { useCurrentUserContext } from "../context/UserProvider";
import { postWithToken } from "../actions/postWithToken";
import usePosts from "../hooks/usePosts";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
    const loginModal = useLoginModal();

    // const { server, account: currentUser } = useCurrentUserLocal();
    const { server, account: currentUser } = useCurrentUserContext();
    const { mutate: mutatePosts } = usePosts();

    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTextareaFocused, setTextareaFocused] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
          setIsLoading(true);
    
          const url = isComment ? `${server}/api/v1/comments?postId=${postId}` : `https://${server}/api/v1/statuses`;
    
          await postWithToken(url, { 
            language: "en",
            media_ids: [],
            sensitive: false,
            spoiler_text: "",
            status,
            visibility: "public"
        });
    
          toast.success('Tweet created');
          setStatus('');
          mutatePosts();
        //   mutatePost();
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      }, [status, isComment, postId, mutatePosts, server]);

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4">
                <div>
                    <Avatar server={server!} userId={currentUser?.acct} src={currentUser?.avatar} />
                </div>
                <div className="w-full">
                    <textarea
                    disabled={isLoading}
                    onChange={(event) => {
                        setStatus(event.target.value);
                        event.target.style.height = 'auto';
                        event.target.style.height = event.target.scrollHeight + 'px';
                    }}
                    onFocus={(event) => {
                        if (!isTextareaFocused) {
                            setTextareaFocused(true)
                            event.target.style.height = "120px"
                            event.target.style.minHeight = "120px"
                            event.target.style.maxHeight = "500px"
                        }
                    }}
                    // onBlur={() => setTextareaFocused(false)}
                    value={status}
                    className="
                        disabled:opacity-80
                        peer
                        resize-none 
                        h-12
                        mt-3 
                        w-full 
                        bg-black 
                        ring-0 
                        outline-none 
                        text-[20px] 
                        placeholder-neutral-500 
                        text-white
                        overflow-hidden
                    "
                    placeholder={placeholder}>
                    </textarea>
                    <hr 
                        className="
                            opacity-0 
                            peer-focus:opacity-100 
                            h-[1px] 
                            w-full 
                            border-neutral-800 
                            transition"
                    />
                    <div className="mt-4 flex flex-row justify-end">
                        <Button disabled={isLoading || !status.trim()} onClick={onSubmit} label="Publish!" hideInitially={!isTextareaFocused} />
                    </div>
                </div>
                </div>
            ) : (
                <div></div>
                // <div className="py-8">
                // <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Mastio</h1>
                // <div className="flex flex-row items-center justify-center gap-4">
                //     <Button label="Login" onClick={loginModal.onOpen} />
                // </div>
                // </div>
            )}
        </div>
    );
}

export default Form;