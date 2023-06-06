// 'use clinet';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import TweetForm from '../TweetForm';
import Button from '../Button';
import { HiOutlinePencil, HiOutlineXMark } from 'react-icons/hi2';

const DialogDemo = () => (
	<DialogPrimitive.Root>
		<DialogPrimitive.Trigger asChild>
			<div className="w-full flex justify-center xl:justify-start mt-5 appearance-none">
				<Button size="large">
					<HiOutlinePencil className="w-6 h-6 xl:hidden" />
					<span className="hidden xl:flex">Publish</span>
				</Button>
			</div>
		</DialogPrimitive.Trigger>
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />
			<DialogPrimitive.Content className="DialogContent bg-white px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
				<DialogPrimitive.Close asChild className="mb-4">
					<button
						className="IconButton hover:bg-slate-200 rounded-full"
						aria-label="Close"
					>
						<HiOutlineXMark className="h-5 w-5" />
					</button>
				</DialogPrimitive.Close>
				<DialogPrimitive.Title className="DialogTitle sr-only">
					Tweet
				</DialogPrimitive.Title>
				<DialogPrimitive.Description className="DialogDescription sr-only">
					Make a Tweet
				</DialogPrimitive.Description>

				<TweetForm placeholder="What's up?" width="full" />

				<DialogPrimitive.Close asChild>
          {/* <button className="Button green">Save changes</button> */}
        </DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	</DialogPrimitive.Root>
);

// const DialogDemo = () => (
// 	<Dialog.Root>
// 	  <Dialog.Trigger asChild>
// 		<button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
// 		  Edit profile
// 		</button>
// 	  </Dialog.Trigger>
// 	  <Dialog.Portal>
// 		<Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
// 		<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
// 		  <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
// 			Edit profile
// 		  </Dialog.Title>
// 		  <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
// 			Make changes to your profile here. Click save when you're done.
// 		  </Dialog.Description>
// 		  <fieldset className="mb-[15px] flex items-center gap-5">
// 			<label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
// 			  Name
// 			</label>
// 			<input
// 			  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
// 			  id="name"
// 			  defaultValue="Pedro Duarte"
// 			/>
// 		  </fieldset>
// 		  <fieldset className="mb-[15px] flex items-center gap-5">
// 			<label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
// 			  Username
// 			</label>
// 			<input
// 			  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
// 			  id="username"
// 			  defaultValue="@peduarte"
// 			/>
// 		  </fieldset>
// 		  <div className="mt-[25px] flex justify-end">
// 			<Dialog.Close asChild>
// 			  <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
// 				Save changes
// 			  </button>
// 			</Dialog.Close>
// 		  </div>
// 		  <Dialog.Close asChild>
// 			<button
// 			  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
// 			  aria-label="Close"
// 			>
// 			  <Cross2Icon />
// 			</button>
// 		  </Dialog.Close>
// 		</Dialog.Content>
// 	  </Dialog.Portal>
// 	</Dialog.Root>
// );
  

export default DialogDemo;
