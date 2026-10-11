import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const getStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strengthLabel = (score) => {
        if (score <= 2) return { label: "Weak", color: "bg-rose-500", text: "text-rose-400" };
        if (score <= 4) return { label: "Fair", color: "bg-amber-500", text: "text-amber-400" };
        return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-400" };
    };

    const strength = getStrength(form.password);
    const strengthInfo = strengthLabel(strength);

    const requirements = [
        { label: "At least 8 characters", met: form.password.length >= 8 },
        { label: "One uppercase letter", met: /[A-Z]/.test(form.password) },
        { label: "One lowercase letter", met: /[a-z]/.test(form.password) },
        { label: "One number", met: /[0-9]/.test(form.password) },
        { label: "One special character", met: /[^A-Za-z0-9]/.test(form.password) },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await api.post("/auth/register", form);
            const res = await api.post("/auth/login", {
                email: form.email,
                password: form.password,
            });
            login(res.data.user, res.data.accessToken);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-4xl">🛡️</span>
                    <h1 className="text-2xl font-bold text-white mt-3 mb-1">Create your account</h1>
                    <p className="text-gray-500 text-sm">Start your cybersecurity awareness journey</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                placeholder="Suleman Solkar"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors text-xs font-medium"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            {form.password && (
                                <div className="mt-3 space-y-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-500">Password strength</span>
                                        <span className={`text-xs font-semibold ${strengthInfo.text}`}>
                                            {strengthInfo.label}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength ? strengthInfo.color : "bg-gray-700"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <ul className="space-y-1.5 mt-2">
                                        {requirements.map((req) => (
                                            <li key={req.label} className="flex items-center gap-2">
                                                <span className={`text-xs ${req.met ? "text-emerald-400" : "text-gray-600"}`}>
                                                    {req.met ? "✓" : "○"}
                                                </span>
                                                <span className={`text-xs ${req.met ? "text-gray-300" : "text-gray-600"}`}>
                                                    {req.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-950 font-bold py-3 rounded-xl text-sm transition-colors mt-2"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <p className="text-center text-gray-600 text-xs mt-6">
                    We never store your password in plaintext. It is hashed using bcrypt.
                </p>
            </div>
        </div>
    );
};

export default Register;