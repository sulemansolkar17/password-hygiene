import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/users")
      .then((res) => setUsers(res.data.users))
      .catch(() => setError("Failed to load users."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Users</h1>
        <p className="text-gray-500 text-sm">All registered users on the platform.</p>
      </div>

      {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">
            Total Users: <span className="text-cyan-400">{users.length}</span>
          </h2>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-gray-600 text-sm">No users found.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {users.map((user) => (
              <div key={user._id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-gray-600 text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-xs hidden sm:block">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    user.role === "admin"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-gray-800 text-gray-400"
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;