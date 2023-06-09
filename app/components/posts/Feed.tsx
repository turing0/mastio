import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { Suspense } from 'react';
import Post from './Post';
import usePosts from '../../hooks/usePosts';
import InfiniteScroll from 'react-infinite-scroll-component';

interface PostItem {
	name: string;
	username: string;
	content: string;
	description: string;
	date: string;
	src: string;
	following: string;
	followers: string;
	initials: string;
	image?: ReactNode;
}

const items: PostItem[] = [
	{
		name: 'Jane Doe',
		username: 'janedoe',
		following: '249',
		followers: '663',
		content: 'Design and build templates',
		description:
			'Improve your design skills by making projects. 1 every week, practice with me on Youtube. I use Figma, Tailwind CSS and Webflow.',
		date: '1h',
		src: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
		image: (
			<div className="w-full relative -z-10 h-80 mb-4">
				<Image
					fill={true}
					style={{ objectFit: 'cover' }}
					className="rounded-3xl"
					src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
					alt="Gradient"
				/>
			</div>
		),
	},
	{
		name: 'John Doe',
		username: 'johndoe',
		following: '138',
		followers: '2,218',
		content: 'I love Figma',
		description: 'I design and hug auto layout everyday',
		date: '2h',
		src: 'https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
];

interface PostFeedProps {
	server?: string;
	userId?: string;
	type?: string;
}

const Feed: React.FC<PostFeedProps> = ({ server, userId, type }) => {
	const [maxId, setMaxId] = useState<string | undefined>(undefined);
	const [allPosts, setAllPosts] = useState([]);
	const { data: posts = [] } = usePosts(server, userId, type, maxId);
	const [hasMoreData, setHasMoreData] = useState(true);

    const fetchMoreData = () => {
        if (posts.length > 0) {
            const lastPostId = posts[posts.length - 1].id;
			setMaxId(lastPostId);
        } else {
			setHasMoreData(false);
		}
    };
	useEffect(() => {
		setAllPosts(allPosts.concat(posts));
	}, [JSON.stringify(posts)]);

	return (
		<InfiniteScroll
            dataLength={allPosts.length}
            next={fetchMoreData}
            hasMore={hasMoreData}
            // loader={Loading()}
			loader={hasMoreData || posts.length > 0 ? Loading() : null}
        >
		<Suspense fallback={<Loading />}>
			<ul className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-slate-200">
				{allPosts.map((post: Record<string, any>, index: number) => (
						<li key={index} className="p-4 hover:bg-gray-100 transition">
							<Post
								data={post}
								server={server}
								statusId={post.id}
							>
								<div style={{ 
									display: 'flex', 
									flexWrap: 'wrap', 
									justifyContent: 'space-between' 
								}}>
								{
									post?.media_attachments?.length > 0 && post?.media_attachments.map((attachment: { preview_url: string }, id: number) => (
									<div key={id} style={{ 
										flexBasis: post?.media_attachments.length === 1 ? '100%' : 'calc(50% - 10px)',  // 如果只有一张图片，占100%宽度，否则占50%宽度减去左右间距
										margin: '5px',  // 上下左右的间距都为5px
										height: post?.media_attachments.length === 1 ? '400px' : '300px',  // 如果只有一张图片，高度为600px，否则为300px
										overflow: 'hidden'  // 如果图片超出容器，将其隐藏
									}}>
										<img
										style={{ 
											objectFit: 'cover',
											width: '100%',
											height: '100%'
										}}
										className="rounded-3xl"
										src={attachment.preview_url}
										alt={``}
										/>
									</div>
									))
								}
								</div>

							</Post>
						</li>
					),
				)}
			</ul>
			{!hasMoreData && <p>Reached the end</p>} {/* Display "Reached the end" when there is no more data */}
		</Suspense>
		</InfiniteScroll>
	)
}

export default Feed;

function Loading() {
	return <h2 className="flex justify-center items-center">Loading...</h2>;
}
