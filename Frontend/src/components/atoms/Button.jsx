import { useSelector } from "react-redux";
const Button = ({
  text,
  onClick,
  type = "button",
  className = "",
  useLoading = false,
  disabled = false, // Added optional disabled prop with default false
}) => {
  const loading = useSelector((state) => state.loading);
  console.log(loading);
  const isDisabled = (useLoading && loading) || disabled;
  return (
 <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        shadow 
        flex items-center justify-center
        ${className}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {useLoading && loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;