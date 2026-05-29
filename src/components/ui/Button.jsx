/**
 * Button — Reusable button component
 * Props:
 *  variant  : "primary" | "secondary" | "danger" | "ghost" | "outline"
 *  size     : "sm" | "md" | "lg"
 *  loading  : boolean
 *  disabled : boolean
 *  icon     : ReactNode (left icon)
 *  iconRight: ReactNode (right icon)
 *  fullWidth: boolean
 *  onClick  : fn
 *  children : ReactNode
 */

const variantStyles = {
  primary:
    "bg-hijau text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-sm shadow-emerald-200 border border-hijau",
  secondary:
    "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 border border-gray-200",
  danger:
    "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 shadow-sm shadow-rose-200 border border-rose-500",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200 border border-transparent",
  outline:
    "bg-transparent text-hijau hover:bg-green-50 active:bg-green-100 border border-hijau",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
  md: "px-4 py-2 text-sm gap-2 rounded-xl",
  lg: "px-5 py-2.5 text-[15px] gap-2 rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-150 cursor-pointer select-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {!loading && iconRight && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </button>
  );
}