import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminOverview = () => {
  const [stats, setStats] = useState({ users: 0, questions: 0, attempts: 0, content: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, questionsRes, contentRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/quizzes"),
          api.get("/awareness"),
        ]);
        setStats({
          users: usersRes.data.users?.length || 0,
          questions: questionsRes.data.questions?.length || 0,
          content: contentRes.data.contents?.length || 0,
        });
      } catch {
        setStats({ users: 0, questions: 0, content: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Users", value: stats.users, icon: "👥", color: "border-cyan-500/20 bg-cyan-500/5" },
    { label: "Quiz Questions", value: stats.questions, icon: "📝", color: "border-violet-500/20 bg-violet-500/5" },
    { label: "Awareness Content", value: stats.content, icon: "📚", color: "border-emerald-500/20 bg-emerald-500/5" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Admin Overview</h1>
        <p className="text-gray-500 text-sm">Manage your platform content and users.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {cards.map((c) => (
          <div key={c.label} className={`border rounded-2xl p-6 ${c.color}`}>
            <div className="text-3xl mb-3">{c.icon}</div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? "—" : c.value}
            </div>
            <div className="text-gray-500 text-sm">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { to: "/admin/questions", icon: "📝", label: "Manage Quiz Questions", desc: "Add, edit, delete quiz questions by category" },
          { to: "/admin/content", icon: "📚", label: "Manage Awareness Content", desc: "Create and update educational content modules" },
          { to: "/admin/users", icon: "👥", label: "View Users", desc: "See registered users and their roles" },
        ].map((item) => (
          <a
            key={item.to}
            href={item.to}
            className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-all group"
          >
            <span className="text-2xl block mb-3">{item.icon}</span>
            <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors">
              {item.label}
            </h3>
            <p className="text-gray-600 text-xs">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;