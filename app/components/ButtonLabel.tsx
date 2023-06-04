interface ButtonProps {
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    disabled?: boolean;
    outline?: boolean;
    hideInitially?: boolean;
}

const ButtonLabel: React.FC<ButtonProps> = ({ 
    label, 
    secondary, 
    fullWidth, 
    onClick, 
    onMouseEnter,
    onMouseLeave,
    large, 
    disabled, 
    outline,
    hideInitially
  }) => {
    return ( 
      <button
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          disabled:opacity-70
          rounded-full
          font-semibold
          hover:opacity-80
          transition
          border-2
          ${fullWidth ? 'w-full' : 'w-fit'}
          ${secondary ? 'bg-white' : 'bg-sky-500'}
          ${secondary ? 'text-black' : 'text-white'}
          ${secondary ? 'border-black' : 'border-sky-500'}
          ${large ? 'text-xl' : 'text-md'}
          ${large ? 'px-5' : 'px-4'}
          ${large ? 'py-3' : 'py-2'}
          ${outline ? 'bg-transparent' : ''}
          ${outline ? 'border-white' : ''}
          ${outline ? 'text-white' : ''}
          ${hideInitially ? 'hidden' : ''}
        `}
      >
        {label}
      </button>
     );
  }
   
  export default ButtonLabel;