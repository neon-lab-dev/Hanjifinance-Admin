import { twMerge } from "tailwind-merge";

interface ReusableButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "disabled" ;
  onClick?: () => void;
  classNames?: string;
  type?: "button" | "submit" | "reset"; // ✅ added type
}

const Button: React.FC<ReusableButtonProps> = ({
  label,
  variant = "secondary",
  onClick,
  classNames = "",
  type = "button", // ✅ default to "button"
}) => {
  const baseClasses =
    "text-[15px] leading-[18px] font-Montserrat -tracking-[0.16px] rounded-lg font-semibold cursor-pointer flex items-center gap-1 justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 px-4 py-4";

  const variantClasses =
    variant === "primary"
      ? "bg-primary-20 text-white border-transparent px-4 py-4"
      : variant === "secondary"
      ? "border-2 border-primary-20 text-primary-20 bg-transparent px-4 py-[10px] hover:bg-primary-20 hover:text-white":variant === "tertiary"
      ? "text-primary-15 bg-transparent py-4 px-8": variant === "disabled"  ?"":"";

  return (
    <button
      type={type} // ✅ applied here
      onClick={onClick}
      className={twMerge(`${baseClasses} ${variantClasses}`, classNames)}
    >
      {label}
    </button>
  );
};

export default Button;
