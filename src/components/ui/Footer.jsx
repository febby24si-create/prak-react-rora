/**
 * Footer — Footer halaman dalam dashboard
 * Props:
 *  variant: "minimal" | "full"
 */

const links = [
  { label: "Documentation", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Support", href: "#" },
  { label: "Privacy", href: "#" },
];

export default function Footer({ variant = "minimal" }) {
  if (variant === "minimal") {
    return (
      <footer className="mt-auto border-t border-gray-100 bg-white px-6 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-extrabold text-gray-700">Sedap</span>
            <span className="text-base font-black text-hijau">.</span>
            <span className="text-xs text-gray-400 ml-1.5">Admin Dashboard</span>
          </div>
          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} Sedap. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-auto border-t border-gray-100 bg-white px-6 py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div>
          <div className="flex items-baseline gap-0.5 mb-1">
            <span className="text-base font-extrabold text-gray-800">Sedap</span>
            <span className="text-lg font-black text-hijau">.</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Modern Restaurant Admin Dashboard<br />Built with React + Tailwind CSS
          </p>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-4 flex-wrap justify-center">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs text-gray-400 hover:text-hijau transition-colors font-medium"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-[11px] text-gray-400">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}