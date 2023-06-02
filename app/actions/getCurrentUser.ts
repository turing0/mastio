// 'use client';

const getCurrentUser = () => {
    const currentUser = localStorage.getItem("current-user")

    return currentUser;
};

export default getCurrentUser;