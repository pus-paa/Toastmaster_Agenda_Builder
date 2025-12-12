
interface ButtonFieldProps{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}


const Button=({
    type = "button",
    disabled = false,
    className,
    onClick,
    children,
}: ButtonFieldProps) => {
    return(
        <div>
            <button
                type={type}
                disabled={disabled}
                className={className}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}