// import Avatar from "../Avatar";
import useUser from "@/app/hooks/useUser";
import Avatar from "../Avatar";

interface UserHeroProps {
    server: string;
    username: string;
}

const UserHero: React.FC<UserHeroProps> = ({
    server,
    username 
  }) => {
    const { data: fetchedUser } = useUser(server, username);
    
    return ( 
      <div>
        <div className="bg-neutral-700 h-44 relative">
          {fetchedUser?.header && (
            <img src={fetchedUser.header} alt="Header Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
          )}
          <div className="absolute -bottom-16 left-4">
            <Avatar server={server} src={fetchedUser?.avatar} userId={fetchedUser?.acct} isLarge hasBorder />
          </div>
        </div>
      </div>
     );
  }

export default UserHero;