import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginButton = () => {
    const loginModal = useLoginModal();

    const onClick = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal]);

    return (
        // <Button>
        //     Sign In
        // </Button>
        <div onClick={onClick}>
           <div className="
                    px-4
                    py-2
                    rounded-full
                    bg-sky-500
                    hover:bg-opacity-90 
                    cursor-pointer
                    transition
                "
            >
                <p 
                    className="
                        text-center
                        font-semibold
                    "
                >
                    Sign In
                </p>
           </div>
        </div>
    )
}

export default LoginButton;