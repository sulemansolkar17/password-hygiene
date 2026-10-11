import { useState, useCallback } from "react";

const criteria = [
  { label: "At least 12 characters", test: (p) => p.length >= 12 },
  { label: "Uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
  { label: "Lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
  { label: "Number (0-9)", test: (p) => /[0-9]/.test(p) },
  { label: "Special character (!@#$...)", test: (p) => /[^A-Za-z0-9]/.test(p) },
  { label: "Not a common pattern", test: (p) => !/(password|123456|qwerty|abc|iloveyou)/i.test(p) },
];

const checklist = [
  { icon: "✦", text: "Use a unique password for every account" },
  { icon: "✦", text: "Use at least 12 characters" },
  { icon: "✦", text: "Never use personal info like birthdays or names" },
  { icon: "✦", text: "Avoid common passwords like 'password123'" },
  { icon: "✦", text: "Never reuse passwords across sites" },
  { icon: "✦", text: "Use a trusted password manager" },
  { icon: "✦", text: "Enable MFA wherever available" },
  { icon: "✦", text: "Change passwords immediately after a breach" },
];

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const getStrength = (password, passed) => {
  if (!password) return null;
  if (passed <= 2) return { label: "Weak", color: "bg-rose-500", text: "text-rose-400", width: "w-1/4" };
  if (passed <= 4) return { label: "Fair", color: "bg-amber-500", text: "text-amber-400", width: "w-2/4" };
  if (passed <= 5) return { label: "Good", color: "bg-sky-500", text: "text-sky-400", width: "w-3/4" };
  return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-400", width: "w-full" };
};

const PasswordHygiene = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [genCopied, setGenCopied] = useState(false);
  const [options, setOptions] = useState({
    length: 16,
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });

  const passed = criteria.filter((c) => c.test(password)).length;
  const strength = getStrength(password, passed);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePassword = useCallback(() => {
    let charset = "";
    const guaranteed = [];
    if (options.upper) { charset += CHARS.upper; guaranteed.push(CHARS.upper[Math.floor(Math.random() * CHARS.upper.length)]); }
    if (options.lower) { charset += CHARS.lower; guaranteed.push(CHARS.lower[Math.floor(Math.random() * CHARS.lower.length)]); }
    if (options.numbers) { charset += CHARS.numbers; guaranteed.push(CHARS.numbers[Math.floor(Math.random() * CHARS.numbers.length)]); }
    if (options.symbols) { charset += CHARS.symbols; guaranteed.push(CHARS.symbols[Math.floor(Math.random() * CHARS.symbols.length)]); }
    if (!charset) return;

    const remaining = Array.from({ length: options.length - guaranteed.length }, () =>
      charset[Math.floor(Math.random() * charset.length)]
    );

    const all = [...guaranteed, ...remaining].sort(() => Math.random() - 0.5);
    setGeneratedPassword(all.join(""));
    setGenCopied(false);
  }, [options]);

  const handleGenCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setGenCopied(true);
    setTimeout(() => setGenCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium px-4 py-2 rounded-full mb-5">
            🔐 Password Hygiene Module
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            How Strong Is Your Password?
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Weak passwords are the #1 cause of account breaches. Learn what makes a password strong — and test yours below.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg">Password Strength Checker</h2>
            <span className="text-xs text-gray-600 bg-gray-800 px-3 py-1 rounded-full">
              100% client-side · never sent to server
            </span>
          </div>

          <div className="relative mb-5">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste a password to check..."
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 pr-24 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-500 hover:text-white transition-colors text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-cyan-400 transition-colors text-xs"
              >
                {copied ? "✓" : "Copy"}
              </button>
            </div>
          </div>

          {password && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">Strength</span>
                  <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-500 ${strength.color} ${strength.width}`} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {criteria.map((c) => {
                  const met = c.test(password);
                  return (
                    <div key={c.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${met ? "bg-emerald-500/5 border border-emerald-500/20" : "bg-gray-800/50 border border-gray-800"}`}>
                      <span className={`text-sm flex-shrink-0 ${met ? "text-emerald-400" : "text-gray-600"}`}>
                        {met ? "✓" : "○"}
                      </span>
                      <span className={`text-xs ${met ? "text-gray-300" : "text-gray-600"}`}>
                        {c.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className={`p-4 rounded-xl border text-sm ${passed === 6 ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : passed >= 4 ? "bg-amber-500/5 border-amber-500/20 text-amber-400" : "bg-rose-500/5 border-rose-500/20 text-rose-400"}`}>
                {passed === 6
                  ? "✓ Excellent password. Use a password manager to remember it."
                  : passed >= 4
                  ? "⚠ Almost there. Fix the remaining issues to strengthen it."
                  : "✕ This password is easy to crack. Improve it before using it."}
              </div>
            </div>
          )}

          {!password && (
            <div className="text-center py-8 text-gray-700 text-sm">
              Start typing to see your password strength analysis
            </div>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-white font-semibold text-lg mb-6">Password Generator</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs text-gray-500 mb-2 block">
                Length: <span className="text-white font-semibold">{options.length}</span>
              </label>
              <input
                type="range"
                min={8}
                max={32}
                value={options.length}
                onChange={(e) => setOptions({ ...options, length: +e.target.value })}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-gray-700 mt-1">
                <span>8</span>
                <span>32</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "upper", label: "Uppercase" },
                { key: "lower", label: "Lowercase" },
                { key: "numbers", label: "Numbers" },
                { key: "symbols", label: "Symbols" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setOptions({ ...options, [key]: !options[key] })}
                    className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors cursor-pointer ${options[key] ? "bg-cyan-500 border-cyan-500" : "bg-gray-800 border-gray-700"}`}
                  >
                    {options[key] && <span className="text-gray-950 text-xs font-bold">✓</span>}
                  </div>
                  <span className="text-gray-400 text-xs">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold py-3 rounded-xl text-sm transition-colors mb-4"
          >
            Generate Password
          </button>

          {generatedPassword && (
            <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
              <code className="flex-1 text-cyan-400 text-sm font-mono tracking-wider break-all">
                {generatedPassword}
              </code>
              <button
                onClick={handleGenCopy}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex-shrink-0 ${genCopied ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-gray-700 text-gray-300 hover:text-white"}`}
              >
                {genCopied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          )}

          <p className="text-gray-600 text-xs mt-3 text-center">
            Generated passwords are never stored or sent anywhere.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-white font-semibold text-lg mb-6">Password Hygiene Checklist</h2>
          <ul className="space-y-3">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition-colors">
                <span className="text-cyan-500 text-xs mt-0.5 flex-shrink-0">✦</span>
                <span className="text-gray-300 text-sm leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PasswordHygiene;