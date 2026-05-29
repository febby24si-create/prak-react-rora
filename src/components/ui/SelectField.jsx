/**
 * SelectField — Dropdown select
 * Props:
 *  label    : string
 *  name     : string
 *  options  : [{ value, label }]
 *  value    : string
 *  onChange : fn
 *  error    : string
 *  hint     : string
 *  required : boolean
 *  disabled : boolean
 *  placeholder: string
 */

export default function SelectField({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  hint,
  required = false,
  disabled = false,
  placeholder = "Pilih opsi...",
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full appearance-none rounded-xl border bg-white text-sm text-gray-800
            transition-all duration-150 outline-none
            pl-3.5 pr-9 py-2.5 cursor-pointer
            ${error
              ? "border-rose-400 focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
              : "border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-hijau"
            }
            ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(({ value: val, label: lab }) => (
            <option key={val} value={val}>
              {lab}
            </option>
          ))}
        </select>

        {/* Custom chevron */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}