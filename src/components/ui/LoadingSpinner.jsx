/**
 * LoadingSpinner — Indikator loading
 * Props:
 *  size    : "sm" | "md" | "lg" | "xl"
 *  color   : "green" | "blue" | "gray" | "white"
 *  label   : string
 *  fullPage: boolean (overlay seluruh halaman)
 *  variant : "spin" | "dots" | "pulse"
 */

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const colorMap = {
  green: "text-hijau",
  blue:  "text-blue-500",
  gray:  "text-gray-400",
  white: "text-white",
};

function SpinnerIcon({ size, color }) {
  return (
    <svg
      className={`animate-spin ${sizeMap[size]} ${colorMap[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  );
}

function DotsIcon({ color }) {
  return (
    <div className={`flex items-center gap-1.5 ${colorMap[color]}`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function PulseIcon({ color }) {
  return (
    <div className={`relative ${sizeMap["md"]}`}>
      <span className={`absolute inset-0 rounded-full bg-current opacity-30 animate-ping ${colorMap[color]}`}/>
      <span className={`relative block w-full h-full rounded-full bg-current ${colorMap[color]}`}/>
    </div>
  );
}

export default function LoadingSpinner({
  size = "md",
  color = "green",
  label,
  fullPage = false,
  variant = "spin",
}) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      {variant === "spin"  && <SpinnerIcon size={size} color={color} />}
      {variant === "dots"  && <DotsIcon color={color} />}
      {variant === "pulse" && <PulseIcon color={color} />}
      {label && (
        <p className={`text-sm font-medium ${colorMap[color]} opacity-80`}>{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
        {content}
      </div>
    );
  }

  return content;
}