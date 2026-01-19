export function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />

      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Section*/}
          <div className="p-10 flex flex-col justify-center">
            <span className="text-sm uppercase tracking-wide text-slate-500 mb-3">
              Productivity
            </span>

            <h1 className="text-4xl font-semibold text-slate-900 leading-tight mb-4">
              Task Manager
            </h1>

            <p className="text-slate-600 text-lg mb-8">
              A simple and efficient way to organize, track, and complete your daily tasks.
            </p>

            <a
              href="/task-list"
              className="inline-flex items-center justify-center w-fit px-6 py-3 rounded-lg
                         bg-slate-900 text-white text-sm font-medium
                         hover:bg-slate-800 transition-colors"
            >
              Open Task List
            </a>
          </div>

          <div className="hidden md:flex items-center justify-center bg-slate-50 rounded-r-2xl">
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-white text-3xl font-semibold">✓</span>
              </div>
              <p className="text-slate-600 text-sm">
                Stay focused. Stay organized.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
