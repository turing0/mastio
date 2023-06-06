import Link from 'next/link';
import {
	RiImage2Line,
	RiFileGifLine,
	RiChatPollLine,
	RiEmotionLine,
	RiMapPin2Line,
} from 'react-icons/ri';

import { cva } from 'class-variance-authority';
import { useCallback, useState } from 'react';
import Avatar from './radix/Avatar';
import { useCurrentUserContext } from '../context/UserProvider';
import { postWithToken } from '../libs/postWithToken';
import toast from 'react-hot-toast';
import usePosts from '../hooks/usePosts';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const TweetFormStyles = cva('flex flex-1 gap-x-2', {
	variants: {
		width: {
			default: 'p-4 border-b border-slate-200',
			full: '',
		},
	},
	defaultVariants: {
		width: 'default',
	},
});

interface FormProps {
    placeholder?: string;
    isComment?: boolean;
    postId?: string;
	width?: 'default' | 'full';
}

const TweetForm: React.FC<FormProps> = ({placeholder, isComment, postId, width}) => {
	const router = useRouter();
	const [input, setInput] = useState<string>('');
    const { server, account } = useCurrentUserContext();
    const { mutate: mutatePosts } = usePosts();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [isTextareaFocused, setTextareaFocused] = useState(false);

	const goToProfile = () => {
		router.push(`/${server}/@${account?.acct}`);
	};
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

	if (!account) {
		return <></>;
	}

	return (
		<div className={TweetFormStyles({ width })}>
			<div onClick={goToProfile} className="cursor-pointer">
				<Avatar
					src={account?.avatar!}
					alt={account?.display_name || ''}
					initials=""
				/>
			</div>
			<form className="flex flex-col flex-1 gap-y-4">
				<div className="flex flex-1">
					{/* <input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder={placeholder}
						className="w-full px-4 py-3 text-xl border-transparent placeholder:text-slate-600 outline-0 focus:outline-none appearance-none focus:ring-0 focus:border-transparent"
					/> */}
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
								event.target.style.overflow = 'auto';
							}
						}}
						// onBlur={() => setTextareaFocused(false)}
						value={status}
						className="h-12 peer overflow-hidden
						resize-none 
						w-full px-4 py-3 text-xl border-transparent placeholder:text-slate-600 outline-0 focus:outline-none appearance-none focus:ring-0 focus:border-transparent
						"
						placeholder={placeholder}>
                    </textarea>
				</div>
				{/* <div className="flex justify-between items-center"> */}
				<div className={clsx("flex justify-between items-center", {
					'hidden': !isTextareaFocused,
				})}>
					<div className="flex items-center gap-x-4 px-4">
						<Link href="/">
							<RiImage2Line className="w-5 h-5" />
							<span className="sr-only">Image</span>
						</Link>
						<Link href="/">
							<RiFileGifLine className="w-5 h-5" />
							<span className="sr-only">Gif</span>
						</Link>
						<Link href="/">
							<RiChatPollLine className="w-5 h-5" />
							<span className="sr-only">Poll</span>
						</Link>
						<Link href="/">
							<RiEmotionLine className="w-5 h-5" />
							<span className="sr-only">Emoji</span>
						</Link>
						<Link href="/">
							<RiMapPin2Line className="w-5 h-5" />
							<span className="sr-only">Tag location</span>
						</Link>
					</div>
					<div>
						<button
							disabled={isLoading || !status.trim()}
							className="inline-flex items-center font-bold rounded-full border px-4 py-2 text-sm bg-slate-900 text-white border-transparent disabled:opacity-50 transition-opacity duration-200"
						>
							{isComment ? "Reply" : "Publish"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TweetForm;
