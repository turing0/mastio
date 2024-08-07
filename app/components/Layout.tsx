"use client";

import Footer from "./Footer";
import Nav from "./layout/Nav";
import Panel from "./Panel";
import PanelItem from "./PanelItem";
import PanelItemTrends from "./PanelItemTrends";
import Search from "./layout/Search";
import { useEffect, useState } from "react";

export interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    children
}) => {
	const [hideMessage, setHideMessage] = useState<boolean>(true);
	useEffect(() => {
		const storedValue = localStorage.getItem('hideMsg0722');
		setHideMessage(storedValue?true:false);
	  }, []);
    // const hideMessage = localStorage.getItem('hideMsg0722');
	const nCount = hideMessage? 0:1

    return (
        <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
			<Nav notificationCount={nCount} />

			<main className="col-span-5 w-full border-x border-slate-200">
                {children}
			</main>
			
			<aside className="col-span-3 hidden xl:flex flex-col w-[350px]">
				<div className="sticky top-0">
					<Search />
					<Panel title="What's happening" href="/">
						<PanelItemTrends
							title="Next JS"
							category="Development"
							stat="57.5K"
						/>
						<PanelItemTrends title="Figma" category="Design" stat="107.5K" />
						<PanelItemTrends
							title="Webflow"
							category="Design"
							stat="127.5K"
						/>
						<PanelItemTrends
							title="Tailwind CSS"
							category="Development"
							stat="87.5K"
						/>
						<PanelItemTrends
							title="Vercel"
							category="Development"
							stat="27.5K"
						/>
					</Panel>
					<Panel title="Who to follow" href="/">
						<PanelItem
							src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjd8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
							name="Charles Deluvio"
							username="charlesdeluvio"
							initials="CD"
						/>
						<PanelItem
							src="https://images.unsplash.com/photo-1613951085587-cfe5d0a6cffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
							name="Tolga Ulkan"
							username="tolgaulkan"
							initials="TU"
						/>
						<PanelItem
							src="https://images.unsplash.com/photo-1614777735430-7b46df56b404?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3OTAyNDY1Mnx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
							name="Rob Potter"
							username="robpotter"
							initials="RB"
						/>
					</Panel>
					<Footer />
				</div>
			</aside>
		</div>

        // <div className="h-screen bg-black">
        //     <div className="container h-full mx-auto xl:px-30 mx-w-6xl">
        //         <div className="grid grid-cols-4 h-full">
        //             <Sidebar />
        //             <div className="
        //                 col-span-3
        //                 lg:col-span-2
        //                 border-x-[1px]
        //                 border-neutral-800
        //             "
        //             >
        //                 {children}
        //             </div>
        //             {/* <FollowBar /> */}
        //         </div>
                
        //     </div>
            
        // </div>
    )
}

export default Layout;