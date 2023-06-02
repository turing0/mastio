import toast from "react-hot-toast";

const signOutCurrentUser = () => {
    // localStorage.setItem("current-user", '');
    // TODO: 多账户控制
    localStorage.removeItem("current-user");
    // const currentUser = localStorage.getItem("current-user")
    // toast.success('signout');
    // if (!currentUser) {
    //     return null;
    // }

    // return currentUser;
    
};

export default signOutCurrentUser;