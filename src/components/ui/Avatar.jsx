/**
 * Avatar — Foto profil / inisial
 * Props:
 *  src    : string (URL gambar)
 *  name   : string (untuk fallback inisial)
 *  size   : "xs" | "sm" | "md" | "lg" | "xl"
 *  status : "online" | "offline" | "busy" | null
 *  shape  : "circle" | "square"
 */

const sizeStyles = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

const statusStyles = {
  online:  "bg-emerald-400",
  offline: "bg-gray-300",
  busy:    "bg-rose-400",
};

const statusSize = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-3.5 h-3.5",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function getColorFromName(name = "") {
  const colors = [
    "bg-emerald-500", "bg-blue-500", "bg-purple-500",
    "bg-rose-500", "bg-amber-500", "bg-teal-500",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx] ?? "bg-gray-400";
}

export default function Avatar({
  src,
  name = "User",
  size = "md",
  status = null,
  shape = "circle",
  className = "",
}) {
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeStyles[size]} ${shapeClass} object-cover ring-2 ring-white`}
        />
      ) : (
        <div
          className={`${sizeStyles[size]} ${shapeClass} ${getColorFromName(name)}
            flex items-center justify-center font-bold text-white ring-2 ring-white`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSize[size]} ${statusStyles[status]}
            rounded-full ring-2 ring-white`}
        />
      )}
    </div>
  );
}