import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    { to: "/admin", label: "Overview", icon: "📊" },
    { to: "/admin/questions", label: "Quiz Questions", icon: "📝" },
    { to: "/admin/content", label: "Awareness Content", icon: "📚" },
    { to: "/admin/users", label: "Users", icon: "👥" },
  ];

  const isActive = (path) =>
    path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2 mb-1">
            <span className="text-cyan-400">🛡️</span>
            <span className="font-bold text-sm">CyberSafe<span className="text-cyan-400">India</span></span>
          </Link>
          <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            Admin Panel
          </span>
        <div className="mt-3">
            <Link
            to="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
            >
            <span>←</span> Back to Site
            </Link>
        </div>

        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                isActive(link.to)
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">
              {user?.name?.[0]}
            </div>
            <div>
              <p className="text-white text-xs font-medium">{user?.name}</p>
              <p className="text-gray-600 text-xs">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 p-6 sm:p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;