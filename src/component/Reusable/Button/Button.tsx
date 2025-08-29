import { twMerge } from "tailwind-merge";

interface ReusableButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  onClick?: () => void;
  classNames?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

const Button: React.FC<ReusableButtonProps> = ({
  label,
  variant = "secondary",
  onClick,
  classNames = "",
  type = "button",
  isLoading = false,
}) => {
  const baseClasses =
    "text-[15px] leading-[18px] font-Montserrat -tracking-[0.16px] rounded-lg font-semibold flex items-center gap-2 justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 px-4 py-4 cursor-pointer";

  const variantClasses =
    variant === "primary"
      ? "bg-primary-10 text-white border-transparent"
      : variant === "secondary"
      ? "border-2 border-primary-10 text-primary-10 bg-transparent hover:bg-primary-10 hover:text-white"
      : variant === "tertiary"
      ? "text-primary-15 bg-transparent py-4 px-8"
      : variant === "disabled"
      ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || variant === "disabled"}
      className={twMerge(
        `${baseClasses} ${variantClasses}`,
        (isLoading || variant === "disabled") &&
          "cursor-not-allowed opacity-70 hover:scale-100 active:scale-100",
        classNames
      )}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
