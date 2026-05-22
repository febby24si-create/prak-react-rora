export default function PageHeader() {
  return (
    <div id="pageheader-container" className="flex items-start justify-between px-2 pb-4">
      <div id="pageheader-left" className="flex flex-col">
        <span id="page-title" className="text-2xl font-bold text-gray-800">
          Dashboard
        </span>
        <p className="text-sm text-gray-400 mt-0.5">
          Hi, Samantha. Welcome back to Sedap Admin!
        </p>
      </div>

      {/* Filter Periode */}
      <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm cursor-pointer hover:border-hijau transition-colors">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-hijau" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-gray-700">Filter Periode</p>
          <p className="text-xs text-gray-400">17 April 2020 - 21 May 2020</p>
        </div>
        <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}