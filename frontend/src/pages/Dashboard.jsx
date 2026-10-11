import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const modules = [
  { key: "password-hygiene", label: "Password Hygiene", icon: "🔐", to: "/password-hygiene" },
  { key: "phishing", label: "Phishing Awareness", icon: "🎣", to: "/phishing" },
  { key: "personal-data", label: "Personal Data", icon: "🗄️", to: "/personal-data" },
  { key: "safe-browsing", label: "Safe Browsing", icon: "🌐", to: "/safe-browsing" },
  { key: "social-media", label: "Social Media Privacy", icon: "📱", to: "/social-media" },
];

const StatCard = ({ label, value, icon }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
    <span className="text-2xl mb-4">{icon}</span>
    <div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, attemptsRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/quizzes/history"),
        ]);
        setUser(userRes.data.user);
        setAttempts(attemptsRes.data.attempts || []);
      } catch {
        setAttempts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completedModules = Array.isArray(user?.completedModules)
    ? user.completedModules
    : [];

  const bestScore = attempts.length
    ? Math.max(...attempts.map((a) => a.score))
    : 0;

  const avgScore = attempts.length
    ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
    : 0;

  const moduleProgress = Math.round((completedModules.length / modules.length) * 100);
  const displayName = user?.name || authUser?.name || "User";

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome back, {displayName.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Track your cybersecurity awareness progress below.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 bg-gray-900 border border-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <span className="text-2xl">📚</span>
              <div className="mt-4">
                <div className="text-3xl font-bold text-white mb-1">{moduleProgress}%</div>
                <div className="text-gray-500 text-sm mb-3">Module Progress</div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-cyan-500 transition-all duration-700"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-2">
                  {completedModules.length}/{modules.length} completed
                </p>
              </div>
            </div>

            <StatCard label="Quiz Attempts" value={attempts.length} icon="📝" />
            <StatCard label="Best Quiz Score" value={attempts.length ? `${bestScore}%` : "—"} icon="🏆" />
            <StatCard label="Average Quiz Score" value={attempts.length ? `${avgScore}%` : "—"} icon="📊" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold">Awareness Modules</h2>
              <span className="text-xs text-gray-500">
                {completedModules.length}/{modules.length} completed
              </span>
            </div>

            <div className="space-y-3">
              {modules.map((mod) => {
                const done = completedModules.includes(mod.key);
                return (
                  <Link
                    to={mod.to}
                    key={mod.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{mod.icon}</span>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {mod.label}
                      </span>
                    </div>
                    {done ? (
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                        Completed ✓
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-700 text-gray-400 px-2.5 py-1 rounded-full">
                        Start →
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold">Recent Quiz Attempts</h2>
              <Link to="/quiz" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                Take Quiz →
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : attempts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-4xl mb-3">📝</span>
                <p className="text-gray-400 text-sm font-medium mb-1">No attempts yet</p>
                <p className="text-gray-600 text-xs mb-4">Take a quiz to see your results here</p>
                <Link
                  to="/quiz"
                  className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-xs px-5 py-2 rounded-lg transition-colors"
                >
                  Start Quiz
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {attempts.slice(0, 5).map((attempt) => {
                  const sc = attempt.score >= 75 ? "text-emerald-400" : attempt.score >= 50 ? "text-amber-400" : "text-rose-400";
                  const bg = attempt.score >= 75 ? "bg-emerald-500/10 border-emerald-500/20" : attempt.score >= 50 ? "bg-amber-500/10 border-amber-500/20" : "bg-rose-500/10 border-rose-500/20";
                  return (
                    <div key={attempt._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 border border-gray-800">
                      <div>
                        <p className="text-sm text-gray-300 capitalize">
                          {attempt.category.replace(/-/g, " ")}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {attempt.correctAnswers}/{attempt.totalQuestions} correct · {new Date(attempt.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full border ${bg} ${sc}`}>
                        {attempt.score}%
                      </span>
                    </div>
                  );
                })}
                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-600">
                  <span>Average score</span>
                  <span className="text-white font-semibold">{avgScore}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold mb-1">Ready to test your knowledge?</h3>
            <p className="text-gray-400 text-sm">Take a category quiz and improve your security awareness.</p>
          </div>
          <Link
            to="/quiz"
            className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Take Quiz →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;