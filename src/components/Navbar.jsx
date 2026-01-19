import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export function Navbar() {
  const {theme, toggleTheme} = useTheme();

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'} shadow-md fixed top-0 w-full z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              TaskManager
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/task-list"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
            >
              Task List
            </Link>

            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}