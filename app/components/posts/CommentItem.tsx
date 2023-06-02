import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { useCurrentUserContext } from "@/app/context/UserProvider";

interface CommentItemProps {
    data: Record<string, any>;
    server?: string;
  }
  
  const CommentItem: React.FC<CommentItemProps> = ({ data = {}, server }) => {
    const router = useRouter();
    const { server: currentServer, account: currentUser } = useCurrentUserContext();
    if (!server) {
        server = currentServer!;
    }
  
    const goToUser = useCallback((ev: any) => {
      ev.stopPropagation();
  
      router.push(`/${server}/@${data?.account?.acct}`)
    }, [router, data, server]);
  
    const createdAt = useMemo(() => {
      if (!data?.created_at) {
        return null;
      }
  
      return formatDistanceToNowStrict(new Date(data?.created_at));
    }, [data])
  
    return (
      <div 
        className="
          border-b-[1px] 
          border-neutral-800 
          p-5 
          cursor-pointer 
          hover:bg-neutral-900 
          transition
        ">
        <div className="flex flex-row items-start gap-3">
          {/* <Avatar userId={data.account.acct} src={data.account.avatar} server={server} /> */}
          <div style={{ width: '50px', height: '50px', overflow: 'hidden', flexShrink: 0 }}>
                    <Avatar server={server} userId={data?.account?.acct} src={data?.account?.avatar} />
                </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              <p 
                onClick={goToUser} 
                className="
                  text-white 
                  font-semibold 
                  cursor-pointer 
                  hover:underline
              ">
                {data.account.display_name}
              </p>
              <span 
                onClick={goToUser} 
                className="
                  text-neutral-500
                  cursor-pointer
                  hover:underline
                  hidden
                  md:block
              ">
                @{data.account.acct}
              </span>
              <span className="text-neutral-500 text-sm">
                {createdAt}
              </span>
            </div>
            <div className="text-white mt-1">
              {/* {data.content} */}
              <div dangerouslySetInnerHTML={{ __html: data?.content }} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default CommentItem;