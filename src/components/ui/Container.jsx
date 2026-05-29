/**
 * Container — Wrapper layout dengan padding konsisten
 * Props:
 *  maxWidth : "sm" | "md" | "lg" | "xl" | "full"
 *  padded   : boolean
 *  className: string
 *  children : ReactNode
 */

const maxWidthStyles = {
  sm:   "max-w-2xl",
  md:   "max-w-4xl",
  lg:   "max-w-6xl",
  xl:   "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  maxWidth = "xl",
  padded = true,
  className = "",
}) {
  return (
    <div
      className={`
        mx-auto w-full
        ${maxWidthStyles[maxWidth]}
        ${padded ? "px-4 sm:px-6 lg:px-8" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}