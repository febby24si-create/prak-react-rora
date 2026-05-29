/**
 * Badge — Label status kecil
 * Props:
 *  variant : "success" | "danger" | "warning" | "info" | "neutral" | "purple"
 *  dot     : boolean  (tampilkan titik status)
 *  size    : "sm" | "md"
 */

const variantStyles = {
  success: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  danger:  "bg-rose-100 text-rose-700 ring-rose-200",
  warning: "bg-amber-100 text-amber-700 ring-amber-200",
  info:    "bg-blue-100 text-blue-700 ring-blue-200",
  neutral: "bg-gray-100 text-gray-600 ring-gray-200",
  purple:  "bg-purple-100 text-purple-700 ring-purple-200",
};

const dotColors = {
  success: "bg-emerald-500",
  danger:  "bg-rose-500",
  warning: "bg-amber-500",
  info:    "bg-blue-500",
  neutral: "bg-gray-400",
  purple:  "bg-purple-500",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "neutral",
  dot = false,
  size = "md",
  className = "",
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full ring-1
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}