import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-gray-800 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/quiz"
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Take a Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;