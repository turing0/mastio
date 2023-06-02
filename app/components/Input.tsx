import { useState } from "react";

interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    // onKeyDown: () => void;
    label?: string;
  }
  
const Input: React.FC<InputProps> = ({ placeholder, value, type = "text", onChange, onKeyDown, disabled, label }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full">
            {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
            {/* <div className="flex items-center bg-black border-2 border-neutral-800 rounded-md"> */}
            <div className={`flex items-center bg-black border-2 rounded-md ${isFocused ? 'border-sky-500' : 'border-neutral-800'}`}>
            {/* <span className="text-lg text-neutral-400 p-4">https://</span> */}
            <span className="text-lg text-neutral-400 pl-4 pr-0">https://</span>
            <input
                disabled={disabled}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value}
                placeholder={placeholder}
                type={type}
                className="
                    w-full
                    pt-4 pr-4 pb-4 pl-2
                    text-lg 
                    bg-black 
                    border-neutral-800 
                    rounded-md
                    outline-none
                    text-white

                    transition
                    disabled:bg-neutral-900
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                "
            />
            </div>
        </div>
    );
}

export default Input;