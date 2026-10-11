import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data.user, res.data.accessToken);
            if (res.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-4xl">🔐</span>
                    <h1 className="text-2xl font-bold text-white mt-3 mb-1">Welcome back</h1>
                    <p className="text-gray-500 text-sm">Sign in to your CyberSafeIndia account</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="new-email"
                                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors text-xs font-medium"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading || !email || !password}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-950 font-bold py-3 rounded-xl text-sm transition-colors"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                            <p className="text-amber-400 text-xs font-semibold mb-1">Security tip</p>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Never enter your password on a site unless you verified the URL is correct. Check for HTTPS.
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                        >
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;