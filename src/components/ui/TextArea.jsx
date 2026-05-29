/**
 * TextArea — Multi-line input
 * Props: label, name, placeholder, value, onChange,
 *        rows, error, hint, required, disabled, maxLength
 */

export default function TextArea({
  label,
  name,
  placeholder = "",
  value = "",
  onChange,
  rows = 4,
  error,
  hint,
  required = false,
  disabled = false,
  maxLength,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={name} className="text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
          {maxLength && (
            <span className={`text-xs font-medium ${value.length > maxLength * 0.9 ? "text-rose-500" : "text-gray-400"}`}>
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        required={required}
        className={`
          w-full rounded-xl border bg-white text-sm text-gray-800
          placeholder-gray-400 transition-all duration-150 outline-none
          px-3.5 py-2.5 resize-none
          ${error
            ? "border-rose-400 focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
            : "border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-hijau"
          }
          ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""}
        `}
      />

      {error && (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      )}
      {!error && hint && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
    </div>
  );
}