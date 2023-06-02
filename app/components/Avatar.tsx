import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

// import useUser from "@/hooks/useUser";

interface AvatarProps {
  src: string;
  server: string;
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, server, userId, isLarge, hasBorder }) => {
    const router = useRouter();
    // const [userData, setUserData] = useState(null);
    const onClick = useCallback((event: any) => {
        event.stopPropagation();
    
        const url = `/${server}/@${userId}`;
        router.push(url);
      }, [router, userId, server]);
    
    // if (!currentUser) {
    // return <div>Loading...</div>;
    // }

    // const { username, avatar_static } = userData;
  
    return (
      <div
        className={`
          ${hasBorder ? 'border-4 border-black' : ''}
          ${isLarge ? 'h-32' : 'h-12'}
          ${isLarge ? 'w-32' : 'w-12'}
          rounded-full 
          hover:opacity-90 
          transition 
          cursor-pointer
          relative
        `}
      >
        {/* <Image */}
        <img
          style={{
            objectFit: 'cover',
            borderRadius: '100%',
            width: '100%',
            height: '100%',
          }}
          onClick={onClick}
          // src={currentUser.avatar_static || '/images/placeholder.png'}
          src={src}
        />
      </div>
    );
  }

export default Avatar;