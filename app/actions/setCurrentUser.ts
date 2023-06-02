
const setCurrentUser = (user: string) => {
    localStorage.setItem("current-user", user);
    const currentUser = localStorage.getItem("current-user")

    if (!currentUser) {
        return null;
    }

    return currentUser;
};

export default setCurrentUser;