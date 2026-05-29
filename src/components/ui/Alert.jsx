/**
 * Alert — Notifikasi inline
 * Props:
 *  variant    : "success" | "danger" | "warning" | "info"
 *  title      : string
 *  dismissible: boolean
 *  onDismiss  : fn
 *  icon       : ReactNode (override default icon)
 *  children   : ReactNode (pesan detail)
 */

import { useState } from "react";

const styles = {
  success: {
    wrap:  "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon:  "text-emerald-500",
    badge: "bg-emerald-100",
  },
  danger: {
    wrap:  "bg-rose-50 border-rose-200 text-rose-800",
    icon:  "text-rose-500",
    badge: "bg-rose-100",
  },
  warning: {
    wrap:  "bg-amber-50 border-amber-200 text-amber-800",
    icon:  "text-amber-500",
    badge: "bg-amber-100",
  },
  info: {
    wrap:  "bg-blue-50 border-blue-200 text-blue-800",
    icon:  "text-blue-500",
    badge: "bg-blue-100",
  },
};

const defaultIcons = {
  success: (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
    </svg>
  ),
  danger: (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
    </svg>
  ),
  info: (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd"/>
    </svg>
  ),
};

export default function Alert({
  children,
  variant = "info",
  title,
  dismissible = false,
  onDismiss,
  icon,
  className = "",
}) {
  const [visible, setVisible] = useState(true);
  const s = styles[variant];

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${s.wrap} ${className}`}
    >
      <span className={`flex-shrink-0 mt-0.5 ${s.icon}`}>
        {icon ?? defaultIcons[variant]}
      </span>

      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-bold mb-0.5">{title}</p>
        )}
        {children && (
          <p className="text-sm leading-relaxed opacity-90">{children}</p>
        )}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className={`flex-shrink-0 mt-0.5 p-0.5 rounded-md hover:${s.badge} transition-colors`}
        >
          <svg className="w-4 h-4 opacity-60" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
          </svg>
        </button>
      )}
    </div>
  );
}