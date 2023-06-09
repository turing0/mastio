'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import TweetForm from '../TweetForm';
import Feed from '../posts/Feed';

type TabsProps = {
    server: string;
}

const Tabs = ({ server }: TabsProps) => (
	<TabsPrimitive.Root className="TabsRoot" defaultValue="tab1">
		<TabsPrimitive.List
			className="TabsList flex w-full bg-white border-b border-b-slate-200"
			aria-label="Manage your account"
		>
			<TabsPrimitive.Trigger
				value="tab1"
				className={clsx(
					'TabsTrigger group hover:bg-slate-100',
					'radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-6 font-semibold text-slate-500',
					'focus:radix-state-active:border-b-red',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="py-4 relative h-full ">
					<div>For you</div>
					<span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>
			<TabsPrimitive.Trigger
				value="tab2"
				className={clsx(
					'TabsTrigger group hover:bg-slate-100',
					'radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-6 font-semibold text-slate-500',
					'focus:radix-state-active:border-b-red',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="py-4 relative h-full ">
					<div>Following</div>
					<span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>
			<TabsPrimitive.Trigger
				value="tab3"
				className={clsx(
					'TabsTrigger group hover:bg-slate-100',
					'radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-6 font-semibold text-slate-500',
					'focus:radix-state-active:border-b-red',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="py-4 relative h-full ">
					<div>Niche</div>
					<span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>
		</TabsPrimitive.List>
		<TabsPrimitive.Content value="tab1" className="TabsContent ">
			<TweetForm width="default" />
			<Feed server={server} type="home" />
		</TabsPrimitive.Content>
		<TabsPrimitive.Content value="tab2" className="TabsContent ">
		</TabsPrimitive.Content>
		<TabsPrimitive.Content value="tab3" className="TabsContent ">
		</TabsPrimitive.Content>
	</TabsPrimitive.Root>
);

export default Tabs;
