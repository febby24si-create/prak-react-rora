/**
 * InputField — Input teks dengan label, error, hint
 * Props:
 *  label     : string
 *  name      : string
 *  type      : string (text | email | password | number ...)
 *  placeholder
 *  value
 *  onChange
 *  error     : string
 *  hint      : string
 *  icon      : ReactNode (left icon)
 *  iconRight : ReactNode
 *  required  : boolean
 *  disabled  : boolean
 */

export default function InputField({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  hint,
  icon,
  iconRight,
  required = false,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full rounded-xl border bg-white text-sm text-gray-800
            placeholder-gray-400 transition-all duration-150 outline-none
            ${icon ? "pl-9" : "pl-3.5"}
            ${iconRight ? "pr-9" : "pr-3.5"}
            py-2.5
            ${error
              ? "border-rose-400 focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
              : "border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-hijau"
            }
            ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""}
          `}
        />

        {iconRight && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {iconRight}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
    </div>
  );
}