export function ErrorMessage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again later.",
  actionText,
  onAction,
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <span className="text-red-600 text-xl font-semibold">!</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-slate-600 text-sm mb-6">
          {message}
        </p>

        {/* Optional Action Button */}
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg
                       bg-slate-900 text-white text-sm font-medium
                       hover:bg-slate-800 transition-colors"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
